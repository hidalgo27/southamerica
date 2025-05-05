<script lang="ts" setup>
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import FilterPackages from '~/components/travel-packages/FilterPackages.vue';
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';

import { usePackageStore } from '~/stores/packages';

const packageStore = usePackageStore();
const listPackages = ref([]);
const header = ref({
  miniTitle: '',
  title: 'Specials Offers',
  subTitle: '',
  url: 'images/banners/specials-banner.webp',
})

const getPackage = async () => {
  const res: any = await packageStore.getOffers();
  listPackages.value = res;
};

onMounted(async () => {
  await getPackage();
});

const text = ref(
  {
    title: 'Unlock Exclusive Deals for a Limited Time',
    description: "Don’t miss out on our limited-time offers designed to make your South American adventure even more unforgettable. With unbeatable discounts, special packages, and handpicked experiences, now is the time to book. Hurry, these offers won’t last forever, and spaces are filling up fast! Take advantage of these exclusive deals and start planning the trip of a lifetime today."
  }
)
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <DescriptionWithLine :text="text" :line="1"></DescriptionWithLine>
  <FilterPackages :package-data="listPackages"></FilterPackages>
  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>
<style></style>