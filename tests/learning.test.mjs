import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { test } from 'node:test'
import { compileArticle } from '../scripts/lib/learning.mjs'
import { articles, filterArticles, relatedArticles, articleStructuredData, serializeStructuredData } from '../shared/learning.ts'
import { publicRoutes, sitemapXml } from '../shared/site.ts'

const taxonomy = JSON.parse(readFileSync(new URL('../content/learning.json', import.meta.url), 'utf8'))
const filename = 'rwanda-treasury-bonds.md'
const sample = readFileSync(new URL(`../content/learn/${filename}`, import.meta.url), 'utf8')
const today = '2026-10-30'
const compile = raw => compileArticle(raw, filename, taxonomy, today)

test('all repository articles compile with dated sources, known topics, section anchors and reading time', () => {
  const covered = new Set()
  for (const file of readdirSync(new URL('../content/learn/', import.meta.url))) {
    const { article, body } = compileArticle(readFileSync(new URL(`../content/learn/${file}`, import.meta.url), 'utf8'), file, taxonomy, today)
    article.topics.forEach(topic => covered.add(topic))
    assert.ok(article.readingMinutes >= 1)
    assert.ok(body.toc.length >= 2)
    assert.equal(body.toc.length, new Set(body.toc.map(heading => heading.id)).size)
    for (const heading of body.toc) assert.ok(body.html.includes(`id="${heading.id}"`))
  }
  assert.deepEqual([...covered].sort(), taxonomy.topics.toSorted())
})

test('source gate rejects missing evidence, invalid/future dates, unknown taxonomy and overdue reviews', () => {
  assert.throws(() => compile(sample.replace(/"sources": \[[\s\S]*?\n {2}\]/, '"sources": []')), /dated sources/)
  assert.throws(() => compile(sample.replace('"source-checked"', '"approved"')), /status/)
  assert.throws(() => compile(sample.replace('"bonds"', '"unknown"')), /category/)
  assert.throws(() => compile(sample.replace('"Rwanda Treasury bonds"', '"unknown"')), /topics/)
  assert.throws(() => compile(sample.replaceAll('2026-10-30', '2026-02-30')), /real/)
  assert.throws(() => compile(sample.replaceAll('2026-10-30', '2026-11-30')), /future/)
  assert.throws(() => compile(sample.replaceAll('"checkedAt": "2026-10-30"', '"checkedAt": "2026-10-29"')), /matching reviewedAt/)
  assert.throws(() => compileArticle(sample, filename, taxonomy, '2027-04-29'), /overdue/)
  assert.throws(() => compile(sample.replace('2027-04-28', '2028-04-28')), /180 days/)
  assert.throws(() => compile(sample.replace('https://www.cma.rw/faq', 'http://www.cma.rw/faq')), /HTTPS/)
})

test('Markdown escapes raw HTML, rejects images and unsafe protocol links, and keeps duplicate headings unique', () => {
  const result = compile(`${sample}\n<script>alert(1)</script>\n\n## What you own\n\nSafe text.`)
  assert.doesNotMatch(result.body.html, /<script>/)
  assert.match(result.body.html, /&lt;script&gt;/)
  assert.equal(result.body.toc.at(-1).id, 'read-what-you-own-2')
  assert.throws(() => compile(`${sample}\n![unapproved](/image.png)`), /images/)
  assert.throws(() => compile(`${sample}\n[external](http://example.com)`), /HTTPS/)
  assert.throws(() => compile(`${sample}\n# Another title`), /H2 or H3/)
  assert.doesNotMatch(compile(`${sample}\n[bad](javascript:alert%281%29)`).body.html, /href="javascript:/)
  assert.doesNotMatch(serializeStructuredData({ headline: '</script><script>alert(1)</script>' }), /</)
})

test('discovery separates outlines from indexable source-checked articles and related suggestions', () => {
  assert.equal(articles.filter(article => article.status === 'source-checked').length, 8)
  assert.equal(articles.filter(article => article.status === 'draft').length, 2)
  assert.ok(filterArticles('COUPON', 'bonds').length >= 2)
  assert.equal(filterArticles('not-a-match').length, 0)
  assert.equal(filterArticles('', '', 'Dividends').length, 1)
  for (const article of articles) {
    assert.equal(publicRoutes.includes(`/learn/${article.slug}`), article.status === 'source-checked')
    assert.equal(sitemapXml(true).includes(`/learn/${article.slug}<`), article.status === 'source-checked')
    assert.equal(articleStructuredData(article) !== null, article.status === 'source-checked')
    assert.ok(relatedArticles(article).every(item => item.slug !== article.slug && item.status === 'source-checked'))
  }
})
