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
    snapAlign: 'center',
  },
  1400: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
  1600: {
    itemsToShow: 5,
    snapAlign: 'center',
  }
}
</script>
<template>
  <section class="my-20">
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
      <nuxt-link to="/destinations" class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700">
        Explorar Destinos
      </nuxt-link>
    </div>
    <Carousel wrap-around pause :transition="40000" :autoplay="1000" :items-to-scroll="destinations.length"
      :breakpoints="breakpoints">
      <Slide v-for="(destinations, index) in destinations" :key="index"
        class="justify-center items-center overflow-hidden p-6 w-full">
        <NuxtLink :to="'/' + destinations.url"
          class="p-2 grid grid-cols-2 items-center overflow-hidden rounded-md group cursor-pointer hover:shadow-lg transition duration-500 ease-in-out w-fit">
          <div class="overflow-hidden relative rounded-md">
            <nuxt-img :src="destinations.image" :alt="destinations.title"
              class="w-full h-40 rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
          </div>
          <div class="w-full relative ">
            <h2 class="text-xl font-semibold text-gray-800 w-full font-playfair-display">
              {{ destinations.title }}
            </h2>
          </div>
        </NuxtLink>
      </Slide>
    </Carousel>
  </section>
</template>
<style></style>
