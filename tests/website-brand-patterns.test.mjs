import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { websiteBrandPatterns, defineWebsiteBrandPatterns } from '../shared/website-brand-patterns.ts'
import { defaultBrandPatternConfig, normalizeBrandPatternConfig } from '../shared/brand-pattern-config.ts'

const origin = process.env.PATTERN_GALLERY_ORIGIN ?? 'http://127.0.0.1:3000'
const parsed = new URL(origin)
if (!['localhost', '127.0.0.1'].includes(parsed.hostname) || parsed.protocol !== 'http:') throw new Error('Use a loopback website.')
const output = 'exports/brand-patterns/integration'
const normalizedText = value => value.replace(/\s+/g, ' ').trim()

test('website configuration permits disabled slots and rejects unsuitable placements', () => {
  const disabled = { hero: null, sections: { independence: null, product: null }, dividers: { workflow: null } }
  assert.deepEqual(defineWebsiteBrandPatterns(disabled), disabled)
  assert.throws(() => defineWebsiteBrandPatterns({ ...disabled, hero: { ...defaultBrandPatternConfig, pattern: 'capital-arc-04' } }), /not intended for hero/)
  assert.throws(() => defineWebsiteBrandPatterns({ ...disabled, dividers: { workflow: defaultBrandPatternConfig } }), /not intended for divider/)
  const optional = defineWebsiteBrandPatterns({ ...disabled, sections: { independence: { ...defaultBrandPatternConfig, pattern: 'capital-contour-02', intensity: .3 }, product: { ...defaultBrandPatternConfig, pattern: 'sc-cut-03', intensity: .35 } } })
  assert.equal(optional.sections.product.pattern, 'sc-cut-03')
})

