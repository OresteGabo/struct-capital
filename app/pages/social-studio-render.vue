<script setup lang="ts">
import SocialEditorial from '../components/social/templates/SocialEditorial.vue'
import { parseSocialFormat, parseSocialPost } from '../../shared/social'
definePageMeta({ layout: false })
useHead({ title: 'Local social render', meta: [{ name: 'robots', content: 'noindex, nofollow' }], htmlAttrs: { 'data-theme': 'light' } })
const route = useRoute()
const content = computed(() => {
  try {
    return { post: parseSocialPost(JSON.parse(String(route.query.post))), format: parseSocialFormat(route.query.format) }
  } catch { return null }
})
</script>

<template>
  <SocialEditorial v-if="content" :post="content.post" :format="content.format" />
  <p v-else>Invalid render parameters.</p>
</template>
