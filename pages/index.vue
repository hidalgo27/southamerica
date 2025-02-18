<script setup lang="ts">
import Benefits from '~/components/page/slider/Benefits.vue'
import SliderPackages from '~/components/travel-packages/SliderPackages.vue'
import TripStyles from '~/components/experiences/TripStyles.vue'
import SliderDestinations from '~/components/destinations/SliderDestinations.vue'
import TravelStories from '~/components/home/TravelStories.vue'
import Reviews from '~/components/home/Reviews.vue'
import Newsletter from '~/components/home/Newsletter.vue'
import SliderBanner from '~/components/page/slider/SliderBanner.vue'
import EspecialistLetter from '~/components/home/EspecialistLetter.vue'
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue'

import { Dropdown } from 'floating-vue'

import { usePackageStore } from '~/stores/packages'

const packageStore = usePackageStore()
const listPackages = ref([])
const getPackage = async () => {
  const res: any = await packageStore.getPackageTop()
  listPackages.value = res
}
const loading = ref(true)
const video = ref()
const { onLoaded } = useScriptVimeoPlayer()
const countries = ref(["Peru", "Ecuador"]);
const budget = ref([
  { range: [0, 2500], label: "$$" },
  { range: [1000, 4000], label: "$$$" },
  { range: [3000, 7000], label: "$$$$" },
  { range: [4000, 10000], label: "$$$$+" }
]);
const durations = ref([
  "Less than 5 days",
  "5 to 10 days",
  "10 to 15 days",
  "15 or more days"
]);

const searchTerms = ref({
  countries: "",
});
const filteredItems = (list: string[], term: string) => {
  return list.filter((item) => item.toLowerCase().includes(term.toLowerCase()));
};
const selectedCountry = ref("Search Country");
const selectedBudget = ref("Select price per person");
const selectedDuration = ref("Select trip duration");

const selectCountry = (country: string) => {
  selectedCountry.value = country;
}
const selectBudget = (budgetLabel: string) => {
  selectedBudget.value = budgetLabel;
};
const selectDuration = (duration: string) => {
  selectedDuration.value = duration;
};

