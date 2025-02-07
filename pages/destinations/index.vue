<script lang="ts" setup>
import CardDestination from '@/components/destinations/CardDestination.vue';
import SouthAmericaMap from '~/components/destinations/SouthAmericaMap.vue';
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

import { useDestinationStore } from '~/stores/destination';
const destinationStore = useDestinationStore();

const destinations = ref([]);
const getCountries = async () => {
  const res: any = await destinationStore.getCountries();
  destinations.value = res;
};

onMounted(async () => {
  await getCountries();
  console.log('destinations', destinations.value);
});
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <DescriptionWithLine></DescriptionWithLine>

  <SouthAmericaMap></SouthAmericaMap>

  <CardDestination :destinations="destinations"></CardDestination>

  <EspecialistLetter></EspecialistLetter>

  <Newsletter></Newsletter>

  <MiniReviews></MiniReviews>
</template>

<style></style>