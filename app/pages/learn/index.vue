<script setup lang="ts">
import { categories } from '~~/shared/learning'
useSiteSeo({ title: 'Learn about investing in Rwanda', description: 'Understand Rwanda Treasury bonds, shares, coupons, investment documents and recordkeeping with source-linked educational guides and clearly marked editorial outlines.' })
</script>

<template>
  <ScContainer>
    <ScPageIntro label="Learn" eyebrow="A clearer understanding" title="Understand the investment. Then see the whole picture." description="Plain-language reading for investors in Rwanda. Start with the concepts, keep the original evidence, and know which questions to ask." />
    <div class="sc-learning-note mb-10"><p>Education, not personalized investment advice. Investments can lose value. Each guide identifies its sources and when they were checked; current issue terms always need their own verification.</p></div>
    <nav aria-label="Learning categories" class="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink v-for="category in categories" :key="category.slug" :to="`/learn/category/${category.slug}`" class="sc-learning-category"><span>{{ category.title }}</span><span aria-hidden="true">↗</span></NuxtLink>
    </nav>
    <ScLearningIndex />
    <div class="pb-14"><ScCta title="Put clearer records behind your decisions." description="Explore independent tracking for bonds, shares, documents and income across brokers. Struct Capital does not execute trades or hold investment funds." to="/features" label="Explore Struct Capital" /></div>
  </ScContainer>
</template>
