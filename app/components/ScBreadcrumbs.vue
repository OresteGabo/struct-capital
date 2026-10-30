<script setup lang="ts">
defineProps<{ items: { label: string, to?: string }[] }>()
</script>

<template>
  <nav v-if="items.length" aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-2 text-label">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-2">
        <span v-if="index" aria-hidden="true" class="text-muted">/</span>
        <ScLink v-if="item.to && index < items.length - 1" :to="item.to">{{ item.label }}</ScLink>
        <span v-else :aria-current="index === items.length - 1 ? 'page' : undefined" class="text-muted">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