test('public website patterns preserve content, links, native responsive layout and theme behavior', async () => {
  await mkdir(output, { recursive: true })
  let baseline = []
  try { baseline = JSON.parse(await readFile(`${output}/baseline.json`, 'utf8')) } catch (error) { if (error.code !== 'ENOENT') throw error }
  const browser = await chromium.launch()
  const report = { cases: [], baselineComparisons: 0, baselineGeometryChanges: [] }
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const width of [320, 390, 768, 1023, 1024, 1280, 1440]) {
      for (const theme of ['light', 'dark']) {
        await page.setViewportSize({ width, height: 1000 })
        await page.goto(origin, { waitUntil: 'networkidle' })
        await page.getByLabel('Appearance', { exact: true }).selectOption(theme)
        await page.locator('.home-hero').evaluate(async element => {
          await document.fonts.ready
          await Promise.all(Array.from(element.querySelectorAll('img'), img => img.decode()))
        })
        const content = await page.evaluate(() => ({
          text: document.querySelector('main').innerText,
          links: Array.from(document.querySelectorAll('a'), a => ({ href: a.getAttribute('href'), text: a.innerText })),
          images: Array.from(document.querySelectorAll('main img:not(.home-watermark)'), i => ({ src: i.getAttribute('src'), srcset: i.getAttribute('srcset'), alt: i.alt, width: i.getAttribute('width'), height: i.getAttribute('height') })),
          seo: Array.from(document.querySelectorAll('head title,head meta[name="description"],head meta[name="robots"],head meta[property^="og:"],head link[rel="canonical"]'), e => e.outerHTML),
          geometry: Array.from(document.querySelectorAll('main h1,main h2,.home-actions,.home-boundary,.home-product-stage'), e => { const r = e.getBoundingClientRect(); return [r.x, r.y + scrollY, r.width, r.height] }),
          stageIndex: Array.from(document.querySelectorAll('main h1,main h2,.home-actions,.home-boundary,.home-product-stage')).findIndex(el => el.classList.contains('home-product-stage')),
          overflow: document.documentElement.scrollWidth > innerWidth,
        }))
        assert.equal(content.overflow, false)
        const before = baseline.find(item => item.width === width && item.theme === theme)
        if (before) {
          assert.equal(normalizedText(content.text), normalizedText(before.text), `${width}/${theme}: copy changed`)
          for (const field of ['links', 'images', 'seo']) assert.deepEqual(content[field], before[field], `${width}/${theme}: ${field} changed`)
          assert.equal(content.geometry.length, before.geometry.length)
          // The final audit deliberately fixes the old mobile callout/caption overlap.
          // Keep content/SEO assertions strict and record historical layout differences.
          const changes = content.geometry.flatMap((rect, i) => rect.flatMap((value, c) => Math.abs(value - before.geometry[i][c]) >= .1 ? [{ element: i, coordinate: c, delta: value - before.geometry[i][c] }] : []))
          const last = content.stageIndex
          const stageGrowth = content.geometry[last][3] - before.geometry[last][3]
          if (width >= 1024) assert.ok(Math.abs(stageGrowth) < .1)
          else assert.ok(stageGrowth >= 0 && stageGrowth <= 100, 'Caption clearance caused excessive stage growth')
          for (let i = 0; i < content.geometry.length; i++) for (let c = 0; c < 4; c++) {
            const movesAfterStage = i !== last && c === 1 && before.geometry[i][1] >= before.geometry[last][1] + before.geometry[last][3] - .1
            const expected = before.geometry[i][c] + (i === last && c === 3 ? stageGrowth : movesAfterStage ? stageGrowth : 0)
            assert.ok(Math.abs(content.geometry[i][c] - expected) < .1, `${width}/${theme}: unexpected layout drift at ${i}/${c}`)
          }
          if (changes.length) report.baselineGeometryChanges.push({ width, theme, changes })
          report.baselineComparisons++
        }
        const hero = page.locator('.home-hero .sc-pattern-layer:visible')
        const captionOverlap = await page.locator('.home-hero').evaluate(el => {
          const range = document.createRange()
          range.selectNodeContents(el.querySelector('.home-hero-phone figcaption'))
          const a = range.getBoundingClientRect()
          const b = el.querySelector('.home-record-excerpt').getBoundingClientRect()
          return Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
        })
        assert.equal(captionOverlap, 0, `${width}/${theme}: report callout obscures the calendar caption`)
        assert.equal(await hero.count(), websiteBrandPatterns.hero ? 1 : 0)
        if (websiteBrandPatterns.hero) {
          const choice = normalizeBrandPatternConfig(websiteBrandPatterns.hero)
          assert.equal(await hero.locator('[data-brand-pattern]').getAttribute('data-brand-pattern'), choice.pattern)
          assert.equal(await hero.locator('.sc-brand-pattern').evaluate(el => getComputedStyle(el).opacity), String(choice.intensity))
          const layout = choice.layout === 'auto' ? (width < 1024 ? 'mobile' : 'desktop') : choice.layout
          assert.equal(await hero.locator(`.sc-brand-pattern__${layout}`).isVisible(), true)
        }
        const divider = page.locator('.home-workflow-divider [data-brand-pattern]')
        if (websiteBrandPatterns.dividers.workflow) assert.equal(await divider.getAttribute('data-brand-pattern'), websiteBrandPatterns.dividers.workflow.pattern)
        else assert.equal(await divider.count(), 0)
        assert.equal(await page.locator('.home-section-accent').count(), Object.values(websiteBrandPatterns.sections).filter(Boolean).length)
        assert.equal(await page.locator('.sc-pattern-layer').evaluateAll(nodes => nodes.every(el => el.inert && el.getAttribute('aria-hidden') === 'true' && getComputedStyle(el).pointerEvents === 'none')), true)
        assert.equal(await page.evaluate(() => { const ids = Array.from(document.querySelectorAll('[id]'), el => el.id); return ids.length === new Set(ids).size }), true)
        await page.evaluate(() => scrollTo(0, 0))
        const height = await page.locator('.home-hero').evaluate(el => Math.ceil(el.getBoundingClientRect().bottom + scrollY) + 2)
        await page.setViewportSize({ width, height })
        const file = `${output}/website-${width}-${theme}.png`
        await page.screenshot({ path: file })
        const cta = page.locator('.home-actions a').first()
        assert.equal(await cta.evaluate(el => { const r = el.getBoundingClientRect(); return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)) }), true)
        await cta.click()
        await page.waitForURL(url => url.hash === '#product')
        assert.equal(new URL(page.url()).hash, '#product')
        report.cases.push({ width, theme, file, baselineCompared: Boolean(before) })
      }
    }
    await page.goto(`${origin}/?pattern=sc-cut-01&intensity=0`, { waitUntil: 'networkidle' })
    if (websiteBrandPatterns.hero) assert.equal(await page.locator('.home-hero .sc-pattern-layer:visible [data-brand-pattern]').getAttribute('data-brand-pattern'), websiteBrandPatterns.hero.pattern)
    await page.getByLabel('Appearance', { exact: true }).selectOption('system')
    await page.emulateMedia({ colorScheme: 'dark' })
    assert.equal(await page.locator('.sc-home').evaluate(el => getComputedStyle(el).getPropertyValue('--sc-primary').trim()), '#f2e6a7')
    await page.emulateMedia({ colorScheme: 'light' })
    assert.equal(await page.locator('.sc-home').evaluate(el => getComputedStyle(el).getPropertyValue('--sc-primary').trim()), '#6d5e0f')
    if (await page.locator('.sc-pattern-layer').count()) assert.equal(await page.locator('.sc-pattern-layer').first().evaluate(el => getComputedStyle(el).animationName), 'none')
    await page.emulateMedia({ forcedColors: 'active' })
    await page.waitForFunction(() => matchMedia('(forced-colors: active)').matches && Array.from(document.querySelectorAll('.sc-brand-pattern')).every(el => getComputedStyle(el).visibility === 'hidden'))
    assert.equal(await page.locator('.sc-brand-pattern').evaluateAll(nodes => nodes.every(el => getComputedStyle(el).visibility === 'hidden')), true)
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 1600 }, colorScheme: 'dark' })
    const staticPage = await context.newPage()
    await staticPage.goto(origin, { waitUntil: 'networkidle' })
    if (websiteBrandPatterns.hero) assert.equal(await staticPage.locator(`.home-hero-pattern--mobile .sc-brand-pattern__${websiteBrandPatterns.hero.layout === 'auto' ? 'mobile' : websiteBrandPatterns.hero.layout}`).isVisible(), true)
    await staticPage.screenshot({ path: `${output}/website-no-javascript.png` })
    await context.close()
    assert.deepEqual(errors, [])
    report.browser = browser.version()
    await writeFile(`${output}/report.json`, `${JSON.stringify(report, null, 2)}\n`)
  } finally { await browser.close() }
})
