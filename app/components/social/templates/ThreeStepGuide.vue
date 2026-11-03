<script setup lang="ts">
import type { SocialFormat, SocialPost } from '../../../../shared/social'
import SocialCanvas from '../SocialCanvas.vue'
import ScMonogramMarker from '../ScMonogramMarker.vue'
defineProps<{ post: SocialPost, format: SocialFormat }>()
const fragments = ['S-ribbon', 'C-upper', 'C-lower'] as const
</script>

<template>
  <SocialCanvas v-if="post.guide" :format="format" class="three-step" :class="`three-step--${format}`">
    <header class="identity" data-guide-header>
      <img src="/brand/struct-capital-symbol.svg" alt="Struct Capital symbol" width="56" height="56">
      <span>{{ post.guide.brand }}</span><p>{{ post.eyebrow }}</p>
    </header>
    <div class="intro" data-guide-intro>
      <h2>{{ post.headline }}</h2>
      <p>{{ post.body }}</p>
    </div>
    <div class="guide-main">
      <div class="step-structure">
        <svg class="connection" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M.5 0V1" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke" /></svg>
        <ol class="steps" data-guide-steps>
          <li v-for="(step, index) in post.guide.steps" :key="index" class="step" data-guide-step>
            <span class="marker"><ScMonogramMarker :part="fragments[index]!" /></span>
            <div class="step-copy" data-guide-step-copy>
              <h3><span class="number">{{ step.number }}</span><span>{{ step.label }}</span></h3>
              <p>{{ step.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
    <footer data-guide-footer><p>{{ post.guide.footer }}</p><p>{{ post.guide.note }}</p></footer>
  </SocialCanvas>
</template>

<style scoped>
.three-step { --step-height: 156px; --step-gap: 28px; padding: 56px 72px; }
.identity { display: flex; align-items: center; gap: 16px; color: var(--sc-olive); }
.identity > img { width: 56px; height: 56px; flex: none; }
.identity > span { font-size: 26px; font-weight: 650; max-width: 380px; overflow-wrap: anywhere; }
.identity > p { margin-left: auto; font-size: 17px; text-align: right; max-width: 330px; letter-spacing: .04em; overflow-wrap: anywhere; }
.intro { margin-top: 36px; }
h2 { color: var(--sc-olive); font-size: 68px; line-height: 1.1; letter-spacing: -.045em; overflow-wrap: normal; }
.intro > p { font-size: 26px; line-height: 1.5; margin-top: 16px; max-width: 900px; overflow-wrap: anywhere; }
.guide-main { flex: 1; min-height: 0; display: flex; align-items: center; padding-block: 36px; }
.step-structure { position: relative; width: 100%; }
.steps { position: relative; width: 100%; display: grid; gap: var(--step-gap); padding: 0; margin: 0; list-style: none; }
.connection { position: absolute; left: 39.5px; top: 40px; bottom: calc(var(--step-height) - 40px); width: 1px; height: calc(100% - var(--step-height)); color: var(--sc-olive); opacity: .25; }
.step { position: relative; display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 40px; height: var(--step-height); }
.marker { position: relative; display: block; width: 80px; height: 80px; color: var(--sc-olive); }
.marker > svg { display: block; width: 80px; height: 80px; }
h3 { display: flex; align-items: baseline; gap: 24px; font-size: 44px; line-height: 1.15; color: var(--sc-olive); overflow-wrap: anywhere; }
.number { flex: none; font-size: 20px; font-weight: 500; letter-spacing: .06em; font-variant-numeric: tabular-nums; }
.step-copy > p { font-size: 28px; line-height: 1.5; max-width: 680px; margin-top: 14px; overflow-wrap: anywhere; }
footer { display: flex; flex-direction: column; gap: 10px; font-size: 18px; line-height: 1.45; overflow-wrap: anywhere; }
footer > p:first-child { color: var(--sc-olive); }
footer > p:last-child { color: var(--sc-muted); max-width: 920px; }
.three-step--portrait { --step-height: 200px; --step-gap: 40px; }
.three-step--portrait h2 { font-size: 80px; }
.three-step--portrait .intro { margin-top: 48px; }
.three-step--portrait h3 { font-size: 48px; }
.three-step--portrait .step-copy > p { font-size: 30px; }
</style>
