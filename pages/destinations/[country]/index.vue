<script lang="ts" setup>
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import AllMiniCards from '~/components/destinations/AllMiniCards.vue';
import PropertyDestination from '~/components/destinations/PropertyDestination.vue';

import { useDestinationStore } from '~/stores/destination';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';
import TravelStories from '~/components/home/TravelStories.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import TextDescription from '~/components/home/TextDescription.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';

const destinationStore = useDestinationStore();

const destination = computed(() =>
  destinationStore.destinations.find((dest) => dest.url === 'africa')
);

</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <section class="container my-20">
    <AllMiniCards :destination="destination"></AllMiniCards>
  </section>
  <TextDescription></TextDescription>

  <TextDescription></TextDescription>
  <PropertyDestination></PropertyDestination>
  <SliderPackages></SliderPackages>

  <EspecialistLetter></EspecialistLetter>

  <TravelStories></TravelStories>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>