<script lang="ts" setup>
import CardDestination from '@/components/destinations/CardDestination.vue';
import WorldMap from '@/components/destinations/WorldMap.vue';
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

  <section class="container mt-28 mb-12">
    <div class=" flex items-center justify-center ">
      <div class="flex flex-col md:flex-row bg-white overflow-hidden w-full gap-6">
        <div class="bg-secondary bg-opacity-10 py-32 px-16 rounded-md">
          <p class="mb-8 tracking-widest font-bold">
            Destination Specialists
          </p>
          <h1 class="font-semibold text-4xl mb-8 title font-playfair-display tracking-wide  ">
            The experts in tailor-made travel.
          </h1>
          <p class="mb-8">
            When working with Goway, you dream it, we plan it. Rely on the passion and expertise of our Destination
            Specialists to craft the trip that’s right for you.
          </p>
          <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button class="px-4 py-2 border btn-primary-outline rounded-md">
              Request a Quote
            </button>
            <button class="px-4 py-2 border btn-secondary-outline rounded-md">
              Meet the Team
            </button>
          </div>
        </div>
        <div class="relative w-full rounded-md">
          <img alt="A beautiful sunset with a giraffe in the foreground" class="w-full h-full object-cover rounded-md"
            src="https://picsum.photos/400/300" />
        </div>
      </div>
    </div>
  </section>

  <Newsletter></Newsletter>

</template>

<style></style>