import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFile, readdir } from 'node:fs/promises'
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
  const names = (await readdir('social-content/posts')).filter(file => file.endsWith('.json')).map(file => file.slice(0, -5))
  for (const name of names) {
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
test('education schema rejects invalid styles and missing or oversized editable notes', async () => {
  const post = JSON.parse(await readFile('social-content/posts/education-concept.json', 'utf8'))
  for (const changes of [{ style: 'unknown' }, { source: '' }, { disclaimer: null }, { brand: 'x'.repeat(41) }, { primaryLabel: 2 }]) {
    assert.equal((await send({ post: { ...post, education: { ...post.education, ...changes } }, format: 'square' })).status, 400)
  }
  const response = await send({ post: { ...post, headline: 'Extremely '.repeat(10).trim(), body: 'Editorial explanation '.repeat(10).trim() }, format: 'square' })
  assert.equal(response.status, 500)
})
test('bond schema enforces timeline structure, bounded text and event counts', async () => {
  const post = JSON.parse(await readFile('social-content/posts/treasury-bond-explainer.json', 'utf8'))
  for (const changes of [{ events: [] }, { events: Array(7).fill(post.bond.events[1]) }, { footnote: '' }, { exampleNote: 'x'.repeat(111) }, { events: [{ ...post.bond.events[0], kind: 'coupon' }, ...post.bond.events.slice(1)] }, { events: post.bond.events.map((event, index) => index === 1 ? { ...event, date: 100 } : event) }]) {
    assert.equal((await send({ post: { ...post, bond: { ...post.bond, ...changes } }, format: 'square' })).status, 400)
  }
  const response = await send({ post: { ...post, headline: 'Extremely '.repeat(10).trim(), body: 'Editorial explanation '.repeat(10).trim() }, format: 'square' })
  assert.equal(response.status, 500)
  for (const count of [3, 6]) {
    const events = [post.bond.events[0], ...Array(count - 2).fill(post.bond.events[1]), post.bond.events.at(-1)]
    for (const format of ['square', 'portrait']) {
      const rendered = await send({ post: { ...post, bond: { ...post.bond, events } }, format })
      assert.equal(rendered.status, 200, rendered.ok ? undefined : await rendered.text())
      await rendered.arrayBuffer()
    }
  }
})
test('bond studio edits timeline/notes, adds and removes coupons, and downloads both sizes', async () => {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    await page.goto(`${origin}/social-studio`, { waitUntil: 'networkidle' })
    await page.getByLabel('Draft', { exact: true }).selectOption('treasury-bond-explainer')
    const changes = { Eyebrow: 'Bonds / Learning', Headline: 'A bond payment sequence.', Body: 'Separate principal from scheduled income.', 'Bond brand text': 'Struct Capital Education', 'Illustrative assumptions label': 'Hypothetical units, not a real bond.', 'Timeline heading': 'Example sequence', 'Date column heading': 'Example date', 'Event column heading': 'Payment', 'Value column heading': 'Example amount', 'Bond footnote': 'Assumes payment as promised. Not a guaranteed return.', 'Bond source credit': 'Reference: bond learning guides', 'Bond footer text': 'Education draft', 'Event 1 date': 'Start', 'Event 1 label': 'Example investment', 'Event 1 value': '−200 units', 'Event 2 date': 'Month 3', 'Event 2 label': 'Example coupon', 'Event 2 value': '+2 units', 'Event 4 date': 'End', 'Event 4 label': 'Principal due', 'Event 4 value': '+200 units' }
    for (const [label, value] of Object.entries(changes)) {
      await page.getByLabel(label, { exact: true }).fill(value)
      await page.locator('[data-social-canvas]').getByText(value, { exact: true }).waitFor()
    }
    await page.getByRole('button', { name: 'Add coupon event', exact: true }).click()
    assert.equal(await page.locator('[data-bond-event]').count(), 5)
    await page.getByRole('button', { name: 'Remove coupon event 4', exact: true }).click()
    assert.equal(await page.locator('[data-bond-event]').count(), 4)
    for (const format of ['square', 'portrait']) {
      await page.getByLabel('Format', { exact: true }).selectOption(format)
      await page.locator('[data-social-canvas]').getByText('Illustrative example', { exact: true }).waitFor()
      const last = await page.locator('[data-bond-event]').last().boundingBox()
      const footer = await page.locator('[data-bond-footer]').boundingBox()
      assert.ok(last.y + last.height < footer.y)
      const downloaded = page.waitForEvent('download')
      await page.getByRole('button', { name: 'Download PNG' }).click()
      assert.equal((await downloaded).suggestedFilename(), `treasury-bond-explainer-${format}.png`)
    }
    await page.setViewportSize({ width: 320, height: 900 })
    await page.waitForTimeout(200)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
  } finally { await browser.close() }
})
test('education studio edits every rendered text field and preserves layout at both sizes', async () => {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    await page.goto(`${origin}/social-studio`, { waitUntil: 'networkidle' })
    await page.getByLabel('Draft', { exact: true }).selectOption('education-myth-fact')
    const changes = { Eyebrow: 'A learning series', Headline: 'An editable myth.', Body: 'An editable explanation.', 'Primary label': 'Question', 'Fact label': 'Answer', 'Source credit': 'Source: editorial review', 'Education note': 'General learning only.', 'Footer text': 'Review draft', 'Brand text': 'Struct Capital Education' }
    for (const [label, value] of Object.entries(changes)) {
      await page.getByLabel(label, { exact: true }).fill(value)
      await page.locator('[data-social-canvas]').getByText(value, { exact: true }).waitFor()
    }
    for (const style of ['concept', 'myth-fact', 'did-you-know', 'terminology']) {
      await page.getByLabel('Content style').selectOption(style)
      for (const format of ['square', 'portrait']) {
        await page.getByLabel('Format', { exact: true }).selectOption(format)
        const copy = await page.locator('[data-education-copy]').boundingBox()
        const footer = await page.locator('[data-education-footer]').boundingBox()
        assert.ok(copy.y + copy.height < footer.y)
        assert.equal(await page.locator('[data-social-canvas] img').count(), 1)
        assert.equal(await page.locator('[data-social-canvas] img').getAttribute('src'), '/brand/struct-capital-symbol.svg')
      }
    }
    const downloaded = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download PNG' }).click()
    assert.equal((await downloaded).suggestedFilename(), 'education-myth-fact-portrait.png')
    await page.setViewportSize({ width: 320, height: 900 })
    await page.waitForTimeout(200)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
  } finally { await browser.close() }
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
