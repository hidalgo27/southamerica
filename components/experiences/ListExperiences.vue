<script lang="ts" setup>
const { $gsap } = useNuxtApp()
const selectedItem = ref(null)

const animateImage = async (index: any) => {
  gsap.fromTo(
    `.image-${index}`,
    { opacity: 0, y: -100, autoAlpha: 0 },
    { opacity: 1, y: 0, autoAlpha: 1, duration: 2, ease: 'power2.inOut' }
  )
}

const items = ref([
  { text: 'Cruise' },
  { text: 'Escorted Touring' },
  { text: 'Independent/Tailor-Made' },
  { text: 'Private Experience' },
  { text: 'Rail' },
  { text: 'Road Trip' },
  { text: 'Vacation Packages with Air' }
]);
</script>
<template>
  <div class="bg-tertiary bg-opacity-30">
    <div class="container py-32 text-center">
      <div class="text-center mb-8">
        <div class="border-title mb-2 mx-auto"></div>
        <p class="mb-6 tracking-widest font-bold">
          Curated Trip Styles
        </p>
        <h1 class="font-semibold text-4xl md:text-7xl mb-6 title font-playfair-display tracking-wide">
          Explore the world your way.
        </h1>
      </div>

      <div class=" w-full max-w-3xl mx-auto">
        <NuxtLink to="#" v-for="(item, index) in items" :key="index"
          class="group flex justify-between p-4 rounded-md border-gray-500 transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02]"
          @mouseenter="selectedItem = index; animateImage(index)" @mouseleave="selectedItem = null">
          <div class="flex items-center md:w-3/5">
            <span class="text-gray-400 text-md md:text-lg w-8">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span class="md:ml-4 text-sm md:text-3xl transition-all duration-300 group-hover:translate-x-2">
              {{ item.text }}
            </span>
          </div>
          <div
            class="absolute left-2/3 top-1/2 transform -translate-y-1/2 w-32 h-32 z-50 object-cover rounded-lg shadow-lg">
            <img v-if="selectedItem === index" :class="'image-' + index" alt="Imagen de referencia"
              class="w-full h-full rounded-md"
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
<style></style>