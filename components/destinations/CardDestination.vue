<script lang="ts" setup>
interface Country {
  title: string;
  image: string;
}

interface Continent {
  title: string;
  description: string;
  image: string;
  countries: Country[];
}

const props = defineProps({
  destinations: {
    type: Array as PropType<Continent[]>,
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
          <button class="btn-ternary py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700">Explore {{
            destination.title }}</button>
        </div>
        <div class="relative w-full rounded-md h-full min-h-[70vh]">
          <img :alt="'Explore ' + destination.title" class="w-full h-[70vh] object-cover rounded-md"
            :src="destination.image" />
        </div>
      </div>
    </div>
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
  </section>
</template>
<style></style>