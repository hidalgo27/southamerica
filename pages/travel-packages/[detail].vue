<script lang="ts" setup>
import InquireNowForm from '~/components/form/InquireNowForm.vue';
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
const route = useRoute();
const listPackages = ref([]);
const getPackage = async () => {
  const res: any = await packageStore.getPackageTop();
  listPackages.value = res;
};

const packageDetail = ref([]);
const getPackageDetail = async () => {
  const res: any = await packageStore.getPackages();
  packageDetail.value = res.find((item: any) => item.url === route.path.split('/')[2]);
};
onMounted(async () => {
  await getPackage();
  await getPackageDetail();
});

const isOpen = ref(false);

</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <div
    class="fixed bottom-0 md:bottom-12 space-x-2 w-full z-40 md:w-2/3 lg:w-1/2 md:translate-x-1/4 lg:translate-x-1/2 md:rounded-md bg-blue-900 text-white flex justify-between items-center p-4 shadow-md">
    <div class="space-y-2">
      <p class="font-bold">{{ packageDetail.titulo }}</p>
      <p class="text-sm"> {{ packageDetail.duracion }} days - From <span class="font-semibold">US$ {{
        packageDetail.precio_tours }}</span> <span v-if="packageDetail.descuento" class="opacity-70">savings
          US$ {{ packageDetail.descuento }}</span></p>
    </div>
    <button class="bg-white text-blue-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition"
      @click="isOpen = true">
      Request a Quote
    </button>
    <InquireNowForm :isOpen="isOpen" @close="isOpen = false"></InquireNowForm>
  </div>
  <OverviewPackage></OverviewPackage>
  <ImgSlider></ImgSlider>
  <Itinerary></Itinerary>
  <PackageDetails></PackageDetails>
  <SliderPackages :listPackages="listPackages"></SliderPackages>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews></MiniReviews>
</template>
<style></style>