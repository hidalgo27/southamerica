<script lang="ts" setup>
import NavDestination from '~/components/destinations/NavDestination.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import FilterPackages from '~/components/travel-packages/FilterPackages.vue';

import { usePackageStore } from '~/stores/packages';
import { useCategoriesStore } from '~/stores/categories';
import { useRoute } from 'vue-router';

const route = useRoute();
const selectedCategory = ref<string | null>(null);
const packageStore = usePackageStore();
const listPackages = ref([]);
const categoriesStore = useCategoriesStore();
const categories = ref([]);

const getPackage = async () => {
  const res: any = await packageStore.getPackages();
  listPackages.value = res;
};

const isLoading = ref(true);

const getCategories = async () => {
  const res: any = await categoriesStore.getCategories();
  categories.value = res;

  const paramCategory = route.params.vacationpackages;
  if (paramCategory && paramCategory !== "vacation-packages") {
    let matchedCategory = categories.value.find(
      (category) => category.url === paramCategory
    );

    if (!matchedCategory) {
      console.warn("Categoría no encontrada en la primera búsqueda, reintentando...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      matchedCategory = categories.value.find(
        (category) => category.url === paramCategory
      );
    }

    selectedCategory.value = matchedCategory ? matchedCategory.nombre : null;
  } else {
    selectedCategory.value = null;
  }

  isLoading.value = false; // Finaliza la carga
};

onMounted(async () => {
  await getCategories();
  await getPackage();
});

const filters = computed(() => ({
  category: selectedCategory.value,
}));
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <NavDestination></NavDestination>
  <FilterPackages v-if="!isLoading" :packageData="listPackages" :filters="filters">
  </FilterPackages>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews>s</MiniReviews>
</template>
<style></style>