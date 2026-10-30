import { indexingEnabled, sitemapXml } from '../../shared/site'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return sitemapXml(indexingEnabled(useRuntimeConfig(event).public.siteIndexable))
})
