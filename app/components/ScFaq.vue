<script setup lang="ts">
defineProps<{ items: { question: string, answer: string }[] }>()
</script>

<template>
  <div class="divide-y divide-border border-y border-border">
    <details v-for="item in items" :key="item.question" class="sc-faq py-1">
      <summary class="flex min-h-14 cursor-pointer items-center justify-between gap-5 py-4 font-semibold">
        {{ item.question }}<span class="sc-faq-marker text-brand-primary" aria-hidden="true">+</span>
      </summary>
      <p class="sc-reading pb-5 text-muted">{{ item.answer }}</p>
    </details>
  </div>
</template>
