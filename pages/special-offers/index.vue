<script lang="ts" setup>
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
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
});
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <FilterPackages :package-data="listPackages"></FilterPackages>
  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>
<style></style>