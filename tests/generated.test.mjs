import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { test } from 'node:test'
import { publicRoutes, learningDraftRoutes } from '../shared/site.ts'
import { articles } from '../shared/learning.ts'

// Nitro's Vercel preset emits a different public directory from the Node/static presets.
const publicRoot = pathToFileURL(`${resolve(process.env.STRUCT_PUBLIC_OUTPUT ?? '.output/public')}/`)
const read = path => readFileSync(new URL(path, publicRoot), 'utf8')
const indexable = process.env.NUXT_PUBLIC_SITE_INDEXABLE === 'true'
const home = read('index.html')
const reviewEnabled = process.env.NUXT_DESIGN_REVIEW_ENABLED === 'true'
const review = reviewEnabled ? read('design-system/index.html') : ''

const routePaths = [...publicRoutes, ...learningDraftRoutes, '/privacy', '/terms', ...(reviewEnabled ? ['/design-system'] : [])]
const pages = new Map(routePaths.map(path => [path, read(path === '/' ? 'index.html' : `${path.slice(1)}/index.html`)]))

test('all routes have unique titles/descriptions, canonical and social metadata, and semantic structure', () => {
  const titles = new Set()
  const descriptions = new Set()
  const socialTitles = new Set()
  const socialDescriptions = new Set()
  for (const [path, html] of pages) {
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1)
    assert.ok(html.includes(`href="https://structcapital.net${path}"`))
    const policy = publicRoutes.includes(path) && indexable ? 'index, follow' : 'noindex, nofollow'
    assert.ok(html.includes(`name="robots" content="${policy}"`), path)
    const title = html.match(/<title>([^<]+)<\/title>/)[1]
    const description = html.match(/<meta name="description" content="([^"]+)"/)[1]
    assert.equal(titles.has(title), false, `title must be unique: ${path}`)
    assert.equal(descriptions.has(description), false, `description must be unique: ${path}`)
    titles.add(title); descriptions.add(description)
    const socialTitle = html.match(/property="og:title" content="([^"]+)"/)[1]
    const socialDescription = html.match(/property="og:description" content="([^"]+)"/)[1]
    assert.equal(socialTitles.has(socialTitle), false, `social title must be unique: ${path}`)
    assert.equal(socialDescriptions.has(socialDescription), false, `social description must be unique: ${path}`)
    socialTitles.add(socialTitle); socialDescriptions.add(socialDescription)
    assert.match(html, /property="og:image" content="https:\/\/structcapital.net\/brand\/social-preview.png"/)
    assert.match(html, /name="twitter:card" content="summary_large_image"/)
    assert.equal((html.match(/<main\b/g) ?? []).length, 1, path)
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, path)
    assert.doesNotMatch(html, /screenshots\/|orestegabo@|RWF 4,|api\.structcapital|contactEndpoint|contactToken|synthetic-test-secret/)
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
    assert.equal(new Set(ids).size, ids.length, `unique ids: ${path}`)
    for (const [, target] of html.matchAll(/\sfor="([^"]+)"/g)) assert.ok(ids.includes(target), `${path}: label target ${target}`)
    for (const [, references] of html.matchAll(/\saria-(?:labelledby|describedby|controls)="([^"]+)"/g)) {
      for (const target of references.split(/\s+/)) assert.ok(ids.includes(target), `${path}: ARIA target ${target}`)
    }
    for (const [, tag] of html.matchAll(/(<img\b[^>]*>)/g)) {
      assert.match(tag, /\balt="[^"]*"/, path)
      if (/\balt=""/.test(tag)) assert.match(tag, /aria-hidden="true"/, path)
      assert.match(tag, /\bwidth="[1-9][0-9]*"/, path)
      assert.match(tag, /\bheight="[1-9][0-9]*"/, path)
      const src = tag.match(/\bsrc="([^"]+)"/)[1]
      assert.ok(src.startsWith('/') && existsSync(new URL(src.slice(1), publicRoot)), `${path}: image ${src}`)
    }
  }
})

