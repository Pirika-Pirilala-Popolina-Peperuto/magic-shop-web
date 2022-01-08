<template>
  <MagicsHeader/>
  <h1 class="leading-relaxed font-primary font-extrabold text-4xl text-center mt-4 py-2 sm:py-4"
      text-violet-700>
    {{ pageTitle }}
  </h1>
  <MagicsProductListings :products="tmpProducts"/>
</template>

<script lang="ts" setup>
const pageTitle = 'Get Your Magics!'

const tmpProducts = [
  {
    id: '23423423',
    title: 'string',
    description: 'string',
    price: 123,
    imageUrl: 'https://i.imgur.com/QWmOjy2.jpg'
  },
  {
    id: '23423423',
    title: 'string',
    description: 'string',
    price: 123,
    imageUrl: 'https://i.imgur.com/QWmOjy2.jpg'
  },
  {
    id: '23423423',
    title: 'string',
    description: 'string',
    price: 123,
    imageUrl: 'https://i.imgur.com/QWmOjy2.jpg'
  },
  {
    id: '23423423',
    title: 'string',
    description: 'string',
    price: 123,
    imageUrl: 'https://i.imgur.com/QWmOjy2.jpg'
  },
  {
    id: '23423423',
    title: 'string',
    description: 'string',
    price: 123,
    imageUrl: 'https://i.imgur.com/QWmOjy2.jpg'
  },
  {
    id: '23423423',
    title: 'string',
    description: 'string',
    price: 123,
    imageUrl: 'https://i.imgur.com/QWmOjy2.jpg'
  }
]
</script>
