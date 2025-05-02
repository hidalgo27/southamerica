<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation as CarouselNavigation } from "vue3-carousel";
import CardPackage from './CardPackage.vue';

const props = defineProps({
  listPackages: {
    type: Array,
    required: true,
  },
  isHome: {
    type: Boolean,
  },
  title: {
    type: String,
    default: 'Most Popular Packages',
  }
});

const breakpoints = {
  768: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  // 1024 and up
  1440: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
};

const currentSlide = ref(0);
const itemsToShow = ref(1);

// Función para actualizar el progreso
const updateProgress = (index: number) => {
  currentSlide.value = index;
};

// Detectar cuántos slides se muestran
const updateItemsToShow = () => {
  if (window.innerWidth >= 1440) {
    itemsToShow.value = 3;
  } else if (window.innerWidth >= 768) {
    itemsToShow.value = 2;
  } else {
    itemsToShow.value = 1;
  }
};
const showCarousel = computed(() => {
  const packageCount = props.listPackages.length;

  if (packageCount === 1) {
    return false; // No mostrar carrusel si hay solo 1 paquete
  }
  if (packageCount === 2 && window.innerWidth < 768) {
    return true; // Mostrar carrusel solo en móviles si hay 2 paquetes
  }
  if (packageCount === 3 && window.innerWidth < 1440) {
    return true; // Mostrar carrusel en móviles y tablets si hay 3 paquetes
  }
  if (packageCount > 3) {
    return true; // Mostrar carrusel siempre si hay más de 3 paquetes
  }
  return false; // En otros casos, no mostrar carrusel
});


// Llamar la función al cargar y en el resize
onMounted(() => {
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
});

// Calcular progreso
const progressWidth = computed(() => {
  const totalVisibleSlides = props.listPackages.length - itemsToShow.value;
  return totalVisibleSlides > 0
    ? ((currentSlide.value / totalVisibleSlides) * 100)
    : '100';
});

const carouselRef = ref();
const next = () => carouselRef.value.next();
const prev = () => carouselRef.value.prev();
</script>

<template>
  <section class="my-20 py-20 bg-opacity-30" :class="{ 'bg-secondary': title !== 'Most Popular Packages' }">
    <div class="container">
      <div class="text-center tracking-widest font-bold pb-6">
        <div class="border-title mb-2 mx-auto"></div>
        <!-- <p class="mb-6 tracking-widest font-bold">Top Trip Experiences</p> -->
        <ClientOnly>
          <h1 class="font-semibold text-5xl my-6 title font-playfair-display tracking-wide">{{ title }}</h1>
        </ClientOnly>
      </div>
      <div v-if="listPackages.length === 0" class="text-center text-gray-500 mt-4">
        No packages available.
      </div>
      <div v-if="isHome && listPackages.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardPackage v-for="(packages, index) in listPackages" :key="index" :packageData="packages" />
      </div>
      <div v-else-if="!showCarousel" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardPackage v-for="(packages, index) in listPackages" :key="index" :packageData="packages" />
      </div>
      <div v-else class="relative">
        <!-- Botón izquierdo -->
        <button @click="prev" class="absolute top-1/2 -translate-y-1/2 left-1 md:left-6 z-10 p-2 bg-white/80 hover:bg-white rounded-full border shadow 
            transition-opacity duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>

        <!-- Botón derecho -->
        <button @click="next" class="absolute top-1/2 -translate-y-1/2 right-1 md:right-6 z-10 p-2 bg-white/80 hover:bg-white rounded-full border shadow 
            transition-opacity duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
        <carousel ref="carouselRef" :breakpoints="breakpoints" class="-m-3" @update:modelValue="updateProgress">
          <slide v-for="(packages, index) in listPackages" :key="index" class="px-3 relative">
            <CardPackage :packageData="packages"></CardPackage>
          </slide>
        </carousel>
        <div class="progress-bar-container" v-if="showCarousel">
          <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
        </div>
      </div>
      <div class="text-center mt-6">
        <nuxt-link to="/travel-packages" class="px-6 py-3 btn-secondary-outline rounded-md w-full ">
          View All Packages
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<style scoped>
.progress-bar-container {
  width: 100%;
  height: 4px;
  background-color: #e5e7eb;
  margin-top: 2rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease-in-out;
  @apply bg-secondary
}
</style>