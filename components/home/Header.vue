<template>
  <header w-full h-24 bg-white top-0 sticky z-50>
    <div
        class="container flex items-center justify-center h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0"
    >
      <NuxtLink class="relative flex items-center inline-block h-5 h-full font-black leading-none" to="/">
        <img alt="" class="w-auto h-6 text-indigo-600 fill-current" src="https://i.imgur.com/MDYUATR.webp">
        <span class="ml-3 text-xl text-gray-800">{{ headerTitle }}<span class="text-pink-500">.</span></span>
      </NuxtLink>

      <nav
          v-show="isMDScreen || isNavOpened"
          id="nav"
          class="absolute top-0 left-0 z-10 flex flex-col items-center justify-between hidden w-full h-64 pt-5 mt-24 text-sm text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative"
      >
        <NuxtLink v-for="(item, i) in navBarItems" :key="item.name + i +Date.now()"
                  :to="item.link"
                  class="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600"
                  rel="nofollow noreferrer noopener"
        >{{ item.name }}
        </NuxtLink>

        <div class="flex flex-col block w-full font-medium border-t border-gray-200 md:hidden">
          <NuxtLink :to="loginPath" class="w-full py-2 font-bold text-center text-pink-500">Login</NuxtLink>
          <NuxtLink
              :to="magicBagPath"
              class="relative inline-block w-full px-5 py-3 text-sm leading-none text-center text-white bg-indigo-700 fold-bold"
          >Magic Bag
          </NuxtLink>
        </div>
      </nav>

      <div
          class="absolute left-0 flex-col items-center justify-center hidden w-full pb-8 mt-48 border-b border-gray-200 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between"
      >
        <NuxtLink
            :to="loginPath"
            class="relative z-40 px-3 py-2 mr-0 text-sm font-bold text-pink-500 md:px-5 sm:mr-3 md:mt-0"
        >Login
        </NuxtLink>
        <NuxtLink
            :to="magicBagPath"
            class="relative z-40 inline-block w-auto h-full px-5 py-3 text-sm font-bold leading-none text-white transition-all transition duration-100 duration-300 bg-indigo-700 rounded shadow-md fold-bold lg:bg-white lg:text-indigo-700 sm:w-full lg:shadow-none hover:shadow-xl"
        >Magic Bag
        </NuxtLink>
      </div>
      <div
          id="nav-mobile-btn"
          class="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none md:hidden sm:mt-10"
          @click="isNavOpened = !isNavOpened"
      >
        <span class="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1"/>
        <span class="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full"/>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import {useMediaQuery} from '@vueuse/core'

const headerTitle = 'Peperuto Shop'
const navBarItems: Array<{ name: string, link: string }> = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Magics',
    link: '/magics'
  },
  {
    name: 'Discounts',
    link: '/discounts'
  },
  {
    name: 'Search',
    link: '/search'
  }
]

const loginPath = '/login'
const magicBagPath = '/bag'

const isMDScreen = useMediaQuery('(min-width: 768px)')
const isNavOpened = useState<boolean>('isNavOpened', () => false)
</script>
