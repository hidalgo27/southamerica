<script lang="ts" setup>
import NavDestination from '~/components/destinations/NavDestination.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import FilterPackages from '~/components/travel-packages/FilterPackages.vue';

import { usePackageStore } from '~/stores/packages';
import { useCategoriesStore } from '~/stores/categories';
import { useDestinationStore } from '~/stores/destination';
import { useRoute } from 'vue-router';

const route = useRoute();

const packageStore = usePackageStore();
const categoriesStore = useCategoriesStore();
const destinationStore = useDestinationStore();

const selectedCategory = ref<string | null>(null);
const selectedRegion = ref<string | null>(null);

const listPackages = ref([]);
const categories = ref([]);
const region = ref(null);

const header = ref({
  miniTitle: 'Your Trip Your Way',
  title: '',
  subTitle: 'Tailor-made Tours & Trips',
  url: '',
})

const getPackage = async () => {
  const res: any = await packageStore.getPackages();
  listPackages.value = res;
};

const getRegion = async () => {
  const res: any = await destinationStore.getRegion(route.params.region as string);
  region.value = res.destino;
  console.log(region.value);
  if (region.value) {
    selectedRegion.value = region.value.nombre;
    header.value.title = selectedRegion.value;
    header.value.url = region.value.imagenes[0].nombre;
  }
};

const isLoading = ref(true);

const getCategories = async () => {
  const res: any = await categoriesStore.getCategories();
  categories.value = res;

  const paramCategory = route.params.vacationPackages;
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
    header.value.miniTitle = selectedCategory.value;
  } else {
    selectedCategory.value = null;
  }

  isLoading.value = false; // Finaliza la carga
};

onMounted(async () => {
  await getRegion();
  await getCategories();
  await getPackage();
});

const filters = computed(() => ({
  region: selectedRegion.value,
  category: selectedCategory.value,
}));
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <NavDestination></NavDestination>
  <FilterPackages v-if="!isLoading" :packageData="listPackages" :filters="filters">
  </FilterPackages>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews>s</MiniReviews>
</template>
<style></style>