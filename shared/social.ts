import { kigaliPhotos } from './social-photos.ts'
import { productScreenshots, type ProductScreenshotId } from './social-product.ts'

export const socialSizes = { square: { width: 1080, height: 1080 }, portrait: { width: 1080, height: 1350 } } as const
export type SocialFormat = keyof typeof socialSizes
export const educationStyles = ['concept', 'myth-fact', 'did-you-know', 'terminology'] as const
export interface EducationContent {
  style: typeof educationStyles[number]
  primaryLabel: string
  secondaryLabel: string
  source: string
  disclaimer: string
  footer: string
  brand: string
}
export interface BondEvent {
  kind: 'principal' | 'coupon' | 'maturity'
  date: string
  label: string
  value: string
}
export interface BondContent {
  brand: string
  exampleNote: string
  timelineHeading: string
  dateHeading: string
  eventHeading: string
  valueHeading: string
  footnote: string
  source: string
  footer: string
  events: BondEvent[]
}
export interface ShowcaseContent {
  screenshot: ProductScreenshotId
  pattern: 'none' | 'signature' | 'structure'
  brand: string
  footer: string
  note: string
}
export interface SocialPost {
  id: string
  eyebrow: string
  headline: string
  body: string
  visual: 'symbol' | 'calendar'
  template?: 'editorial' | 'kigali' | 'education' | 'treasury-bond' | 'product-showcase'
  education?: EducationContent
  bond?: BondContent
  showcase?: ShowcaseContent
  photoId?: string
  cropX?: number
  cropY?: number
  pattern?: 'none' | 'signature' | 'rhythm'
  theme?: 'ivory' | 'olive'
}

// Shared by the editor, render page and local export boundary. Text only, never HTML.
export function parseSocialPost(value: unknown): SocialPost {
  if (!value || typeof value !== 'object') throw new Error('A post object is required.')
  const source = value as Record<string, unknown>
  const limits = { id: 60, eyebrow: 40, headline: 100, body: 230 } as const
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof source[key] !== 'string' || !source[key].trim() || source[key].length > limit) throw new Error(`Invalid ${key} (maximum ${limit} characters).`)
  }
  if (!/^[a-z0-9-]+$/.test(source.id as string)) throw new Error('Use a lowercase slug for the post ID.')
  if (source.visual !== 'symbol' && source.visual !== 'calendar') throw new Error('Choose an approved visual.')
  const post: SocialPost = { id: source.id as string, eyebrow: source.eyebrow as string, headline: source.headline as string, body: source.body as string, visual: source.visual }
  if (source.template !== undefined && !['editorial', 'kigali', 'education', 'treasury-bond', 'product-showcase'].includes(String(source.template))) throw new Error('Choose an existing template.')
  if (source.template === 'product-showcase') {
    if (!source.showcase || typeof source.showcase !== 'object') throw new Error('Product showcase content is required.')
    const showcase = source.showcase as Record<string, unknown>
    if (!productScreenshots.some(image => image.id === showcase.screenshot)) throw new Error('Choose an approved product screenshot.')
    if (!['none', 'signature', 'structure'].includes(String(showcase.pattern))) throw new Error('Choose a showcase pattern.')
    for (const [key, limit] of Object.entries({ brand: 40, footer: 60, note: 100 })) {
      if (typeof showcase[key] !== 'string' || !showcase[key].trim() || showcase[key].length > limit) throw new Error(`Invalid showcase ${key} (maximum ${limit} characters).`)
    }
    post.template = 'product-showcase'
    post.showcase = { screenshot: showcase.screenshot as ProductScreenshotId, pattern: showcase.pattern as ShowcaseContent['pattern'], brand: showcase.brand as string, footer: showcase.footer as string, note: showcase.note as string }
  }
  if (source.template === 'treasury-bond') {
    if (!source.bond || typeof source.bond !== 'object') throw new Error('Bond timeline content is required.')
    const bond = source.bond as Record<string, unknown>
    const fields = { brand: 40, exampleNote: 110, timelineHeading: 60, dateHeading: 24, eventHeading: 24, valueHeading: 30, footnote: 230, source: 100, footer: 60 }
    for (const [key, limit] of Object.entries(fields)) {
      if (typeof bond[key] !== 'string' || !bond[key].trim() || bond[key].length > limit) throw new Error(`Invalid bond ${key} (maximum ${limit} characters).`)
    }
    if (!Array.isArray(bond.events) || bond.events.length < 3 || bond.events.length > 6) throw new Error('Use 3–6 timeline events.')
    const events = bond.events.map((value: unknown, index: number): BondEvent => {
      if (!value || typeof value !== 'object') throw new Error('Invalid timeline event.')
      const event = value as Record<string, unknown>
      const expectedKind = index === 0 ? 'principal' : index === (bond.events as unknown[]).length - 1 ? 'maturity' : 'coupon'
      if (event.kind !== expectedKind) throw new Error('Start with principal, list coupons, and end with maturity.')
      for (const [key, limit] of Object.entries({ date: 24, label: 54, value: 26 })) {
        if (typeof event[key] !== 'string' || !event[key].trim() || event[key].length > limit) throw new Error(`Invalid timeline ${key} (maximum ${limit} characters).`)
      }
      return { kind: expectedKind, date: event.date as string, label: event.label as string, value: event.value as string }
    })
    post.template = 'treasury-bond'
    post.bond = { ...Object.fromEntries(Object.keys(fields).map(key => [key, bond[key]])), events } as BondContent
  }
  if (source.template === 'education') {
    if (!source.education || typeof source.education !== 'object') throw new Error('Education content is required.')
    const education = source.education as Record<string, unknown>
    if (!educationStyles.includes(education.style as EducationContent['style'])) throw new Error('Choose an education content style.')
    const fields = { primaryLabel: 40, secondaryLabel: 40, source: 100, disclaimer: 100, footer: 60, brand: 40 }
    for (const [key, limit] of Object.entries(fields)) {
      if (typeof education[key] !== 'string' || !education[key].trim() || education[key].length > limit) throw new Error(`Invalid education ${key} (maximum ${limit} characters).`)
    }
    post.template = 'education'
    post.education = { style: education.style, ...Object.fromEntries(Object.keys(fields).map(key => [key, education[key]])) } as EducationContent
  }
  if (source.template === 'kigali') {
    if (typeof source.photoId !== 'string' || (source.photoId !== '' && !kigaliPhotos.some(photo => photo.id === source.photoId))) throw new Error('Choose a registered Kigali photograph.')
    for (const key of ['cropX', 'cropY']) {
      if (typeof source[key] !== 'number' || !Number.isFinite(source[key]) || source[key] < 0 || source[key] > 100) throw new Error('Crop positions must be between 0 and 100.')
    }
    if (!['none', 'signature', 'rhythm'].includes(String(source.pattern))) throw new Error('Choose a signature pattern.')
    if (source.theme !== 'ivory' && source.theme !== 'olive') throw new Error('Choose an editorial theme.')
    post.template = 'kigali'
    post.photoId = source.photoId
    post.cropX = source.cropX as number
    post.cropY = source.cropY as number
    post.pattern = source.pattern as SocialPost['pattern']
    post.theme = source.theme
  }
  return post
}

export function parseSocialFormat(value: unknown): SocialFormat {
  if (value !== 'square' && value !== 'portrait') throw new Error('Choose square or portrait.')
  return value
}
