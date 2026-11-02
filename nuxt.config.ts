import { useNuxt } from '@nuxt/kit'
import { fileURLToPath } from 'node:url'
import { env } from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import { site, publicRoutes, learningDraftRoutes } from './shared/site'

const designReviewEnabled = env.NUXT_DESIGN_REVIEW_ENABLED === 'true'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-30',
  devtools: { enabled: false },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  hooks: {
    'nitro:config'(config) {
      if (useNuxt().options.dev) {
        config.handlers ||= []
        config.handlers.push({ route: '/api/social-export', method: 'post', handler: fileURLToPath(new URL('./studio/export-handler.ts', import.meta.url)) })
      }
    },
    'pages:extend'(pages) {
      if (!useNuxt().options.dev) {
        for (let index = pages.length - 1; index >= 0; index--) {
          if (pages[index]?.path.startsWith('/social-studio')) pages.splice(index, 1)
        }
      }
      if (!designReviewEnabled) {
        const index = pages.findIndex(page => page.path === '/design-system')
        if (index !== -1) pages.splice(index, 1)
      }
    },
  },
  routeRules: {
    '/**': { headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
      // Script nonces/hashes and HSTS need the selected host's reviewed policy.
      'Content-Security-Policy': "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'",
      'Cache-Control': 'no-cache',
    } },
    '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    '/product/**': { headers: { 'Cache-Control': 'public, max-age=3600, must-revalidate' } },
    '/brand/**': { headers: { 'Cache-Control': 'public, max-age=3600, must-revalidate' } },
    '/api/**': { headers: { 'Cache-Control': 'no-store' } },
  },
  runtimeConfig: {
    contactEndpoint: '',
    contactToken: '',
    contactOrigin: site.url,
    public: { siteIndexable: false, contactEnabled: false },
  },
  nitro: { prerender: { routes: [...publicRoutes, ...learningDraftRoutes, '/privacy', '/terms', ...(designReviewEnabled ? ['/design-system'] : []), '/robots.txt', '/sitemap.xml'], crawlLinks: true } },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: `${site.name} — ${site.title}`,
      meta: [
        { name: 'description', content: site.description },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/brand/struct-capital-symbol.svg' }],
    },
  },
})
