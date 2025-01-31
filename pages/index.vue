<script setup lang="ts">
import Benefits from '~/components/page/slider/Benefits.vue'
import SliderPackages from '~/components/travel-packages/SliderPackages.vue'
import TripStyles from '~/components/experiences/TripStyles.vue'
import TopPlaces from '~/components/destinations/TopPlaces.vue'
import TravelStories from '~/components/home/TravelStories.vue'
import Reviews from '~/components/home/Reviews.vue'
import Newsletter from '~/components/home/Newsletter.vue'
import SliderBanner from '~/components/page/slider/SliderBanner.vue'
import EspecialistLetter from '~/components/home/EspecialistLetter.vue'
import TextDescription from '~/components/home/DescriptionWithLine.vue'

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
  <section class="w-full h-40 mb-2"></section>
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

  <TextDescription></TextDescription>

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

  <EspecialistLetter></EspecialistLetter>

  <TravelStories></TravelStories>

  <Newsletter></Newsletter>

  <Reviews></Reviews>

</template>