<template>
  <div>
    <MagicsHeader />
    <h1
      class="leading-relaxed font-primary font-extrabold text-4xl text-center mt-4 py-2 sm:py-4"
      text-violet-700
    >
      {{ pageTitle }}
    </h1>
    <MagicsProductListings :products="displayedMagics" />
  </div>
</template>

<script lang="ts" setup>
import { get, tryOnMounted } from '@vueuse/core'
import { getMagics, getPictures } from '~/api'
import {
  useCheckHasSessionStorageItem,
  useLoadFromSessionStorage,
} from '~/composables/storage'
import type { Magic } from '~/interfaces'

const pageTitle = 'Get Your Magics!'

const displayedMagics = ref<Array<Magic>>([])

tryOnMounted(async() => {
  const magicStorageKey = 'magics'
  const hasSavedMagics = useCheckHasSessionStorageItem(magicStorageKey)

  if (!hasSavedMagics) {
    const _magics = await getMagics()
    const pictures = await getPictures()
    _magics.forEach(magic => magic.pictureUrl = pictures.find(picture => picture.id === magic.picture_id)?.picture_url)
    useSessionStorage(magicStorageKey, _magics)
    displayedMagics.value = _magics
    return
  }

  displayedMagics.value = get(useLoadFromSessionStorage<Array<Magic>>(magicStorageKey)) ?? []
})

</script>
