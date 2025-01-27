<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation as CarouselNavigation } from "vue3-carousel";


const listPackages = [
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    imagen: 'https://picsum.photos/400/300',
    duracion: 7,
    precio_tours: 0,
    precio_paquetes: 0,
  },
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    imagen: 'https://picsum.photos/400/300',
    duracion: 7,
    precio_tours: 0,
    precio_paquetes: 0,
  },
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    imagen: 'https://picsum.photos/400/300',
    duracion: 7,
    precio_tours: 0,
    precio_paquetes: 0,
  },
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    imagen: 'https://picsum.photos/400/300',
    duracion: 7,
    precio_tours: 0,
    precio_paquetes: 0,
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
  <section class="container">
    <carousel :breakpoints="breakpoints">
      <slide v-for="(packages, index) in listPackages" :gap="20" :key="index" class="w-full h-full">
        <nuxt-link :to="'/peru-travel-packages/' + packages.url"
          class="bg-white content-between overflow-hidden rounded-md border group cursor-pointer hover:shadow-lg transition duration-500 ease-in-out h-full">
          <div>
            <div class="overflow-hidden relative">
              <div class="absolute inset-0 gradient-cicle-beige z-10"></div>
              <nuxt-img :src="packages.imagen" :alt="packages.titulo"
                class="w-[400px] object-cover h-[300px] transition duration-500 ease-in-out transform group-hover:scale-105" />
              <span class="absolute bottom-0 left-0 p-1 m-3 rounded-lg z-20 backdrop-blur-lg font-normal text-white">
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
            <div v-if="packages.is_p_t == 0">
              <div v-if="packages.precio_tours > 0">
                ${{ packages.precio_tours }}
                <span class="text-sm text-secondary">usd</span>
              </div>
              <div v-else>
                <span class="text-red-500">Inquire</span>
              </div>
            </div>
            <div v-else>
              <div class="flex items-center text-secondary" v-if="packages.precio_paquetes > 0">
                <span>From</span> ${{ packages.precio_paquetes }} usd
              </div>
              <div v-else>
                <span class="text-red-500">Inquire</span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </slide>
    </carousel>
  </section>
</template>
