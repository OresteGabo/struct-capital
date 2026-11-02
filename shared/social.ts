export const socialSizes = { square: { width: 1080, height: 1080 }, portrait: { width: 1080, height: 1350 } } as const
export type SocialFormat = keyof typeof socialSizes
export interface SocialPost {
  id: string
  eyebrow: string
  headline: string
  body: string
  visual: 'symbol' | 'calendar'
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
  return { id: source.id as string, eyebrow: source.eyebrow as string, headline: source.headline as string, body: source.body as string, visual: source.visual }
}

export function parseSocialFormat(value: unknown): SocialFormat {
  if (value !== 'square' && value !== 'portrait') throw new Error('Choose square or portrait.')
  return value
}
