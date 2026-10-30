import learning from './learning.generated.json' with { type: 'json' }
import { canonicalUrl, site } from './site.ts'

export const { categories, topics, articles } = learning
export type LearningArticle = typeof articles[number]
export interface ArticleBody { html: string, toc: { id: string, title: string, level: number }[] }

export function formatLearningDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))
}
export function filterArticles(query = '', category = '', topic = '') {
  const terms = query.trim().toLocaleLowerCase('en').slice(0, 200).split(/\s+/).filter(Boolean)
  return articles.filter(article => (!category || article.category === category) && (!topic || article.topics.includes(topic)) && terms.every(term => `${article.title} ${article.description} ${article.topics.join(' ')}`.toLocaleLowerCase('en').includes(term)))
}
export function relatedArticles(article: LearningArticle) {
  return articles.filter(candidate => candidate.slug !== article.slug && candidate.status === 'source-checked')
    .map(candidate => ({ candidate, score: (candidate.category === article.category ? 2 : 0) + candidate.topics.filter(topic => article.topics.includes(topic)).length }))
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title))
    .slice(0, 3).map(item => item.candidate)
}
export function articleStructuredData(article: LearningArticle) {
  if (article.status !== 'source-checked') return null
  return {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, description: article.description,
    mainEntityOfPage: canonicalUrl(`/learn/${article.slug}`),
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    dateModified: article.updatedAt, inLanguage: 'en-RW', wordCount: article.wordCount,
    articleSection: categories.find(category => category.slug === article.category)?.title,
    keywords: article.topics, citation: article.sources.map(source => source.url),
  }
}
export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
