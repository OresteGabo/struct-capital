<script setup lang="ts">
import showcase from '../../social-content/posts/product-showcase.json'
import { productScreenshots } from '../../shared/social-product'
import TreasuryBondFields from '../components/social/TreasuryBondFields.vue'
import bond from '../../social-content/posts/treasury-bond-explainer.json'
import SocialTemplate from '../components/social/SocialTemplate.vue'
import { parseSocialPost, socialSizes, type SocialFormat } from '../../shared/social'
import clearer from '../../social-content/posts/clearer-picture.json'
import calendar from '../../social-content/posts/income-calendar.json'
import kigali from '../../social-content/posts/kigali-editorial.json'
import concept from '../../social-content/posts/education-concept.json'
import myth from '../../social-content/posts/education-myth-fact.json'
import didYouKnow from '../../social-content/posts/education-did-you-know.json'
import terminology from '../../social-content/posts/education-terminology.json'
import { kigaliPhotos } from '../../shared/social-photos'

definePageMeta({ layout: false })
useHead({ title: 'Social studio · local development', meta: [{ name: 'robots', content: 'noindex, nofollow' }], htmlAttrs: { 'data-theme': 'light' } })
const drafts = [clearer, calendar, kigali, concept, myth, didYouKnow, terminology, bond, showcase]
const selected = ref(clearer.id)
const post = ref(parseSocialPost(clearer))
const format = ref<SocialFormat>('square')
const busy = ref(false)
const status = ref('Draft content. Review copy and assets before publishing.')
const scale = ref(0.5)
const preview = useTemplateRef('preview')
let observer: ResizeObserver | undefined
onMounted(() => {
  observer = new ResizeObserver(([entry]) => { if (entry) scale.value = Math.min(entry.contentRect.width / 1080, 0.6) })
  if (preview.value) observer.observe(preview.value)
})
onBeforeUnmount(() => observer?.disconnect())
watch(selected, (id) => { post.value = parseSocialPost(drafts.find(draft => draft.id === id)) })
async function exportPng() {
  busy.value = true
  status.value = 'Rendering PNG…'
  try {
    const validated = parseSocialPost(post.value)
    const response = await fetch('/api/social-export', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ post: validated, format: format.value }) })
    if (!response.ok) throw new Error(await response.text())
    const url = URL.createObjectURL(await response.blob())
    const link = document.createElement('a')
    link.href = url
    link.download = `${validated.id}-${format.value}.png`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    status.value = response.headers.get('X-Social-Proof') === 'missing-photo'
      ? 'Draft proof downloaded. A real Kigali photograph is still required.'
      : 'PNG downloaded. Edits are held in memory; update the JSON file to retain them.'
  } catch (error) {
    status.value = error instanceof Error ? error.message : 'Export unavailable.'
  } finally { busy.value = false }
}
</script>