const welcome_text = {
  title: 'Why South America Company?',
  description: 'At South America Company, we specialize in tailor-made trips that immortalize the best days exploring Peru and South America. Every detail is meticulously designed to offer the maximum comfort, exclusivity, and luxury. From private villas and luxury cruises to customized itineraries, we make sure you only worry about enjoying your luxury vacation.',
}
let player: any
onMounted(async () => {
  await getPackage()
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
  <section class="hidden md:block w-full h-40 mb-2"></section>
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
            <div class="bg-white w-2/3 mx-auto my-12 shadow-md rounded-lg flex items-center">
              <div class="grid grid-cols-3 w-full">
                <client-only>
                  <Dropdown class="w-full border-r border-gray-300">
                    <button
                      class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100 focus: rounded-l-md">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <div class="flex items-center">
                        <div class="text-start ml-2">
                          <span class=" font-semibold">Countries</span>
                          <p v-if="selectedCountry" class=" text-md ">
                            {{ selectedCountry }}
                          </p>
                        </div>
                        <button v-if="selectedCountry !== 'Search Country'"
                          @click.stop="selectedCountry = 'Search Country'"
                          class="ml-2 p-1 text-red-500 hover:text-red-700 focus:outline-none">
                          ✕
                        </button>
                      </div>
                    </button>
                    <template #popper>
                      <div
                        class="mt-2 w-full rounded-md shadow-lg max-h-64 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                        <input v-model="searchTerms.countries"
                          class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                          type="text" placeholder="Search Country" autocomplete="off" />
                        <a v-for="item in filteredItems(countries, searchTerms.countries)" :key="item" href="#"
                          @click.prevent="selectCountry(item)"
                          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                          {{ item }}
                        </a>
                      </div>
                    </template>
                  </Dropdown>
                </client-only>
                <client-only>
                  <Dropdown class="w-full border-r border-gray-300">
                    <button
                      class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100 focus: rounded-l-md">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                      </svg>
                      <div class="flex items-center">
                        <div class="text-start ml-2">
                          <span class=" font-semibold">Budget</span>
                          <p v-if="selectedBudget" class=" text-md ">
                            {{ selectedBudget }}
                          </p>
                        </div>
                        <button v-if="selectedBudget !== 'Select price per person'"
                          @click.stop="selectedBudget = 'Select price per person'"
                          class="ml-2 p-1 text-red-500 hover:text-red-700 focus:outline-none">
                          ✕
                        </button>
                      </div>
                    </button>
                    <template #popper>
                      <div
                        class="mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                        <div class="text-start p-4 text-gray-400 border-b-2">
                          <span class="font-semibold text-xs">Price (USD) per person</span>
                        </div>
                        <a v-for="item in budget" :key="item.label" href="#" @click.prevent="selectBudget(item.label)"
                          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                          {{ item.label }}
                        </a>
                      </div>
                    </template>
                  </Dropdown>
                </client-only>
                <client-only>
                  <Dropdown class="w-full">
                    <button
                      class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100 focus: rounded-l-md">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      <div class="flex items-center">
                        <div class="text-start ml-2">
                          <span class="ml-2 font-semibold">Duration</span>
                          <p v-if="selectedDuration" class="ml-2 text-md ">
                            {{ selectedDuration }}
                          </p>
                        </div>
                        <button v-if="selectedDuration !== 'Select trip duration'"
                          @click.stop="selectedDuration = 'Select trip duration'"
                          class="ml-2 p-1 text-red-500 hover:text-red-700 focus:outline-none">
                          ✕
                        </button>
                      </div>
                    </button>
                    <template #popper>
                      <div
                        class="mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                        <div class="text-start p-4 text-gray-400 border-b-2">
                          <span class="font-semibold text-xs">Length of trip</span>
                        </div>
                        <a v-for="item in durations" :key="item" href="#" @click.prevent="selectDuration(item)"
                          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                          {{ item }}
                        </a>
                      </div>
                    </template>
                  </Dropdown>
                </client-only>
              </div>
              <div class="px-6">
                <button
                  class="group bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center transition-all duration-300 ease-in-out w-12 hover:w-32 px-3 py-3 overflow-hidden">
                  <!-- SVG SIEMPRE visible -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-5 h-5 flex-shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>

                  <!-- Texto oculto inicialmente, aparece sin mover el SVG -->
                  <span
                    class="opacity-0 whitespace-nowrap transition-all duration-300 ease-in-out group-hover:opacity-100">
                    Search
                  </span>
                </button>
              </div>
            </div>
            <div class="mt-6 justify-center flex">
              <button class="bg-black text-white px-4 py-2 rounded-md flex items-center">
                <span class="mr-2">See our 4,778 reviews on</span>
                <span class="text-green-400 font-bold">Trustpilot</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <DescriptionWithLine :text="welcome_text" :line="1"></DescriptionWithLine>

  <Benefits></Benefits>

  <div class="flex flex-col items-center justify-center my-20 bg-white" id="app">
    <div class="border-title mb-2 mx-auto"></div>
    <p class="mb-6 tracking-widest font-bold">
      As featured in
    </p>
    <div class="flex flex-wrap justify-center gap-8 sm:flex-nowrap sm:space-x-8">
      <img alt="Travel+Leisure logo" class="h-12"
        src="https://images.goway.com/production/styles/run_of_site_ad_3xl/s3/trip_level_ad/portugal_porto_tourist_AdobeStock_178862016.jpeg?VersionId=qnpeclJigVYnXDYm1k_1teCzeyut0dfk&itok=ovtj3gJT" />
      <img alt="AFAR logo" class="h-12"
        src="https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/Sydney%20Opera%20House_AdobeStock_224286843%20%283%29.jpeg?VersionId=YHodoYpc62zmfJzKE.jfp8S2TwCeaB0c&h=a5654313&itok=ZAZ56cvJ" />
      <img alt="Forbes logo" class="h-12"
        src="https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/Sydney%20Opera%20House_AdobeStock_224286843%20%283%29.jpeg?VersionId=YHodoYpc62zmfJzKE.jfp8S2TwCeaB0c&h=a5654313&itok=ZAZ56cvJ" />
      <img alt="Smithsonian Magazine logo" class="h-12"
        src="https://images.goway.com/production/styles/content_highlight_3xl/s3/content-highlight/2024-02/iStock-1403046192.jpg?h=ecc2d3bd&itok=Yck4r6Gg" />
    </div>
  </div>

  <SliderPackages :listPackages="listPackages"></SliderPackages>

  <SliderBanner></SliderBanner>

  <TripStyles></TripStyles>

  <SliderDestinations></SliderDestinations>

  <EspecialistLetter></EspecialistLetter>

  <TravelStories></TravelStories>

  <Newsletter></Newsletter>

  <Reviews></Reviews>

</template>