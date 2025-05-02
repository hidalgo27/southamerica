<script setup lang="ts">
import CardPackage from './CardPackage.vue';

const props = defineProps({
  listPackages: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section class="my-20 container">
    <div class="container text-center tracking-widest font-bold pb-6">
      <div class="border-title mb-2 mx-auto"></div>
      <p class="mb-6 tracking-widest font-bold">Top Trip Experiences</p>
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">
        Your next chapter starts here
      </h1>
    </div>

    <div v-if="listPackages.length === 0" class="text-center text-gray-500 mt-4">
      No packages available.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardPackage
          v-for="(packages, index) in listPackages"
          :key="index"
          :packageData="packages"
      />
    </div>

    <div class="text-center mt-24">
      <nuxt-link to="/travel-packages" class="px-6 py-3 btn-primary-outline rounded-md ">
        View All Packages
      </nuxt-link>
    </div>
  </section>
</template>
