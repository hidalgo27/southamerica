<script lang="ts" setup>
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import TravelStories from '~/components/home/TravelStories.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import FilterPackages from '~/components/travel-packages/FilterPackages.vue';

import { useCategoriesStore } from '~/stores/categories';
import { useRoute } from 'vue-router';
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';

const categoryStore = useCategoriesStore();
const category = ref(null);
const route = useRoute();

const getCategory = async () => {
  const res: any = await categoryStore.getCategory(route.params.experience as string);
  category.value = res;
  console.log(category.value);
};

const text = computed(() => {
  return category.value
    ? {
      title: category.value.titulo_2,
      description: category.value.resumen,
    }
    : null;
});

onMounted(async () => {
  await getCategory();
});
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
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
  <!-- <FilterPackages v-if="category" :package-data="category.paquetes"></FilterPackages> -->
  <EspecialistLetter></EspecialistLetter>
  <TravelStories></TravelStories>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>