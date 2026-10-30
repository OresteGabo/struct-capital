<script setup lang="ts">
import { faqCategories, filterFaq } from '~/data/faq'
useSiteSeo({ title: 'Frequently asked questions', description: 'Answers about broker independence, supported PDF imports, manual entry, privacy, pricing uncertainty, and future integrations for Struct Capital.' })
const query = ref('')
async function clearFilters() {
  query.value = ''
  category.value = 'All topics'
  await nextTick()
  document.getElementById('faq-search')?.focus()
}
const category = ref('All topics')
const results = computed(() => filterFaq(query.value, category.value))
const groups = computed(() => faqCategories.slice(1).map(name => ({ name, items: results.value.filter(item => item.category === name) })).filter(group => group.items.length))
</script>

<template>
  <ScContainer>
    <ScPageIntro label="FAQ" eyebrow="A little more clarity" title="Good questions. Straight answers." description="Understand what the app does, where its limits are, and how it fits alongside your broker." />
    <div class="grid gap-5 rounded-card border border-border bg-surface-muted p-5 md:grid-cols-2">
      <ScInput id="faq-search" v-model="query" label="Search questions" type="search" placeholder="Try broker, PDF, manual, or privacy" maxlength="200" autocomplete="off" />
      <ScSelect v-model="category" label="FAQ category" :options="faqCategories.map(value => ({ label: value, value }))" />
    </div>
    <noscript><p class="mt-4 text-label text-muted">Search needs JavaScript. All answers are grouped below and can be opened with the keyboard.</p></noscript>
    <p role="status" class="my-5 text-label text-muted">{{ results.length }} {{ results.length === 1 ? 'answer' : 'answers' }} found</p>
    <div v-if="groups.length" class="grid gap-12 pb-14">
      <section v-for="group in groups" :key="group.name" class="sc-stack"><h2 class="text-title">{{ group.name }}</h2><ScFaq :items="[...group.items]" /></section>
    </div>
    <ScState v-else kind="empty" title="No matching questions" description="Try another term or clear the filters." class="mb-14"><ScButton variant="outline" class="justify-self-start" @click="clearFilters">Clear filters</ScButton></ScState>
    <div class="pb-14"><ScCta title="Still have a question?" description="Ask about the product or a document type. Keep account numbers, balances, and investment PDFs out of your inquiry." to="/contact" label="Contact Struct Capital" /></div>
  </ScContainer>
</template>
