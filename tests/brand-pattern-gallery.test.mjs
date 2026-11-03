import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { websiteBrandPatterns } from '../shared/website-brand-patterns.ts'
import { brandPatterns, brandPatternFamilies } from '../shared/brand-patterns.ts'
import { normalizeBrandPatternConfig, defaultBrandPatternConfig, brandPatternPreviewUrl } from '../shared/brand-pattern-config.ts'

const origin = process.env.PATTERN_GALLERY_ORIGIN ?? 'http://127.0.0.1:3000'
const url = new URL(origin)
if (url.protocol !== 'http:' || !['127.0.0.1', 'localhost'].includes(url.hostname)) throw new Error('Use a loopback development server.')
const output = 'exports/brand-patterns/gallery'
const initialPattern = websiteBrandPatterns.hero?.pattern ?? defaultBrandPatternConfig.pattern
const screenshotReady = async (page) => {
  await page.locator('.home-hero .sc-pattern-layer:visible [data-brand-pattern]').waitFor({ state: 'attached' })
  await page.locator('.home-hero').evaluate(async element => {
    await document.fonts.ready
    await Promise.all(Array.from(element.querySelectorAll('img'), img => img.decode()))
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
}
test('shared layer config bounds URL/message input without arbitrary pattern paths', () => {
  assert.deepEqual(normalizeBrandPatternConfig(null), defaultBrandPatternConfig)
  assert.deepEqual(normalizeBrandPatternConfig({ pattern: 'https://example.com/a.svg', layout: 'invalid', scale: 100, x: -200, y: Infinity, intensity: -20 }), { ...defaultBrandPatternConfig, scale: 1.25, x: -10, intensity: 0 })
  const config = normalizeBrandPatternConfig({ pattern: 'capital-arc-01', layout: 'mobile', scale: '.9', x: '4', y: '-3', intensity: '.5' })
  assert.equal(config.pattern, 'capital-arc-01')
  assert.equal(config.scale, .9)
  assert.equal(config.layout, 'mobile')
  const query = Object.fromEntries(new URL(brandPatternPreviewUrl(config, 'dark'), origin).searchParams)
  assert.deepEqual(normalizeBrandPatternConfig(query), config)
})

test('gallery browses all families, preserves real content, compares and copies exact bounded settings', async () => {
  const browser = await chromium.launch()
  try {
    const context = await browser.newContext({ viewport: { width: 1600, height: 1100 }, permissions: ['clipboard-read', 'clipboard-write'] })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(`${origin}/brand-patterns`, { waitUntil: 'networkidle' })
    await page.locator(`[data-preview-ready="${initialPattern}"]`).waitFor()
    assert.equal(await page.locator('.pattern-choice').count(), 24)
    for (const family of Object.keys(brandPatternFamilies)) {
      await page.getByLabel('Pattern family', { exact: true }).selectOption(family)
      assert.equal(await page.locator('.pattern-choice').count(), 4)
      const choice = page.locator('.pattern-choice').first()
      await choice.focus()
      await choice.press('Enter')
      assert.equal(await choice.getAttribute('aria-pressed'), 'true')
    }
    await page.getByLabel('Pattern family', { exact: true }).selectOption('all')
    for (const pattern of brandPatterns) {
      await page.getByLabel('Selected pattern', { exact: true }).selectOption(pattern.id)
      await page.locator(`[data-preview-ready="${pattern.id}"]`).waitFor()
    }
    await page.getByLabel('Selected pattern', { exact: true }).selectOption('structural-fold-01')
    await page.locator('[data-preview-ready="structural-fold-01"]').waitFor()
    const selectedFrame = page.frameLocator('iframe[title="selected pattern preview"]')
    const previewResponse = await page.request.get(`${origin}/brand-patterns-preview`)
    assert.equal(previewResponse.headers()['x-frame-options'], 'SAMEORIGIN')
    assert.match(previewResponse.headers()['content-security-policy'], /frame-ancestors 'self'/)
    const home = await context.newPage()
    await home.goto(origin, { waitUntil: 'networkidle' })
    assert.equal(await selectedFrame.locator('#hero-heading').innerText(), await home.locator('#hero-heading').innerText())
    assert.equal(await selectedFrame.locator('.home-lead').innerText(), await home.locator('.home-lead').innerText())
    assert.equal(await selectedFrame.getByRole('link', { name: /Explore the app/ }).getAttribute('href'), '#product')
    assert.equal(await selectedFrame.locator('.home-hero-phone img').getAttribute('src'), '/product/calendar-560.png')
    assert.equal(await selectedFrame.locator('.home-record-excerpt img').getAttribute('src'), '/product/reports-detail-900.png')
    assert.equal(await selectedFrame.locator('header .sc-brand-mark').count(), 1)
    await home.close()
    await page.getByLabel('Compare variants side by side').check()
    await page.getByLabel('Comparison pattern', { exact: true }).selectOption('capital-contour-01')
    await page.locator('.pattern-frame:has(iframe[title="comparison pattern preview"])[data-preview-ready="capital-contour-01"]').waitFor()
    const comparisonFrame = page.frameLocator('iframe[title="comparison pattern preview"]')
    assert.equal(await comparisonFrame.locator('.sc-pattern-layer:visible [data-brand-pattern]').getAttribute('data-brand-pattern'), 'capital-contour-01')
    await page.getByLabel('Artwork layout', { exact: true }).selectOption('auto')
    for (const [id, key] of [['pattern-scale', 'End'], ['pattern-x', 'Home'], ['pattern-y', 'End'], ['pattern-intensity', 'Home']]) {
      await page.locator(`#${id}`).focus(); await page.locator(`#${id}`).press(key)
    }
    await page.getByRole('button', { name: 'Copy configuration', exact: true }).click()
    await page.getByRole('status').filter({ hasText: 'Pattern configuration copied.' }).waitFor()
    const copied = await page.evaluate(() => navigator.clipboard.readText())
    assert.equal(copied, await page.getByLabel('Layer configuration · TypeScript').inputValue())
    const config = JSON.parse(copied.slice(copied.indexOf('{\n'), copied.indexOf(' satisfies BrandPatternConfig')))
    assert.deepEqual(config, { ...defaultBrandPatternConfig, scale: 1.25, x: -10, y: 15, intensity: 0 })
    await selectedFrame.locator('.sc-pattern-layer:visible .sc-pattern-layer__position[style*="scale(1.25)"]').waitFor({ state: 'attached' })
    const target = new URL(await page.getByRole('link', { name: /Open selected pattern preview at full size/ }).getAttribute('href'), origin)
    assert.deepEqual(normalizeBrandPatternConfig(Object.fromEntries(target.searchParams)), config)
    await page.getByRole('button', { name: 'Reset adjustments' }).click()
    for (const width of [1440, 768, 390, 320]) {
      await page.getByLabel('Preview viewport', { exact: true }).selectOption(String(width))
      await selectedFrame.locator('.home-hero').evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
      assert.equal(await selectedFrame.locator('body').evaluate(() => innerWidth), width)
      assert.equal(await selectedFrame.locator('body').evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      await selectedFrame.locator(width >= 1024 ? '.home-hero > .sc-pattern-layer' : '.home-product-stage > .sc-pattern-layer').waitFor({ state: 'attached' })
    }
    await page.getByLabel('Preview theme', { exact: true }).selectOption('dark')
    await selectedFrame.locator('html[data-theme="dark"]').waitFor()
    await comparisonFrame.locator('html[data-theme="dark"]').waitFor()
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'light')
    await selectedFrame.locator('body').evaluate(() => window.dispatchEvent(new MessageEvent('message', { origin: 'https://example.com', source: window.parent, data: { type: 'sc-pattern-preview-config', config: { pattern: 'sc-cut-01' }, theme: 'light' } })))
    assert.equal(await selectedFrame.locator('.sc-pattern-layer:visible [data-brand-pattern]').getAttribute('data-brand-pattern'), 'structural-fold-01')
    assert.equal(await selectedFrame.locator('html').getAttribute('data-theme'), 'dark')
    await page.setViewportSize({ width: 320, height: 900 })
    await page.waitForTimeout(200)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
    assert.equal(await page.evaluate(() => { const ids = Array.from(document.querySelectorAll('[id]'), el => el.id); return new Set(ids).size === ids.length }), true)
    assert.deepEqual(errors, [])
    await context.close()
  } finally { await browser.close() }
})

test('native previews render six families with real screenshots; clipboard fallback remains usable', async () => {
  await mkdir(output, { recursive: true })
  const browser = await chromium.launch()
  const cases = []
  try {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const pattern of brandPatterns.filter(item => item.id.endsWith('-01'))) {
      for (const [width, theme] of [[1440, 'light'], [390, 'dark']]) {
        await page.setViewportSize({ width, height: 1000 })
        await page.goto(`${origin}${brandPatternPreviewUrl({ ...defaultBrandPatternConfig, pattern: pattern.id }, theme)}`, { waitUntil: 'networkidle' })
        await screenshotReady(page)
        const bounds = await page.locator('.home-hero').evaluate(el => ({ bottom: Math.ceil(el.getBoundingClientRect().bottom + scrollY), headings: document.querySelectorAll('h1').length, background: getComputedStyle(document.documentElement).getPropertyValue('--sc-background').trim(), overflow: document.documentElement.scrollWidth > innerWidth }))
        assert.equal(bounds.headings, 1)
        assert.equal(bounds.overflow, false)
        assert.equal(bounds.background, theme === 'light' ? '#faf8f2' : '#11150f')
        await page.setViewportSize({ width, height: bounds.bottom + 2 })
        await screenshotReady(page)
        const file = `${output}/${pattern.id}-${width}-${theme}.png`
        await page.screenshot({ path: file })
        cases.push({ pattern: pattern.id, width, theme, height: bounds.bottom + 2, file })
      }
    }
    await page.setViewportSize({ width: 1600, height: 1100 })
    await page.goto(`${origin}/brand-patterns`, { waitUntil: 'networkidle' })
    await page.locator(`[data-preview-ready="${initialPattern}"]`).waitFor()
    await page.getByLabel('Compare variants side by side').check()
    await page.locator('.pattern-frame:has(iframe[title="comparison pattern preview"])[data-preview-ready="capital-arc-01"]').waitFor()
    await page.locator('.preview-grid').screenshot({ path: `${output}/comparison-desktop.png` })
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('Test clipboard unavailable')) } }))
    await page.getByRole('button', { name: 'Copy configuration', exact: true }).click()
    await page.getByRole('status').filter({ hasText: 'Clipboard unavailable.' }).waitFor()
    assert.equal(await page.getByLabel('Layer configuration · TypeScript').evaluate(el => document.activeElement === el && el.selectionEnd === el.value.length), true)
    assert.deepEqual(errors, [])
    await writeFile(`${output}/report.json`, `${JSON.stringify({ browser: browser.version(), cases }, null, 2)}\n`)
  } finally { await browser.close() }
})
