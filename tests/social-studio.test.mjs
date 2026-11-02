import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { socialSizes } from '../shared/social.ts'

// Run against `npm run dev`; covers the actual export transport and browser editor.
const origin = process.env.SOCIAL_STUDIO_ORIGIN ?? 'http://127.0.0.1:3000'
const send = (body, requestOrigin = origin) => fetch(`${origin}/api/social-export`, {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: requestOrigin }, body: JSON.stringify(body), signal: AbortSignal.timeout(60000),
})
test('local export rejects foreign origins and malformed content', async () => {
  assert.equal((await send({}, 'https://example.com')).status, 403)
  assert.equal((await send({ post: {}, format: 'square' })).status, 400)
})
test('each repository draft exports accurate square and portrait PNGs', async () => {
  for (const name of ['clearer-picture', 'income-calendar', 'kigali-editorial']) {
    const post = JSON.parse(await readFile(`social-content/posts/${name}.json`, 'utf8'))
    for (const [format, size] of Object.entries(socialSizes)) {
      const response = await send({ post, format })
      if (!response.ok) assert.fail(await response.text())
      assert.equal(response.status, 200)
      assert.match(response.headers.get('content-type'), /image\/png/)
      if (name === 'kigali-editorial') assert.equal(response.headers.get('x-social-proof'), 'missing-photo')
      const png = Buffer.from(await response.arrayBuffer())
      assert.equal(png.subarray(1, 4).toString(), 'PNG')
      assert.equal(png.readUInt32BE(16), size.width)
      assert.equal(png.readUInt32BE(20), size.height)
    }
  }
})
test('Kigali template validates photographs and crop settings and rejects overlapping copy', async () => {
  const post = JSON.parse(await readFile('social-content/posts/kigali-editorial.json', 'utf8'))
  for (const changes of [{ photoId: 'https://example.com/city.jpg' }, { cropX: 101 }, { cropY: -1 }, { pattern: 'unknown' }, { theme: 'unknown' }]) {
    assert.equal((await send({ post: { ...post, ...changes }, format: 'square' })).status, 400)
  }
  const tooMuchCopy = { ...post, headline: 'Extremely '.repeat(10).trim(), body: 'Editorial subtitle '.repeat(12).trim() }
  const response = await send({ post: tooMuchCopy, format: 'square' })
  assert.equal(response.status, 500)
})
test('Kigali preview exposes missing asset, configurable theme/signature and safe text placement', async () => {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    await page.goto(`${origin}/social-studio`, { waitUntil: 'networkidle' })
    await page.getByLabel('Draft', { exact: true }).selectOption('kigali-editorial')
    await page.locator('[data-social-missing-photo]').waitFor()
    await page.getByLabel('Editorial theme').selectOption('olive')
    assert.equal(await page.locator('[data-social-canvas] h2').evaluate(element => getComputedStyle(element).color), 'rgb(109, 94, 15)')
    await page.getByLabel('Geometric signature').selectOption('none')
    assert.equal(await page.locator('.signature').count(), 0)
    await page.getByLabel('Geometric signature').selectOption('rhythm')
    assert.equal(await page.locator('.signature span').count(), 3)
    await page.getByLabel('Subtitle', { exact: true }).fill('Your investment records, clearly organized.')
    for (const format of ['square', 'portrait']) {
      await page.getByLabel('Format', { exact: true }).selectOption(format)
      const copy = await page.locator('[data-social-text]').boundingBox()
      const photo = await page.locator('.photograph').boundingBox()
      assert.ok(copy.y + copy.height < photo.y)
      assert.equal(await page.locator('.identity img').getAttribute('src'), '/brand/struct-capital-symbol.svg')
    }
    await page.setViewportSize({ width: 320, height: 900 })
    await page.waitForTimeout(200)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
  } finally { await browser.close() }
})
test('editor updates its preview, downloads a PNG, and fits a narrow viewport', async () => {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(`${origin}/social-studio`, { waitUntil: 'networkidle' })
    await page.getByLabel('Headline', { exact: true }).fill('A clearer perspective.')
    await page.locator('[data-social-canvas] h2').filter({ hasText: 'A clearer perspective.' }).waitFor()
    const downloaded = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download PNG' }).click()
    assert.equal((await downloaded).suggestedFilename(), 'clearer-picture-square.png')
    await page.setViewportSize({ width: 320, height: 900 })
    await page.waitForTimeout(200)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
    assert.deepEqual(errors, [])
  } finally { await browser.close() }
})
