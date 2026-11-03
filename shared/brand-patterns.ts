export const brandPatternFamilies = {
  'capital-arc': 'Capital Arc',
  'structural-fold': 'Structural Fold',
  'sc-cut': 'SC Cut',
  'investment-horizon': 'Investment Horizon',
  'guided-path': 'Guided Path',
  'capital-contour': 'Capital Contour',
} as const

export type BrandPatternFamily = keyof typeof brandPatternFamilies
export type BrandPatternId = `${BrandPatternFamily}-0${1 | 2 | 3 | 4}`
export type BrandPatternTheme = 'light' | 'dark'
export type BrandPatternLayout = 'auto' | 'desktop' | 'mobile'
export type BrandPatternPlacement = 'hero' | 'section' | 'divider'

export interface BrandPatternDefinition {
  id: BrandPatternId
  name: string
  family: BrandPatternFamily
  placements: readonly BrandPatternPlacement[]
  themes: readonly BrandPatternTheme[]
  viewBox: { desktop: string, mobile: string }
  mobileTreatment: string
  defaults: { layout: BrandPatternLayout, intensity: number }
}

function define(family: BrandPatternFamily, variant: 1 | 2 | 3 | 4, name: string, placements: BrandPatternPlacement[], mobileTreatment: string): BrandPatternDefinition {
  const divider = placements[0] === 'divider'
  return {
    id: `${family}-0${variant}`, family, name, placements, themes: ['light', 'dark'],
    viewBox: { desktop: divider ? '0 0 1200 160' : '0 0 1200 600', mobile: divider ? '0 0 400 100' : '0 0 400 360' },
    mobileTreatment, defaults: { layout: 'auto', intensity: 1 },
  }
}

export const brandPatterns: readonly BrandPatternDefinition[] = [
  define('capital-arc', 1, 'Low sweep', ['hero'], 'Three low curves beneath the product.'),
  define('capital-arc', 2, 'Open fan', ['hero'], 'Three open curves on the right.'),
  define('capital-arc', 3, 'Paired banks', ['section'], 'One short bank entering from the right.'),
  define('capital-arc', 4, 'Tangent interval', ['divider'], 'One shallow arc with an open interval.'),
  define('structural-fold', 1, 'Crossing planes', ['hero'], 'One plane and a narrow return face.'),
  define('structural-fold', 2, 'Upright return', ['hero', 'section'], 'One upright fold; rear plane omitted.'),
  define('structural-fold', 3, 'Offset canopy', ['section'], 'One clipped corner canopy.'),
  define('structural-fold', 4, 'Flat seam', ['divider'], 'Short edge-anchored seam with visible underside.'),
  define('sc-cut', 1, 'Staggered blades', ['hero'], 'Two unequal cuts; no ascending sequence.'),
  define('sc-cut', 2, 'Open elbow', ['section'], 'One corner elbow with an open centre.'),
  define('sc-cut', 3, 'Detached facets', ['section'], 'One compact facet at the right edge.'),
  define('sc-cut', 4, 'Balance tabs', ['divider'], 'Three small tabs with shortened rules.'),
  define('investment-horizon', 1, 'Quiet saddle', ['hero'], 'One shallow layer beneath the product.'),
  define('investment-horizon', 2, 'Offset disc', ['section'], 'Clipped disc behind a single ridge.'),
  define('investment-horizon', 3, 'Open valley', ['section'], 'One low bank; opposing bank omitted.'),
  define('investment-horizon', 4, 'Distant strata', ['divider'], 'Two separated bands with cropped ends.'),
  define('guided-path', 1, 'Side passage', ['hero'], 'One bend and one quiet ring.'),
  define('guided-path', 2, 'Three turns', ['section'], 'Short vertical meander beside the product.'),
  define('guided-path', 3, 'Angular detour', ['section'], 'One structural turn and a small facet.'),
  define('guided-path', 4, 'Interrupted link', ['divider'], 'Short offset bridge and one marker.'),
  define('capital-contour', 1, 'Open chamber', ['hero'], 'Three open returns at the outside edge.'),
  define('capital-contour', 2, 'Corner terrace', ['section'], 'Two spacious corner returns.'),
  define('capital-contour', 3, 'Broken isobands', ['section'], 'One broken band with two terminal cuts.'),
  define('capital-contour', 4, 'Contour gate', ['divider'], 'One bracket and an unequal opposite stroke.'),
]

export function getBrandPattern(id: BrandPatternId): BrandPatternDefinition {
  const pattern = brandPatterns.find(item => item.id === id)
  if (!pattern) throw new Error(`Unknown brand pattern: ${id}`)
  return pattern
}
