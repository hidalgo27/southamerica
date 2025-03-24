<script setup lang="ts">
import { Carousel, Slide } from "vue3-carousel";
const slides = [
  {
    image: "https://images.goway.com/production/styles/hero_s1_xl/s3/hero/iStock-1919241099.jpeg?h=b631e5b1&itok=9LU4KnKh 1x",
    title: "Escape to The Islands of Tahiti",
    buttonText: "Explore Here",
  },
  {
    image: "https://images.goway.com/production/styles/hero_s1_3xl/s3/hero/iStock-157728558_0.jpg?h=99baf7c0&itok=TcVBqOWU 1x",
    title: "Discover the Beauty of Bora Bora",
    buttonText: "Learn More",
  },
];
</script>
<template>
  <section class="my-20">
    <carousel :items-to-show="1.1" :gap="200" :autoplay="5000" :transition="2000" pause-autoplay-on-hover>
      <slide v-for="(slide, index) in slides" :key="index" class="px-3">
        <NuxtImg :src="slide.image" alt="Slide Image" class="w-full h-[60vh] object-cover  rounded-md" />
        <div class="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-16 lg:p-24">
          <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-playfair">
            {{ slide.title }}
          </h1>
          <NuxtLink to="/destinations"
            class="translate-y-32  px-6 py-3 bg-white text-gray-800 text-lg font-semibold rounded shadow hover:bg-gray-100">
            {{ slide.buttonText }}
          </NuxtLink>
        </div>
      </slide>
    </Carousel>
  </section>
</template>

<style></style>
