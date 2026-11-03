import { brandPatterns, type BrandPatternId, type BrandPatternLayout } from './brand-patterns.ts'

export interface BrandPatternConfig {
  pattern: BrandPatternId
  layout: BrandPatternLayout
  scale: number
  x: number
  y: number
  intensity: number
}

export const brandPatternLimits = {
  scale: { min: .75, max: 1.25, step: .05 },
  x: { min: -10, max: 10, step: 1 },
  y: { min: -15, max: 15, step: 1 },
  intensity: { min: 0, max: 1, step: .05 },
} as const

export const defaultBrandPatternConfig: Readonly<BrandPatternConfig> = {
  pattern: 'structural-fold-01', layout: 'auto', scale: 1, x: 0, y: 0, intensity: 1,
}

// Same bounded contract for the reusable layer, gallery, URLs and frame messages.
export function normalizeBrandPatternConfig(value: unknown): BrandPatternConfig {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const bounded = (key: keyof typeof brandPatternLimits) => {
    const raw = input[key]
    const n = typeof raw === 'number' || (typeof raw === 'string' && raw.trim() !== '') ? Number(raw) : NaN
    return Number.isFinite(n) ? Math.min(brandPatternLimits[key].max, Math.max(brandPatternLimits[key].min, n)) : defaultBrandPatternConfig[key]
  }
  return {
    pattern: brandPatterns.some(item => item.id === input.pattern) ? input.pattern as BrandPatternId : defaultBrandPatternConfig.pattern,
    layout: ['auto', 'desktop', 'mobile'].includes(String(input.layout)) ? input.layout as BrandPatternLayout : 'auto',
    scale: bounded('scale'), x: bounded('x'), y: bounded('y'), intensity: bounded('intensity'),
  }
}

export function brandPatternPreviewUrl(config: BrandPatternConfig, theme: 'light' | 'dark'): string {
  return `/brand-patterns-preview?${new URLSearchParams({ ...Object.fromEntries(Object.entries(normalizeBrandPatternConfig(config)).map(([key, value]) => [key, String(value)])), theme })}`
}
