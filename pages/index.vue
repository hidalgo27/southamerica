<script setup lang="ts">
import Benefits from '~/components/page/slider/Benefits.vue'
import SliderPackages from '~/components/page/slider/SliderPackages.vue'
import SliderDestination from '~/components/page/slider/SliderDestination.vue'
import TripStyles from '~/components/home/TripStyles.vue'
import TopPlaces from '~/components/home/TopPlaces.vue'
import CardSlider from '~/components/page/slider/CardSlider.vue'
import TravelStories from '~/components/home/TravelStories.vue'
import Reviews from '~/components/home/Reviews.vue'

const loading = ref(true)
const video = ref()
const { onLoaded } = useScriptVimeoPlayer()

let player: any
onMounted(async () => {
  onLoaded(({ Vimeo }) => {
    player = new Vimeo.Player(video.value, {
      id: 1028540009,
      autoplay: true,
      loop: true,
      controls: false,
      muted: true
    })
    player.on('loaded', () => {
      loading.value = false
    })
  })
});
</script>

<template>
  <section>
    <div class="relative w-full h-screen 2xl:h-[70vh] px-3">
      <div class="overflow-hidden h-full relative rounded-md">
        <div class="mask gradient-cicle-gray items-center flex justify-center">
          <div v-if="loading" class="mt-40 text-center">
            Cargando ..
          </div>
        </div>
        <div v-show="!loading" ref="video" loading="lazy" class="vimeo-wrapper"></div>
        <div class="relative z-10 flex items-center  w-full h-full text-center">
          <div class=" container ">
            <h1
              class="text-white/80 drop-shadow-[0_0_1px_rgba(255,255,255,0.5)] leading-tight text-5xl 2xl:text-7xl tracking-wide font-semibold font-playfair-display">
              Design Your Peru Discovery.</h1>
            <p class="text-white text-xl 2xl:text-lg tracking-widest font-light mt-5 ">Uncover the secrets of Machu
              Picchu and the wonders of Peru on a journey tailored just for you.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container mt-28 mb-12">
    <div class="text-center ">
      <div class="border-title mb-2 mx-auto"></div>
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide"> Why South America Company?</h1>
      <div class="w-1/2 mx-auto my-8">
        <p class="tracking-widest font-light">At South America Company, we specialize in tailor-made trips that
          immortalize the best days exploring Peru and South America. Every detail is meticulously designed to offer the
          maximum comfort, exclusivity, and luxury. From private villas and luxury cruises to customized itineraries, we
          make sure you only worry about enjoying your luxury vacation.</p>
      </div>
    </div>
  </section>

  <Benefits></Benefits>

  <div class="flex flex-col items-center justify-center mt-28 mb-12 bg-white" id="app">
    <div class="border-title mb-2 mx-auto"></div>
    <p class="mb-6 tracking-widest font-bold">
      As featured in
    </p>
    <div class="flex flex-wrap justify-center gap-8 sm:flex-nowrap sm:space-x-8">
      <img alt="Travel+Leisure logo" class="h-12" src="https://picsum.photos/400/300" />
      <img alt="AFAR logo" class="h-12" src="https://picsum.photos/400/300" />
      <img alt="Forbes logo" class="h-12" src="https://picsum.photos/400/300" />
      <img alt="Smithsonian Magazine logo" class="h-12" src="https://picsum.photos/400/300" />
    </div>
  </div>

  <SliderPackages></SliderPackages>

  <SliderDestination></SliderDestination>

  <TripStyles></TripStyles>

  <TopPlaces></TopPlaces>

  <section class="container mt-28 mb-12">
    <div class=" flex items-center justify-center ">
      <div class="flex flex-col md:flex-row bg-white overflow-hidden w-full gap-6">
        <div class="bg-secondary bg-opacity-10 py-32 px-16 rounded-md">
          <p class="mb-8 tracking-widest font-bold">
            Destination Specialists
          </p>
          <h1 class="font-semibold text-4xl mb-8 title font-playfair-display tracking-wide  ">
            The experts in tailor-made travel.
          </h1>
          <p class="mb-8">
            When working with Goway, you dream it, we plan it. Rely on the passion and expertise of our Destination
            Specialists to craft the trip that’s right for you.
          </p>
          <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button class="px-4 py-2 border btn-primary-outline rounded-md">
              Request a Quote
            </button>
            <button class="px-4 py-2 border btn-secondary-outline rounded-md">
              Meet the Team
            </button>
          </div>
        </div>
        <div class="relative w-full rounded-md">
          <img alt="A beautiful sunset with a giraffe in the foreground" class="w-full h-full object-cover rounded-md"
            src="https://picsum.photos/400/300" />
        </div>
      </div>
    </div>
  </section>

  <TravelStories></TravelStories>

  <section class="flex items-center justify-center mt-28 mb-12 container">
    <div class="bg-tertiary bg-opacity-10 p-10 md:p-20  rounded-md w-full">
      <div class="flex flex-col md:flex-row items-center">
        <div class="flex-1">
          <p class="mb-6 tracking-widest font-bold">Newsletter</p>
          <h1 class="font-semibold text-2xl md:text-5xl mb-6 title font-playfair-display tracking-wide">Unlock Even More
          </h1>
          <p class="mb-20">Sign up to our newsletter to unlock travel Specials, Inspiration, and Expert
            Guides right to your inbox.</p>
          <button class="btn-ternary py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700">Sign Up
            Today</button>
        </div>
        <div class="hidden md:block border-l border-gray-200 h-96 mx-8"></div>
        <div class="block md:hidden border-b border-gray-200 w-full my-8"></div>
        <div class="flex-1">
          <ul class="space-y-8">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="mr-2 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
              Exclusive Savings
            </li>
            <li class="flex items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="mr-2 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
              Insider Contests
            </li>
            <li class="flex items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="mr-2 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              Trending Guides
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <Reviews></Reviews>

  <section class="container mt-28 mb-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="text-center grid grid-cols-2">
        <img src="https://picsum.photos/400/300" alt="icon" class="w-full rounded-md" />
        <div class="self-center pl-2">
          <h3 class="text-lg font-semibold">New Specials</h3>
          <div class="group self-center justify-items-center">
            <a href="#" class="">Discover</a>
            <div
              class="border border-primary center mt-1 w-16 mx-auto transition-all duration-700 ease-in-out group-hover:w-0">
            </div>
          </div>
        </div>
      </div>
      <div class="text-center grid grid-cols-2">
        <img src="https://picsum.photos/400/300" alt="icon" class="w-full rounded-md" />
        <div class="self-center pl-2">
          <h3 class="text-lg font-semibold">Start Planning</h3>
          <div class="group self-center justify-items-center">
            <a href="#" class="">Discover All Trips</a>
            <div
              class="border border-primary center mt-1 w-32 mx-auto transition-all duration-700 ease-in-out group-hover:w-0">
            </div>
          </div>
        </div>
      </div>
      <div class="text-center grid grid-cols-2">
        <img src="https://picsum.photos/400/300" alt="icon" class="w-full rounded-md" />
        <div class="self-center">
          <h3 class="text-lg font-semibold">Follow Along</h3>
          <div class="group self-center justify-items-center">
            <a href="#" class="">@gotoperu</a>
            <div
              class="border border-primary center mt-1 w-20 mx-auto transition-all duration-700 ease-in-out group-hover:w-0">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>