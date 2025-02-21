<script lang="ts" setup>
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import FilterPackages from '~/components/travel-packages/FilterPackages.vue';

import { usePackageStore } from '~/stores/packages';

const route = useRoute();
const packageStore = usePackageStore();

const listPackages = ref([]);

const getPackage = async () => {
  const res: any = await packageStore.getPackages();
  listPackages.value = res;
};

onMounted(async () => {
  await getPackage();
});

const selectedCountry = ref(route.query.country || null);
const selectedBudget = ref(route.query.budget
  ? route.query.budget.split('-').map(Number)
  : null);
const selectedDuration = ref(route.query.duration
  ? route.query.duration.split('-').map(Number)
  : null);

// Objeto con los filtros
const filters = computed(() => ({
  country: selectedCountry.value,
  budget: selectedBudget.value,
  duration: selectedDuration.value
}));

</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <FilterPackages v-if="listPackages" :filters="filters" :package-data="listPackages"></FilterPackages>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>