<template>
  <main class="studio sc-container sc-section">
    <header class="sc-stack">
      <p class="text-label text-brand-primary">Struct Capital / Development tools</p>
      <h1 class="text-heading">Social media studio</h1>
      <p>Editable drafts · 1080px canvas · local PNG export</p>
    </header>
    <div class="workspace">
      <form class="sc-card sc-stack" @submit.prevent="exportPng">
        <div><label class="sc-label" for="draft">Draft</label><select id="draft" v-model="selected" class="sc-input"><option v-for="draft in drafts" :key="draft.id" :value="draft.id">{{ draft.id }}</option></select></div>
        <div><label class="sc-label" for="format">Format</label><select id="format" v-model="format" class="sc-input"><option value="square">Square · 1080 × 1080</option><option value="portrait">Portrait · 1080 × 1350</option></select></div>
        <div><label class="sc-label" for="eyebrow">Eyebrow</label><input id="eyebrow" v-model="post.eyebrow" class="sc-input" maxlength="40" required></div>
        <div><label class="sc-label" for="headline">Headline</label><textarea id="headline" v-model="post.headline" class="sc-input" maxlength="100" rows="3" required /></div>
        <div><label class="sc-label" for="body">{{ ['kigali', 'product-showcase'].includes(post.template ?? '') ? 'Subtitle' : 'Body' }}</label><textarea id="body" v-model="post.body" class="sc-input" maxlength="230" rows="5" required /></div>
        <template v-if="post.template === 'kigali'">
          <p v-if="!post.photoId" role="note" class="sc-draft-notice text-label">Kigali photograph missing. Exports are labeled draft proofs. Add a user-provided city photograph to the registry; see docs/SOCIAL_MEDIA_SYSTEM.md.</p>
          <div><label class="sc-label" for="photo">Photograph</label><select id="photo" v-model="post.photoId" class="sc-input"><option value="">Missing asset / draft proof</option><option v-for="photo in kigaliPhotos" :key="photo.id" :value="photo.id">{{ photo.alt }}</option></select></div>
          <div><label class="sc-label" for="crop-x">Crop position · horizontal ({{ post.cropX }}%)</label><input id="crop-x" v-model.number="post.cropX" type="range" min="0" max="100" class="w-full"></div>
          <div><label class="sc-label" for="crop-y">Crop position · vertical ({{ post.cropY }}%)</label><input id="crop-y" v-model.number="post.cropY" type="range" min="0" max="100" class="w-full"></div>
          <div><label class="sc-label" for="pattern">Geometric signature</label><select id="pattern" v-model="post.pattern" class="sc-input"><option value="none">None</option><option value="signature">SC signature</option><option value="rhythm">SC rhythm</option></select></div>
          <div><label class="sc-label" for="theme">Editorial theme</label><select id="theme" v-model="post.theme" class="sc-input"><option value="ivory">Ivory / ink</option><option value="olive">Ivory / olive</option></select></div>
        </template>
        <template v-else-if="post.template === 'education' && post.education">
          <div><label class="sc-label" for="education-style">Content style</label><select id="education-style" v-model="post.education.style" class="sc-input"><option value="concept">Financial concept</option><option value="myth-fact">Myth versus fact</option><option value="did-you-know">Did you know?</option><option value="terminology">Investor terminology</option></select></div>
          <div><label class="sc-label" for="primary-label">Primary label</label><input id="primary-label" v-model="post.education.primaryLabel" maxlength="40" class="sc-input" required></div>
          <div v-if="post.education.style === 'myth-fact'"><label class="sc-label" for="secondary-label">Fact label</label><input id="secondary-label" v-model="post.education.secondaryLabel" maxlength="40" class="sc-input" required></div>
          <div><label class="sc-label" for="education-source">Source credit</label><input id="education-source" v-model="post.education.source" maxlength="100" class="sc-input" required></div>
          <div><label class="sc-label" for="education-disclaimer">Education note</label><input id="education-disclaimer" v-model="post.education.disclaimer" maxlength="100" class="sc-input" required></div>
          <div><label class="sc-label" for="education-footer">Footer text</label><input id="education-footer" v-model="post.education.footer" maxlength="60" class="sc-input" required></div>
          <div><label class="sc-label" for="education-brand">Brand text</label><input id="education-brand" v-model="post.education.brand" maxlength="40" class="sc-input" required></div>
        </template>
        <TreasuryBondFields v-else-if="post.template === 'treasury-bond' && post.bond" v-model="post.bond" />
        <template v-else-if="post.template === 'product-showcase' && post.showcase">
          <div><label class="sc-label" for="product-screenshot">Product screenshot</label><select id="product-screenshot" v-model="post.showcase.screenshot" class="sc-input"><option v-for="image in productScreenshots" :key="image.id" :value="image.id">{{ image.label }}</option></select></div>
          <div><label class="sc-label" for="showcase-pattern">Showcase geometry</label><select id="showcase-pattern" v-model="post.showcase.pattern" class="sc-input"><option value="none">None</option><option value="signature">SC signature</option><option value="structure">SC structure</option></select></div>
          <div><label class="sc-label" for="showcase-brand">Showcase brand text</label><input id="showcase-brand" v-model="post.showcase.brand" maxlength="40" class="sc-input" required></div>
          <div><label class="sc-label" for="showcase-footer">Showcase footer</label><input id="showcase-footer" v-model="post.showcase.footer" maxlength="60" class="sc-input" required></div>
          <div><label class="sc-label" for="showcase-note">Showcase note</label><textarea id="showcase-note" v-model="post.showcase.note" maxlength="100" class="sc-input" rows="3" required /></div>
          <p class="text-label text-muted">Authentic, existing screenshot derivatives only. Asset captions retain capture and capability limits. Raw account screenshots are not selectable.</p>
        </template>
        <div v-else><label class="sc-label" for="visual">Approved visual</label><select id="visual" v-model="post.visual" class="sc-input"><option value="symbol">Official symbol</option><option value="calendar">Calendar excerpt</option></select></div>
        <ScButton type="submit" :disabled="busy">{{ busy ? 'Rendering…' : 'Download PNG' }}</ScButton>
        <p role="status" class="text-label" :aria-busy="busy">{{ status }}</p>
        <p class="text-label text-muted">Downloads use your browser’s download folder. Use the CLI to save to exports/social/. Changing drafts resets edits.</p>
      </form>
      <section ref="preview" aria-label="Post preview" class="preview">
        <div :style="{ width: `${1080 * scale}px`, height: `${socialSizes[format].height * scale}px` }">
          <SocialTemplate :post="post" :format="format" :style="{ transform: `scale(${scale})`, transformOrigin: 'top left' }" />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.workspace { display: grid; grid-template-columns: minmax(0, 1fr); gap: 32px; margin-top: 32px; align-items: start; }
form { min-width: 0; overflow-wrap: anywhere; }
input[type="range"] { accent-color: var(--sc-primary); }
.preview { min-width: 0; overflow: hidden; }
@media (min-width: 960px) { .workspace { grid-template-columns: 340px minmax(0, 1fr); } }
</style>
