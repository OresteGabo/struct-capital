<script setup lang="ts">
import type { SocialFormat, SocialPost } from '../../../../shared/social'
import SocialCanvas from '../SocialCanvas.vue'
defineProps<{ post: SocialPost, format: SocialFormat }>()
</script>

<template>
  <SocialCanvas v-if="post.education" :format="format" class="education" :class="[`education--${post.education.style}`, `education--${format}`]">
    <header class="education-header" data-education-header>
      <p class="brand">{{ post.education.brand }}</p>
      <p class="eyebrow">{{ post.eyebrow }}</p>
    </header>
    <div class="education-main">
      <div class="education-copy" data-education-copy>
        <span class="gold-rule" aria-hidden="true" />
        <p class="primary-label">{{ post.education.primaryLabel }}</p>
        <h2>{{ post.headline }}</h2>
        <div class="explanation">
          <p v-if="post.education.style === 'myth-fact'" class="secondary-label">{{ post.education.secondaryLabel }}</p>
          <p class="body">{{ post.body }}</p>
        </div>
      </div>
    </div>
    <footer class="education-footer" data-education-footer>
      <div class="notes">
        <p class="source">{{ post.education.source }}</p>
        <p class="disclaimer">{{ post.education.disclaimer }}</p>
        <p class="footer-text">{{ post.education.footer }}</p>
      </div>
      <img src="/brand/struct-capital-symbol.svg" alt="" aria-hidden="true" width="64" height="64" class="signature">
    </footer>
  </SocialCanvas>
</template>

<style scoped>
.education { padding: 64px 72px; }
.education-header { display: flex; justify-content: space-between; align-items: baseline; gap: 32px; color: var(--sc-olive); }
.brand { max-width: 430px; font-size: 28px; font-weight: 650; overflow-wrap: anywhere; }
.eyebrow { max-width: 340px; font-size: 17px; letter-spacing: .09em; text-align: right; overflow-wrap: anywhere; }
.education-main { display: flex; align-items: center; flex: 1; min-height: 0; padding-block: 48px; }
.education-copy { width: 100%; overflow-wrap: anywhere; }
.gold-rule { display: block; width: 64px; height: 5px; background: var(--sc-gold); margin-bottom: 28px; }
.primary-label, .secondary-label { color: var(--sc-olive); font-size: 20px; font-weight: 600; letter-spacing: .08em; }
h2 { margin-top: 22px; max-width: 900px; color: var(--sc-olive); font-size: 88px; line-height: 1.08; letter-spacing: -.045em; }
.explanation { max-width: 830px; margin-top: 36px; }
.body { font-size: 31px; line-height: 1.5; color: var(--sc-ink); }
.secondary-label { margin-bottom: 16px; }
.education-footer { display: flex; align-items: flex-end; gap: 32px; justify-content: space-between; border-top: 1px solid var(--sc-border); padding-top: 24px; }
.notes { max-width: 790px; overflow-wrap: anywhere; }
.source { color: var(--sc-olive); font-size: 20px; line-height: 1.4; }
.disclaimer { color: var(--sc-muted); font-size: 18px; line-height: 1.5; margin-top: 10px; }
.footer-text { color: var(--sc-olive); font-size: 18px; margin-top: 18px; }
.signature { width: 64px; height: 64px; flex: none; }
.education--myth-fact h2 { font-size: 66px; color: var(--sc-ink); }
.education--myth-fact .explanation { border-left: 3px solid var(--sc-gold); padding-left: 28px; }
.education--myth-fact .body { font-size: 36px; color: var(--sc-olive); }
.education--terminology h2 { font-size: 96px; }
.education--terminology .body { font-size: 34px; }
.education--portrait h2 { font-size: 100px; max-width: 880px; }
.education--portrait .body { font-size: 36px; }
.education--portrait.education--myth-fact h2 { font-size: 78px; }
.education--portrait.education--terminology h2 { font-size: 104px; }
</style>
