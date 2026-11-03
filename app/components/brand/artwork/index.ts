import type { BrandPatternId } from '../../../../shared/brand-patterns'
import type { PatternArtwork } from './types'
import { capitalArc } from './capital-arc'
import { structuralFold } from './structural-fold'
import { scCut } from './sc-cut'
import { investmentHorizon } from './investment-horizon'
import { guidedPath } from './guided-path'
import { capitalContour } from './capital-contour'

export const brandPatternArtwork: Record<BrandPatternId, PatternArtwork> = {
  ...capitalArc, ...structuralFold, ...scCut, ...investmentHorizon, ...guidedPath, ...capitalContour,
}
