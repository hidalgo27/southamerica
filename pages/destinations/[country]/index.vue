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
import CountryMap from '~/components/destinations/CountryMap.vue';

const destinationStore = useDestinationStore();

const route = useRoute();

const destination = ref(null);
const getDestination = async () => {
  const res: any = await destinationStore.getCountries()
  destination.value = res.find((dest: any) => dest.url === route.path.split('/')[2]);
};

onMounted(async () => {
  await getDestination();
  console.log('destination', destination.value);
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
  <!-- <SliderPackages></SliderPackages> -->
  <EspecialistLetter></EspecialistLetter>

  <TravelStories></TravelStories>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>