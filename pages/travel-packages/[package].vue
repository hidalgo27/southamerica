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
  const res: any = await packageStore.getPackage(route.params.package as string);
  packageDetail.value = res
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
    class="fixed bottom-0 md:bottom-12 space-x-2 w-full z-40 md:w-2/3 lg:w-1/2 md:translate-x-1/4 lg:translate-x-1/2 md:rounded-md bg-blue-900 text-white flex justify-between items-center p-4 shadow-md"
    v-if="packageDetail.length > 0">
    <div class="space-y-2">
      <p class="font-bold">
        {{ packageDetail[0].titulo }}
      </p>
      <p class="text-sm">
        {{ packageDetail[0].duracion }} days - From
        <span class="font-semibold">US$ {{ packageDetail[0].precio_tours }}</span>
        <span v-if="packageDetail[0].descuento" class="opacity-70">
          savings US$ {{ packageDetail[0].descuento }}
        </span>
      </p>
    </div>
    <button class="bg-white text-blue-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition"
      @click="isOpen = true">
      Request a Quote
    </button>
    <InquireNowForm :isOpen="isOpen" @close="isOpen = false"></InquireNowForm>
  </div>
  <div v-if="packageDetail && packageDetail.length > 0">
    <OverviewPackage :packageDetail="packageDetail[0]" />
    <ImgSlider v-if="packageDetail[0].imagen_paquetes" :imagen_paquetes="packageDetail[0].imagen_paquetes" />
    <Itinerary :packageDetail="packageDetail[0]" />
    <PackageDetails :packageDetail="packageDetail[0]" />
  </div>
  <div v-else>
    <p>Cargando datos del paquete...</p>
  </div>
  <SliderPackages :listPackages="listPackages"></SliderPackages>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews></MiniReviews>
</template>
<style></style>