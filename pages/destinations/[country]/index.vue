<script lang="ts" setup>
import AllMiniCards from '~/components/destinations/AllMiniCards.vue';
import PropertyDestination from '~/components/destinations/PropertyDestination.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import CountryMap from '~/components/destinations/CountryMap.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import TextDescription from '~/components/home/TextDescription.vue';
import TravelStories from '~/components/home/TravelStories.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';

import { useDestinationStore } from '~/stores/destination';
import { usePackageStore } from '~/stores/packages';

const destinationStore = useDestinationStore();
const packageStore = usePackageStore();

const route = useRoute();

const destination = ref(null);
const packagesTop = ref([]);
const getDestination = async () => {
  const res: any = await destinationStore.getCountries()
  destination.value = res.find((dest: any) => dest.url === route.params.country);
};

const getPackages = async () => {
  const res: any = await packageStore.getPackageTop();
  packagesTop.value = res;
};

onMounted(async () => {
  await getDestination();
  await getPackages();
});

</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <section class="container my-20">
    <AllMiniCards v-if="destination" :destination="destination"></AllMiniCards>
  </section>
  <TextDescription v-if="destination" :destination="destination"></TextDescription>
  <CountryMap></CountryMap>
  <TextDescription v-if="destination" :destination="destination"></TextDescription>
  <PropertyDestination></PropertyDestination>
  <SliderPackages :listPackages="packagesTop"></SliderPackages>
  <EspecialistLetter></EspecialistLetter>

  <TravelStories></TravelStories>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>