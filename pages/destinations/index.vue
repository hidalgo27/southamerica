<script lang="ts" setup>
import CardDestination from '@/components/destinations/CardDestination.vue';
import WorldMap from '@/components/destinations/WorldMap.vue';
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
  <section class="container mt-28 mb-12">
    <div class="text-center ">
      <div class="border-title mb-2 mx-auto"></div>
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide"> Where Are You Headed To Next?
      </h1>
      <div class="w-1/2 mx-auto my-8">
        <p class="tracking-widest font-light">Experience all that the world has to offer in just the way you want. Our
          team of Destination Specialists have been tailoring dream vacations for over 50 years. We handle every part of
          the travel journey, from flights to tours to accommodations to group travel. Let us do the hard work so you
          can sit back, relax, and take in the world. Rely on personalized travel planning and enjoy elevated
          experiences in destination. Follow your fancy and explore new parts of the world in new ways.</p>
      </div>
    </div>
  </section>
  <CardDestination :destinations="destinations"></CardDestination>

  <EspecialistLetter></EspecialistLetter>

  <Newsletter></Newsletter>

  <MiniReviews></MiniReviews>
</template>

<style></style>