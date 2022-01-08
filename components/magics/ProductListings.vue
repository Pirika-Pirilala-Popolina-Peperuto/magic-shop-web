<template>
  <div class="relative w-screen px-8 py-12 mx-auto product-area">
    <MagicsProductCard v-for='(magic, i) in products' :key='i + Date.now()' :magic='magic'/>
  </div>
</template>

<script lang="ts" setup>
import type {Magic} from '@/interfaces'

const props = defineProps<{
  products: Array<Magic>
}>()
</script>

<style lang="scss" scoped>
.product-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  grid-template-rows: auto;
  justify-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
}
</style>
