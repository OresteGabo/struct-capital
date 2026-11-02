<script setup lang="ts">
import type { SocialPost, SocialFormat } from '../../../shared/social'
import SocialEditorial from './templates/SocialEditorial.vue'
import KigaliEditorial from './templates/KigaliEditorial.vue'
import InvestorEducation from './templates/InvestorEducation.vue'
import TreasuryBondExplainer from './templates/TreasuryBondExplainer.vue'
import ProductShowcase from './templates/ProductShowcase.vue'
import BrandStatement from './templates/BrandStatement.vue'
import ThreeStepGuide from './templates/ThreeStepGuide.vue'
defineProps<{ post: SocialPost, format: SocialFormat }>()
</script>

<template>
  <KigaliEditorial v-if="post.template === 'kigali'" :post="post" :format="format" />
  <InvestorEducation v-else-if="post.template === 'education'" :post="post" :format="format" />
  <TreasuryBondExplainer v-else-if="post.template === 'treasury-bond'" :post="post" :format="format" />
  <ProductShowcase v-else-if="post.template === 'product-showcase'" :post="post" :format="format" />
  <BrandStatement v-else-if="post.template === 'brand-statement'" :post="post" :format="format" />
  <ThreeStepGuide v-else-if="post.template === 'three-step-guide'" :post="post" :format="format" />
  <SocialEditorial v-else :post="post" :format="format" />
</template>
