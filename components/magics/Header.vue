<template>
  <header class="border-b border-palette-lighter sticky top-0 z-20 bg-white">
    <div class="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-4 md:pb-4">
      <NuxtLink to="/">
        <h1 class="flex no-underline">
          <img alt="logo" class="h-8 w-8 mr-1 object-contain" height="32" src="https://i.imgur.com/MDYUATR.webp"
               width="32"/>
          <span class="text-xl font-primary font-bold tracking-tight pt-1">
                {{ headerTitle }}
          </span>
        </h1>
      </NuxtLink>
      <div>
        <NuxtLink relative mt-2 to="/bag">
          <Icon m-auto text-palette-primary w-full>
            <ShoppingBag/>
          </Icon>
          <div
              class="absolute top-0 right-0 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full py-1 px-2 transform translate-x-4 -translate-y-4"
          >
            1
          </div>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import {Icon} from '@vicons/utils'
import {ShoppingBag} from '@vicons/fa'

const headerTitle = 'Peperuto Shop'
</script>

