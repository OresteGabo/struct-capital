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
export const kigaliPhotos: SocialPhoto[] = manifest.map((entry: SocialPhoto) => {
  if (!/^[a-z0-9-]+$/.test(entry.id)
    || !/^\/brand\/photos\/kigali\/[a-zA-Z0-9-]+\.(?:jpg|jpeg|png|webp|avif)$/.test(entry.src)
    || !entry.alt?.trim() || !entry.credit?.trim()
    || !Number.isInteger(entry.width) || entry.width <= 0
    || !Number.isInteger(entry.height) || entry.height <= 0) throw new Error('Invalid approved Kigali photo registry entry.')
  return entry
})
if (new Set(kigaliPhotos.map(photo => photo.id)).size !== kigaliPhotos.length) throw new Error('Duplicate Kigali photo IDs.')
