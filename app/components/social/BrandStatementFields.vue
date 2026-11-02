<script setup lang="ts">
import type { StatementContent } from '../../../shared/social'
import { brandPhotos } from '../../../shared/social-photos'
const statement = defineModel<StatementContent>({ required: true })
</script>

<template>
  <div class="sc-stack">
    <div><label for="statement-variation" class="sc-label">Statement variation</label><select id="statement-variation" v-model="statement.variation" class="sc-input"><option value="typography">A · Typography-led</option><option value="photography">B · Photography-led</option></select></div>
    <div><label for="statement-theme" class="sc-label">Statement theme</label><select id="statement-theme" v-model="statement.theme" class="sc-input"><option value="ivory">Ivory / olive</option><option value="olive">Olive / cream</option></select></div>
    <div><label for="statement-pattern" class="sc-label">Statement geometry</label><select id="statement-pattern" v-model="statement.pattern" class="sc-input"><option value="none">None</option><option value="signature">Small SC signature</option><option value="rule">Short gold rule</option></select></div>
    <template v-if="statement.variation === 'photography'">
      <p v-if="!statement.photoId" role="note" class="sc-draft-notice text-label">A real Kigali or Rwanda photograph is missing. Photography exports are labeled draft proofs. Add a reviewed user-provided image to the existing photo registry.</p>
      <div><label for="statement-photo" class="sc-label">Statement photograph</label><select id="statement-photo" v-model="statement.photoId" class="sc-input"><option value="">Missing asset / draft proof</option><option v-for="photo in brandPhotos" :key="photo.id" :value="photo.id">{{ photo.alt }}</option></select></div>
      <div><label for="statement-crop-x" class="sc-label">Photo horizontal position ({{ statement.cropX }}%)</label><input id="statement-crop-x" v-model.number="statement.cropX" type="range" min="0" max="100" class="w-full"></div>
      <div><label for="statement-crop-y" class="sc-label">Photo vertical position ({{ statement.cropY }}%)</label><input id="statement-crop-y" v-model.number="statement.cropY" type="range" min="0" max="100" class="w-full"></div>
    </template>
    <div><label for="statement-brand" class="sc-label">Statement brand text</label><input id="statement-brand" v-model="statement.brand" maxlength="40" class="sc-input" required></div>
    <div><label for="statement-footer" class="sc-label">Statement footer</label><input id="statement-footer" v-model="statement.footer" maxlength="60" class="sc-input" required></div>
    <div><label for="statement-note" class="sc-label">Statement note</label><textarea id="statement-note" v-model="statement.note" maxlength="100" class="sc-input" rows="3" required /></div>
  </div>
</template>
