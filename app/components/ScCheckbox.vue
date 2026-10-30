<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const model = defineModel<boolean>({ required: true })
const props = defineProps<{ label: string, id?: string, hint?: string, error?: string, required?: boolean }>()
const generatedId = useId()
const fieldId = computed(() => props.id ?? generatedId)
</script>

<template>
  <div>
    <label :for="fieldId" class="flex min-h-12 cursor-pointer items-start gap-3 py-3">
      <input :id="fieldId" v-model="model" v-bind="$attrs" type="checkbox" class="mt-1 size-5 shrink-0 accent-brand-primary" :required="required" :aria-invalid="error ? true : undefined" :aria-describedby="[hint ? `${fieldId}-hint` : '', error ? `${fieldId}-error` : ''].filter(Boolean).join(' ') || undefined">
      <span>{{ label }}<span v-if="required"> (required)</span></span>
    </label>
    <p v-if="hint" :id="`${fieldId}-hint`" class="text-label text-muted">{{ hint }}</p>
    <p v-if="error" :id="`${fieldId}-error`" class="mt-2 text-label text-danger">{{ error }}</p>
  </div>
</template>
