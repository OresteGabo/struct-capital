<script setup lang="ts">
import type { GuideContent } from '../../../shared/social'
const guide = defineModel<GuideContent>({ required: true })
</script>

<template>
  <div class="sc-stack">
    <div><label for="guide-brand" class="sc-label">Guide brand text</label><input id="guide-brand" v-model="guide.brand" class="sc-input" maxlength="40" required></div>
    <fieldset v-for="(step, index) in guide.steps" :key="index" class="sc-card sc-stack">
      <legend class="text-label font-semibold">Step {{ index + 1 }}</legend>
      <div><label :for="`guide-number-${index}`" class="sc-label">Step {{ index + 1 }} number</label><input :id="`guide-number-${index}`" v-model="step.number" class="sc-input" maxlength="8" required></div>
      <div><label :for="`guide-label-${index}`" class="sc-label">Step {{ index + 1 }} label</label><input :id="`guide-label-${index}`" v-model="step.label" class="sc-input" maxlength="40" required></div>
      <div><label :for="`guide-description-${index}`" class="sc-label">Step {{ index + 1 }} description</label><textarea :id="`guide-description-${index}`" v-model="step.description" class="sc-input" maxlength="140" rows="3" required /></div>
    </fieldset>
    <div><label for="guide-footer" class="sc-label">Guide footer</label><input id="guide-footer" v-model="guide.footer" class="sc-input" maxlength="60" required></div>
    <div><label for="guide-note" class="sc-label">Guide note</label><textarea id="guide-note" v-model="guide.note" class="sc-input" maxlength="140" rows="3" required /></div>
  </div>
</template>
