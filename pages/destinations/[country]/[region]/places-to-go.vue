<script lang="ts" setup>
import NavDestination from '~/components/destinations/NavDestination.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';

import { usePackageStore } from '~/stores/packages';
const packageStore = usePackageStore();
const listPackages = ref([]);

const getPackages = async () => {
  const res: any = await packageStore.getPackageTop();
  listPackages.value = res;
};

onMounted(async () => {
  await getPackages();
  console.log('listPackages', listPackages.value);
});
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <NavDestination></NavDestination>
  <section class="container my-20">
    <div class="w-2/3">

      <h1 class="text-4xl font-bold mb-12 font-playfair-display">
        Discover vibrant cities, historic forts, wildlife-rich landscapes and more places to visit in Ghana.
      </h1>
      <p class="text-md mb-6">Immerse yourself in Ghana’s culture and history at the Cape Coast Castle and Elmina
        Castle, witness the colourful festivals in Kumasi, including the Ashanti Yam Festival and the Akwasidae
        Festival, and explore the bustling markets of Accra. Relax on the beautiful beaches of Busua and Ada Foah for a
        perfect blend of culture and leisure. </p>
    </div>
  </section>
  <SliderPackages :listPackages="listPackages"></SliderPackages>
  <EspecialistLetter></EspecialistLetter>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>

<style></style>