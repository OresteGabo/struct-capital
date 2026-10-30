import { canonicalUrl, indexingEnabled, site } from '~~/shared/site'

export function useSiteSeo(options: { title?: string, description?: string, noindex?: boolean } = {}) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const title = options.title ? `${options.title} | ${site.name}` : `${site.name} — ${site.title}`
  const description = options.description ?? site.description
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: site.name,
    ogLocale: 'en_RW',
    ogUrl: () => canonicalUrl(route.path),
    ogImage: `${site.url}${site.socialImage}`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Struct Capital — A clearer view of your investments, across brokers.',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `${site.url}${site.socialImage}`,
    twitterImageAlt: 'Struct Capital — A clearer view of your investments, across brokers.',
    robots: () => options.noindex || !indexingEnabled(config.public.siteIndexable) ? 'noindex, nofollow' : 'index, follow',
  })
  useHead({ link: [{ key: 'canonical', rel: 'canonical', href: () => canonicalUrl(route.path) }] })
}
