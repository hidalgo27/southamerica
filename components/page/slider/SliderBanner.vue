<script setup lang="ts">
import { Carousel, Slide } from "vue3-carousel";
const slides = [
  {
    image: "/images/banners/destinations/rio.webp",
    title: "Escape to Rio Janeiro",
    buttonText: "Explore Here",
    url: "/destinations/brazil/rio-de-janeiro",
  },
  {
    image: "/images/banners/destinations/uyuni.webp",
    title: "Discover the Beauty of Uyuni",
    buttonText: "View More",
    url: "/destinations/bolivia/uyuni",
  },
  {
    image: "/images/banners/destinations/cartagena.webp",
    title: "Enjoy Cartagena",
    buttonText: "Explore Here",
    url: "/destinations/colombia/cartagena",
  },
];

const carouselRef = ref();
const next = () => carouselRef.value.next();
const prev = () => carouselRef.value.prev();
</script>
<template>
  <section class="my-20 relative group">
    <!-- Botón izquierdo -->
    <button @click="prev" class="absolute top-1/2 -translate-y-1/2 left-1 md:left-6 z-10 p-2 bg-white/80 hover:bg-white rounded-full border shadow 
           lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
    </button>

    <!-- Botón derecho -->
    <button @click="next" class="absolute top-1/2 -translate-y-1/2 right-1 md:right-6 z-10 p-2 bg-white/80 hover:bg-white rounded-full border shadow 
           lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </button>
    <carousel ref="carouselRef" wrap-around :items-to-show="1.1" :gap="200" :autoplay="5000" :transition="2000"
      pause-autoplay-on-hover>
      <slide v-for="(slide, index) in slides" :key="index" class="px-3">
        <NuxtImg :src="slide.image" alt="Slide Image" class="w-full h-[60vh] object-cover  rounded-md" loading="lazy"
          webp="" />
        <div class="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-16 lg:p-24">
          <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-playfair">
            {{ slide.title }}
          </h1>
          <NuxtLink :to="slide.url"
            class="translate-y-32  px-6 py-3 bg-white text-gray-800 text-lg font-semibold rounded shadow hover:bg-gray-100"
            loading="lazy">
            {{ slide.buttonText }}
          </NuxtLink>
        </div>
      </slide>
    </Carousel>
  </section>
</template>
<style></style>
