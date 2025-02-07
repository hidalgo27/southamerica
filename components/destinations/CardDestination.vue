<script lang="ts" setup>
import AllMiniCards from './AllMiniCards.vue';

const props = defineProps({
  destinations: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <section v-for="(destination, index) in destinations" :key="index" class="container my-20">
    <div class="flex items-center justify-center my-20">
      <div class="grid grid-cols-1 md:grid-cols-2 bg-white w-full  gap-6 ">
        <div class="bg-tertiary bg-opacity-10 p-6 rounded-md flex flex-col justify-between items-stretch h-full">
          <div class="text-gray-500 text-lg ">{{ destination.nombre }}</div>
          <div class="border-t-2 h-auto "></div>
          <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">{{ destination.nombre }}
            Travel Packages</h1>
          <div v-html="destination.descripcion"></div>
          <NuxtLink :to="'/destinations/' + destination.url"
            class="btn-ternary py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700">Explore {{
              destination.nombre }}</NuxtLink>
        </div>
        <div class="relative w-full rounded-md h-full">
          <img :alt="'Explore ' + destination.nombre" class="w-full h-[70vh] object-cover rounded-md"
            :src="destination.imagen" />
        </div>
      </div>
    </div>
    <AllMiniCards :destination="destination"></AllMiniCards>
  </section>
</template>
<style></style>