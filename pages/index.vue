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
import { useCategoriesStore } from '~/stores/categories'
import { useBlogStore } from '~/stores/blog'
import { useDestinationStore } from '~/stores/destination'
import StaticPackages from "~/components/travel-packages/StaticPackages.vue";

const packageStore = usePackageStore()
const destinationStore = useDestinationStore()
const listPackages = ref([])
const getPackage = async () => {
  const res: any = await packageStore.getPackageTop()
  listPackages.value = res
}

const getCountries = async () => {
  const res: any = await destinationStore.getCountries()
  countries.value = res.map((country: any) => {
    return country.nombre
  })
  console.log(countries.value)
}

const categoryStore = useCategoriesStore();
const listCategories = ref([]);

const getCategories = async () => {
  const res: any = await categoryStore.getCategories();
  // listCategories.value = res;
  listCategories.value = res.filter((category: any) => category.estado === 1)
};

const blogStore = useBlogStore();
const topBlogs = ref([]);

const getBlogs = async () => {
  const res: any = await blogStore.getBlogs();
  topBlogs.value = res.blogs.filter((blog: any) => blog.estado == null || blog.estado === 0).slice(0, 3);
};

const loading = ref(true)
const video = ref()
const { onLoaded } = useScriptVimeoPlayer()
const countries = ref(["Peru", "Ecuador"])
const budget = ref([
  { range: [0, 2500], label: "$$" },
  { range: [1000, 4000], label: "$$$" },
  { range: [3000, 7000], label: "$$$$" },
  { range: [4000, 10000], label: "$$$$+" }
])
const durations = ref([
  { label: "Less than 5 days", range: "0-5" },
  { label: "5 to 10 days", range: "5-10" },
  { label: "10 to 15 days", range: "10-15" },
  { label: "15 or more days", range: "15-100" }
])

// Convertir el presupuesto a rango numérico
const budgetRange = computed(() => {
  const budgetItem = budget.value.find(b => b.label === selectedBudget.value)
  return budgetItem ? `${budgetItem.range[0]}-${budgetItem.range[1]}` : null
})

// Convertir la duración a rango numérico
const durationRange = computed(() => {
  const durationItem = durations.value.find(d => d.label === selectedDuration.value)
  return durationItem ? durationItem.range : null
})

const filteredQuery = computed(() => {
  const query = {
    country: selectedCountry.value,
    budget: budgetRange.value,
    duration: durationRange.value
  }

  return Object.fromEntries(
    Object.entries(query).filter(([_, v]) => v !== null && v !== undefined && v !== "")
  )
})

const searchTerms = ref({
  countries: "",
});
const filteredItems = (list: string[], term: string) => {
  return list.filter((item) => item.toLowerCase().includes(term.toLowerCase()));
};
const selectedCountry = ref(null);
const selectedBudget = ref(null);
const selectedDuration = ref(null);

const selectCountry = (country: any) => {
  selectedCountry.value = country;
}
const selectBudget = (budgetLabel: any) => {
  selectedBudget.value = budgetLabel;
};
const selectDuration = (duration: any) => {
  selectedDuration.value = duration;
};

const welcome_text = {
  title: 'Why South America Company?',
  description: 'At South America Company, we specialize in turning dreams into reality through personalized travel to South America. Every detail of our trips is carefully crafted to ensure maximum comfort, exclusivity, and luxury. From private villas/lodges and luxury cruises to customized itineraries, we prioritize allowing our clients to focus solely on enjoying their premium vacation experiences. Embark with us on a journey that deepens your connection with the land and local communities while making a positive impact along the way. Travel with an open heart and embrace the gifts South America has to offer.',
}

let player: any
onMounted(async () => {
  await getPackage()
  await getCategories()
  await getBlogs()
  await getCountries()
  updateIsMobile();
  onLoaded(({ Vimeo }) => {
    player = new Vimeo.Player(video.value, {
      id: 1075870759,
      autoplay: true,
      loop: true,
      controls: false,
      muted: true
    })
    player.on('loaded', () => {
      loading.value = false
    })
  })
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

const isMobile = ref(false);

const updateIsMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 640;
  }
};
let count = 0;
const onShow = () => {
  if (count === 0) {
    document.body.classList.add('no-scroll');
  }
  count++;
};

