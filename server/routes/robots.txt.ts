import { indexingEnabled, robotsText } from '../../shared/site'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return robotsText(indexingEnabled(useRuntimeConfig(event).public.siteIndexable))
})
