<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination as CarouselPagination } from "vue3-carousel";
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
];

const breakpoints = {
  // 500px and up
  600: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  // 700px and up
  // 1024 and up
  1024: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
};

</script>

<template>
  <section class="container my-20">
    <div class="text-center tracking-widest font-bold pb-6">
      <div class="border-title mb-2 mx-auto"></div>
      <p class="mb-6 tracking-widest font-bold">Top Trip Experiences</p>
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">Memories won't make themselves.
      </h1>
    </div>
    <carousel :breakpoints="breakpoints" class="-m-3">
      <slide v-for="(packages, index) in listPackages" :key="index" class="px-3">
        <CardPackage :packageData="packages"></CardPackage>
      </slide>
      <template #addons>
        <CarouselPagination></CarouselPagination>
      </template>
    </carousel>
    <div class="text-center mt-6">
      <nuxt-link to="/travel-packages" class="px-6 py-3 btn-secondary-outline rounded-md hover:bg-red-600 w-full">
        Ver todos los paquetes
      </nuxt-link>
    </div>
  </section>
</template>
