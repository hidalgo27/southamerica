<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
const destinations = [
  {
    title: 'Machu Picchu',
    image: 'https://picsum.photos/400/300',
    url: 'machu-picchu',
  },
  {
    title: 'Galapagos Islands',
    image: 'https://picsum.photos/400/300',
    url: 'galapagos-islands',
  },
  {
    title: 'Amazon Rainforest',
    image: 'https://picsum.photos/400/300',
    url: 'amazon-rainforest',
  },
  {
    title: 'Lake Titicaca',
    image: 'https://picsum.photos/400/300',
    url: 'lake-titicaca',
  },
  {
    title: 'Nazca Lines',
    image: 'https://picsum.photos/400/300',
    url: 'nazca-lines',
  },
  {
    title: 'Colca Canyon',
    image: 'https://picsum.photos/400/300',
    url: 'colca-canyon',
  },
  {
    title: 'Sacred Valley',
    image: 'https://picsum.photos/400/300',
    url: 'sacred-valley',
  },
  {
    title: 'Uyuni Salt Flats',
    image: 'https://picsum.photos/400/300',
    url: 'uyuni-salt-flats',
  },
  {
    title: 'Torres del Paine',
    image: 'https://picsum.photos/400/300',
    url: 'torres-del-paine',
  }
];

const breakpoints = {
  750: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  1000: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
  1400: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
  1600: {
    itemsToShow: 5,
    snapAlign: 'start',
  }
}
</script>
<template>
  <section class="mt-28 mb-12 pt-12">
    <div class="container text-center mb-8">
      <div class="border-title mb-2 mx-auto"></div>
      <p class="mb-6 tracking-widest font-bold">
        Top Places To Travel
      </p>
      <h1 class="font-semibold text-4xl md:text-8xl mb-6 title font-playfair-display tracking-wide">
        Where are you headed to next?
      </h1>
    </div>
    <div class="text-center my-6">
      <nuxt-link to="#" class="px-6 py-3 btn-secondary-outline rounded-md hover:bg-red-600 text-xl">
        Explorar Destinos
      </nuxt-link>
    </div>
    <Carousel wrap-around :autoplay="2000" :snap-align="center" :breakpoints="breakpoints" class="gap-4">
      <Slide v-for="(destinations, index) in destinations" :key="index"
        class="w-full justify-center items-center overflow-hidden">
        <NuxtLink :to="'/' + destinations.url"
          class="bg-white flex items-center p-4 content-between overflow-hidden rounded-md border group cursor-pointer hover:shadow-lg transition duration-500 ease-in-out h-full">
          <div class="overflow-hidden relative rounded-md">
            <nuxt-img :src="destinations.image" :alt="destinations.title"
              class="w-36 h-36 rounded-mg object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
          </div>
          <h2 class="mx-3 text-xl font-playfair-display font-semibold text-gray-800">
            {{ destinations.title }}
          </h2>
        </NuxtLink>
      </Slide>
    </Carousel>
  </section>
</template>
<style></style>
