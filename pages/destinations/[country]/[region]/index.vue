<script lang="ts" setup>
import NavDestination from '~/components/destinations/NavDestination.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import TravelStories from '~/components/home/TravelStories.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import ImgSlider from '~/components/travel-packages/ImgSlider.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';

import { useDestinationStore } from '~/stores/destination';

const destinationStore = useDestinationStore();

const route = useRoute();
const region = ref(null)
const header = ref({
  miniTitle: '',
  title: '',
  subTitle: '',
  url: '',
})

const getRegion = async () => {
  const res: any = await destinationStore.getRegion(route.params.region as string);
  region.value = res.destino;
  console.log(region.value);
  if (region.value) {
    header.value.miniTitle = region.value.title;
    header.value.title = region.value.nombre;
    header.value.subTitle = 'Vacation Packages';
    header.value.url = region.value.imagenes[0].nombre;
  }
};

onMounted(async () => {
  await getRegion();
});

const expanded = ref(false);

const toggleReadMore = () => {
  expanded.value = !expanded.value;
};
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <NavDestination></NavDestination>
  <section v-if="region" class="container my-20 px-6 py-12 flex flex-col justify-center md:flex-row gap-6 md:gap-20">
    <div class="w-full md:w-2/5">
      <p class="my-6">Overview</p>
      <h2 class="text-4xl font-bold text-gray-900 font-playfair-display">
        {{ region.titulo }}
      </h2>
      <div class="relative overflow-hidden transition-all duration-500 " :class="expanded ? 'max-h-auto' : 'max-h-96'">
        <p class="text-gray-700 mt-8" v-html="region.descripcion"></p>
      </div>
      <button @click="toggleReadMore"
        class="relative inline-block mt-4 after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0">
        {{ expanded ? 'Read Less' : 'Read More' }}
      </button>
    </div>
    <div
      v-if="region.pais.population || region.pais.languages || (region.pais.currency_name && region.pais.currency_code) || region.pais.nombre || region.pais.capital"
      class="mt-auto text-sm w-full md:w-1/3">
      <h3 class="text-gray-800 font-semibold">At a Glance</h3>
      <ul class="mt-4 space-y-2">
        <li v-if="region.pais.population" class="flex justify-between border-b py-2">
          <span class="text-gray-600">Population</span>
          <span class="text-gray-900">{{ region.pais.population }}</span>
        </li>
        <li v-if="region.pais.languages" class="flex justify-between border-b py-2">
          <span class="text-gray-600">Languages</span>
          <span class="text-gray-900">{{ region.pais.languages }}</span>
        </li>
        <li v-if="region.pais.currency_name && region.pais.currency_code" class="flex justify-between border-b py-2">
          <span class="text-gray-600">Currency</span>
          <span class="text-gray-900">{{ region.pais.currency_name }} ({{ region.pais.currency_code }})</span>
        </li>
        <li v-if="region.pais.nombre && region.pais.capital" class="flex justify-between border-b py-2">
          <span class="text-gray-600">Country / Capital</span>
          <span class="text-gray-900">{{ region.pais.nombre }} / {{ region.pais.capital }}</span>
        </li>
      </ul>
    </div>
  </section>
  <SliderPackages v-if="region" :listPackages="region.paquetes"></SliderPackages>
  <ImgSlider v-if="region" :imagen_paquetes="region.imagenes.slice(1)"></ImgSlider>
  <section class="container my-20">
    <div class="flex items-center justify-center p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 bg-white w-full gap-6 items-stretch min-h-[50vh]">
        <div class="bg-tertiary bg-opacity-10 p-6 rounded-md flex flex-col justify-between h-full">
          <div class="border-t-2 flex-grow my-8"></div>
          <h1 v-if="region" class="font-semibold text-3xl lg:text-5xl mb-6 title font-playfair-display tracking-wide">
            <div class="text-gray-500 text-lg mb-4"></div>
            {{ region.wtitle }}
          </h1>
          <p v-if="region" class="text-gray-600 mb-8" v-html="region.wtext"></p>
        </div>
        <div v-if="region" class="relative w-full rounded-md h-full">
          <NuxtImg class="w-full h-full object-cover rounded-md aspect-[16/9]" :src="region.wimage" />
        </div>
      </div>
    </div>
  </section>
  <TravelStories></TravelStories>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews></MiniReviews>
</template>
<style></style>