<script setup lang="ts">
import type { SocialPost, SocialFormat } from '../../../shared/social'
import SocialEditorial from './templates/SocialEditorial.vue'
import KigaliEditorial from './templates/KigaliEditorial.vue'
import InvestorEducation from './templates/InvestorEducation.vue'
defineProps<{ post: SocialPost, format: SocialFormat }>()
</script>

<template>
  <KigaliEditorial v-if="post.template === 'kigali'" :post="post" :format="format" />
  <InvestorEducation v-else-if="post.template === 'education'" :post="post" :format="format" />
  <SocialEditorial v-else :post="post" :format="format" />
</template>