const onHide = () => {
  count--;
  if (count === 0) {
    document.body.classList.remove('no-scroll');
  }
};
</script>
<template>
  <section class=" w-full h-20  md:h-40 mb-2"></section>
  <section>
    <div class="relative w-full h-[80vh] md:h-screen 2xl:h-[70vh] px-3">
      <div class="overflow-hidden h-full relative rounded-md">
<!--        <div class="mask gradient-cicle-gray items-center flex justify-center">-->
<!--          <div v-if="loading" class="mt-40 text-center">-->
<!--            Cargando ..-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-show="!loading" ref="video" loading="lazy" class="vimeo-wrapper"></div>-->
        <div class="absolute inset-0 h-screen overflow- w-full bg-gray-100 -z-1 overflow-hidden">
          <div class="vimeo-wrapper hidden sm:block">
            <iframe src="https://player.vimeo.com/video/1075870759?background=1&autoplay=1&loop=1&title=0&byline=0&portrait=0&muted=1"  frameborder="0" allow="autoplay; fullscreen"></iframe>
            <div class="absolute inset-0 gradient-cicle-gray"></div>
          </div>
          <img src="#" alt="" class="object-cover w-full h-full sm:hidden">
        </div>
        <div class="relative z-10 flex items-center  w-full h-full text-center">
          <div class=" container ">
            <h1
              class="text-white/80 drop-shadow-[0_0_1px_rgba(255,255,255,0.5)] leading-tight md:text-5xl 2xl:text-7xl tracking-wide font-semibold font-playfair-display">
              Discover South America at your own terms.</h1>
            <p class="text-white text-sm md:text-xl 2xl:text-lg tracking-widest font-light mt-5 ">
              Curated Latin American Journeys: Where Luxury Meets Discovery
            </p>
            <div class="bg-white lg:w-2/3 mx-auto my-12 shadow-md rounded-lg flex items-center hidden">
              <div class="grid grid-cols-3 w-full">
                <client-only>
                  <Dropdown class="w-full border-r border-gray-300" :positioning-disabled="isMobile"
                    @apply-show="isMobile && onShow()" @apply-hide="isMobile && onHide()">
                    <button
                      class="inline-flex items-center justify-center w-full h-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100 focus: rounded-l-md">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 hidden md:block">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <div class="flex items-center">
                        <div class="text-start ml-2">
                          <span class=" font-semibold">Countries</span>
                          <p class="text-xs lg:text-md">
                            {{ selectedCountry || "Select country" }}
                          </p>
                        </div>
                        <button v-if="selectedCountry" @click.stop="selectedCountry = null"
                          class="ml-2 p-1 text-red-500 hover:text-red-700 focus:outline-none">
                          ✕
                        </button>
                      </div>
                    </button>
                    <template #popper="{ hide }">
                      <div
                        class="md:w-48 lg:w-64 rounded-t-md md:rounded-md shadow-lg max-h-64 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                        <input v-model="searchTerms.countries"
                          class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                          type="text" placeholder="Search Country" autocomplete="off" />
                        <div class="overflow-y-auto max-h-40 space-y-1">
                          <button v-for="item in filteredItems(countries, searchTerms.countries)" :key="item" href="#"
                            @click.prevent="selectCountry(item)"
                            class="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                            {{ item }}
                          </button>
                        </div>
                      </div>
                    </template>
                  </Dropdown>
                </client-only>
                <client-only>
                  <Dropdown class="w-full border-r border-gray-300" :positioning-disabled="isMobile"
                    @apply-show="isMobile && onShow()" @apply-hide="isMobile && onHide()">
                    <button
                      class="inline-flex items-center justify-center w-full h-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100 focus: rounded-l-md">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 hidden md:block">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                      </svg>
                      <div class="flex items-center">
                        <div class="text-start ml-2">
                          <span class=" font-semibold">Budget</span>
                          <p class="text-xs lg:text-md">
                            {{ selectedBudget || "Select price per person" }}
                          </p>
                        </div>
                        <button v-if="selectedBudget" @click.stop="selectedBudget = null"
                          class="ml-2 p-1 text-red-500 hover:text-red-700 focus:outline-none">
                          ✕
                        </button>
                      </div>
                    </button>
                    <template #popper="{ hide }">
                      <div
                        class="md:w-48 lg:w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                        <div class="text-start p-4 text-gray-400 border-b-2">
                          <span class="font-semibold text-xs">Price (USD) per person</span>
                        </div>
                        <button v-for="item in budget" :key="item.label" @click.prevent="selectBudget(item.label)"
                          class="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                          {{ item.label }}
                        </button>
                        <button v-if="isMobile" @click="hide()" class="absolute top-4 right-3 p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-5 h-5 text-gray-500 hover:text-gray-800 transition">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </template>
                  </Dropdown>
                </client-only>
                <client-only>
                  <Dropdown class="w-full border-r border-gray-300" :positioning-disabled="isMobile"
                    @apply-show="isMobile && onShow()" @apply-hide="isMobile && onHide()">
                    <button
                      class="inline-flex items-center justify-center w-full h-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100 focus: rounded-l-md">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 hidden md:block">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      <div class="flex items-center">
                        <div class="text-start ml-2">
                          <span class="font-semibold">Duration</span>
                          <p class="text-xs lg:text-md">
                            {{ selectedDuration || "Select trip duration" }}
                          </p>
                        </div>
                        <button v-if="selectedDuration" @click.stop="selectedDuration = null"
                          class="ml-2 p-1 text-red-500 hover:text-red-700 focus:outline-none">
                          ✕
                        </button>
                      </div>
                    </button>
                    <template #popper="{ hide }">
                      <div
                        class="md:w-48 lg:w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                        <div class="text-start p-4 text-gray-400 border-b-2">
                          <span class="font-semibold text-xs">Length of trip</span>
                        </div>
                        <button v-for="(item, idx) in durations" :key="idx" @click.prevent="selectDuration(item.label)"
                          class="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                          {{ item.label }}
                        </button>
                        <button v-if="isMobile" @click="hide()" class="absolute top-4 right-3 p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-5 h-5 text-gray-500 hover:text-gray-800 transition">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </template>
                  </Dropdown>
                </client-only>
              </div>
              <div class="px-2 md:px-6">
                <NuxtLink :to="{
                  path: '/travel-packages',
                  query: filteredQuery
                }"
                  class="group bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center transition-all duration-300 ease-in-out w-12 hover:w-24 px-3 py-3 overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-5 h-5 flex-shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span
                    class="opacity-0 whitespace-nowrap transition-all duration-300 ease-in-out group-hover:opacity-100">
                    Search
                  </span>
                </NuxtLink>
              </div>
            </div>
            <!-- <div class="mt-6 justify-center flex">
              <button class="bg-black text-white px-4 py-2 rounded-md flex items-center">
                <span class="mr-2">See our 4,778 reviews on</span>
                <span class="text-green-400 font-bold">Trustpilot</span>
              </button>
            </div> -->
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
      <NuxtImg alt="Travel+Leisure logo" class="h-8" src="https://images.goway.com/dev/featured_in/travel-leisure.svg"
        loading="lazy" />
      <NuxtImg alt="AFAR logo" class="h-8" src="https://images.goway.com/dev/featured_in/afar.svg" />
      <NuxtImg alt="Forbes logo" class="h-8" src="https://images.goway.com/dev/featured_in/forbes.svg" />
      <NuxtImg alt="Smithsonian Magazine logo" class="h-8"
        src="https://images.goway.com/dev/featured_in/smithsonian.svg" />
    </div>
  </div>
<!--  <SliderPackages :listPackages="listPackages"></SliderPackages>-->
  <StaticPackages :list-packages="listPackages"></StaticPackages>
  <SliderBanner></SliderBanner>
  <TripStyles v-if="listCategories" :curatedTrips="listCategories"></TripStyles>
  <SliderDestinations></SliderDestinations>
  <EspecialistLetter></EspecialistLetter>
  <TravelStories v-if="topBlogs.length > 0" :topBlogs="topBlogs"></TravelStories>
  <!--  <Newsletter></Newsletter>-->
  <section class="bg-gray-100 py-12">
    <Reviews></Reviews>
  </section>
</template>