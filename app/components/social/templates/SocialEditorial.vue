<script setup lang="ts">
import type { SocialFormat, SocialPost } from '../../../../shared/social'
import SocialCanvas from '../SocialCanvas.vue'
defineProps<{ post: SocialPost, format: SocialFormat }>()
</script>

<template>
  <SocialCanvas :format="format">
    <header class="identity"><ScBrand /><span class="edition">PERSPECTIVES / 01</span></header>
    <div class="story">
      <p class="eyebrow">{{ post.eyebrow }}</p>
      <h2>{{ post.headline }}</h2>
      <p class="body">{{ post.body }}</p>
    </div>
    <div v-if="post.visual === 'calendar'" class="calendar">
      <ScScreenshot src="/product/calendar-detail-700.png" alt="App calendar excerpt with coupon and maturity event categories" :width="700" :height="934" caption="Actual app excerpt · dates shown in the source capture" :priority="true" :frame="false" />
    </div>
    <div v-else class="symbol" aria-hidden="true" />
    <footer><span>structcapital.net</span><span>Independent software. Not a broker.</span></footer>
  </SocialCanvas>
</template>

<style scoped>
.identity { display: flex; align-items: center; justify-content: space-between; padding-bottom: 28px; border-bottom: 2px solid var(--sc-olive); }
.identity :deep(.sc-brand-mark) { width: 56px; height: 56px; }
.identity :deep(.inline-flex) { font-size: 32px; gap: 18px; }
.edition { font-size: 16px; letter-spacing: .12em; color: var(--sc-olive); }
.story { position: relative; z-index: 1; padding-top: 48px; }
.eyebrow { color: var(--sc-olive); font-size: 23px; font-weight: 600; margin-bottom: 22px; }
h2 { max-width: 900px; font-size: 80px; line-height: 1.08; letter-spacing: -.045em; overflow-wrap: anywhere; }
.body { max-width: 800px; margin-top: 30px; font-size: 29px; line-height: 1.5; overflow-wrap: anywhere; }
.symbol { flex: 1; min-height: 80px; margin-top: 28px; background: var(--sc-olive); opacity: .16; mask: url('/brand/struct-capital-symbol.svg') right center / contain no-repeat; }
.calendar { display: flex; flex: 1; min-height: 0; margin-top: 28px; padding-top: 20px; overflow: hidden; border-top: 1px solid var(--sc-border); }
.calendar :deep(figure) { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; gap: 32px; }
.calendar :deep(figure > div) { height: 100%; width: auto; flex: none; }
.calendar :deep(figcaption) { max-width: 260px; font-size: 22px; }
footer { display: flex; justify-content: space-between; gap: 24px; padding-top: 24px; margin-top: 28px; border-top: 2px solid var(--sc-olive); font-size: 20px; color: var(--sc-olive); }
</style>
