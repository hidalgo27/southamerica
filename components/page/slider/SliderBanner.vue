<script setup lang="ts">
import { Carousel, Slide } from "vue3-carousel";
const slides = [
  {
    image: "/images/banners/destinations/rio.webp",
    title: "Escape to Rio Janeiro",
    buttonText: "Explore Here",
  },
  {
    image: "/images/banners/destinations/uyuni.webp",
    title: "Discover the Beauty of Uyuni",
    buttonText: "View More",
  },
  {
    image: "/images/banners/destinations/cartagena.webp",
    title: "Enjoy Cartagena",
    buttonText: "Explore Here",
  },

];
</script>
<template>
  <section class="my-20">
    <carousel wrap-around :items-to-show="1.1" :gap="200" :autoplay="5000" :transition="2000" pause-autoplay-on-hover>
      <slide v-for="(slide, index) in slides" :key="index" class="px-3">
        <NuxtImg :src="slide.image" alt="Slide Image" class="w-full h-[60vh] object-cover  rounded-md" loading="lazy"
          webp="" />
        <div class="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-16 lg:p-24">
          <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-playfair">
            {{ slide.title }}
          </h1>
          <NuxtLink to="/destinations"
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
