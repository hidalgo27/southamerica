<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation as CarouselNavigation } from "vue3-carousel";

const activeIndex = ref(0);
const listPackages = [
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    imagen: 'https://picsum.photos/400/300',
    duracion: 7,
    url: 'machu-picchu-galapagos-islands',
    precio_paquetes: 0,
  },
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    imagen: 'https://picsum.photos/400/300',
    url: 'machu-picchu-galapagos-islands',
    duracion: 7,
    precio_paquetes: 0,
  },
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    imagen: 'https://picsum.photos/400/300',
    url: 'machu-picchu-galapagos-islands',
    duracion: 7,
    precio_paquetes: 0,
  },
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    imagen: 'https://picsum.photos/400/300',
    url: 'machu-picchu-galapagos-islands',
    duracion: 7,
    precio_paquetes: 1,
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
  <section class="container mt-28 mb-12">
    <div class="text-center tracking-widest font-bold">
      <div class="border-title mb-2 mx-auto"></div>
      <p class="mb-6 tracking-widest font-bold">Top Trip Experiences</p>
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">Memories won't make themselves.
      </h1>
    </div>
    <carousel :breakpoints="breakpoints">
      <slide v-for="(packages, index) in listPackages" :key="index">
        <nuxt-link :to="'/peru-travel-packages/' + packages.url"
          class="bg-white content-between overflow-hidden rounded-md border group cursor-pointer hover:shadow-lg transition duration-500 ease-in-out h-full">
          <div>
            <div class="overflow-hidden relative">
              <div class="absolute inset-0 gradient-cicle-beige z-10"></div>
              <nuxt-img :src="packages.imagen" :alt="packages.titulo"
                class="w-[400px] object-cover h-[300px] transition duration-500 ease-in-out transform group-hover:scale-105" />
              <span class="absolute bottom-0 left-0 p-1 m-3 rounded-md z-20 backdrop-blur-lg font-normal text-white">
                {{ packages.duracion }} days
              </span>
            </div>
            <div class="p-6">
              <div class="border-title mb-2 "></div>
              <h2 class="text-xl mb-4 font-playfair-display tracking-wide">
                {{ packages.titulo }}
              </h2>
            </div>
          </div>
          <div class="border-t px-6 py-5">
            <span class="text-red-500">Inquire</span>
          </div>
        </nuxt-link>
      </slide>
    </carousel>
    <div class="relative w-full h-2 bg-gray-300 mt-4 rounded-full overflow-hidden">
      <div class="absolute top-0 h-full bg-red-500 transition-all duration-500" :style="{ width: '10%' }"></div>
    </div>

    <!-- Botón "Ver todos los paquetes" -->
    <div class="text-center mt-6">
      <nuxt-link to="#" class="px-6 py-3 btn-secondary-outline rounded-md hover:bg-red-600 w-full">
        Ver todos los paquetes
      </nuxt-link>
    </div>
  </section>
</template>
