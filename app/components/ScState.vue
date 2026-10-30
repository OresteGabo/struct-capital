<script setup lang="ts">
withDefaults(defineProps<{ kind: 'loading' | 'error' | 'empty', title: string, description?: string, retryLabel?: string, retryable?: boolean }>(), { retryLabel: 'Try again', retryable: false, description: undefined })
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <ScCard :role="kind === 'error' ? 'alert' : 'status'" :aria-busy="kind === 'loading'" class="sc-stack">
    <p class="font-semibold" :class="kind === 'error' ? 'text-danger' : 'text-ink'">{{ title }}</p>
    <p v-if="description" class="text-muted">{{ description }}</p>
    <ScButton v-if="kind === 'error' && retryable" variant="outline" class="justify-self-start" @click="emit('retry')">{{ retryLabel }}</ScButton>
    <slot />
  </ScCard>
</template>
