<script setup lang="ts">
import ScBrandPattern from '../components/brand/ScBrandPattern.vue'
import PatternPreviewFrame from '../components/brand/PatternPreviewFrame.vue'
import { brandPatterns, brandPatternFamilies, getBrandPattern, type BrandPatternId } from '~~/shared/brand-patterns'
import { defaultBrandPatternConfig, brandPatternLimits, normalizeBrandPatternConfig } from '~~/shared/brand-pattern-config'
import { websiteBrandPatterns } from '~~/shared/website-brand-patterns'

definePageMeta({ layout: false })
useHead({ title: 'Brand pattern gallery · local development', meta: [{ name: 'robots', content: 'noindex, nofollow' }], htmlAttrs: { 'data-theme': 'light' } })
const config = ref({ ...(websiteBrandPatterns.hero ?? defaultBrandPatternConfig) })
const family = ref('all')
const theme = ref<'light' | 'dark'>('light')
const viewport = ref(1440)
const compare = ref(false)
const comparison = ref<BrandPatternId>('capital-arc-01')
const status = ref('Changes are local and held in memory. Public pages are unchanged.')
const code = useTemplateRef<HTMLTextAreaElement>('code')
const filtered = computed(() => brandPatterns.filter(pattern => family.value === 'all' || pattern.family === family.value))
const selected = computed(() => getBrandPattern(config.value.pattern))
const comparisonConfig = computed(() => ({ ...normalizeBrandPatternConfig(config.value), pattern: comparison.value }))
const copiedConfig = computed(() => `import type { BrandPatternConfig } from '~~/shared/brand-pattern-config'\n\nexport const heroPattern = ${JSON.stringify(normalizeBrandPatternConfig(config.value), null, 2)} satisfies BrandPatternConfig\n`)
function reset() { config.value = { ...defaultBrandPatternConfig, pattern: config.value.pattern }; status.value = 'Scale, position, layout and intensity reset.' }
async function copy() {
  try {
    await navigator.clipboard.writeText(copiedConfig.value)
    status.value = 'Pattern configuration copied. Use it with ScBrandPatternLayer in an isolated positioned parent.'
  } catch {
    code.value?.focus(); code.value?.select()
    status.value = 'Clipboard unavailable. The configuration is selected; copy it with your keyboard.'
  }
}
</script>

