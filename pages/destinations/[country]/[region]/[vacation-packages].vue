<script lang="ts" setup>
import NavDestination from '~/components/destinations/NavDestination.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import FilterPackages from '~/components/travel-packages/FilterPackages.vue';

import { usePackageStore } from '~/stores/packages';

const packageStore = usePackageStore();
const listPackages = ref([]);

const getPackage = async () => {
  const res: any = await packageStore.getOffers();
  listPackages.value = res;
};

onMounted(async () => {
  await getPackage();
  console.log('listPackages', listPackages.value);
});
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <NavDestination></NavDestination>
  <FilterPackages :packageData="listPackages"></FilterPackages>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews>s</MiniReviews>
</template>
<style></style>