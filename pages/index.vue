<script setup lang="ts">
import Benefits from '~/components/page/slider/Benefits.vue'
import SliderPackages from '~/components/page/slider/SliderPackages.vue'
import TripStyles from '~/components/home/TripStyles.vue'
import TopPlaces from '~/components/home/TopPlaces.vue'
import TravelStories from '~/components/home/TravelStories.vue'
import Reviews from '~/components/home/Reviews.vue'
import Newsletter from '~/components/home/Newsletter.vue'
import SliderBanner from '~/components/page/slider/SliderBanner.vue'

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

  <section class="container my-20">
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

  <div class="flex flex-col items-center justify-center my-20 bg-white" id="app">
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

  <SliderBanner></SliderBanner>

  <TripStyles></TripStyles>

  <TopPlaces></TopPlaces>

  <section class="container">
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

  <Newsletter></Newsletter>

  <Reviews></Reviews>

</template>