test('deployment artifact excludes source maps, private source assets and server credentials', () => {
  const root = publicRoot
  const files = readdirSync(root, { recursive: true })
  assert.equal(files.some(path => path.includes('social-studio') || path.startsWith('exports/')), false)
  for (const path of files.filter(file => /\.(?:html|js|json)$/.test(file))) {
    assert.doesNotMatch(readFileSync(new URL(path, root), 'utf8'), /api\/social-export|Download PNG|Keep investment dates in view|DRAFT PROOF|KIGALI PHOTOGRAPH MISSING|Clearly understood|education-concept|education-myth-fact|education-terminology|treasury-bond-explainer/)
  }
  assert.equal(files.some(path => path.endsWith('.map')), false)
  for (const path of files.filter(file => /\.(?:html|js|json)$/.test(file))) {
    assert.doesNotMatch(readFileSync(new URL(path, root), 'utf8'), /synthetic-test-secret|contact\.example\.test|bonds\.orestegabo\.dev|contactEndpoint|contactToken|GABO_DATABASE_PASSWORD|password_hash|orestegabo@/, path)
  }
  for (const path of ['screenshots', 'docs', 'server', '.env']) assert.equal(existsSync(new URL(path, root)), false)
  assert.match(read('_headers'), /X-Content-Type-Options: nosniff/)
  assert.match(read('_headers'), /max-age=31536000, immutable/)
})

test('mobile navigation and FAQ content are rendered for no-JavaScript access', () => {
  assert.match(home, /<details[^>]*sc-mobile-nav/)
  assert.match(home, /aria-label="Mobile primary"/)
  assert.match(home, /<summary[^>]*>Is Struct Capital a broker\?/)
  assert.match(home, /not execute trades or hold investment funds/)
})

