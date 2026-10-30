<script setup lang="ts">
import { articles, categories, relatedArticles, formatLearningDate, articleStructuredData, serializeStructuredData, type ArticleBody } from '~~/shared/learning'
definePageMeta({ key: route => route.path })
const route = useRoute()
const article = articles.find(item => item.slug === route.params.slug)
if (!article) throw createError({ statusCode: 404, statusMessage: 'Learning resource not found' })
const category = categories.find(item => item.slug === article.category)!
const loaders = import.meta.glob<ArticleBody>('../../generated/learn/*.json', { import: 'default' })
const loader = loaders[`../../generated/learn/${article.slug}.json`]
if (!loader) throw createError({ statusCode: 500, statusMessage: 'Learning resource unavailable' })
const { data: body } = await useAsyncData(`learn-${article.slug}`, loader)
if (!body.value) throw createError({ statusCode: 500, statusMessage: 'Learning resource unavailable' })
const isDraft = article.status === 'draft'
const related = relatedArticles(article)
useSiteSeo({ title: article.title, description: article.description, noindex: isDraft })
useSeoMeta({ ogType: isDraft ? 'website' : 'article' })
const structured = articleStructuredData(article)
if (structured) useHead({ script: [{ key: 'learning-article', type: 'application/ld+json', innerHTML: serializeStructuredData(structured) }] })
</script>

<template>
  <ScContainer v-if="article && body" class="pb-14">
    <article>
      <header class="sc-stack pt-8 pb-10">
        <ScBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Learn', to: '/learn' }, { label: category.title, to: `/learn/category/${category.slug}` }, { label: article.title }]" />
        <p class="text-label font-semibold text-brand-primary">{{ category.title }} · {{ isDraft ? 'Editorial outline' : 'Learning guide' }}</p>
        <h1 class="max-w-4xl text-display">{{ article.title }}</h1>
        <p class="sc-reading text-lead text-muted">{{ article.description }}</p>
        <p class="text-label text-muted">By Struct Capital · {{ article.readingMinutes }} min read · Updated <time :datetime="article.updatedAt">{{ formatLearningDate(article.updatedAt) }}</time></p>
      </header>
      <aside v-if="isDraft" class="sc-draft-notice mb-10" aria-label="Editorial status"><strong>Draft — factual review pending.</strong><p>This is an editorial outline, not a completed educational guide. Do not use it to interpret an individual investment document or make an investment decision.</p></aside>
      <div v-else class="sc-learning-note mb-10">
        <p><strong>Sources checked <time :datetime="article.reviewedAt!">{{ formatLearningDate(article.reviewedAt!) }}</time>.</strong> Next source review due <time :datetime="article.reviewDue!">{{ formatLearningDate(article.reviewDue!) }}</time>.</p>
        <p>General education, not personalized investment, tax or legal advice. Returns and payments are not guaranteed. Source checking is not professional or regulatory approval.</p>
      </div>
      <div class="sc-article-layout">
        <aside class="sc-article-contents">
          <nav aria-label="Article contents">
            <details open class="rounded-card border border-border bg-surface p-5">
              <summary class="cursor-pointer font-semibold">In this {{ isDraft ? 'outline' : 'guide' }}</summary>
              <ol class="mt-4 grid gap-3 text-label"><li v-for="heading in body.toc" :key="heading.id" :class="heading.level === 3 ? 'ml-4' : ''"><a :href="`#${heading.id}`" class="sc-link">{{ heading.title }}</a></li><li v-if="article.sources.length"><a href="#article-sources" class="sc-link">Sources &amp; scope</a></li></ol>
            </details>
          </nav>
        </aside>
        <div class="min-w-0">
          <!-- Only trusted repository Markdown compiled with raw HTML disabled. -->
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="sc-article-body" v-html="body.html" />
          <section v-if="article.sources.length" id="article-sources" aria-labelledby="sources-title" class="mt-12 border-t border-border pt-8">
            <h2 id="sources-title" class="text-title">Sources &amp; scope</h2>
            <p class="mt-3 text-label text-muted">Links are evidence for the stated concepts, not endorsements or partnerships. Foreign sources do not establish Rwanda rules.</p>
            <ol class="mt-6 grid gap-6"><li v-for="source in article.sources" :key="source.url" class="sc-stack"><ScLink :to="source.url" external>{{ source.title }}</ScLink><p class="text-label text-muted">{{ source.scope }}</p><p class="text-caption text-muted">Checked <time :datetime="source.checkedAt">{{ formatLearningDate(source.checkedAt) }}</time></p></li></ol>
          </section>
        </div>
      </div>
    </article>
    <section v-if="related.length" aria-labelledby="related-title" class="sc-page-section">
      <h2 id="related-title" class="mb-6 text-heading">Keep building the picture.</h2>
      <div class="grid gap-5 md:grid-cols-3"><ScArticleCard v-for="item in related" :key="item.slug" :article="item" /></div>
    </section>
    <ScCta title="From understanding to organized records." description="See how Struct Capital brings supported imports, manual entry and investment tracking together. No broker partnership is required for supported independent workflows." to="/how-it-works" label="See how Struct Capital works" />
  </ScContainer>
</template>
