<script lang="ts" setup>

defineProps({
  destination: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>
<template>
  <h1 class="mb-6 tracking-widest font-bold"> Explore {{ destination.countries.length }} Destinations
  </h1>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 w-full">
    <NuxtLink v-for="(country, cIndex) in destination.countries" :key="cIndex"
      :to="'/' + country.title.toLowerCase().replace(/ /g, '-')"
      class="bg-white grid grid-cols-2 items-center p-4 content-between overflow-hidden rounded-md group cursor-pointer hover:shadow-lg transition duration-500 ease-in-out h-full">
      <div class="overflow-hidden relative rounded-md">
        <nuxt-img :src="country.image" :alt="country.title"
          class="w-full h-16 md:h-24 rounded-mg object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
      </div>
      <h2 class="text-center mx-3 text-xl font-playfair-display font-semibold text-gray-800">
        {{ country.title }}
      </h2>
    </NuxtLink>
  </div>
</template>
<style></style>