import MarkdownIt from 'markdown-it'
import { parse } from 'yaml'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export function compileArticle(raw, filename, taxonomy, today = new Date().toISOString().slice(0, 10)) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/)
  if (!match) throw new Error(`${filename}: YAML frontmatter and body required`)
  const data = parse(match[1], { maxAliasCount: 0 })
  const requireValue = (condition, message) => { if (!condition) throw new Error(`${filename}: ${message}`) }
  for (const key of ['slug', 'title', 'description', 'category', 'status', 'updatedAt']) {
    requireValue(typeof data?.[key] === 'string' && data[key].trim().length > 0, `${key} required`)
  }
  requireValue(slugPattern.test(data.slug) && data.slug !== 'category' && filename === `${data.slug}.md`, 'slug must match filename and avoid reserved category path')
  requireValue(taxonomy.categories.some(category => category.slug === data.category), 'unknown category')
  requireValue(['source-checked', 'draft'].includes(data.status), 'unknown editorial status')
  requireValue(Array.isArray(data.topics) && data.topics.length > 0 && data.topics.every(topic => taxonomy.topics.includes(topic)), 'unknown or missing topics')
  const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value
  requireValue(validDate(data.updatedAt) && data.updatedAt <= today, 'updatedAt must be a real, non-future date')
  const sources = data.sources ?? []
  requireValue(Array.isArray(sources), 'sources must be a list')
  const https = value => { try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password } catch { return false } }
  for (const source of sources) {
    requireValue(typeof source.title === 'string' && source.title.trim() && https(source.url) && typeof source.scope === 'string' && source.scope.trim(), 'source requires title, HTTPS URL and scope')
    requireValue(validDate(source.checkedAt) && source.checkedAt <= data.updatedAt, 'source check date must be real and no later than update date')
  }
  if (data.status === 'source-checked') {
    requireValue(sources.length > 0 && sources.every(source => source.checkedAt === data.reviewedAt), 'source-checked articles require dated sources matching reviewedAt')
    requireValue(validDate(data.reviewedAt) && data.reviewedAt <= data.updatedAt, 'source check date required')
    requireValue(validDate(data.reviewDue) && data.reviewDue > data.reviewedAt, 'reviewDue must follow source check')
    requireValue(Date.parse(data.reviewDue) - Date.parse(data.reviewedAt) <= 180 * 86400000, 'review interval cannot exceed 180 days')
    requireValue(data.reviewDue >= today, 'source review overdue: recheck sources or change status to draft')
  }
  const md = new MarkdownIt({ html: false, linkify: false, typographer: false })
  const tokens = md.parse(match[2], {})
  const toc = []
  const ids = new Set()
  let words = ''
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index]
    if (token.type === 'heading_open') {
      requireValue(['h2', 'h3'].includes(token.tag), 'body headings must be H2 or H3')
      const title = tokens[index + 1].children.filter(child => ['text', 'code_inline'].includes(child.type)).map(child => child.content).join('')
      const stem = title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
      let id = `read-${stem}`
      let suffix = 2
      while (ids.has(id)) id = `read-${stem}-${suffix++}`
      ids.add(id); token.attrSet('id', id)
      toc.push({ id, title, level: Number(token.tag.slice(1)) })
    }
    if (token.type === 'inline') {
      words += ` ${token.content}`
      for (const child of token.children ?? []) {
        requireValue(child.type !== 'image', 'article images require a separate approved asset component')
        if (child.type === 'link_open') {
          const href = child.attrGet('href')
          requireValue(https(href) || /^\/(?!\/)[a-z0-9/#-]*$/.test(href) || /^#[a-z0-9-]+$/.test(href), 'links must be HTTPS, local paths, or heading anchors')
          if (https(href)) child.attrSet('rel', 'external')
        }
      }
    }
  }
  requireValue(toc.length > 0, 'at least one section required')
  const wordCount = words.trim().split(/\s+/).filter(Boolean).length
  const article = {
    slug: data.slug, title: data.title, description: data.description, category: data.category,
    topics: data.topics, status: data.status, updatedAt: data.updatedAt,
    reviewedAt: data.status === 'source-checked' ? data.reviewedAt : null,
    reviewDue: data.status === 'source-checked' ? data.reviewDue : null,
    sources, wordCount, readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
  }
  return { article, body: { html: md.renderer.render(tokens, md.options, {}), toc } }
}
