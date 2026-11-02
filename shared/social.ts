import { kigaliPhotos } from './social-photos.ts'

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
export interface SocialPost {
  id: string
  eyebrow: string
  headline: string
  body: string
  visual: 'symbol' | 'calendar'
  template?: 'editorial' | 'kigali' | 'education'
  education?: EducationContent
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
  if (source.template !== undefined && !['editorial', 'kigali', 'education'].includes(String(source.template))) throw new Error('Choose an existing template.')
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
