<script lang="ts" setup>
const { $gsap } = useNuxtApp();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  pais: {
    type: Object,
    required: false,
  },
});

const getCountryUrl = (item) => {
  return props.pais?.url || item.pais?.url || '';
};

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
</script>

<template>
  <div class="bg-tertiary bg-opacity-30">
    <div class="container py-32 text-center">
      <div class="text-center mb-8 justify-center">
        <div class="border mb-2 "></div>
        <p class="mb-6 tracking-widest font-bold"></p>
        <h1 class="font-semibold text-4xl md:text-7xl mb-6 title font-playfair-display tracking-wide">
          Explore the world your way.
        </h1>
      </div>

      <div class="w-3/4 mx-auto" v-if="items.length">
        <NuxtLink v-for="(item, index) in items" :key="index"
          class="group flex justify-between p-4 rounded-md border-gray-500 transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02]"
          :to="'/destinations/' + getCountryUrl(item) + '/' + item.url"
          @mouseenter="selectedItem = index; animateImage(index);"
          @mouseleave="selectedItem = null; animatingItem = null;">
          <div class="flex items-center md:w-3/5">
            <span class="text-gray-400 text-md md:text-lg w-8">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
            <span class="md:ml-4 text-sm md:text-xl lg:text-2xl transition-all duration-300 group-hover:translate-x-2">
              {{ item.nombre }}
            </span>
          </div>
          <div v-if="animatingItem === index && item.imagen"
            class="absolute left-2/3 md:left-1/2 top-1/2 transform lg:translate-x-24 -translate-y-1/2 hidden md:flex md:w-60 md:h-72 z-10">
            <NuxtImg :class="'image-' + index" :alt="item.nombre" class="w-full h-full rounded-md" :src="item.imagen" />
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
