<script lang="ts" setup>
import NavDestination from '~/components/destinations/NavDestination.vue';
import CardBlue from '~/components/experts/CardBlue.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import TravelGuides from '~/components/destinations/TravelGuides.vue';

import { useDestinationStore } from '~/stores/destination';

const route = useRoute();
const destinationStore = useDestinationStore();
const region = ref(null);
const header = ref({
  miniTitle: 'Inspiration',
  title: '',
  subTitle: 'Travel Guides',
  url: '',
})
const getRegion = async () => {
  const res: any = await destinationStore.getRegion(route.params.region as string);
  region.value = res.destino;
  console.log(region.value);
  if (region.value) {
    header.value.title = region.value.nombre;
  }
};

onMounted(async () => {
  await getRegion();
});
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <NavDestination></NavDestination>
  <CardBlue></CardBlue>
  <TravelGuides></TravelGuides>
  <EspecialistLetter> </EspecialistLetter>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>