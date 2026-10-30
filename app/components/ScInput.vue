<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const model = defineModel<string>({ required: true })
const props = withDefaults(defineProps<{
  id?: string
  label: string
  hint?: string
  error?: string
  type?: 'text' | 'email' | 'tel' | 'url' | 'search'
  multiline?: boolean
  required?: boolean
}>(), { type: 'text', multiline: false, required: false, id: undefined, hint: undefined, error: undefined })
const generatedId = useId()
const fieldId = computed(() => props.id ?? generatedId)
</script>

<template>
  <ScFormField :id="fieldId" v-slot="field" :label="label" :hint="hint" :error="error" :required="required">
    <textarea v-if="multiline" :id="fieldId" v-model="model" v-bind="$attrs" class="sc-input min-h-32" :required="required" :aria-invalid="field.invalid" :aria-describedby="field.describedBy" />
    <input v-else :id="fieldId" v-model="model" v-bind="$attrs" :type="type" class="sc-input" :required="required" :aria-invalid="field.invalid" :aria-describedby="field.describedBy">
  </ScFormField>
</template>
