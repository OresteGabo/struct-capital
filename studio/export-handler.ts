import { chromium } from 'playwright'
import { defineEventHandler, getRequestWebStream, getRequestURL, getHeader, createError, setHeader } from 'h3'
import { parseSocialFormat, parseSocialPost, socialSizes } from '../shared/social'
import { ContactProblem, readLimitedJson } from '../server/services/contact'

let busy = false
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  if (!['localhost', '127.0.0.1'].includes(url.hostname) || url.protocol !== 'http:' || getHeader(event, 'origin') !== url.origin) {
    throw createError({ statusCode: 403, statusMessage: 'Local same-origin requests only.' })
  }
  if (busy) throw createError({ statusCode: 429, statusMessage: 'An export is already running.' })
  if (Number(getHeader(event, 'content-length') ?? 0) > 4096 || !getHeader(event, 'content-type')?.startsWith('application/json')) {
    throw createError({ statusCode: 400, statusMessage: 'A small JSON post is required.' })
  }
  let post, format
  try {
    const body = await readLimitedJson(getRequestWebStream(event), 4096) as Record<string, unknown>
    post = parseSocialPost(body?.post)
    format = parseSocialFormat(body?.format)
  } catch (error) { throw createError({ statusCode: error instanceof ContactProblem ? error.statusCode : 400, statusMessage: error instanceof Error ? error.message : 'Invalid post.' }) }
  if (busy) throw createError({ statusCode: 429, statusMessage: 'An export is already running.' })
  busy = true
  let browser
  try {
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({ viewport: socialSizes[format], deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'reduce' })
    // Only local app assets are permitted while capturing.
    await page.route('**/*', route => new URL(route.request().url()).origin === url.origin ? route.continue() : route.abort())
    const render = new URL('/social-studio-render', url.origin)
    render.searchParams.set('post', JSON.stringify(post))
    render.searchParams.set('format', format)
    await page.goto(render.href, { waitUntil: 'networkidle', timeout: 30000 })
    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all(Array.from(document.images, image => image.decode()))
    })
    const canvas = page.locator('[data-social-canvas]')
    if (await canvas.locator('[role="status"], [data-social-asset-error]').count()) throw new Error('Image asset unavailable.')
    const fits = await canvas.evaluate(element => element.scrollHeight <= element.clientHeight && element.scrollWidth <= element.clientWidth)
    if (!fits) throw new Error('Text exceeds the canvas. Shorten the copy.')
    if (post.template === 'kigali') {
      const copy = await canvas.locator('[data-social-text]').boundingBox()
      const photograph = await canvas.locator('figure').boundingBox()
      if (!copy || !photograph || copy.y + copy.height > photograph.y - 24) throw new Error('Copy overlaps the photograph. Shorten the headline or subtitle.')
    }
    if (post.template === 'education') {
      const copy = await canvas.locator('[data-education-copy]').boundingBox()
      const header = await canvas.locator('[data-education-header]').boundingBox()
      const footer = await canvas.locator('[data-education-footer]').boundingBox()
      if (!copy || !header || !footer || copy.y < header.y + header.height + 24 || copy.y + copy.height > footer.y - 24) {
        throw new Error('Education copy overlaps the header or source notes. Shorten the text.')
      }
    }
    if (post.template === 'treasury-bond') {
      const intro = await canvas.locator('[data-bond-intro]').boundingBox()
      const heading = await canvas.locator('[data-bond-timeline] h3').boundingBox()
      const lastEvent = await canvas.locator('[data-bond-event]').last().boundingBox()
      const footer = await canvas.locator('[data-bond-footer]').boundingBox()
      if (!intro || !heading || !lastEvent || !footer || heading.y < intro.y + intro.height + 16 || lastEvent.y + lastEvent.height > footer.y - 16) {
        throw new Error('Bond timeline overlaps the introduction or footnotes. Shorten text or remove a coupon row.')
      }
    }
    if (await canvas.locator('[data-social-missing-photo]').count()) setHeader(event, 'X-Social-Proof', 'missing-photo')
    const png = await canvas.screenshot({ type: 'png', animations: 'disabled' })
    setHeader(event, 'Content-Type', 'image/png')
    setHeader(event, 'Content-Disposition', `attachment; filename="${post.id}-${format}.png"`)
    setHeader(event, 'Cache-Control', 'no-store')
    return png
  } catch (error) {
    console.error('Local social export:', error instanceof Error ? error.message : error)
    throw createError({ statusCode: 500, statusMessage: 'Export failed. Check the terminal, install Chromium with npx playwright install chromium, and check copy length and placement.' })
  } finally {
    try { await browser?.close() } finally { busy = false }
  }
})
