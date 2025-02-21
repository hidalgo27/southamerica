<script lang="ts" setup>
import { ref, nextTick } from "vue";
const { $gsap } = useNuxtApp();

const selectedItem = ref<number | null>(null);
const animatingItem = ref<number | null>(null);

const animateImage = async (index: number) => {
  animatingItem.value = index; // Activamos la imagen

  await nextTick(); // Esperamos a que Vue actualice el DOM

  const randomRotation = (Math.random() * 20) - 10;
  $gsap.fromTo(
    `.image-${index}`,
    { opacity: 0, y: 50, autoAlpha: 0, rotate: 0 },
    { opacity: 1, y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.inOut", rotate: randomRotation }
  );
};

const items = ref([
  { text: "Cruise" },
  { text: "Escorted Touring" },
  { text: "Independent/Tailor-Made" },
  { text: "Private Experience" },
  { text: "Rail" },
  { text: "Road Trip" },
  { text: "Vacation Packages with Air" },
]);
</script>

<template>
  <div class="bg-tertiary bg-opacity-30">
    <div class="container py-32 text-center">
      <div class="text-center mb-8 justify-center">
        <div class="border mb-2 "></div>
        <p class="mb-6 tracking-widest font-bold">Curated Trip Styles</p>
        <h1 class="font-semibold text-4xl md:text-7xl mb-6 title font-playfair-display tracking-wide">
          Explore the world your way.
        </h1>
      </div>

      <div class="w-3/4 mx-auto">
        <NuxtLink to="#" v-for="(item, index) in items" :key="index"
          class="group flex justify-between p-4 rounded-md border-gray-500 transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02]"
          @mouseenter="selectedItem = index; animateImage(index);"
          @mouseleave="selectedItem = null; animatingItem = null;">
          <div class="flex items-center md:w-3/5">
            <span class="text-gray-400 text-md md:text-lg w-8">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
            <span class="md:ml-4 text-sm md:text-xl lg:text-2xl transition-all duration-300 group-hover:translate-x-2">
              {{ item.text }}
            </span>
          </div>
          <div v-if="animatingItem === index"
            class="absolute left-2/3 md:left-1/2 top-1/2 transform lg:translate-x-24 -translate-y-1/2 w-24 h-28 md:w-48 md:h-52 z-10">
            <img :class="'image-' + index" alt="Imagen de referencia" class="w-full h-full rounded-md"
              src="https://images.goway.com/production/styles/hero_s1_3xl/s3/contact_cta/South%20Pacific%20-%20AdobeStock_234280596.jpeg?VersionId=5gLq1k8pBdbzBJqcnVlzQeL.1uVJeqtN&h=894b9109&itok=tLPUHzhf" />
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6 ml-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