test('preview metadata files and social asset are present in static output', () => {
  if (indexable) {
    assert.match(read('robots.txt'), /Disallow: \/api\//)
    assert.doesNotMatch(read('robots.txt'), /Disallow: \/(?:privacy|terms|learn)/)
    assert.match(read('sitemap.xml'), /<loc>https:\/\/structcapital.net\/<\/loc>/)
    assert.doesNotMatch(read('sitemap.xml'), /design-system/)
  } else {
    assert.match(read('robots.txt'), /Disallow: \/\n/)
    assert.doesNotMatch(read('sitemap.xml'), /<url>/)
  }
  assert.ok(existsSync(new URL('brand/social-preview.png', publicRoot)))
})

test('component review is excluded unless explicitly enabled for a local review build', () => {
  if (!reviewEnabled) {
    assert.equal(existsSync(new URL('design-system/index.html', publicRoot)), false)
    return
  }
  assert.match(review, /Statistic unavailable/)
  assert.match(review, /Product screenshot pending approval/)
  assert.match(review, /aria-invalid="true"/)
  const ids = [...review.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
  assert.equal(new Set(ids).size, ids.length, 'SSR ids must be unique')
  for (const [, target] of review.matchAll(/\sfor="([^"]+)"/g)) assert.ok(ids.includes(target), `label target ${target} must exist`)
})


test('homepage product imagery is present, dimensioned, and backed by public files', () => {
  const images = [...home.matchAll(/<img\b[^>]+>/g)].map(match => match[0])
  const productImages = images.filter(tag => /src="\/product\//.test(tag))
  assert.ok(productImages.length >= 4)
  assert.equal(productImages.filter(tag => /fetchpriority="high"/.test(tag)).length, 1)
  for (const tag of productImages) {
    assert.match(tag, /width="[1-9][0-9]*"/)
    assert.match(tag, /height="[1-9][0-9]*"/)
    assert.match(tag, /alt="[^"]+"/)
    const src = tag.match(/src="([^"]+)"/)[1]
    assert.ok(existsSync(new URL(src.slice(1), publicRoot)), src)
    assert.doesNotMatch(src, /dashboard|documents-and-reports|pdf-import/)
  }
  assert.match(home, /loading="lazy"/)
  assert.match(home, /srcset="\/product\/calendar-560.png 560w, \/product\/calendar-840.png 840w"/)
})

test('homepage actions resolve to real sections and no download or data-collection claims are introduced', () => {
  const ids = [...home.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
  assert.equal(ids.length, new Set(ids).size)
  for (const [, href] of home.matchAll(/href="(?:\/)?#([^"]+)"/g)) assert.ok(ids.includes(href), href)
  for (const id of ['overview', 'features', 'how-it-works', 'product', 'questions', 'explore']) assert.ok(ids.includes(id))
  assert.match(home, /All your investments/)
  assert.match(home, /One clear picture/)
  assert.match(home, /not a stockbroker/)
  assert.match(home, /Official download links are not published/)
  assert.doesNotMatch(home, /apps\.apple\.com|play\.google\.com|<form\b|<input\b|testimonial/)
})


test('every internal page link and anchor resolves in the generated output', () => {
  for (const [path, html] of pages) {
    for (const [, href] of html.matchAll(/<a\b[^>]*?href="([^"]+)"/g)) {
      const url = new URL(href, `https://structcapital.net${path}`)
      if (url.origin !== 'https://structcapital.net') continue
      const targetPath = url.pathname.replace(/\/+$/, '') || '/'
      const destination = pages.get(targetPath)
      if (!destination) assert.ok(existsSync(new URL(url.pathname.slice(1), publicRoot)), `${path} -> ${href}`)
      if (url.hash && destination) assert.ok(destination.includes(`id="${url.hash.slice(1)}"`), `${path} -> ${href}`)
    }
  }
})

test('legal drafts are explicit and contact is honestly unavailable by default', () => {
  for (const path of ['/privacy', '/terms']) {
    assert.match(pages.get(path), /Draft/)
    assert.match(pages.get(path), /Not approved/)
  }
  if (process.env.NUXT_PUBLIC_CONTACT_ENABLED !== 'true') {
    assert.match(pages.get('/contact'), /Contact delivery is not available yet/)
    assert.match(pages.get('/contact'), /<fieldset disabled/)
    assert.doesNotMatch(pages.get('/contact'), /Message accepted/)
  }
  assert.match(pages.get('/faq'), /Search questions/)
  assert.match(pages.get('/faq'), /FAQ category/)
  assert.match(pages.get('/faq'), /Is the app free/)
})


test('learning guides render sections, dated sources, and accurate Article metadata; outlines stay noindex', () => {
  for (const [path, html] of pages) {
    if (!path.startsWith('/learn/') || path.startsWith('/learn/category/')) continue
    const article = articles.find(item => path === `/learn/${item.slug}`)
    assert.match(html, /aria-label="Article contents"/)
    assert.match(html, /min read/)
    assert.ok(html.includes(`datetime="${article.updatedAt}"`))
    if (learningDraftRoutes.includes(path)) {
      assert.match(html, /Draft — factual review pending/)
      assert.match(html, /noindex, nofollow/)
      assert.doesNotMatch(html, /application\/ld\+json/)
      assert.ok(!read('sitemap.xml').includes(`https://structcapital.net${path}<`))
    } else {
      assert.match(html, /Sources &amp; scope/)
      const json = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1]
      const schema = JSON.parse(json)
      assert.equal(schema['@type'], 'Article')
      assert.equal(schema.mainEntityOfPage, `https://structcapital.net${path}`)
      assert.equal(schema.dateModified, article.updatedAt)
      assert.equal(schema.author.name, 'Struct Capital')
      assert.ok(schema.citation.length > 0)
      assert.ok(schema.wordCount > 100)
      assert.match(html, /property="og:type" content="article"/)
    }
  }
  assert.match(pages.get('/learn'), /Search learning resources/)
  assert.match(pages.get('/learn'), /Investment topic/)
  assert.match(pages.get('/learn/category/bonds'), /Bond maturity/)
})
