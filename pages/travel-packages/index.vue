<script lang="ts" setup>
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import FilterPackages from '~/components/travel-packages/FilterPackages.vue';

import { usePackageStore } from '~/stores/packages';

const packageStore = usePackageStore();

const listPackages = ref([]);

const getPackage = async () => {
  const res: any = await packageStore.getPackages();
  listPackages.value = res;
};

onMounted(async () => {
  await getPackage();
  console.log('listPackages', listPackages.value);
});

</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <FilterPackages :package-data="listPackages"></FilterPackages>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>