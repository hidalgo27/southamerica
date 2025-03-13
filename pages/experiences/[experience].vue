<script lang="ts" setup>
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import TravelStories from '~/components/home/TravelStories.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import FilterPackages from '~/components/travel-packages/FilterPackages.vue';
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';

import { useCategoriesStore } from '~/stores/categories';
import { usePackageStore } from '~/stores/packages';
import { useRoute } from 'vue-router';
import { list } from 'postcss';

const categoryStore = useCategoriesStore();
const packageStore = usePackageStore();

const category = ref(null);
const listPackages = ref([]);
const route = useRoute();
const isLoading = ref(true);
const selectedCategory = ref(null);
const header = ref({
  miniTitle: 'Travel Styles',
  title: '',
  url: '',
})

const getCategory = async () => {
  const res: any = await categoryStore.getCategory(route.params.experience as string);
  category.value = res;
  console.log(category.value);
  selectedCategory.value = category.value.nombre;
  header.value.title = category.value.nombre;
  header.value.url = category.value.imagen_banner;
  console.log(selectedCategory.value)
  isLoading.value = false;
};

const getPackage = async () => {
  const res: any = await packageStore.getPackages();
  listPackages.value = res;
};

const text = computed(() => {
  return category.value
    ? {
      title: category.value.titulo_2,
      description: category.value.resumen,
    }
    : null;
});

const filters = computed(() => ({
  category: selectedCategory.value,
}))

onMounted(async () => {
  await getCategory();
  await getPackage();
});
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <section class="container my-20">
    <div class="flex items-center justify-center mt-28 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 bg-white w-full gap-6 items-stretch">
        <div class="bg-tertiary bg-opacity-10 p-6 rounded-md flex flex-col justify-between h-full" v-if="category">
          <div class="border-t-2 h-64 my-8"></div>
          <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">
            <div class="text-gray-500 text-lg mb-4">
            </div>
            {{ category.titulo }}
          </h1>
          <p v-html="category.descripcion" class="text-gray-600 mb-8"></p>
        </div>
        <div class="relative w-full rounded-md h-full" v-if="category">
          <NuxtImg class="w-full h-full object-cover rounded-md" :src="category.imagen" />
        </div>
      </div>
    </div>
  </section>
  <DescriptionWithLine v-if="text" :text="text" :line="0"></DescriptionWithLine>
  <FilterPackages v-if="!isLoading && listPackages" :packageData="listPackages" :filters="filters">
  </FilterPackages>
  <EspecialistLetter></EspecialistLetter>
  <!-- <TravelStories></TravelStories> -->
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>