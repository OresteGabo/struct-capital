<script setup lang="ts">
import type { SocialFormat, SocialPost } from '../../../../shared/social'
import { productScreenshots } from '../../../../shared/social-product'
import SocialCanvas from '../SocialCanvas.vue'
const props = defineProps<{ post: SocialPost, format: SocialFormat }>()
const screenshot = computed(() => productScreenshots.find(image => image.id === props.post.showcase?.screenshot))
</script>

<template>
  <SocialCanvas v-if="post.showcase && screenshot" :format="format" class="showcase" :class="[`showcase--${format}`, `showcase--${screenshot.layout}`]">
    <header class="identity" data-showcase-header>
      <img src="/brand/struct-capital-symbol.svg" alt="Struct Capital symbol" width="56" height="56">
      <span>{{ post.showcase.brand }}</span><p>{{ post.eyebrow }}</p>
    </header>
    <div class="composition">
      <div class="copy" data-showcase-copy>
        <span class="gold-rule" aria-hidden="true" />
        <h2>{{ post.headline }}</h2>
        <p class="subtitle">{{ post.body }}</p>
      </div>
      <div class="stage" data-showcase-stage>
        <div v-if="post.showcase.pattern !== 'none'" class="geometry" :class="`geometry--${post.showcase.pattern}`" aria-hidden="true" />
        <ScScreenshot
          :key="screenshot.id" class="product-image" :src="screenshot.src" :alt="screenshot.alt" :width="screenshot.width" :height="screenshot.height"
          :caption="screenshot.caption" :frame="false" :priority="true"
          :style="{ width: `${screenshot.displayWidth[format]}px` }"
        />
      </div>
    </div>
    <footer data-showcase-footer><span>{{ post.showcase.footer }}</span><span>{{ post.showcase.note }}</span></footer>
  </SocialCanvas>
</template>

<style scoped>
.showcase { padding: 56px 64px; }
.identity { display: flex; gap: 16px; align-items: center; color: var(--sc-olive); }
.identity > img { width: 56px; height: 56px; flex: none; }
.identity > span { font-size: 26px; font-weight: 650; max-width: 380px; overflow-wrap: anywhere; }
.identity > p { margin-left: auto; max-width: 300px; font-size: 17px; letter-spacing: .04em; text-align: right; overflow-wrap: anywhere; }
.composition { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; gap: 40px; flex: 1; min-height: 0; padding-block: 32px; }
.copy { position: relative; z-index: 1; overflow-wrap: anywhere; }
.gold-rule { display: block; width: 56px; height: 4px; margin-bottom: 26px; background: var(--sc-gold); }
h2 { color: var(--sc-olive); font-size: 76px; overflow-wrap: normal; line-height: 1.06; letter-spacing: -.05em; }
.subtitle { margin-top: 30px; font-size: 27px; line-height: 1.5; }
.stage { position: relative; height: 100%; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.geometry { position: absolute; pointer-events: none; background: var(--sc-olive); mask: url('/brand/struct-capital-symbol.svg') center / contain no-repeat; }
.geometry--signature { width: 100px; height: 100px; left: -50px; bottom: 30px; opacity: .14; }
.geometry--structure { width: 440px; height: 440px; right: -90px; bottom: -10px; opacity: .07; }
.product-image { position: relative; z-index: 1; max-width: 100%; height: auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; }
.product-image :deep(> div) { width: 100%; height: auto; flex: none; }
.product-image :deep(img) { display: block; width: 100%; height: 100%; object-fit: contain; }
.product-image :deep(figcaption) { flex: none; width: 100%; font-size: 18px; line-height: 1.4; color: var(--sc-muted); }
footer { display: flex; justify-content: space-between; gap: 32px; padding-top: 18px; border-top: 1px solid var(--sc-olive); color: var(--sc-olive); font-size: 17px; line-height: 1.4; overflow-wrap: anywhere; }
footer > span:first-child { max-width: 260px; }
footer > span:last-child { max-width: 620px; text-align: right; }
.showcase--portrait h2 { font-size: 82px; }
.showcase--wide .composition { display: flex; flex-direction: column; justify-content: center; align-items: stretch; gap: 40px; padding-block: 24px; }
.showcase--wide .copy { max-width: 860px; }
.showcase--wide h2 { font-size: 80px; }
.showcase--wide .subtitle { max-width: 850px; }
.showcase--wide .stage { height: auto; flex: none; }
.showcase--wide .product-image { height: auto; }
.showcase--portrait.showcase--wide h2 { font-size: 92px; }
</style>
