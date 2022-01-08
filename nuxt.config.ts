import {resolve} from 'pathe'
import {defineNuxtConfig} from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: 'Peperuto Shop',
  },
  buildModules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt'
  ],
  alias: {
    'images': resolve(__dirname, './assets/images'),
    'styles': resolve(__dirname, './styles'),
  },
  css: [
    '@unocss/reset/normalize.css',
    '@/styles/main.scss'
  ],
  unocss: {
    uno: true,
    attributify: true,
    preflight: true,
    icons: {
      scale: 1.2,
    },
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ],
  },
  vite: {
    logLevel: 'info',
  },
})
