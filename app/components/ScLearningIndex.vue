<script setup lang="ts">
import { filterArticles, topics } from '~~/shared/learning'
const props = defineProps<{ category?: string }>()
const query = ref('')
const topic = ref('')
const results = computed(() => filterArticles(query.value, props.category, topic.value))
const guides = computed(() => results.value.filter(article => article.status === 'source-checked'))
const drafts = computed(() => results.value.filter(article => article.status === 'draft'))
const availableTopics = computed(() => topics.filter(value => filterArticles('', props.category, value).length))
async function reset() {
  query.value = ''; topic.value = ''
  await nextTick()
  document.getElementById('learn-search')?.focus()
}
</script>

<template>
  <div class="grid gap-5 rounded-card border border-border bg-surface-muted p-5 md:grid-cols-2">
    <ScInput id="learn-search" v-model="query" label="Search learning resources" type="search" placeholder="Try coupon, dividends, or documents" maxlength="200" autocomplete="off" />
    <ScSelect v-model="topic" label="Investment topic" :options="[{ label: 'All topics', value: '' }, ...availableTopics.map(value => ({ label: value, value }))]" />
  </div>
  <noscript><p class="mt-4 text-label text-muted">All resources appear below. Search and topic filtering need JavaScript; category links work without it.</p></noscript>
  <p role="status" class="my-5 text-label text-muted">{{ guides.length }} {{ guides.length === 1 ? 'guide' : 'guides' }} and {{ drafts.length }} {{ drafts.length === 1 ? 'editorial outline' : 'editorial outlines' }} found</p>
  <section v-if="guides.length" aria-labelledby="learning-guides" class="sc-stack pb-12">
    <h2 id="learning-guides" class="text-heading">Build your understanding.</h2>
    <div class="grid gap-5 md:grid-cols-2"><ScArticleCard v-for="article in guides" :key="article.slug" :article="article" /></div>
  </section>
  <section v-if="drafts.length" aria-labelledby="learning-outlines" class="sc-stack pb-12">
    <h2 id="learning-outlines" class="text-title">On the editorial desk</h2>
    <p class="sc-reading text-muted">These outlines show what still needs research. They are not completed guides and contain no current rates, fees or allocation instructions.</p>
    <div class="grid gap-5 md:grid-cols-2"><ScArticleCard v-for="article in drafts" :key="article.slug" :article="article" /></div>
  </section>
  <ScState v-if="!results.length" kind="empty" title="No matching resources" description="Try a broader search or clear the topic filter." class="mb-12"><ScButton variant="outline" class="justify-self-start" @click="reset">Clear filters</ScButton></ScState>
</template>
