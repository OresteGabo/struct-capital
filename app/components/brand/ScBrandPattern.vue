<script setup lang="ts">
import { computed, useId } from 'vue'
import { getBrandPattern, type BrandPatternId, type BrandPatternLayout } from '~~/shared/brand-patterns'
import { brandPatternArtwork } from './artwork'
import type { PatternPaint } from './artwork/types'

const props = withDefaults(defineProps<{
  pattern: BrandPatternId
  layout?: BrandPatternLayout
  intensity?: number
}>(), { layout: 'auto', intensity: 1 })
const definition = computed(() => getBrandPattern(props.pattern))
const artwork = computed(() => brandPatternArtwork[props.pattern])
const intensity = computed(() => Number.isFinite(props.intensity) ? Math.max(0, Math.min(1, props.intensity)) : 1)
// Vue's SSR-stable instance ID prevents gradient/clip collisions, including repeated variants.
const uid = `sc-pattern-${useId().replace(/[^\w-]/g, '-')}`
const views = ['desktop', 'mobile'] as const
const paint = (view: string, name?: PatternPaint) => name ? `url(#${uid}-${view}-${name})` : 'none'
</script>

<template>
  <div
    class="sc-brand-pattern" :class="[`sc-brand-pattern--${layout}`, { 'sc-brand-pattern--divider': definition.placements[0] === 'divider' }]"
    :data-brand-pattern="pattern" aria-hidden="true" inert :style="{ opacity: intensity }"
  >
    <svg
      v-for="view in views" :key="view" :class="`sc-brand-pattern__${view}`" :viewBox="definition.viewBox[view]"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient :id="`${uid}-${view}-plane`" x1="15%" y1="100%" x2="85%" y2="0%">
          <stop offset="0" stop-color="var(--sc-primary)" stop-opacity="0" />
          <stop offset=".5" stop-color="var(--sc-primary)" stop-opacity=".12" />
          <stop offset="1" stop-color="var(--sc-gold)" stop-opacity=".16" />
        </linearGradient>
        <linearGradient :id="`${uid}-${view}-return`" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0" stop-color="var(--sc-primary)" stop-opacity=".04" />
          <stop offset=".55" stop-color="var(--sc-primary)" stop-opacity=".16" />
          <stop offset="1" stop-color="var(--sc-gold)" stop-opacity=".08" />
        </linearGradient>
        <linearGradient :id="`${uid}-${view}-veil`" x1="20%" y1="100%" x2="70%" y2="0%">
          <stop offset="0" stop-color="var(--sc-primary)" stop-opacity="0" />
          <stop offset=".6" stop-color="var(--sc-gold)" stop-opacity=".1" />
          <stop offset="1" stop-color="var(--sc-primary)" stop-opacity=".04" />
        </linearGradient>
        <linearGradient :id="`${uid}-${view}-line`" gradientUnits="userSpaceOnUse" x1="0" :x2="view === 'desktop' ? 1200 : 400" y1="0" y2="0">
          <stop offset="0" stop-color="var(--sc-primary)" stop-opacity=".12" />
          <stop offset=".58" stop-color="var(--sc-primary)" stop-opacity=".28" />
          <stop offset="1" stop-color="var(--sc-gold)" stop-opacity=".2" />
        </linearGradient>
        <linearGradient :id="`${uid}-${view}-gold`" gradientUnits="userSpaceOnUse" x1="0" :x2="view === 'desktop' ? 1200 : 400" y1="0" y2="0">
          <stop offset="0" stop-color="var(--sc-primary)" stop-opacity=".2" />
          <stop offset="1" stop-color="var(--sc-gold)" stop-opacity=".45" />
        </linearGradient>
        <linearGradient :id="`${uid}-${view}-quiet`" gradientUnits="userSpaceOnUse" x1="0" :x2="view === 'desktop' ? 1200 : 400" y1="0" y2="0">
          <stop stop-color="var(--sc-primary)" stop-opacity=".12" />
          <stop offset="1" stop-color="var(--sc-primary)" stop-opacity=".04" />
        </linearGradient>
        <clipPath :id="`${uid}-${view}-clip`"><path :d="view === 'desktop' ? `M0 0H1200V${definition.placements[0] === 'divider' ? 160 : 600}H0Z` : `M0 0H400V${definition.placements[0] === 'divider' ? 100 : 360}H0Z`" /></clipPath>
      </defs>
      <g :clip-path="`url(#${uid}-${view}-clip)`" stroke-linecap="round" stroke-linejoin="round">
        <path
          v-for="(shape, index) in artwork[view]" :key="index" :d="shape.d"
          :fill="paint(view, shape.fill)" :stroke="paint(view, shape.stroke)"
          :stroke-width="shape.strokeWidth" :opacity="shape.opacity" vector-effect="non-scaling-stroke"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.sc-brand-pattern { display: block; width: 100%; min-width: 0; overflow: hidden; container-type: inline-size; pointer-events: none; user-select: none; }
.sc-brand-pattern > svg { display: block; width: 100%; height: auto; overflow: hidden; }
.sc-brand-pattern > .sc-brand-pattern__mobile { display: none; }
.sc-brand-pattern--mobile > .sc-brand-pattern__desktop { display: none; }
.sc-brand-pattern--mobile > .sc-brand-pattern__mobile { display: block; }
@container (max-width: 1023px) {
  .sc-brand-pattern--auto > .sc-brand-pattern__desktop { display: none; }
  .sc-brand-pattern--auto > .sc-brand-pattern__mobile { display: block; }
}
@media (forced-colors: active) { .sc-brand-pattern { visibility: hidden; } }
</style>
