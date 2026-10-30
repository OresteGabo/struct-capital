import learning from './learning.generated.json' with { type: 'json' }

export const site = {
  name: 'Struct Capital',
  url: 'https://structcapital.net',
  title: 'All your investments. One clear picture.',
  description: 'Track Treasury bonds, shares, income, and investment documents across brokers. Struct Capital is independent portfolio management software for investors in Rwanda—not a stockbroker.',
  socialImage: '/brand/social-preview.png',
} as const

// Add only implemented, reviewed public routes. Review pages never enter the sitemap.
export const learningDraftRoutes = learning.articles.filter(article => article.status === 'draft').map(article => `/learn/${article.slug}`)
export const publicRoutes = ['/', '/features', '/how-it-works', '/about', '/faq', '/contact', '/institutions', '/learn',
  ...learning.categories.map(category => `/learn/category/${category.slug}`),
  ...learning.articles.filter(article => article.status === 'source-checked').map(article => `/learn/${article.slug}`),
]
export const navigation = [
  { label: 'Features', to: '/features' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Learn', to: '/learn' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
] as const
export const footerNavigation = [...navigation, { label: 'For institutions', to: '/institutions' }] as const
export const legalNavigation = [
  { label: 'Privacy draft', to: '/privacy' },
  { label: 'Terms draft', to: '/terms' },
] as const

export function canonicalUrl(path: string): string {
  const clean = path.split(/[?#]/, 1)[0] || '/'
  // Resolve only local paths, never an origin supplied through a URL or query.
  const local = `/${clean.replace(/^\/+|\/+$/g, '')}`
  const url = new URL(site.url)
  url.pathname = local
  return url.href
}

export function indexingEnabled(value: unknown): boolean {
  return value === true || value === 'true'
}

export function robotsText(indexable: boolean): string {
  return indexable
    ? `User-agent: *\nAllow: /\nDisallow: /design-system\nDisallow: /privacy\nDisallow: /terms\nDisallow: /api/\nSitemap: ${site.url}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n'
}

export function sitemapXml(indexable: boolean): string {
  const entries = indexable ? publicRoutes.map(path => `<url><loc>${canonicalUrl(path)}</loc></url>`).join('') : ''
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`
}

export function isNavigationCurrent(current: string, destination: string): boolean {
  const active = new URL(current, site.url)
  const target = new URL(destination, site.url)
  const trim = (path: string) => path.replace(/\/+$/, '') || '/'
  return trim(active.pathname) === trim(target.pathname) && (!target.hash || active.hash === target.hash)
}
