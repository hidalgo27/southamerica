<script lang="ts" setup>
import ListExperiences from '~/components/experiences/ListExperiences.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import TripStyles from '~/components/experiences/TripStyles.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

import { usePackageStore } from '~/stores/packages';
import { useCategoriesStore } from '~/stores/categories';

const packageStore = usePackageStore();
const listPackages = ref([]);

const getPackages = async () => {
  const res: any = await packageStore.getPackageTop();
  listPackages.value = res;
};

const categoryStore = useCategoriesStore();
const listCategories = ref([]);

const getCategories = async () => {
  const res: any = await categoryStore.getCategories();
  listCategories.value = res.filter((category: any) => category.estado === null || category.estado === 1);
};

const header = {
  miniTitle: 'Tailor-Made Travel',
  title: 'SouthAmerica Experiences',
  url: 'images/banners/beach-experiences-banner.webp',
}

onMounted(async () => {
  await getPackages();
  await getCategories();
});
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <TripStyles v-if="listCategories" :curatedTrips="listCategories"></TripStyles>
  <section>
    <!--<ListExperiences></ListExperiences>-->
  </section>
  <SliderPackages :listPackages="listPackages"></SliderPackages>

  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>
<style></style>