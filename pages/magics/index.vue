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
    id: '2342wvwe3423',
    title: 'Magic Meow Meow',
    description: 'A Cute cat magic',
    price: 4600,
    imageUrl: 'https://i.imgur.com/QWmOjy2.webp'
  },
  {
    id: '234223r3423',
    title: 'Fire Magic',
    description: 'High Damage magic',
    price: 1200,
    imageUrl: 'https://i.imgur.com/5h33noz.webp'
  },
  {
    id: '23423rynr423',
    title: '開心魔法 - 鏡花水月',
    description: '宴會才藝技能，學了會更開心 資料庫加 10 分',
    price: 200,
    imageUrl: 'https://i.imgur.com/9jVqHwj.webp'
  },
  {
    id: '223r3423423',
    title: '冰造型魔法',
    description: '將敵人完全封印',
    price: 700,
    imageUrl: 'https://i.imgur.com/sog5w6L.webp'
  },
  {
    id: '234236j7j423',
    title: 'sacred create water',
    description: '資料庫專題做不完',
    price: 87,
    imageUrl: 'https://i.imgur.com/W3TpHK3.webp'
  },
  {
    id: '2342343223r23',
    title: '雷魔法',
    description: '俐落地將電屎敵人',
    price: 5000,
    imageUrl: 'https://i.imgur.com/JTiVud0.webp'
  },
  {
    id: '234234k6ku23',
    title: 'create water',
    description: '可以裝水',
    price: 200,
    imageUrl: 'https://i.imgur.com/w2M1qMc.webp'
  },
  {
    id: '234234sdcs23',
    title: 'Drain touch',
    description: '體力&魔力行動電源',
    price: 100,
    imageUrl: 'https://i.imgur.com/5aPomZ0.webp'
  }
]
</script>
