import manifest from '../social-content/photos.json' with { type: 'json' }

export interface SocialPhoto {
  id: string
  src: string
  alt: string
  credit: string
  width: number
  height: number
}

// Only reviewed, repository-owned assets may enter this registry. No remote URLs.
export const brandPhotos: SocialPhoto[] = manifest.map((entry: SocialPhoto) => {
  if (!/^[a-z0-9-]+$/.test(entry.id)
    || !/^\/brand\/photos\/(?:kigali|rwanda)\/[a-zA-Z0-9-]+\.(?:jpg|jpeg|png|webp|avif)$/.test(entry.src)
    || !entry.alt?.trim() || !entry.credit?.trim()
    || !Number.isInteger(entry.width) || entry.width <= 0
    || !Number.isInteger(entry.height) || entry.height <= 0) throw new Error('Invalid approved brand photo registry entry.')
  return entry
})
if (new Set(brandPhotos.map(photo => photo.id)).size !== brandPhotos.length) throw new Error('Duplicate brand photo IDs.')
// Kigali Editorial must not silently label another Rwanda location as Kigali.
export const kigaliPhotos = brandPhotos.filter(photo => photo.src.startsWith('/brand/photos/kigali/'))
