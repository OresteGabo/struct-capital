<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  value?: number | null
  asOf?: string
  source?: string
  state?: 'ready' | 'loading' | 'error' | 'unavailable'
  stale?: boolean
}>(), { state: 'unavailable', value: null, stale: false, asOf: undefined, source: undefined })
const validDate = computed(() => props.asOf && Number.isFinite(Date.parse(props.asOf)))
const available = computed(() => props.state === 'ready' && typeof props.value === 'number'
  && Number.isFinite(props.value) && validDate.value && Boolean(props.source?.trim()))
const dateLabel = computed(() => validDate.value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(props.asOf!)) : '')
</script>

<template>
  <ScCard :aria-busy="state === 'loading'" class="sc-stack">
    <dl>
      <dt class="text-label text-muted">{{ label }}</dt>
      <dd class="mt-2 text-heading sc-financial">{{ available ? new Intl.NumberFormat('en-GB').format(value!) : '—' }}</dd>
    </dl>
    <p v-if="available" class="text-caption text-muted">
      <span v-if="stale">May be out of date. </span>As of <time :datetime="asOf">{{ dateLabel }}</time> · {{ source }}
    </p>
    <p v-else role="status" class="text-label text-muted">{{ state === 'loading' ? 'Loading statistic…' : 'Statistic unavailable.' }}</p>
  </ScCard>
</template>
