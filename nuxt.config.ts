import tailwindcss from '@tailwindcss/vite'
import { site, publicRoutes, learningDraftRoutes } from './shared/site'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-30',
  devtools: { enabled: false },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: {
    contactEndpoint: '',
    contactToken: '',
    contactOrigin: site.url,
    public: { siteIndexable: false, contactEnabled: false },
  },
  nitro: { prerender: { routes: [...publicRoutes, ...learningDraftRoutes, '/privacy', '/terms', '/design-system', '/robots.txt', '/sitemap.xml'], crawlLinks: true } },
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
