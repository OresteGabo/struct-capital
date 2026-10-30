<script setup lang="ts">
defineProps<{ id: string, label: string, hint?: string, error?: string, required?: boolean }>()
</script>

<template>
  <div>
    <label :for="id" class="sc-label">{{ label }}<span v-if="required"> (required)</span></label>
    <slot :described-by="[hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined" :invalid="error ? true : undefined" />
    <p v-if="hint" :id="`${id}-hint`" class="mt-2 text-label text-muted">{{ hint }}</p>
    <p v-if="error" :id="`${id}-error`" class="mt-2 text-label text-danger">{{ error }}</p>
  </div>
</template>
