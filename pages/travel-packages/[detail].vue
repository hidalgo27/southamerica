<script lang="ts" setup>
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import ImgSlider from '~/components/travel-packages/ImgSlider.vue';
import Itinerary from '~/components/travel-packages/Itinerary.vue';
import OverviewPackage from '~/components/travel-packages/OverviewPackage.vue';
import PackageDetails from '~/components/travel-packages/PackageDetails.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';

import { usePackageStore } from '~/stores/packages';

const packageStore = usePackageStore();

const listPackages = ref([]);
const getPackage = async () => {
  const res: any = await packageStore.getPackageTop();
  listPackages.value = res;
};

</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <OverviewPackage></OverviewPackage>
  <ImgSlider></ImgSlider>
  <Itinerary></Itinerary>
  <PackageDetails></PackageDetails>
  <SliderPackages :listPackages="listPackages"></SliderPackages>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews></MiniReviews>
</template>
<style></style>