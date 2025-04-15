<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation as CarouselNavigation } from "vue3-carousel";
import CardPackage from './CardPackage.vue';

const props = defineProps({
  listPackages: {
    type: Array,
    required: true,
  },
});

const breakpoints = {
  600: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  // 1024 and up
  1024: {
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
  if (window.innerWidth >= 1024) {
    itemsToShow.value = 3;
  } else if (window.innerWidth >= 600) {
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
  if (packageCount === 3 && window.innerWidth < 1024) {
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

</script>

<template>
  <section class="my-20 container">
    <div class="container text-center tracking-widest font-bold pb-6">
      <div class="border-title mb-2 mx-auto"></div>
      <p class="mb-6 tracking-widest font-bold">Top Trip Experiences</p>
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">
        Your next chapter starts here
      </h1>
    </div>
    <div v-if="listPackages.length === 0" class="text-center text-gray-500 mt-4">
      No packages available.
    </div>
    <div v-else-if="!showCarousel" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardPackage v-for="(packages, index) in listPackages" :key="index" :packageData="packages" />
    </div>
    <carousel v-else :breakpoints="breakpoints" class="-m-3" @update:modelValue="updateProgress">
      <slide v-for="(packages, index) in listPackages" :key="index" class="px-3 relative">
        <CardPackage :packageData="packages"></CardPackage>
      </slide>
      <template #addons="{ currentSlide }">
        <CarouselNavigation>
          <template #prev>
            <div v-if="currentSlide > 0"
              class="absolute -translate-x-8 lg:-translate-x-10 p-1 lg:p-2 rounded-full border hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4 lg:size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </div>
          </template>
          <template #next>
            <div v-if="progressWidth !== 100"
              class="absolute translate-x-8 lg:translate-x-10 p-1 lg:p-2 rounded-full border hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4 lg:size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </template>
        </CarouselNavigation>
      </template>
    </carousel>
    <div class="progress-bar-container" v-if="showCarousel">
      <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
    </div>
    <div class="text-center mt-6">
      <nuxt-link to="/travel-packages" class="px-6 py-3 btn-secondary-outline rounded-md w-full ">
        Ver todos los paquetes
      </nuxt-link>
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