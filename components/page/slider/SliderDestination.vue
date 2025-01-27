<script lang="ts" setup>
import { Carousel, Slide } from "vue3-carousel";
const slides = [
  {
    image: "https://picsum.photos/400/300",
    title: "Escape to The Islands of Tahiti",
    buttonText: "Explore Here",
  },
  {
    image: "https://picsum.photos/400/300",
    title: "Discover the Beauty of Bora Bora",
    buttonText: "Learn More",
  },
];
</script>
<template>
  <section class="container py-6">
    <Carousel :items-to-show="1.2" autoplay :autoplay-timeout="5000" :gap="20">
      <slide v-for="(slide, index) in slides" :key="index" class="w-full">
        <img :src="slide.image" alt="Slide Image"class="w-full h-[60vh] object-cover rounded-lg"/>
        <div class="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-16 lg:p-24">
        <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-playfair">
          {{ slide.title }}
        </h1>
        <button class="mt-4 px-6 py-3 bg-white text-gray-800 text-lg font-semibold rounded shadow hover:bg-gray-100">
          {{ slide.buttonText }}
        </button>
        </div>
      </slide>
    </Carousel>
  </section>
</template>

<style></style>
