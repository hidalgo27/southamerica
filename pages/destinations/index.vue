<script lang="ts" setup>
import CardDestination from '@/components/destinations/CardDestination.vue';
import WorldMap from '~/components/destinations/SouthAmericaMap.vue';
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

import { useDestinationStore } from '~/stores/destination';

const destinations = computed(() => destinationStore.destinations);
const destinationStore = useDestinationStore();

</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <DescriptionWithLine></DescriptionWithLine>

  <WorldMap></WorldMap>

  <CardDestination :destinations="destinations"></CardDestination>

  <EspecialistLetter></EspecialistLetter>

  <Newsletter></Newsletter>

  <MiniReviews></MiniReviews>
</template>

<style></style>