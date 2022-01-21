<template>
  <MagicsHeader />
  <div class="my-8">
    <div class="container mx-auto px-6">
      <div class="md:flex md:items-center">
        <div class="w-full h-64 md:w-1/2 lg:h-96">
          <img :src="magic.pictureUrl" alt="" class="h-full w-full rounded-md object-cover max-w-lg mx-auto">
        </div>
        <div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 class="text-gray-700 uppercase text-2xl">
            {{ magic.name }}
          </h3>
          <span class="text-gray-500 mt-3 text-5xl">${{ totalPrice.toString().replace(NaN.toString(), '') }}</span>
          <hr class="my-3">
          <p>{{ magic.description }}</p>
          <div class="mt-2">
            <label class="text-gray-700 text-sm">Count: {{ amount >= discountAmount ? '(打折囉!)' : '' }}</label>
            <div class="flex items-center mt-1">
              <button class="text-gray-500 focus:outline-none focus:text-gray-600" @click.prevent="increaseAmount">
                <svg
                  class="h-5 w-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" viewBox="0 0 24 24"
                >
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <span class="text-gray-700 text-lg mx-2">{{ amount }}</span>
              <button
                class="text-gray-500 focus:outline-none focus:text-gray-600"
                @click.prevent="() => {if (amount > 1)amount--}"
              >
                <svg
                  class="h-5 w-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" viewBox="0 0 24 24"
                >
                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center mt-6">
            <button
              :disabled="isSoldOut"
              class="px-8 py-2 text-white text-sm font-medium rounded"
              :class="{
                'bg-indigo-600': !isSoldOut,
                'bg-gray-300': isSoldOut,
                'hover:bg-indigo-500': !isSoldOut
              }"
              @click.prevent.stop="addToBag"
            >
              {{ isSoldOut ? '(賣完)' : 'Buy' }}
            </button>
            <router-link class="mx-4" to="/magics">
              <button
                class="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
              >
                Back
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { get, tryOnMounted } from '@vueuse/core'
import swal from 'sweetalert'
import { useRoute, useRouter } from 'vue-router'
import { getSpecificMagic } from '~/api'
import { discountAmount, getTotalPrice } from '~/utils/calculateTotalPrice'
import { useCheckHasSessionStorageItem, useLoadFromSessionStorage } from '~/composables/storage'
import type { Magic } from '~/interfaces'

const route = useRoute()
const router = useRouter()
const magicId = route.path?.replace('/magics/', '')

const magic = ref<Magic>({} as Magic)
const amount = ref<number>(1)
const totalPrice = computed(() => getTotalPrice(get(magic).price, get(amount)))
const isSoldOut = computed(() => magic.value.quantity === 0)

const increaseAmount = () => {
  const quantity = get(magic).quantity
  if (get(amount) + 1 > quantity) return
  amount.value++
}

const getMagicById = async(magics: Array<Magic>, id: string): Promise<Magic> => {
  // DO NOT DO THIS IF YOU WANT TO HAVE A BETTER CODE.
  const magic = magics.find(magic => magic.id === id)
  if (!magic) {
    await swal({ title: '魔法消失了！' })
    await router.replace('/magics')
  }
  return magic!
}

const addToBag = async() => {
  if (get(isSoldOut)) return

  await swal({
    title: 'Magic !!',
    text: '魔法已放入背包！',
    icon: 'success',
  })
}

tryOnMounted(async() => {
  const magicStorageKey = 'magics'
  const hasSavedMagics = useCheckHasSessionStorageItem(magicStorageKey)

  if (!hasSavedMagics) {
    magic.value = await getSpecificMagic(magicId)
    return
  }

  const magics = get(useLoadFromSessionStorage<Array<Magic>>(magicStorageKey)) ?? []
  magic.value = await getMagicById(magics, magicId)
})
</script>
