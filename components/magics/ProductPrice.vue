<template>
  {{ currency }}
  <span :class='numSizeClassNames'>{{ num }}</span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  currency?: string
  numSizeClassNames?: string
  num: number
}>()
</script>
