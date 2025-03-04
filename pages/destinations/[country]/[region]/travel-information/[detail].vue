<script lang="ts" setup>
import NavDestination from '~/components/destinations/NavDestination.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';

import { usePackageStore } from '~/stores/packages';
import { useDestinationStore } from '~/stores/destination';

const route = useRoute();
const destinationStore = useDestinationStore();
const packageStore = usePackageStore();
const listPackages = ref([]);
const region = ref(null);
const header = ref({
  miniTitle: 'Travel Information',
  title: '',
  subTitle: '',
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

const getPackages = async () => {
  const res: any = await packageStore.getPackageTop();
  listPackages.value = res;
};

onMounted(async () => {
  await getRegion();
  await getPackages();
});
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <NavDestination></NavDestination>
  <section class="container my-20 justify-center flex">
    <div class="w-2/3">
      <h1 class="text-5xl font-bold font-playfair-display mb-20">
        Discover vibrant cities, historic forts, wildlife-rich landscapes and more places to visit in Ghana.
      </h1>
      <h2 class="text-lg font-semibold my-6">How long can you vacation in Ghana?</h2>
      <p class="text-sm mb-6">In addition to a valid passport, most foreigners require a visa to enter Ghana.
        Single-entry visas are valid for three months and must be utilized within three months of the date of issue.
        Multiple-entry visas are valid for more than three months; their exact duration is at the discretion of the
        consular officers issuing them. While in Ghana, stays may be extended by filling out a visa extension form and
        taking it in person to the Ghana Immigration Service (GIS) in Accra.</p>
      <h2 class="text-lg font-semibold my-6">How long can you vacation in Ghana?</h2>
      <p class="text-sm mb-6">In addition to a valid passport, most foreigners require a visa to enter Ghana.
        Single-entry visas are valid for three months and must be utilized within three months of the date of issue.
        Multiple-entry visas are valid for more than three months; their exact duration is at the discretion of the
        consular officers issuing them. While in Ghana, stays may be extended by filling out a visa extension form and
        taking it in person to the Ghana Immigration Service (GIS) in Accra.</p>
      <h2 class="text-lg font-semibold my-6">How long can you vacation in Ghana?</h2>
      <p class="text-sm mb-6">In addition to a valid passport, most foreigners require a visa to enter Ghana.
        Single-entry visas are valid for three months and must be utilized within three months of the date of issue.
        Multiple-entry visas are valid for more than three months; their exact duration is at the discretion of the
        consular officers issuing them. While in Ghana, stays may be extended by filling out a visa extension form and
        taking it in person to the Ghana Immigration Service (GIS) in Accra.</p>
      <h2 class="text-lg font-semibold my-6">How long can you vacation in Ghana?</h2>
      <p class="text-sm mb-6">In addition to a valid passport, most foreigners require a visa to enter Ghana.
        Single-entry visas are valid for three months and must be utilized within three months of the date of issue.
        Multiple-entry visas are valid for more than three months; their exact duration is at the discretion of the
        consular officers issuing them. While in Ghana, stays may be extended by filling out a visa extension form and
        taking it in person to the Ghana Immigration Service (GIS) in Accra.</p>
    </div>
  </section>
  <SliderPackages :listPackages="listPackages"></SliderPackages>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews></MiniReviews>
</template>
<style></style>