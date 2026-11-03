<script setup lang="ts">
import type { BondContent } from '../../../shared/social'
const bond = defineModel<BondContent>({ required: true })
const fields = [
  { key: 'brand', label: 'Bond brand text', limit: 40 },
  { key: 'exampleNote', label: 'Illustrative assumptions label', limit: 110 },
  { key: 'timelineHeading', label: 'Timeline heading', limit: 60 },
  { key: 'dateHeading', label: 'Date column heading', limit: 24 },
  { key: 'eventHeading', label: 'Event column heading', limit: 24 },
  { key: 'valueHeading', label: 'Value column heading', limit: 30 },
  { key: 'footnote', label: 'Bond footnote', limit: 230 },
  { key: 'source', label: 'Bond source credit', limit: 100 },
  { key: 'footer', label: 'Bond footer text', limit: 60 },
] as const
function addCoupon() {
  if (bond.value.events.length < 6) bond.value.events.splice(-1, 0, { kind: 'coupon', date: 'Set date', label: 'Coupon payment', value: 'Set amount' })
}
</script>

<template>
  <div class="sc-stack">
    <p class="text-label text-muted">Illustrative examples only. Dates and values are text; this studio does not calculate or verify bond terms.</p>
    <div v-for="field in fields" :key="field.key">
      <label :for="`bond-${field.key}`" class="sc-label">{{ field.label }}</label>
      <textarea :id="`bond-${field.key}`" v-model="bond[field.key]" class="sc-input" :maxlength="field.limit" :rows="field.key === 'footnote' ? 4 : 2" required />
    </div>
    <fieldset v-for="(event, index) in bond.events" :key="index" class="sc-card sc-stack">
      <legend class="text-label font-semibold">Event {{ index + 1 }} · {{ event.kind }}</legend>
      <div><label :for="`bond-date-${index}`" class="sc-label">Event {{ index + 1 }} date</label><input :id="`bond-date-${index}`" v-model="event.date" class="sc-input" maxlength="24" required></div>
      <div><label :for="`bond-label-${index}`" class="sc-label">Event {{ index + 1 }} label</label><input :id="`bond-label-${index}`" v-model="event.label" class="sc-input" maxlength="54" required></div>
      <div><label :for="`bond-value-${index}`" class="sc-label">Event {{ index + 1 }} value</label><input :id="`bond-value-${index}`" v-model="event.value" class="sc-input" maxlength="26" required></div>
      <ScButton v-if="event.kind === 'coupon' && bond.events.length > 3" variant="outline" :aria-label="`Remove coupon event ${index + 1}`" @click="bond.events.splice(index, 1)">Remove coupon</ScButton>
    </fieldset>
    <ScButton variant="outline" :disabled="bond.events.length >= 6" @click="addCoupon">Add coupon event</ScButton>
  </div>
</template>
