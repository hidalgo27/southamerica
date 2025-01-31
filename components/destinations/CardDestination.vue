<script lang="ts" setup>
import AllMiniCards from './AllMiniCards.vue';

defineProps({
  destinations: {
    type: Array as PropType<any[]>,
    required: true,
  },
});
</script>
<template>
  <section v-for="(destination, index) in destinations" :key="index" class="container mt-28 mb-12">
    <div class="flex items-center justify-center mt-28 mb-12">
      <div class="grid  grid-cols-1 md:grid-cols-2 bg-white w-full gap-6 items-stretch">
        <div class="bg-tertiary bg-opacity-10 p-6 rounded-md flex flex-col justify-between h-full">
          <div class="text-gray-500 text-lg mb-4">{{ destination.title }}</div>
          <div class="border-t-2 h-64 mb-8"></div>
          <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">{{ destination.title }}
            Travel Packages</h1>
          <p class="text-gray-600 mb-8">{{ destination.description }}</p>
          <NuxtLink :to="'/destinations/' + destination.url"
            class="btn-ternary py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700">Explore {{
              destination.title }}</NuxtLink>
        </div>
        <div class="relative w-full rounded-md h-full min-h-[70vh]">
          <img :alt="'Explore ' + destination.title" class="w-full h-[70vh] object-cover rounded-md"
            :src="destination.image" />
        </div>
      </div>
    </div>
    <AllMiniCards :destination="destination"></AllMiniCards>
  </section>
</template>
<style></style>