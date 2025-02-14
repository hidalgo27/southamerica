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

const text = {
  title: 'Where Are You Headed To Next?',
  description: 'Experience all that the world has to offer in just the way you want. Our team of Destination Specialists have been tailoring dream vacations for over 50 years. We handle every part of the travel journey, from flights to tours to accommodations to group travel. Let us do the hard work so you can sit back, relax, and take in the world. Rely on personalized travel planning and enjoy elevated experiences in destination. Follow your fancy and explore new parts of the world in new ways.',
}
onMounted(async () => {
  await getCountries();
});
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <DescriptionWithLine :text="text"></DescriptionWithLine>

  <SouthAmericaMap></SouthAmericaMap>

  <CardDestination :destinations="destinations"></CardDestination>

  <EspecialistLetter></EspecialistLetter>

  <Newsletter></Newsletter>

  <MiniReviews></MiniReviews>
</template>

<style></style>