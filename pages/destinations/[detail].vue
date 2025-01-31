<script lang="ts" setup>
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import AllMiniCards from '~/components/destinations/AllMiniCards.vue';
import PropertyDestination from '~/components/destinations/PropertyDestination.vue';

import { useDestinationStore } from '~/stores/destination';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';
import TravelStories from '~/components/home/TravelStories.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';

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
  <section class="container mt-28 mb-12">
    <div class="text-center ">
      <p class="mb-6 tracking-widest font-bold">
        Trips to Africa
      </p>
      <h1 class="font-semibold text-5xl w-3/4 mx-auto mb-6 title font-playfair-display tracking-wide"> Explore Africa
        your way
        on a
        tailor-made trip with Goway
      </h1>
      <div class="w-1/2 mx-auto my-8">
        <p class="tracking-widest font-light">There’s a special place in our heart for Africa. Since our earliest days,
          we’ve showcased the treasures of this mighty continent, from the iconic wildlife of East Africa to the ancient
          artifcats of North Africa. An African vacation with Goway showcases not only these wonders, but also the
          underrated and startling pleasures of the continent, from the culinary scene of Southern Africa to the
          bustling cities that define the new century.</p>
      </div>
    </div>
  </section>

  <section class="container mt-28 mb-12">
    <div class="text-center ">
      <p class="mb-6 tracking-widest font-bold">
        Tailor-Made Travel to Africa
      </p>
      <h1 class="font-semibold text-5xl w-3/4 mx-auto mb-6 title font-playfair-display tracking-wide">Discover the
        Natural & Cultural Treasures of Africa
      </h1>
      <div class="w-1/2 mx-auto my-8">
        <p class="tracking-widest font-light">As the world’s second largest and most populous continent, Africa is by no
          means monolithic. Each region and country have endless possibilities to experience, from the natural wonders
          that draw people from across the world to the welcoming cultures that define resilience. A trip to Africa is a
          chance to engage with the world at its most elemental and redefine the priorities of a life well lived.</p>
      </div>
    </div>
  </section>
  <PropertyDestination></PropertyDestination>
  <SliderPackages></SliderPackages>

  <EspecialistLetter></EspecialistLetter>

  <TravelStories></TravelStories>
  <Newsletter></Newsletter>
</template>
<style></style>