<template>
  <main class="pattern-gallery sc-container sc-section">
    <header class="sc-stack">
      <p class="text-label text-brand-primary">Struct Capital / Development tools</p>
      <h1 class="text-heading">Brand pattern gallery</h1>
      <p>24 vector compositions · Actual homepage content · Local review</p>
      <p class="text-label text-muted">Preview settings do not change the website. Full-size links open an independent local preview.</p>
    </header>

    <section class="sc-stack gallery-section" aria-labelledby="catalog-heading">
      <h2 id="catalog-heading" class="text-title">Browse patterns</h2>
      <div class="family-filter"><label for="pattern-family" class="sc-label">Pattern family</label><select id="pattern-family" v-model="family" class="sc-input"><option value="all">All families · 24 patterns</option><option v-for="(label, id) in brandPatternFamilies" :key="id" :value="id">{{ label }} · 4 patterns</option></select></div>
      <p class="text-label text-muted">Showing {{ filtered.length }} patterns. Select a composition to preview it.</p>
      <div class="pattern-catalog">
        <button v-for="pattern in filtered" :key="pattern.id" type="button" class="sc-card pattern-choice" :aria-pressed="config.pattern === pattern.id" @click="config.pattern = pattern.id">
          <ScBrandPattern :pattern="pattern.id" layout="desktop" class="pattern-choice__art" />
          <strong>{{ pattern.name }}</strong><span class="text-label">{{ pattern.id }}</span><span class="text-caption text-muted">{{ brandPatternFamilies[pattern.family] }} · {{ pattern.placements.join(' / ') }}</span>
        </button>
      </div>
    </section>

    <section class="gallery-section sc-stack" aria-labelledby="settings-heading">
      <h2 id="settings-heading" class="text-title">Preview settings</h2>
      <form class="sc-card gallery-controls" @submit.prevent>
        <div><label for="selected-pattern" class="sc-label">Selected pattern</label><select id="selected-pattern" v-model="config.pattern" class="sc-input"><optgroup v-for="(label, id) in brandPatternFamilies" :key="id" :label="label"><option v-for="pattern in brandPatterns.filter(item => item.family === id)" :key="pattern.id" :value="pattern.id">{{ pattern.id }} · {{ pattern.name }}</option></optgroup></select></div>
        <div><label for="preview-width" class="sc-label">Preview viewport</label><select id="preview-width" v-model.number="viewport" class="sc-input"><option :value="1440">Desktop · 1440px</option><option :value="768">Tablet · 768px</option><option :value="390">Mobile · 390px</option><option :value="320">Small mobile · 320px</option></select></div>
        <div><label for="preview-theme" class="sc-label">Preview theme</label><select id="preview-theme" v-model="theme" class="sc-input"><option value="light">Light</option><option value="dark">Dark</option></select></div>
        <div><label for="pattern-layout" class="sc-label">Artwork layout</label><select id="pattern-layout" v-model="config.layout" class="sc-input"><option value="auto">Automatic for container</option><option value="desktop">Desktop artwork</option><option value="mobile">Mobile artwork</option></select></div>
        <div v-for="(limits, key) in brandPatternLimits" :key="key"><label :for="`pattern-${key}`" class="sc-label">{{ { scale: 'Pattern scale', x: 'Horizontal position', y: 'Vertical position', intensity: 'Pattern intensity' }[key] }} · {{ config[key] }}{{ ['x', 'y'].includes(key) ? '%' : '' }}</label><input :id="`pattern-${key}`" v-model.number="config[key]" type="range" :min="limits.min" :max="limits.max" :step="limits.step" class="gallery-range"></div>
        <div class="compare-toggle"><input id="compare-patterns" v-model="compare" type="checkbox"><label for="compare-patterns">Compare variants side by side</label></div>
        <div v-if="compare"><label for="comparison-pattern" class="sc-label">Comparison pattern</label><select id="comparison-pattern" v-model="comparison" class="sc-input"><option v-for="pattern in brandPatterns" :key="pattern.id" :value="pattern.id">{{ pattern.id }} · {{ pattern.name }}</option></select></div>
        <ScButton type="button" variant="outline" @click="reset">Reset adjustments</ScButton>
      </form>
      <p class="text-label"><strong>{{ selected.name }}</strong> · Intended use: {{ selected.placements.join(' / ') }}. Mobile: {{ selected.mobileTreatment }}</p>
      <p class="text-label text-muted">All patterns are auditioned in the hero here; section/divider recommendations still apply. Both comparisons share scale, position, intensity, theme and viewport. The integrated homepage places artwork behind the product stage below 1024px. Copy a suitable configuration into shared/website-brand-patterns.ts to change the website.</p>
      <div class="preview-grid" :class="{ 'preview-grid--compare': compare }">
        <article class="sc-stack"><h3 class="text-label">Selected · {{ selected.id }}</h3><PatternPreviewFrame :config="config" :theme="theme" :width="viewport" label="selected pattern preview" /></article>
        <article v-if="compare" class="sc-stack"><h3 class="text-label">Comparison · {{ comparison }}</h3><PatternPreviewFrame :config="comparisonConfig" :theme="theme" :width="viewport" label="comparison pattern preview" /></article>
      </div>
    </section>

    <section class="sc-stack gallery-section" aria-labelledby="configuration-heading">
      <h2 id="configuration-heading" class="text-title">Use this configuration</h2>
      <label for="pattern-config" class="sc-label">Layer configuration · TypeScript</label>
      <textarea id="pattern-config" ref="code" :value="copiedConfig" readonly rows="13" spellcheck="false" class="sc-input pattern-code" />
      <ScButton type="button" class="copy-button" @click="copy">Copy configuration</ScButton>
      <p role="status" class="text-label">{{ status }}</p>
      <p class="text-label text-muted">Pass this object to ScBrandPatternLayer’s config prop inside a parent with position: relative and isolation: isolate. Theme inherits from the page; viewport and comparison choices are review-only. See docs/BRAND_PATTERNS.md for the complete integration example.</p>
      <ScLink to="/">Return to the website</ScLink>
    </section>
  </main>
</template>

<style scoped>
.pattern-gallery { width: min(100% - 2rem, 100rem); }
.gallery-section { margin-top: 40px; }
.family-filter { max-width: 440px; }
.pattern-catalog { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr)); gap: 12px; }
.pattern-choice { display: flex; flex-direction: column; text-align: left; gap: 6px; min-width: 0; padding: 16px; }
.pattern-choice[aria-pressed="true"] { border-color: var(--sc-olive); box-shadow: inset 0 0 0 1px var(--sc-olive); }
.pattern-choice__art { height: 100px; display: flex; align-items: center; background: var(--sc-background); margin-bottom: 8px; }
.gallery-controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 245px), 1fr)); gap: 24px; align-items: end; }
.gallery-controls > div { min-width: 0; }
.gallery-range { display: block; width: 100%; accent-color: var(--sc-primary); }
.compare-toggle { display: flex; gap: 12px; align-items: center; padding-block: 8px; }
.compare-toggle input { width: 20px; height: 20px; accent-color: var(--sc-primary); }
.preview-grid { display: grid; gap: 24px; align-items: start; }
.preview-grid article { min-width: 0; }
.pattern-code { width: 100%; max-width: 100%; font-family: ui-monospace, monospace; font-size: .85rem; }
.copy-button { justify-self: start; }
@media (min-width: 900px) { .preview-grid--compare { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
</style>
