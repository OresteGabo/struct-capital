<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const model = defineModel<string>({ required: true })
const props = defineProps<{
  id?: string
  label: string
  options: { label: string, value: string }[]
  hint?: string
  error?: string
  required?: boolean
}>()
const generatedId = useId()
const fieldId = computed(() => props.id ?? generatedId)
</script>

<template>
  <ScFormField :id="fieldId" v-slot="field" :label="label" :hint="hint" :error="error" :required="required">
    <select :id="fieldId" v-model="model" v-bind="$attrs" class="sc-input" :required="required" :aria-invalid="field.invalid" :aria-describedby="field.describedBy">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </ScFormField>
</template>
