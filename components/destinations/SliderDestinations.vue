<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { useDestinationStore } from '~/stores/destination';

const destinationStore = useDestinationStore();
const destinations = ref([]);

const getDestinations = async () => {
  const res: any = await destinationStore.getCountries();
  destinations.value = res
    .filter((country: any) => country.imagen_s) // solo si el país tiene imagen
    .map((country: any) => ({
      title: country.nombre,
      image: country.imagen_s,
      url: country.url,
    }));
};


onMounted(async () => {
  await getDestinations();
});

const breakpoints = {
  750: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  1000: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
  1400: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
  1600: {
    itemsToShow: 5,
    snapAlign: 'center',
  }
}
</script>
<template>
  <section class="my-20">
    <div class="container text-center mb-8">
      <div class="border-title mb-2 mx-auto"></div>
      <p class="mb-6 tracking-widest font-bold">
        Icons of Latin America
      </p>
      <h1 class="font-semibold text-4xl md:text-8xl mb-6 title font-playfair-display tracking-wide">
        Next stop awaits you!
      </h1>
    </div>
    <div class="text-center my-6">
      <nuxt-link to="/destinations" class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700">
        Explore All Destinations
      </nuxt-link>
    </div>
    <Carousel wrap-around :transition="1500" :autoplay="2000" :items-to-scroll="1" :breakpoints="breakpoints"
      pause-autoplay-on-hover>
      <Slide v-for="(destinations, index) in destinations" :key="index"
        class="justify-center items-center overflow-hidden p-6 w-full">
        <NuxtLink :to="'/destinations/' + destinations.url"
          class="p-2 gap-3 grid grid-cols-2 items-center overflow-hidden rounded-md group cursor-pointer hover:shadow-lg transition duration-500 ease-in-out text-center">
          <div class="overflow-hidden relative rounded-md w-full h-full">
            <NuxtImg v-if="destinations.image" :src="destinations.image" :alt="destinations.title"
              class="w-full h-full rounded-md transition duration-500 ease-in-out transform group-hover:scale-105"
              loading="lazy" />
            <div v-else class="mask gradient-cicle-gray flex items-center justify-center">
            </div>
          </div>
          <div class="w-full mx-auto items-center justify-center flex">
            <h2 class="text-center text-xl flex flex-wrap font-semibold text-gray-800 font-playfair-display">
              {{ destinations.title }}
            </h2>
          </div>
        </NuxtLink>
      </Slide>
    </Carousel>
  </section>
</template>
<style></style>
