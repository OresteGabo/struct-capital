import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { socialCatalog } from '../shared/social-catalog.ts'
import { socialSizes } from '../shared/social.ts'

const origin = process.env.SOCIAL_STUDIO_ORIGIN ?? 'http://127.0.0.1:3000'
const url = new URL(origin)
if (!['127.0.0.1', 'localhost'].includes(url.hostname) || url.protocol !== 'http:') throw new Error('Audit a loopback development server only.')
const requestedDraft = process.argv[2]
if (requestedDraft && !socialCatalog.some(template => template.drafts.some(post => post.id === requestedDraft))) throw new Error('Unknown audit draft.')
const output = 'exports/social/audit'
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const report = { timestamp: new Date().toISOString(), browser: browser.version(), origin, cases: [] }
try {
  const page = await browser.newPage({ deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(`${url.origin}/social-studio`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: `
    .audit-fullsize .studio { width:1080px!important; max-width:none!important; margin:0!important; padding:0!important; }
    .audit-fullsize .studio > header, .audit-fullsize .gallery, .audit-fullsize form { display:none!important; }
    .audit-fullsize .workspace { display:block!important; margin:0!important; }
    .audit-fullsize .preview { width:1080px!important; overflow:visible!important; }
    .audit-fullsize .preview > div { width:1080px!important; height:auto!important; }
    .audit-fullsize [data-social-canvas] { transform:none!important; }
  ` })
  const ready = async () => {
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(150)
    await page.locator('[data-social-canvas]').evaluate(async (element) => {
      await document.fonts.ready
      await Promise.all(Array.from(element.querySelectorAll('img'), image => image.decode()))
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    })
  }
  const measure = () => page.locator('[data-social-canvas]').evaluate((element) => {
    const bounds = element.getBoundingClientRect()
    const scale = bounds.width / 1080
    return Array.from(element.querySelectorAll('h2, footer, img'), (child) => {
      const rect = child.getBoundingClientRect()
      return [rect.x - bounds.x, rect.y - bounds.y, rect.width, rect.height].map(value => value / scale)
    })
  })
  for (const template of socialCatalog) {
    for (const post of template.drafts) {
      if (requestedDraft && post.id !== requestedDraft) continue
      for (const [format, size] of Object.entries(socialSizes)) {
        await page.evaluate(() => document.documentElement.classList.remove('audit-fullsize'))
        await page.setViewportSize({ width: 320, height: 900 })
        await page.getByLabel('Template', { exact: true }).selectOption(template.id)
        await page.getByLabel('Draft', { exact: true }).selectOption(post.id)
        await page.getByLabel('Format', { exact: true }).selectOption(format)
        await ready()
        await page.waitForFunction(({ height, headline }) => {
          const canvas = document.querySelector('[data-social-canvas]')
          return canvas?.style.height === `${height}px` && canvas.querySelector('h2')?.textContent === headline
        }, { height: size.height, headline: post.headline })
        const mobile = await measure()
        const fullSizeHref = await page.getByRole('link', { name: /Open full-size preview/ }).getAttribute('href')
        assert.equal(new URL(fullSizeHref, origin).pathname, '/social-studio-render')
        await page.setViewportSize(size)
        await page.evaluate(() => document.documentElement.classList.add('audit-fullsize'))
        await ready()
        const full = await measure()
        assert.equal(mobile.length, full.length)
        if (mobile.some((rect, index) => rect.some((value, coordinate) => Math.abs(value - full[index][coordinate]) >= .1))) {
          const state = await page.locator('[data-social-canvas]').evaluate(element => ({ style: element.getAttribute('style'), heading: element.querySelector('h2').textContent, font: getComputedStyle(element.querySelector('h2')).fontSize }))
          await writeFile(`${output}/layout-mismatch.json`, JSON.stringify({ draft: post.id, format, mobile, full, state }, null, 2))
        }
        for (let index = 0; index < full.length; index++) {
          for (let coordinate = 0; coordinate < 4; coordinate++) assert.ok(Math.abs(mobile[index][coordinate] - full[index][coordinate]) < .1, `${post.id}/${format}: responsive preview changed artwork geometry at ${index}/${coordinate}: ${mobile[index][coordinate]} versus ${full[index][coordinate]}`)
        }
        const preview = await page.locator('[data-social-canvas]').screenshot({ type: 'png', animations: 'disabled' })
        const response = await fetch(`${url.origin}/api/social-export`, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Origin: url.origin }, body: JSON.stringify({ post, format }), signal: AbortSignal.timeout(60000),
        })
        if (!response.ok) throw new Error(`${post.id}/${format}: ${await response.text()}`)
        assert.match(response.headers.get('content-type'), /image\/png/)
        const png = Buffer.from(await response.arrayBuffer())
        assert.equal(png.readUInt32BE(16), size.width)
        assert.equal(png.readUInt32BE(20), size.height)
        const parity = await page.evaluate(async ([first, second]) => {
          const decode = async (value) => {
            const bytes = Uint8Array.from(atob(value), letter => letter.charCodeAt(0))
            const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/png' }))
            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
            const context = canvas.getContext('2d')
            context.drawImage(bitmap, 0, 0)
            return context.getImageData(0, 0, bitmap.width, bitmap.height).data
          }
          const [a, b] = await Promise.all([decode(first), decode(second)])
          let differentChannels = 0
          for (let index = 0; index < Math.max(a.length, b.length); index++) if (a[index] !== b[index]) differentChannels++
          return { equal: differentChannels === 0, differentChannels }
        }, [preview.toString('base64'), png.toString('base64')])
        const file = `${output}/${post.id}-${format}.png`
        await writeFile(file, png)
        if (!parity.equal) await writeFile(`${output}/${post.id}-${format}-preview.png`, preview)
        const evidence = await page.locator('[data-social-canvas]').evaluate(element => ({
          font: getComputedStyle(element).fontFamily,
          fontStatus: document.fonts.status,
          images: Array.from(element.querySelectorAll('img'), image => ({ src: image.getAttribute('src'), width: image.naturalWidth, height: image.naturalHeight })),
        }))
        report.cases.push({ template: template.label, draft: post.id, format, ...size, proof: response.headers.get('x-social-proof'), ...parity, file, ...evidence })
        await writeFile(`${output}/report.json`, `${JSON.stringify(report, null, 2)}\n`)
        assert.ok(parity.equal, `${post.id}/${format}: preview/export pixels differ (${parity.differentChannels} channels); see saved preview`)
        console.log(`${post.id}/${format}: ${size.width}×${size.height}, exact preview parity${response.headers.get('x-social-proof') ? ', missing-photo proof' : ''}`)
      }
    }
  }
  assert.deepEqual(errors, [])
} finally { await browser.close() }
console.log(`${report.cases.length} exports audited. Evidence: ${output}/report.json`)
