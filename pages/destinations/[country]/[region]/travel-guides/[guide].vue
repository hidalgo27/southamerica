<script lang="ts" setup>
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';

import { useBlogStore } from '~/stores/blog';
import { usePackageStore } from '~/stores/packages';

const inspirationDetail = ref(null)
const packageStore = usePackageStore();
const blogStore = useBlogStore();
const route = useRoute();
const packages = ref([]);
const header = ref(
  {
    url: '',
  }
)
const travelGuideHeader = ref([
  {
    travelGuide: true,
    titulo: "",
  }
]);

const getBlog = async () => {
  const res: any = await blogStore.getBlog(route.params.guide as string);
  inspirationDetail.value = res[0];
  header.value.url = inspirationDetail.value?.imagenes[0].nombre;
  travelGuideHeader.value[0].titulo = inspirationDetail.value.titulo;
};

const getPackages = async () => {
  const res: any = await packageStore.getPackageByCountry(route.params.country as string);
  packages.value = res.paquetes;
};

onMounted(async () => {
  await getBlog();
  await getPackages();
})
</script>
<template>
  <HeaderImgNav :packageDetail="travelGuideHeader" :header="header"></HeaderImgNav>
  <section class="container my-20 text-sm">
    <div class="md:w-2/3 mx-auto justify-center gap-6 flex-col flex" v-html="inspirationDetail?.detalle">
    </div>
  </section>
  <SliderPackages :v-if="packages" :listPackages="packages"></SliderPackages>
  <EspecialistLetter></EspecialistLetter>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>