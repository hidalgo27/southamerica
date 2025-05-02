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
  title: 'Unveil South America’s most iconic places, each more breathtaking than the last.',
  description: 'Each destination we offer has been thoughtfully chosen by regional experts who know not just the routes, but the heart of every place. Dive into experiences that go deeper than sightseeing — this is travel with soul, crafted by those who love the land.',
}

const header = {
  miniTitle: 'The Epic Side of South America',
  title: 'The wonders of SouthAmerica',
  url: '/images/banners/destinations/galapagos.webp',
}

onMounted(async () => {
  await getCountries();
});
</script>
<template>
  <HeaderImgNav v-if="header" :header="header"></HeaderImgNav>
  <DescriptionWithLine :text="text" :line="2"></DescriptionWithLine>
  <SouthAmericaMap v-if="destinations" :destinations="destinations"></SouthAmericaMap>
  <CardDestination :destinations="destinations"></CardDestination>
  <EspecialistLetter></EspecialistLetter>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>