import assert from 'node:assert/strict'
import { test } from 'node:test'
import { canonicalUrl, indexingEnabled, robotsText, sitemapXml, site, isNavigationCurrent } from '../shared/site.ts'

test('canonical URLs retain the intended origin and remove tracking and fragments', () => {
  assert.equal(canonicalUrl('/'), 'https://structcapital.net/')
  assert.equal(canonicalUrl('/design-system/?campaign=private#controls'), 'https://structcapital.net/design-system')
  for (const path of ['//example.com/test', '/\\example.com/test', 'https://example.com', '///example.com']) {
    assert.equal(new URL(canonicalUrl(path)).origin, site.url)
  }
})

test('indexing requires explicit opt-in, including string environment values', () => {
  for (const value of [false, 'false', undefined, '', '1', 1, null]) assert.equal(indexingEnabled(value), false)
  assert.equal(indexingEnabled('true'), true)
  assert.equal(indexingEnabled(true), true)
})

test('preview crawlers receive no sitemap entries or permission to crawl', () => {
  assert.match(robotsText(false), /Disallow: \/\n/)
  assert.doesNotMatch(robotsText(false), /Sitemap:/)
  assert.doesNotMatch(sitemapXml(false), /<url>/)
})

test('launch sitemap contains implemented public pages only', () => {
  assert.match(robotsText(true), /Disallow: \/api\//)
  assert.doesNotMatch(robotsText(true), /Disallow: \/(?:privacy|terms|learn)/)
  assert.match(robotsText(true), /Sitemap: https:\/\/structcapital.net\/sitemap.xml/)
  assert.match(sitemapXml(true), /<loc>https:\/\/structcapital.net\/<\/loc>/)
  assert.match(sitemapXml(true), /<loc>https:\/\/structcapital.net\/features<\/loc>/)
  assert.match(sitemapXml(true), /<loc>https:\/\/structcapital.net\/contact<\/loc>/)
  assert.doesNotMatch(sitemapXml(true), /design-system|privacy|terms|lastmod/)
})


test('navigation handles direct static URLs, tracking, and section links', () => {
  assert.equal(isNavigationCurrent('/faq/?utm=test', '/faq'), true)
  assert.equal(isNavigationCurrent('/features#details', '/features'), true)
  assert.equal(isNavigationCurrent('/#product', '/#questions'), false)
  assert.equal(isNavigationCurrent('/#questions', '/#questions'), true)
})
