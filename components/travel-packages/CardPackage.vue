<script lang="ts" setup>
import gsap from 'gsap';

const animatedDiv = ref<HTMLElement | null>(null);
const imageDiv = ref<HTMLElement | null>(null);

defineProps({
  packageData: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  if (!imageDiv.value) return;
  gsap.set(animatedDiv.value, { opacity: 0, y: 100 });

  // Activar la animación cuando el mouse pasa sobre el div
  const handleMouseEnter = () => {
    gsap.to(
      animatedDiv.value,
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  };

  const handleMouseLeave = () => {
    gsap.to(
      animatedDiv.value,
      { opacity: 0, y: 100, duration: 0.5, ease: "power2.out" }
    );
  };

  // Agregar el evento mouseenter
  if (imageDiv.value) {
    imageDiv.value.addEventListener('mouseenter', handleMouseEnter);
  }

  imageDiv.value.addEventListener('mouseenter', handleMouseEnter);
  imageDiv.value.addEventListener('mouseleave', handleMouseLeave);

  // Limpiar eventos al desmontar
  onBeforeUnmount(() => {
    if (imageDiv.value) {
      imageDiv.value.removeEventListener('mouseenter', handleMouseEnter);
      imageDiv.value.removeEventListener('mouseleave', handleMouseLeave);
    }
  });
});
</script>
<template>
  <div ref="imageDiv"
    class="bg-white rounded-md border overflow-hidden w-full h-full group flex-grow hover:shadow-xl hover:border-transparent transition duration-500 ease-in-out">
    <div class="relative overflow-hidden cursor-pointer">
      <NuxtLink :to="'/travel-packages' + packageData.url" class="block">
        <NuxtImg :src="packageData.imagen" :alt="packageData.titulo"
          class="w-full h-72 object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
        <div class="absolute top-4 left-4 flex space-x-2">
          <span v-if="packageData.specials"
            class="bg-white text-secondary text-xs font-semibold px-2 py-1 rounded-full">
            Specials
          </span>
          <span v-if="packageData.country" class="bg-blue-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {{ packageData.country }}
          </span>
        </div>
        <div ref="animatedDiv" class="absolute bottom-4 right-4 flex bg-white space-x-2 rounded-full p-2 y-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
            class="size-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      </NuxtLink>
    </div>
    <div class="p-6 text-left ">
      <div class="h-64">
        <div class="flex flex-wrap gap-2 my-4">
          <span v-for="(tag, i) in packageData.etiquetas" :key="i"
            class="bg-secondary bg-opacity-10 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
            :class="{ 'bg-white border': i === 0 }">
            {{ tag }}
          </span>
        </div>
        <NuxtLink :to="'/travel-packages' + packageData.url"
          class="text-2xl font-semibold font-playfair-display tracking-wide mb-3 block">
          {{ packageData.titulo }}
        </NuxtLink>
        <p class="text-gray-500 my-6 flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6 text-secondary">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span class="ml-2"> Book by {{ packageData.reserva }}</span>
        </p>
      </div>
      <div class="flex items-center border-t pt-4 text-sm">
        <span class="text-gray-700">
          {{ packageData.duracion }} days
        </span>
        <div class="block border-l border-gray-200 h-8 mx-6"></div>
        <div class="flex justify-between items-center">
          <span class="block text-gray-700 mr-2">
            From US$ {{ packageData.precio_paquetes.toLocaleString() }}
          </span>
          <span v-if="packageData.ahorro" class="block text-red-500">
            savings US$ {{ packageData.ahorro.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>