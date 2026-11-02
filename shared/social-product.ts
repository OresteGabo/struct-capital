// Existing privacy-conscious derivatives from scripts/prepare-product-images.swift.
// Select the 840px calendar for PNGs; do not enlarge the 560px website variant.
export const productScreenshots = [
  { id: 'calendar', label: 'Calendar · full app capture', src: '/product/calendar-840.png', width: 840, height: 1774, layout: 'tall', displayWidth: { square: 320, portrait: 400 }, alt: 'Struct Capital app calendar with scheduled event categories', caption: 'Actual app capture · Captured dates are not a live offer.' },
  { id: 'calendar-detail', label: 'Calendar · detail', src: '/product/calendar-detail-700.png', width: 700, height: 934, layout: 'tall', displayWidth: { square: 440, portrait: 440 }, alt: 'Calendar excerpt with subscription, coupon and maturity categories', caption: 'Actual app excerpt · Dates shown belong to the source capture.' },
  { id: 'import', label: 'Documents · existing receipt', src: '/product/import-detail-700.png', width: 700, height: 665, layout: 'tall', displayWidth: { square: 440, portrait: 440 }, alt: 'Existing-document receipt marked Already in Library', caption: 'Actual app excerpt · Existing receipt, not a new-import success.' },
  { id: 'reports', label: 'Reports · annual report card', src: '/product/reports-detail-900.png', width: 900, height: 397, layout: 'wide', displayWidth: { square: 900, portrait: 900 }, alt: 'Annual report card from the Struct Capital document library', caption: 'Actual app excerpt · Report card, not a tax or regulatory filing.' },
] as const
export type ProductScreenshotId = typeof productScreenshots[number]['id']
