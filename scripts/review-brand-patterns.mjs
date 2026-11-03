import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { parse, compileStyle } from '@vue/compiler-sfc'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { chromium } from 'playwright'
import { brandPatterns, brandPatternFamilies } from '../shared/brand-patterns.ts'

// Isolated SSR/browser specimens: no Nuxt route, public editor, or HTTP server is added.
const output = 'exports/brand-patterns'
await mkdir(output, { recursive: true })
const vite = await createServer({ configFile: false, resolve: { alias: { '~~': process.cwd() } }, plugins: [vue()], server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' })
let browser
const report = { timestamp: new Date().toISOString(), cases: [], checks: [] }
try {
  const { default: Pattern } = await vite.ssrLoadModule('/app/components/brand/ScBrandPattern.vue')
  const tokens = await readFile('app/assets/css/tokens.css', 'utf8')
  const source = await readFile('app/components/brand/ScBrandPattern.vue', 'utf8')
  const { descriptor } = parse(source)
  const styles = descriptor.styles.map(style => {
    const result = compileStyle({ source: style.content, id: Pattern.__scopeId, scoped: style.scoped })
    assert.deepEqual(result.errors, [])
    return result.code
  }).join('\n')
  const ssr = (nodes) => renderToString(createSSRApp({ render: () => h('main', nodes) }))
  const html = (body, theme = 'light') => `<!doctype html><html lang="en" data-theme="${theme}"><head><meta charset="utf-8"><style>${tokens}\n${styles}\n*{box-sizing:border-box}body{margin:0;background:var(--sc-background);color:var(--sc-text);font-family:var(--sc-font)}main{width:100%}</style></head><body>${body}</body></html>`
  assert.equal(brandPatterns.length, 24)
  assert.equal(new Set(brandPatterns.map(p => p.id)).size, 24)
  for (const family of Object.keys(brandPatternFamilies)) assert.equal(brandPatterns.filter(p => p.family === family).length, 4)
  browser = await chromium.launch()
  report.browser = browser.version()
  const page = await browser.newPage({ deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  const images = []
  for (const pattern of brandPatterns) {
    for (const layout of ['desktop', 'mobile']) {
      const [, , width, height] = pattern.viewBox[layout].split(' ').map(Number)
      for (const theme of pattern.themes) {
        await page.setViewportSize({ width, height })
        const content = html(await ssr([h(Pattern, { pattern: pattern.id, layout })]), theme)
        await page.setContent(content)
        await page.evaluate(() => document.fonts.ready)
        const evidence = await page.locator('[data-brand-pattern]').evaluate((root) => {
          const svg = Array.from(root.querySelectorAll('svg')).find(el => getComputedStyle(el).display !== 'none')
          const ids = Array.from(root.querySelectorAll('[id]'), el => el.id)
          for (const node of svg.querySelectorAll('path[d]')) new Path2D(node.getAttribute('d'))
          const bounds = svg.getBoundingClientRect()
          const references = Array.from(svg.querySelectorAll('path, g'), el => [el.getAttribute('fill'), el.getAttribute('stroke'), el.getAttribute('clip-path')]).flat().filter(value => value?.startsWith('url('))
          return { width: bounds.width, height: bounds.height, idsUnique: new Set(ids).size === ids.length, referencesResolved: references.every(value => root.querySelector(`[id="${value.slice(5, -1)}"]`)), paths: svg.querySelectorAll('g > path').length, svgBytes: new TextEncoder().encode(svg.outerHTML).length, pathCharacters: Array.from(svg.querySelectorAll('g > path'), path => path.getAttribute('d').length).reduce((a, b) => a + b, 0), primary: getComputedStyle(root).getPropertyValue('--sc-primary').trim(), pointerEvents: getComputedStyle(root).pointerEvents, hidden: root.getAttribute('aria-hidden'), overflow: document.documentElement.scrollWidth > innerWidth }
        })
        assert.equal(evidence.width, width)
        assert.equal(evidence.height, height)
        assert.ok(evidence.paths > 0)
        assert.ok(evidence.paths <= 12, 'Review SVG path budget exceeded')
        assert.ok(evidence.svgBytes <= 16384, 'Review SVG markup budget exceeded')
        assert.ok(evidence.idsUnique && evidence.referencesResolved)
        assert.equal(evidence.pointerEvents, 'none')
        assert.equal(evidence.hidden, 'true')
        assert.equal(evidence.overflow, false)
        assert.equal(evidence.primary, theme === 'light' ? '#6d5e0f' : '#f2e6a7')
        assert.doesNotMatch(content, /<(?:image|filter|text|script)\b|data:image|https?:\/\/(?!www.w3.org)/)
        const png = await page.screenshot()
        const painted = await page.evaluate(async (base64) => {
          const bitmap = await createImageBitmap(await (await fetch(`data:image/png;base64,${base64}`)).blob())
          const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
          const ctx = canvas.getContext('2d')
          ctx.drawImage(bitmap, 0, 0)
          const pixels = ctx.getImageData(0, 0, bitmap.width, bitmap.height).data
          const bg = getComputedStyle(document.body).backgroundColor.match(/\d+/g).map(Number)
          let count = 0
          for (let i = 0; i < pixels.length; i += 4) if (pixels[i] !== bg[0] || pixels[i + 1] !== bg[1] || pixels[i + 2] !== bg[2]) count++
          return count
        }, png.toString('base64'))
        assert.ok(painted > 50, `${pattern.id}/${layout}/${theme} rendered blank`)
        const name = `${pattern.id}-${layout}-${theme}`
        await writeFile(`${output}/${name}.png`, png)
        await writeFile(`${output}/${name}.html`, content)
        images.push({ family: pattern.family, name, width, height, base64: png.toString('base64') })
        report.cases.push({ id: pattern.id, layout, theme, ...evidence, paintedPixels: painted, sha256: createHash('sha256').update(png).digest('hex'), file: `${output}/${name}.png` })
      }
    }
  }
  for (const layout of ['desktop', 'mobile']) {
    for (const theme of ['light', 'dark']) {
      assert.equal(new Set(report.cases.filter(item => item.layout === layout && item.theme === theme).map(item => item.sha256)).size, 24, `Duplicate artwork in ${layout}/${theme}`)
    }
  }
  // Same variant repeated in one SSR tree: verify IDs do not collide across instances/views.
  await page.setContent(html(await ssr([h(Pattern, { pattern: 'structural-fold-01' }), h(Pattern, { pattern: 'structural-fold-01' })])))
  assert.equal(await page.evaluate(() => { const ids = Array.from(document.querySelectorAll('[id]'), el => el.id); return new Set(ids).size === ids.length }), true)
  for (const width of [320, 390, 768, 1023, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    const display = await page.locator('.sc-brand-pattern').first().evaluate(el => [getComputedStyle(el.querySelector('.sc-brand-pattern__desktop')).display, getComputedStyle(el.querySelector('.sc-brand-pattern__mobile')).display])
    assert.deepEqual(display, width <= 1023 ? ['none', 'block'] : ['block', 'none'])
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
  }
  await page.emulateMedia({ forcedColors: 'active' })
  assert.equal(await page.locator('.sc-brand-pattern').first().evaluate(el => getComputedStyle(el).visibility), 'hidden')
  await page.emulateMedia({ forcedColors: 'none', colorScheme: 'dark' })
  await page.evaluate(() => document.documentElement.removeAttribute('data-theme'))
  assert.equal(await page.locator('.sc-brand-pattern').first().evaluate(el => getComputedStyle(el).getPropertyValue('--sc-primary').trim()), '#f2e6a7')
  await page.emulateMedia({ colorScheme: 'light' })
  assert.equal(await page.locator('.sc-brand-pattern').first().evaluate(el => getComputedStyle(el).getPropertyValue('--sc-primary').trim()), '#6d5e0f')
  await page.setContent(html(await ssr([h(Pattern, { pattern: 'sc-cut-01', intensity: -5 }), h(Pattern, { pattern: 'sc-cut-01', intensity: 20 })])))
  assert.deepEqual(await page.locator('.sc-brand-pattern').evaluateAll(nodes => nodes.map(el => getComputedStyle(el).opacity)), ['0', '1'])
  // Browser can display the SVG with scripting disabled (no mount/theme JS required).
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1200, height: 600 } })
  const staticPage = await noJs.newPage()
  await staticPage.setContent(html(await ssr([h(Pattern, { pattern: 'capital-arc-02' })])))
  assert.ok(await staticPage.locator('svg').first().isVisible())
  await noJs.close()
  report.checks = ['24 IDs / 6 families', '96 nonblank SVG renders', 'unique instance IDs and resolved paint/clip references', 'SVG Path2D parsing', '7 automatic layout widths', 'forced colors', 'system light/dark preference', 'bounded intensity', 'no-JavaScript SSR']
  // Four columns per family: desktop light/dark, mobile light/dark; labels are review HTML only.
  for (const family of Object.keys(brandPatternFamilies)) {
    const cards = images.filter(item => item.family === family).map(item => `<figure><figcaption>${item.name}</figcaption><img src="data:image/png;base64,${item.base64}" width="${item.width}" height="${item.height}"></figure>`).join('')
    await page.setViewportSize({ width: 1600, height: 1220 })
    await page.setContent(`<!doctype html><style>body{margin:0;padding:20px;background:#e5e3dc;font:13px system-ui;color:#252317}h1{font-size:22px}section{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}figure{margin:0}figcaption{height:28px;font-size:11px}img{display:block;object-fit:contain;width:100%;height:232px;background:#faf8f2;border:1px solid #ccc}</style><h1>${brandPatternFamilies[family]} — four compositions, desktop/mobile × light/dark</h1><section>${cards}</section>`)
    await page.locator('img').evaluateAll(nodes => Promise.all(nodes.map(image => image.decode())))
    await page.screenshot({ path: `${output}/${family}-contact-sheet.png`, fullPage: true })
  }
  assert.deepEqual(errors, [])
  await writeFile(`${output}/report.json`, `${JSON.stringify(report, null, 2)}\n`)
  console.log(`Verified ${report.cases.length} rendered specimens. PNGs, HTML, six contact sheets and report: ${output}/`)
} finally {
  await browser?.close()
  await vite.close()
}
