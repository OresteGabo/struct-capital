<script setup lang="ts">
import { categories } from '~~/shared/learning'
definePageMeta({ key: route => route.path })
const route = useRoute()
const category = categories.find(item => item.slug === route.params.category)
if (!category) throw createError({ statusCode: 404, statusMessage: 'Learning category not found' })
useSiteSeo({ title: `${category.title} — learning resources`, description: category.description })
</script>

<template>
  <ScContainer v-if="category">
    <div class="sc-stack pt-8 pb-12">
      <ScBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Learn', to: '/learn' }, { label: category.title }]" />
      <ScSectionHeading :level="1" eyebrow="Investing, explained" :title="category.title" :description="category.description" />
      <p class="text-label text-muted">Educational resources, not personalized investment advice.</p>
    </div>
    <ScLearningIndex :category="category.slug" />
    <p class="pb-14"><ScLink to="/learn">Explore all learning resources</ScLink></p>
  </ScContainer>
</template>
