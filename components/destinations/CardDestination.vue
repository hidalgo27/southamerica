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
        <div class="bg-tertiary bg-opacity-10 p-6 rounded-md flex flex-col justify-between h-full">
          <div class="text-gray-500 text-lg ">{{ destination.nombre }}</div>
          <div class="border-y-2 mb-20"></div>
          <h1 class="font-semibold text-3xl lg:text-5xl my-6 font-playfair-display tracking-wide">{{ destination.nombre
          }}
            Travel Packages</h1>
          <div class="text-sm md:text-lg" v-html="destination.resumen"></div>
          <NuxtLink :to="'/destinations/' + destination.url"
            class="btn-ternary mt-6 py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700">Explore {{
              destination.nombre }}</NuxtLink>
        </div>
        <div class="relative w-full rounded-md h-full">
          <NuxtImg :alt="'Explore ' + destination.nombre" class="w-full h-full object-cover rounded-md"
            :src="destination.imagen" />
        </div>
      </div>
    </div>
    <AllMiniCards :destination="destination"></AllMiniCards>
  </section>
</template>
<style></style>