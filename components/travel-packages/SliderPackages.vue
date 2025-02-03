<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation as CarouselNavigation } from "vue3-carousel";
import CardPackage from './CardPackage.vue';

const listPackages = [
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    country: 'Peru & Ecuador',
    specials: true,
    imagen: 'https://picsum.photos/400/300',
    duracion: 7,
    url: '/machu-picchu-galapagos-islands',
    precio_paquetes: 4129,
    ahorro: 600,
    etiquetas: ['Premium', 'Escorted Touring', 'Nature'],
    reserva: 'Feb 28, 2025',
  },
  {
    titulo: 'Amazon Rainforest Adventure',
    specials: true,
    imagen: 'https://picsum.photos/400/350',
    duracion: 10,
    url: '/amazon-rainforest-adventure',
    precio_paquetes: 3299,
    ahorro: 500,
    reserva: 'Mar 15, 2025',
  },
  {
    titulo: 'Patagonia Explorer',
    country: 'Argentina',
    imagen: 'https://picsum.photos/400/400',
    duracion: 12,
    url: '/patagonia-explorer',
    precio_paquetes: 4999,
    ahorro: 800,
    etiquetas: ['Deluxe', 'Hiking', 'Expedition'],
    reserva: 'Apr 10, 2025',
  },
  {
    titulo: 'Peru Cultural Discovery',
    imagen: 'https://picsum.photos/400/450',
    duracion: 9,
    url: '/peru-cultural-discovery',
    precio_paquetes: 2899,
    ahorro: 300,
    etiquetas: ['Premium', 'History', 'Local Experience'],
    reserva: 'May 5, 2025',
  },
  {
    titulo: 'Costa Rica Adventure',
    specials: true,
    imagen: 'https://picsum.photos/400/500',
    duracion: 8,
    url: '/costa-rica-adventure',
    precio_paquetes: 2499,
    ahorro: 400,
    etiquetas: ['Deluxe', 'Nature', 'Adventure'],
    reserva: 'Jun 20, 2025',
  }
];

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

// Llamar la función al cargar y en el resize
onMounted(() => {
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
});

// Calcular progreso
const progressWidth = computed(() => {
  const totalVisibleSlides = listPackages.length - itemsToShow.value;
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
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">Memories won't make themselves.
      </h1>
    </div>
    <carousel :breakpoints="breakpoints" class="-m-3" @update:modelValue="updateProgress">
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
    <div class="progress-bar-container">
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