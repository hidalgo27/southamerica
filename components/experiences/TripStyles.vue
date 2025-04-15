<script lang="ts" setup>
const { $gsap } = useNuxtApp();
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRoute } from "vue-router";

$gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const itemsPerPage = 6;
const currentPage = ref(1);

const paginatedTrips = computed(() => {
  return props.curatedTrips.slice(0, currentPage.value * itemsPerPage);
});

const showMore = () => {
  currentPage.value++;
};

const showLess = () => {
  currentPage.value = 1;
};

const props = defineProps({
  curatedTrips: {
    type: Array,
    required: true,
  },
});

// Estado para controlar la cantidad de experiencias visibles
const showAll = ref(false);
const displayedTrips = computed(() => {
  return showAll.value || route.path === "/experiences"
    ? props.curatedTrips
    : props.curatedTrips.slice(0, 6);
});

// Alternar entre mostrar más o menos experiencias
const toggleShowAll = () => {
  showAll.value = !showAll.value;
};

onMounted(() => {
  $gsap.fromTo(
    ".animatedSvg2",
    {
      clipPath: "inset(0% 0% 0% 100%)",
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".animatedSvg2",
        start: "top 80%",
        end: "top 0%",
        scrub: true,
      },
    }
  );
});
</script>

<template>
  <section class="bg-secondary bg-opacity-30 py-20">
    <svg class="animatedSvg2 absolute right-0 hidden md:flex md:w-1/3 lg:w-1/4 overflow-visible translate-y-40"
      viewBox="0 0 800 300">
      <path
        d="M785.428 1.301C756.23 37.4045 731.395 80.1763 693.122 106.756C640.695 143.166 585.853 141.377 532.484 135.109C494.542 130.653 455.604 129.089 417.179 126.451C367.602 123.048 318.162 119.825 266.295 135.462C214.189 151.172 165.575 184.569 120.382 219.264C94.4555 239.168 66.3735 265.321 45.5039 291.126"
        fill="none" stroke="#F05B2A" stroke-width="2" stroke-dasharray="0.1 10" stroke-linecap="round"></path>
      <path
        d="M785.428 1.301C756.23 37.4045 731.395 80.1763 693.122 106.756C640.695 143.166 585.853 141.377 532.484 135.109C494.542 130.653 455.604 129.089 417.179 126.451C367.602 123.048 318.162 119.825 266.295 135.462C214.189 151.172 165.575 184.569 120.382 219.264C94.4555 239.168 66.3735 265.321 45.5039 291.126"
        fill="none" stroke="#F9F4E8" stroke-width="3" stroke-dasharray="849" stroke-dashoffset="1698"
        style="stroke-dashoffset: 849px;"></path>
      <g class="g-svg2">
        <path
          d="M46.8784 314.001C42.4652 326.5 28.7555 333.055 16.2569 328.641C3.75837 324.228 -2.79611 310.518 1.61709 298.02C6.03029 285.521 19.74 278.967 32.2386 283.38C44.7371 287.793 51.2916 301.503 46.8784 314.001Z"
          fill="#F8BCAA" fill-opacity="0.15"></path>
        <path
          d="M28.8197 307.825C28.0841 309.908 25.7992 311 23.7161 310.265C21.633 309.529 20.5406 307.244 21.2761 305.161C22.0116 303.078 24.2966 301.985 26.3797 302.721C28.4628 303.457 29.5552 305.742 28.8197 307.825Z"
          fill="#F05B2A"></path>
      </g>
    </svg>
    <div class="p-8 container z-10">
      <div class="text-center mb-8">
        <p class="mb-6 tracking-widest font-bold">
          Curated Experiences
        </p>
        <h1 class="font-semibold text-4xl md:text-7xl my-20 title font-playfair-display tracking-wide gap-2">
          Explore the soul of <br> South America
        </h1>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <nuxt-link v-for="(trip, index) in paginatedTrips" :key="index" :to="'/experiences/' + trip.url"
          class="relative block hover:shadow-lg transition duration-500 ease-in-out h-full bg-white content-between overflow-hidden rounded-md border group">
          <div class="relative overflow-hidden rounded-md h-[40vh] lg:h-96">
            <NuxtImg v-if="trip.imagen" :alt="trip.nombre" :src="trip.imagen"
              class="w-full h-full rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
            <div v-else class="mask gradient-cicle-gray flex items-center justify-center">
              <span class="text-white">Imagen no disponible</span>
            </div>
          </div>
          <div
            class="absolute bottom-6 left-3 md:left-4 bg-white p-4 flex justify-between items-center rounded-md w-11/12">
            <span>{{ trip.nombre }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </nuxt-link>
      </div>

      <div v-if="route.path === '/experiences'" class="text-center mt-6">
        <button v-if="curatedTrips.length > itemsPerPage"
          @click="currentPage * itemsPerPage < curatedTrips.length ? showMore() : showLess()"
          class="px-6 py-3 btn-secondary-outline rounded-md">
          {{
            currentPage * itemsPerPage < curatedTrips.length ? "Ver más experiencias" : "Ver menos experiencias" }}
            </button>
      </div>

      <div v-else class="text-center mt-6">
        <nuxt-link to="/experiences" class="px-6 py-3 btn-secondary-outline rounded-md">
          Ver todas las experiencias
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
