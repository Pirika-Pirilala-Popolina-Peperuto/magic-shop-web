<template>
  <MagicsHeader />
  <div class="my-8">
    <div class="container mx-auto px-6">
      <div class="md:flex md:items-center">
        <div class="w-full h-64 md:w-1/2 lg:h-96">
          <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto" :src="magic.pictureUrl" alt="">
        </div>
        <div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 class="text-gray-700 uppercase text-2xl">
            {{ magic.name }}
          </h3>
          <span class="text-gray-500 mt-3 text-5xl">${{ totalPrice.toString().replace(NaN.toString(), '') }}</span>
          <hr class="my-3">
          <p>{{ magic.description }}</p>
          <div class="mt-2">
            <label class="text-gray-700 text-sm">Count:</label>
            <div class="flex items-center mt-1">
              <button class="text-gray-500 focus:outline-none focus:text-gray-600" @click.prevent="amount++">
                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
              <span class="text-gray-700 text-lg mx-2">{{ amount }}</span>
              <button class="text-gray-500 focus:outline-none focus:text-gray-600" @click.prevent="() => {if (amount > 1)amount--}">
                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
            </div>
          </div>

          <div class="flex items-center mt-6">
            <button class="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
              Buy
            </button>
            <router-link to="/magics" class="mx-4">
              <button class="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
                Back
              </button>
            </router-link>
            <button class="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
              <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { tryOnMounted } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { getSpecificMagic } from '~/api'
import type { Magic } from '~/interfaces'

const route = useRoute()
const magicId = route.path?.replace('/magics/', '')

const magic = ref<Magic>({} as Magic)
const amount = ref<number>(1)
const totalPrice = computed(() => {
  const real = magic.value.price * amount.value
  return amount.value <= 10 ? real : Math.ceil(real * (1 - Math.min(amount.value * 0.01, 0.5)))
})

tryOnMounted(async() => {
  magic.value = await getSpecificMagic(magicId)
})
</script>
