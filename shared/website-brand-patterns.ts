import { getBrandPattern } from './brand-patterns.ts'
import { defaultBrandPatternConfig, type BrandPatternConfig } from './brand-pattern-config.ts'

export interface WebsiteBrandPatterns {
  hero: BrandPatternConfig | null
  sections: {
    independence: BrandPatternConfig | null
    product: BrandPatternConfig | null
  }
  dividers: {
    workflow: BrandPatternConfig | null
  }
}

export function defineWebsiteBrandPatterns(config: WebsiteBrandPatterns): WebsiteBrandPatterns {
  const slots = [
    [config.hero, 'hero'],
    [config.sections.independence, 'section'],
    [config.sections.product, 'section'],
    [config.dividers.workflow, 'divider'],
  ] as const
  for (const [choice, placement] of slots) {
    if (choice && !getBrandPattern(choice.pattern).placements.includes(placement)) {
      throw new Error(`${choice.pattern} is not intended for ${placement} placement. Check shared/website-brand-patterns.ts.`)
    }
  }
  return config
}

// Edit this object to change website artwork. No page markup or visitor settings needed.
// Copy a gallery configuration into a slot, or set a slot to null to disable it.
export const websiteBrandPatterns = defineWebsiteBrandPatterns({
  hero: {
    ...defaultBrandPatternConfig,
    pattern: 'structural-fold-01',
    intensity: .75,
  },
  sections: {
    independence: null,
    product: null,
  },
  dividers: {
    workflow: {
      ...defaultBrandPatternConfig,
      pattern: 'capital-arc-04',
      intensity: .65,
    },
  },
})
