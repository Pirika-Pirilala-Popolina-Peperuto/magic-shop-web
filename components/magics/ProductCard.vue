<template>
  <NuxtLink :to="'/'+route.name+'/'+magic.id" h-120 mx-auto relative rounded shadow-lg w-72>
    <div class="h-72 border-b-2 border-palette-lighter relative">
      <img
          :alt='magic.name'
          :src='magic.pictureUrl'
          class="transform duration-500 rounded ease-in-out w-full h-full object-cover"
          layout="fill"
      />
    </div>
    <div class="h-48 relative">
      <div class="font-primary text-violet-700 text-2xl pt-4 px-4 font-semibold">
        {{ magic.name }}
      </div>
      <div class="text-lg text-gray-600 p-4 font-primary font-light">
        {{ magic.description }}
      </div>
      <div
          class="text-violet-900 font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-4 pr-4 pb-2 pt-2 bg-violet-100
            rounded-l-full"
      >
        <MagicsProductPrice
            :num='magic.price'
            currency="$"
            numSizeClassNames="text-lg"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type {Magic} from '~/interfaces'
const route = useRoute()

const props = defineProps<{
  magic: Magic
}>()
</script>
