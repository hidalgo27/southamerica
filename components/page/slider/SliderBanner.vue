<script setup lang="ts">
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
  <section class="my-20">
    <carousel :items-to-show="1.1" :gap="200" :autoplay="5000" :transition="2000" pause-autoplay-on-hover>
      <slide v-for="(slide, index) in slides" :key="index" class="px-3">
        <img :src="slide.image" alt="Slide Image" class="w-full h-[60vh] object-cover  rounded-md" />
        <div class="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-16 lg:p-24">
          <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-playfair">
            {{ slide.title }}
          </h1>
          <button
            class="translate-y-44 px-6 py-3 bg-white text-gray-800 text-lg font-semibold rounded shadow hover:bg-gray-100">
            {{ slide.buttonText }}
          </button>
        </div>
      </slide>
    </Carousel>
  </section>
</template>

<style></style>
