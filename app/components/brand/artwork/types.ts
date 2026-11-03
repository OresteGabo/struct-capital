export type PatternPaint = 'plane' | 'return' | 'veil' | 'line' | 'gold' | 'quiet'
export interface PatternPath {
  d: string
  fill?: PatternPaint
  stroke?: PatternPaint
  strokeWidth?: number
  opacity?: number
}
export interface PatternArtwork {
  desktop: readonly PatternPath[]
  mobile: readonly PatternPath[]
}

export const line = (d: string, opacity = 1, stroke: PatternPaint = 'line', strokeWidth = 1): PatternPath => ({ d, stroke, strokeWidth, opacity })
export const plane = (d: string, fill: PatternPaint = 'plane', opacity = 1): PatternPath => ({ d, fill, opacity })
export const ring = (x: number, y: number, r = 6): PatternPath => line(`M${x - r} ${y}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`, 1, 'gold', 1.4)
export const disc = (x: number, y: number, r: number): PatternPath => plane(`M${x - r} ${y}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`, 'veil')
