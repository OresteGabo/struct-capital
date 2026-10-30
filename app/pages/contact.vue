<script setup lang="ts">
import { contactTopics, validateContact } from '~~/shared/contact'
import type { ContactErrors } from '~~/shared/contact'
import { indexingEnabled } from '~~/shared/site'
useSiteSeo({ title: 'Contact', description: 'Ask about Struct Capital, supported document formats, or institutional interest. Contact delivery availability is shown honestly; do not send financial documents.' })
const enabled = indexingEnabled(useRuntimeConfig().public.contactEnabled)
const form = reactive({ name: '', email: '', topic: 'general', message: '', consent: false, website: '' })
const errors = ref<ContactErrors>({})
const startedAt = ref(0)
const sending = ref(false)
const phase = ref<'idle' | 'error' | 'accepted'>('idle')
const feedback = ref('')
const feedbackRegion = useTemplateRef<HTMLDivElement>('feedbackRegion')
onMounted(() => { startedAt.value = Date.now() })
async function focusError() {
  await nextTick()
  const first = ['name', 'email', 'topic', 'message', 'consent'].find(key => errors.value[key as keyof ContactErrors])
  if (first) document.getElementById(`contact-${first}`)?.focus()
  else feedbackRegion.value?.focus()
}
async function submit() {
  if (!enabled || sending.value) return
  feedback.value = ''
  phase.value = 'idle'
  const payload = { ...form, startedAt: startedAt.value }
  const validation = validateContact(payload)
  errors.value = validation.errors
  if (!validation.message) {
    phase.value = 'error'
    feedback.value = 'Please check the highlighted fields. Nothing has been sent.'
    await focusError()
    return
  }
  sending.value = true
  try {
    const response = await $fetch<{ accepted?: boolean }>('/api/contact', { method: 'POST', body: payload, retry: 0 })
    if (response.accepted !== true) throw new Error('No acceptance acknowledgment')
    phase.value = 'accepted'
    feedback.value = 'The contact service accepted your message. This confirms acceptance, not that someone has read or replied to it.'
    Object.assign(form, { name: '', email: '', topic: 'general', message: '', consent: false, website: '' })
    startedAt.value = Date.now()
  } catch (error) {
    const failure = error as { statusCode?: number, data?: { data?: { errors?: ContactErrors } } }
    errors.value = failure.data?.data?.errors ?? {}
    phase.value = 'error'
    feedback.value = failure.statusCode === 429
      ? 'Too many attempts. Please wait ten minutes before trying again. Your text is still here.'
      : failure.statusCode === 503
        ? 'Contact delivery is unavailable. Your message has not been sent. Your text is still here.'
        : failure.statusCode === 400
          ? 'Please check your entries, or reload the page if this form has been open for a long time. Nothing has been sent.'
          : 'We could not confirm acceptance of your message. Your text is still here. Please try again later; retrying after a timeout may create a duplicate.'
  } finally {
    sending.value = false
    await nextTick()
    if (phase.value === 'error') await focusError()
    else feedbackRegion.value?.focus()
  }
}
</script>

<template>
  <ScContainer>
    <ScPageIntro label="Contact" eyebrow="Questions, feedback, possibilities" title="Let’s make the picture clearer." description="Ask about the product, a document type, or a potential institutional conversation." />
    <div class="grid items-start gap-10 pb-14 lg:grid-cols-[0.65fr_1fr]">
      <aside class="sc-stack">
        <ScCard variant="muted" class="sc-stack"><h2 class="text-title">Keep your financial records private</h2><p class="text-muted">Do not include investment PDFs, account numbers, balances, identity documents, passwords, or brokerage credentials. Describe the question in general terms.</p><ScLink to="/faq">Check the FAQ first</ScLink></ScCard>
        <p class="text-label text-muted">For a document-format question, name the document category and explain what did not work. No attachment is needed.</p>
        <p class="text-label text-muted">Institutional inquiries are conversations about potential software needs, not evidence of an existing partnership or service agreement.</p>
        <ScLink to="/privacy">Read the website privacy draft</ScLink>
      </aside>
      <div class="sc-stack">
        <ScState v-if="!enabled" kind="empty" title="Contact delivery is not available yet" description="This form cannot send messages at the moment. The fields are disabled so you do not enter details that cannot be delivered." />
        <noscript><p class="sc-draft-notice">The contact form requires JavaScript for validation and delivery feedback. No message is sent automatically.</p></noscript>
        <form method="post" action="/api/contact" novalidate :aria-busy="sending" @submit.prevent="submit">
          <fieldset :disabled="!enabled || sending" class="sc-stack">
            <legend class="mb-5 text-title font-bold">Your inquiry</legend>
            <ScInput id="contact-name" v-model="form.name" name="name" label="Name" autocomplete="name" maxlength="100" :error="errors.name" required />
            <ScInput id="contact-email" v-model="form.email" name="email" type="email" label="Email" autocomplete="email" maxlength="254" :error="errors.email" required />
            <ScSelect id="contact-topic" v-model="form.topic" name="topic" label="Topic" :options="[...contactTopics]" :error="errors.topic" required />
            <ScInput id="contact-message" v-model="form.message" name="message" label="Message" multiline maxlength="4000" hint="20–4,000 characters. Do not include private investment information." :error="errors.message" required />
            <div class="hidden" aria-hidden="true"><label for="contact-website">Leave this field empty</label><input id="contact-website" v-model="form.website" name="website" tabindex="-1" autocomplete="off"></div>
            <ScCheckbox id="contact-consent" v-model="form.consent" name="consent" label="You may use these contact details to respond to this inquiry." :error="errors.consent" required />
            <p class="text-caption text-muted">This permission is for replying to your inquiry, not marketing subscription or acceptance of draft terms. The website privacy draft describes the implemented data flow and the details still requiring review.</p>
            <ScButton type="submit" :disabled="!enabled || sending" class="justify-self-start">{{ sending ? 'Sending…' : enabled ? 'Send inquiry' : 'Sending unavailable' }}</ScButton>
          </fieldset>
        </form>
        <div v-if="feedback" ref="feedbackRegion" tabindex="-1"><ScState :kind="phase === 'error' ? 'error' : 'empty'" :title="phase === 'accepted' ? 'Message accepted' : 'Message not confirmed'" :description="feedback" /></div>
      </div>
    </div>
  </ScContainer>
</template>
