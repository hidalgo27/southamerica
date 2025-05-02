<script setup lang="ts">
import { Carousel, Slide } from "vue3-carousel";
const slides = [
  {
    image: "/images/banners/banner-home/Rio.webp",
    title: "Experience the Pulse of Rio",
    phrase: "Golden beaches, samba beats, and awe-inspiring views — Rio is pure rhythm and soul.",
    buttonText: "Feel the Rhythm of Rio",
    url: "/destinations/brazil/rio-de-janeiro",
  },
  {
    image: "/images/banners/banner-home/Uyuni.webp",
    title: "Discover the Magic of Uyuni",
    phrase: "Endless white horizons. Mirror-like landscapes. Step into nature’s dreamscape where sky and earth become one.",
    buttonText: "Discover Uyuni Now",
    url: "/destinations/bolivia/uyuni",
  },
  {
    image: "/images/banners/banner-home/Cartagena.webp",
    title: "Uncover the Spirit of Cartagena",
    phrase: "Colorful streets, Caribbean breeze, and centuries-old charm. Every corner tells a vibrant story.",
    buttonText: "Uncover Cartagena",
    url: "/destinations/colombia/cartagena",
  },
  {
    image: "/images/banners/banner-home/Patagonia.webp",
    title: "Venture into Patagonia’s Wild Heart",
    phrase: "Towering peaks, glacial silence, and the thrill of the unknown. Patagonia stirs the soul.",
    buttonText: "Venture into Patagonia",
    url: "/destinations/argentina/patagonia",
  },
  {
    image: "/images/banners/banner-home/machupicchu.webp",
    title: "Discover the Secrets of Machu Picchu",
    phrase: "Ancient wonders wrapped in cloud forest mystery. A journey through time and legend.",
    buttonText: "Unlock Machu Picchu",
    url: "/destinations/peru/machu-picchu",
  },
  {
    image: "/images/banners/banner-home/Galapagos.webp",
    title: "Explore the Wonders of Galápagos",
    phrase: "Where evolution comes alive. A rare paradise teeming with creatures found nowhere else.",
    buttonText: "Explore the Galápagos",
    url: "/destinations/ecuador/galapagos",
  },
  {
    image: "/images/banners/banner-home/Rainbow.webp",
    title: "Conquer Rainbow Mountain",
    phrase: "Embark on a high-altitude quest through a kaleidoscope of earth and sky.",
    buttonText: "Hike the Rainbow",
    url: "/destinations/peru/rainbow-mountain",
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
        <NuxtImg :src="slide.image" alt="Slide Image" class="w-full h-[60vh] object-cover  rounded-md brightness-90"
          loading="lazy" webp="" />
        <div
          class="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24 items-center md:items-start text-white">
          <h1 class=" inline-block text-4xl md:text-5xl lg:text-6xl font-bold font-playfair">
            {{ slide.title }}
          </h1>
          <p class=" text-xl inline-block mt-8 mb-12 italic">{{ slide.phrase }}</p>
          <NuxtLink :to="'/destinations' + slide.url"
            class="translate-y-12  px-6 py-3 bg-white text-gray-800 text-lg font-semibold rounded shadow hover:bg-gray-100"
            loading="lazy">
            {{ slide.buttonText }}
          </NuxtLink>
        </div>
      </slide>
    </Carousel>
  </section>
</template>
<style></style>
