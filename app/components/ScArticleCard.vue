<script setup lang="ts">
import { categories, formatLearningDate, type LearningArticle } from '~~/shared/learning'
defineProps<{ article: LearningArticle }>()
</script>

<template>
  <article class="sc-card flex h-full flex-col gap-4">
    <p class="text-caption font-semibold text-brand-primary">{{ categories.find(category => category.slug === article.category)?.title }} <span v-if="article.status === 'draft'">· Editorial outline</span></p>
    <h3 class="text-title"><NuxtLink :to="`/learn/${article.slug}`" class="sc-article-title">{{ article.title }}</NuxtLink></h3>
    <p class="text-muted">{{ article.description }}</p>
    <p class="mt-auto pt-3 text-caption text-muted">{{ article.readingMinutes }} min read · {{ article.status === 'draft' ? 'Updated' : 'Sources checked' }} <time :datetime="article.reviewedAt ?? article.updatedAt">{{ formatLearningDate(article.reviewedAt ?? article.updatedAt) }}</time></p>
  </article>
</template>
