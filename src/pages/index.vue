<template>
  <div class="overflow-x-hidden antialiased h-screen">
    <HomeHeader />

    <!-- BEGIN HERO SECTION -->
    <div class="relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64">
      <div
        class="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row 2xl:px-0"
      >
        <div
          class="z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-40 lg:text-left"
        >
          <h1 class="relative mb-4 text-3xl font-black leading-tight text-gray-900 sm:text-6xl xl:mb-8">
            {{ bigTitle }}
          </h1>
          <p class="pr-0 mb-8 text-base text-gray-600 sm:text-lg xl:text-xl lg:pr-20">
            {{ mainDescription }}<b>{{ explosion }}</b><br>
            - <b text-rose-500>{{ whatIsThisWebSite }}</b>
          </p>
          <router-link
            :to="startShopPath"
            class="relative self-start inline-block w-auto px-8 py-4 mx-auto mt-0 text-base font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0"
          >
            {{ mainButtonText }}
          </router-link>
        </div>
        <div class="rounded-3xl relative z-10 flex flex-col items-end justify-center w-full h-full lg:w-1/2 ms:pl-10">
          <div class="rounded-3xl container relative left-0 w-full max-w-4xl lg:absolute xl:max-w-6xl lg:w-screen">
            <img
              class="rounded-3xl w-full h-auto mt-20 mb-20 ml-0 lg:mt-24 xl:mt-40 lg:mb-0 lg:h-full"
              src="https://i.imgur.com/dgCOVGN.webp"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
    <!-- HERO SECTION END -->

    <!-- Start Testimonials -->
    <div
      id="testimonials"
      class="flex items-center justify-center w-full px-8 py-10 border-t border-gray-200 md:py-16 lg:py-24 xl:py-40 xl:px-0"
    >
      <div class="max-w-full mx-auto">
        <div class="flex-col items-center ">
          <div class="flex flex-col items-center justify-center w-full h-full max-w-2xl mx-auto text-center">
            <p class="my-5 text-base font-medium tracking-tight text-indigo-500 uppercase">
              Our customers love
              our magics
            </p>
            <h2
              class="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl"
            >
              Testimonials
            </h2>
            <p class="my-6 text-xl font-medium text-gray-500">
              Don't just take our word for it, read from our
              extensive
              list of case studies and customer testimonials.
            </p>
          </div>
          <div class="flex flex-col items-center justify-center max-w-2xl py-8 mx-auto xl:flex-row xl:max-w-full">
            <div class="w-full xl:pr-8 my-">
              <blockquote
                v-for="(testimonial, i) in testimonials" :key="i"
                class="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 my-6 text-center transition-all duration-200 bg-gray-100 rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease"
              >
                <div class="flex flex-col max-w-full">
                  <div class="relative pl-12">
                    <svg
                      class="absolute left-0 w-10 h-10 text-indigo-500 fill-current"
                      viewBox="0 0 100 125"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z"
                      />
                    </svg>
                    <p class="mt-2 text-base text-gray-600">
                      {{ testimonial.desc }}
                    </p>
                  </div>

                  <h3 class="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">
                    {{ testimonial.name }}
                    <span class="mt-1 text-sm leading-5 text-gray-500 truncate">{{ testimonial.position }}</span>
                  </h3>
                  <p class="mt-1 text-sm leading-5 text-gray-500 truncate" />
                </div>
                <img
                  alt=""
                  class="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                  :src="testimonial.imgUrl"
                >
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Testimonials-->
    <HomeFooter />
  </div>
</template>

<script lang="ts" setup>
const bigTitle = 'Pirika Pirilala Popolina Peperuto'
const mainDescription = '我が名はめぐみん、红魔族随一の魔法の使い手にして、爆裂魔法を操りし者、我が力、见るが良い！'
const explosion = 'Explosion!'
const whatIsThisWebSite = 'A Magic Shop.'
const mainButtonText = 'Start Shop Today!'

const startShopPath = '/magics'

const testimonials: Array<{ name: string; position: string; desc: string; imgUrl: string }>
    = [
      {
        name: 'Albus Dumbledore',
        position: '- Principal of Hogwarts',
        desc: 'I\'m loving these magics! Very nice effect and prices.',
        imgUrl: 'https://i.imgur.com/kwVQAiJ.webp',
      },
      {
        name: 'Gellert Grindelwald',
        position: '- Dumbledore\'s wife(?',
        desc: 'Very Great Shop!',
        imgUrl: 'https://i.imgur.com/gUjlPUC.webp',
      },
    ]
</script>

<style lang="scss" scoped>
@media(max-width: 1520px) {
  .left-svg {
    display: none;
  }
}

#nav-mobile-btn.close span:first-child {
  transform: rotate(45deg);
  top: 4px;
  position: relative;
  background: #a0aec0;
}

#nav-mobile-btn.close span:nth-child(2) {
  transform: rotate(-45deg);
  margin-top: 0;
  background: #a0aec0;
}
</style>
