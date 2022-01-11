<template>
  <header class="shadow sticky top-0 z-20 bg-white">
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
        <NuxtLink mt-2 relative to="/bag">
          <svg fill-black h-8 inline-block m-auto max-h-full mr-1 viewBox="0 0 448 512" w-8
               xmlns="http://www.w3.org/2000/svg">
            <path d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"
                  fill="currentColor"/>
          </svg>
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
const headerTitle = 'Peperuto Shop'
</script>

