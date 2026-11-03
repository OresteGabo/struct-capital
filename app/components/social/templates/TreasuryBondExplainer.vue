<script setup lang="ts">
import type { SocialFormat, SocialPost } from '../../../../shared/social'
import SocialCanvas from '../SocialCanvas.vue'
defineProps<{ post: SocialPost, format: SocialFormat }>()
</script>

<template>
  <SocialCanvas v-if="post.bond" :format="format" class="bond" :class="[`bond--${format}`, { 'bond--dense': post.bond.events.length > 4 }]">
    <header class="identity" data-bond-header>
      <img src="/brand/struct-capital-symbol.svg" alt="Struct Capital symbol" width="56" height="56">
      <span>{{ post.bond.brand }}</span>
      <p>{{ post.eyebrow }}</p>
    </header>
    <section class="introduction" data-bond-intro>
      <h2>{{ post.headline }}</h2>
      <p class="body">{{ post.body }}</p>
      <div class="example">
        <strong>Illustrative example</strong>
        <p>{{ post.bond.exampleNote }}</p>
      </div>
    </section>
    <section class="timeline" data-bond-timeline>
      <h3>{{ post.bond.timelineHeading }}</h3>
      <div class="column-headings" aria-hidden="true">
        <span>{{ post.bond.dateHeading }}</span><span>{{ post.bond.eventHeading }}</span><span>{{ post.bond.valueHeading }}</span>
      </div>
      <ol>
        <li v-for="(event, index) in post.bond.events" :key="index" class="event" :class="`event--${event.kind}`" data-bond-event>
          <span class="date"><span class="sr-only">{{ post.bond.dateHeading }}: </span><span>{{ event.date }}</span></span>
          <span class="event-label"><span class="sr-only">{{ post.bond.eventHeading }}: </span><span>{{ event.label }}</span></span>
          <span class="value"><span class="sr-only">{{ post.bond.valueHeading }}: </span><span>{{ event.value }}</span></span>
        </li>
      </ol>
    </section>
    <footer data-bond-footer>
      <p class="footnote">{{ post.bond.footnote }}</p>
      <div class="source"><p>{{ post.bond.source }}</p><p>{{ post.bond.footer }}</p></div>
    </footer>
  </SocialCanvas>
</template>

<style scoped>
.bond { padding: 56px 72px; }
.identity { display: flex; gap: 16px; align-items: center; color: var(--sc-olive); }
.identity img { width: 56px; height: 56px; flex: none; }
.identity span { font-size: 26px; font-weight: 650; max-width: 380px; overflow-wrap: anywhere; }
.identity > p { margin-left: auto; max-width: 300px; text-align: right; font-size: 17px; letter-spacing: .05em; overflow-wrap: anywhere; }
.introduction { margin-top: 32px; overflow-wrap: anywhere; }
h2 { max-width: 880px; color: var(--sc-olive); font-size: 66px; line-height: 1.08; letter-spacing: -.04em; }
.body { margin-top: 18px; max-width: 860px; font-size: 25px; line-height: 1.45; }
.example { margin-top: 24px; padding-left: 18px; border-left: 4px solid var(--sc-gold); }
.example strong { color: var(--sc-olive); font-size: 18px; font-weight: 650; text-transform: uppercase; letter-spacing: .08em; }
.example p { font-size: 18px; line-height: 1.4; margin-top: 4px; }
.timeline { flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: center; padding-block: 32px; }
h3 { font-size: 24px; color: var(--sc-olive); margin-bottom: 18px; overflow-wrap: anywhere; }
.column-headings, .event { display: grid; grid-template-columns: 170px minmax(0, 1fr) 235px; gap: 24px; padding-left: 36px; }
.column-headings { color: var(--sc-muted); font-size: 16px; line-height: 1.3; margin-bottom: 12px; overflow-wrap: anywhere; }
.column-headings span:last-child { text-align: right; }
ol { position: relative; margin-left: 0; padding: 0; list-style: none; }
ol::before { content: ''; position: absolute; left: 6px; top: 34px; bottom: 34px; width: 1px; background: var(--sc-olive); }
.event { position: relative; align-items: baseline; padding-block: 17px; border-bottom: 1px solid var(--sc-border); overflow-wrap: anywhere; }
.event:last-child { border-bottom: none; }
.event::before { content: ''; position: absolute; left: 0; top: 29px; width: 13px; height: 13px; border: 2px solid var(--sc-olive); background: var(--sc-background); border-radius: 50%; }
.event--maturity::before { background: var(--sc-olive); }
.date { color: var(--sc-muted); font-size: 22px; }
.event-label { font-size: 24px; line-height: 1.4; }
.value { text-align: right; color: var(--sc-olive); font-size: 28px; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.3; }
footer { border-top: 1px solid var(--sc-olive); padding-top: 18px; overflow-wrap: anywhere; }
.footnote { font-size: 18px; line-height: 1.45; max-width: 920px; }
.source { display: flex; justify-content: space-between; gap: 32px; margin-top: 14px; color: var(--sc-olive); font-size: 15px; }
.source > p:first-child { max-width: 640px; }
.source > p:last-child { max-width: 240px; text-align: right; }
.bond--portrait h2 { font-size: 78px; }
.bond--portrait .introduction { margin-top: 48px; }
.bond--portrait .body { font-size: 28px; }
.bond--portrait .event { padding-block: 25px; }
.bond--portrait .event::before { top: 37px; }
.bond--portrait ol::before { top: 42px; bottom: 42px; }
.bond--dense .event { padding-block: 10px; }
.bond--dense .event::before { top: 22px; }
.bond--dense ol::before { top: 27px; bottom: 27px; }
</style>
