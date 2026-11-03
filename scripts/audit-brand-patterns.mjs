import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { chromium } from 'playwright'
import { brandPatterns } from '../shared/brand-patterns.ts'
import { defaultBrandPatternConfig, brandPatternPreviewUrl } from '../shared/brand-pattern-config.ts'

const origin = process.env.PATTERN_GALLERY_ORIGIN ?? 'http://127.0.0.1:3000'
const url = new URL(origin)
if (!['localhost', '127.0.0.1'].includes(url.hostname) || url.protocol !== 'http:') throw new Error('Audit a loopback development server only.')
const output = 'exports/brand-patterns/final-audit'
await mkdir(output, { recursive: true })
const report = { timestamp: new Date().toISOString(), cases: [], contrast: [] }
const browser = await chromium.launch()
try {
  report.browser = browser.version()
  const page = await browser.newPage({ reducedMotion: 'reduce', deviceScaleFactor: 1 })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  const ready = async () => {
    await page.locator('.home-hero .sc-pattern-layer:visible [data-brand-pattern]').waitFor()
    await page.locator('.home-hero').evaluate(async el => {
      await document.fonts.ready
      await Promise.all(Array.from(el.querySelectorAll('img'), image => image.decode()))
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      scrollTo(0, 0)
    })
  }
  for (const [width, theme] of [[1440, 'light'], [390, 'dark']]) {
    let reference
    const hashes = new Set()
    for (const pattern of brandPatterns) {
      await page.setViewportSize({ width, height: 1800 })
      await page.goto(`${url.origin}${brandPatternPreviewUrl({ ...defaultBrandPatternConfig, pattern: pattern.id }, theme)}`, { waitUntil: 'networkidle' })
      await ready()
      const evidence = await page.evaluate(() => ({
        text: document.querySelector('main').innerText.replace(/\s+/g, ' ').trim(),
        links: Array.from(document.querySelectorAll('a'), el => [el.getAttribute('href'), el.innerText]),
        images: Array.from(document.querySelectorAll('main img'), el => [el.getAttribute('src'), el.getAttribute('srcset'), el.getAttribute('width'), el.getAttribute('height'), el.getAttribute('alt')]),
        seo: Array.from(document.querySelectorAll('head title,head meta[name="description"],head meta[name="robots"],head meta[property^="og:"],head link[rel="canonical"]'), el => el.outerHTML),
        geometry: Array.from(document.querySelectorAll('main h1,main h2,.home-actions,.home-boundary,.home-product-stage,.home-record-excerpt'), el => { const r = el.getBoundingClientRect(); return [r.x, r.y, r.width, r.height] }),
        overflow: document.documentElement.scrollWidth > innerWidth,
        illegalSvg: Boolean(document.querySelector('.sc-brand-pattern image, .sc-brand-pattern filter, .sc-brand-pattern foreignObject, .sc-brand-pattern script, .sc-brand-pattern text, .sc-brand-pattern animate')),
        interactiveLayer: Array.from(document.querySelectorAll('.sc-pattern-layer')).some(el => !el.inert || el.getAttribute('aria-hidden') !== 'true' || getComputedStyle(el).pointerEvents !== 'none'),
      }))
      assert.equal(evidence.overflow, false)
      assert.equal(evidence.illegalSvg, false)
      assert.equal(evidence.interactiveLayer, false)
      if (!reference) reference = evidence
      for (const key of ['text', 'links', 'images', 'seo']) assert.deepEqual(evidence[key], reference[key], `${pattern.id}/${width}: ${key} changed when switching artwork`)
      assert.equal(evidence.geometry.length, reference.geometry.length)
      for (let i = 0; i < reference.geometry.length; i++) for (let c = 0; c < 4; c++) assert.ok(Math.abs(evidence.geometry[i][c] - reference.geometry[i][c]) < .1, `${pattern.id}/${width}: layout moved at ${i}/${c}`)
      const height = await page.locator('.home-hero').evaluate(el => Math.ceil(el.getBoundingClientRect().bottom + scrollY) + 2)
      await page.setViewportSize({ width, height })
      await ready()
      const png = await page.screenshot()
      const hash = createHash('sha256').update(png).digest('hex')
      hashes.add(hash)
      const file = `${output}/${pattern.id}-${width}-${theme}.png`
      await writeFile(file, png)
      report.cases.push({ id: pattern.id, family: pattern.family, width, height, theme, contentUnchanged: true, geometryUnchanged: true, sha256: hash, file })
    }
    assert.equal(hashes.size, 24, `${width}/${theme}: some switches did not visibly change the artwork`)
    console.log(`${width}px/${theme}: 24 distinct page PNGs; content, links, images, SEO and geometry unchanged.`)
  }

  // Sample actual rendered backgrounds with only the copy temporarily hidden, preserving layout.
  // This checks the shipped hero at normal contrast, not every arbitrary future adjustment/state.
  for (const width of [1440, 390]) for (const theme of ['light', 'dark']) {
    await page.setViewportSize({ width, height: 1800 })
    await page.goto(url.origin, { waitUntil: 'networkidle' })
    await page.getByLabel('Appearance', { exact: true }).selectOption(theme)
    await ready()
    const copy = page.locator('.home-hero-copy')
    const box = await copy.boundingBox()
    const targets = await copy.evaluate(el => {
      const root = el.getBoundingClientRect()
      return ['h1', 'h1 span', '.home-lead', '.home-boundary', '.home-eyebrow'].map(selector => {
        const node = el.querySelector(selector), r = node.getBoundingClientRect()
        return { selector, color: getComputedStyle(node).color, x: r.x - root.x, y: r.y - root.y, width: r.width, height: r.height }
      })
    })
    let background
    try {
      await copy.evaluate(el => { el.style.setProperty('visibility', 'hidden', 'important') })
      await page.waitForFunction(() => getComputedStyle(document.querySelector('.home-hero-copy')).visibility === 'hidden' && getComputedStyle(document.querySelector('.home-hero-copy h1')).visibility === 'hidden')
      background = await page.screenshot({ clip: box })
    } finally { await copy.evaluate(el => { el.style.removeProperty('visibility') }) }
    const samples = await page.evaluate(async ({ png, targets, box }) => {
      const bitmap = await createImageBitmap(new Blob([Uint8Array.from(atob(png), c => c.charCodeAt(0))], { type: 'image/png' }))
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height), ctx = canvas.getContext('2d')
      ctx.drawImage(bitmap, 0, 0)
      const pixels = ctx.getImageData(0, 0, bitmap.width, bitmap.height).data
      const luminance = rgb => rgb.map(n => { const v = n / 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4 }).reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0)
      return targets.map(target => {
        const fg = luminance(target.color.match(/[\d.]+/g).slice(0, 3).map(Number))
        let minimum = Infinity
        for (let row = 0; row < 8; row++) for (let col = 0; col < 8; col++) {
          const x = Math.min(bitmap.width - 1, Math.max(0, Math.floor((target.x + target.width * (col + .5) / 8) * bitmap.width / box.width)))
          const y = Math.min(bitmap.height - 1, Math.max(0, Math.floor((target.y + target.height * (row + .5) / 8) * bitmap.height / box.height)))
          const index = (y * bitmap.width + x) * 4
          const bg = luminance(Array.from(pixels.slice(index, index + 3)))
          minimum = Math.min(minimum, (Math.max(fg, bg) + .05) / (Math.min(fg, bg) + .05))
        }
        return { selector: target.selector, minimum }
      })
    }, { png: background.toString('base64'), targets, box })
    for (const sample of samples) assert.ok(sample.minimum >= 4.5, `${width}/${theme}/${sample.selector}: sampled contrast ${sample.minimum}`)
    report.contrast.push({ width, theme, samples })
  }
  assert.deepEqual(errors, [])
  await writeFile(`${output}/report.json`, `${JSON.stringify(report, null, 2)}\n`)
  console.log(`48 native page renders and sampled default-hero contrast passed. Evidence: ${output}/report.json`)
} finally { await browser.close() }
