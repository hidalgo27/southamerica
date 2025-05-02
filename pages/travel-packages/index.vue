<script lang="ts" setup>
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import FilterPackages from '~/components/travel-packages/FilterPackages.vue';
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';

import { usePackageStore } from '~/stores/packages';

const route = useRoute();
const packageStore = usePackageStore();

const listPackages = ref([]);
const header = ref({
  miniTitle: 'Curated travel experiences across a continent of wonder.',
  title: 'Discover the Pulse of South America',
  subTitle: '',
  url: '/images/banners/mapi2.webp',
});

const text = ref(
  {
    title: 'Iconic journeys through lands of ancient wonder, living culture, and breathtaking nature.',
    description: "At Go To Colombia, we specialize in crafting unforgettable journeys across Colombia’s most breathtaking destinations. With a deep love for travel and local expertise, we curate experiences that blend culture, nature, and adventure. Whether you're dreaming of colorful colonial cities, lush coffee landscapes, or pristine Caribbean beaches, we make every moment seamless and extraordinary — all fueled by our genuine Colombian passion"
  }
)

// Obtaining packages
const getPackage = async () => {
  const res: any = await packageStore.getPackages();
  listPackages.value = res;
};

onMounted(async () => {
  await getPackage();
  if (process.client) {
    // @ts-ignore
    import('https://static.elfsight.com/platform/platform.js').then((module) => {

    });
  }
});

// Filters obtained from the URL to be passed to the FilterPackages component
const selectedCountry = ref(route.query.country || null);
const selectedBudget = ref(route.query.budget
  ? route.query.budget.split('-').map(Number)
  : null);
const selectedDuration = ref(route.query.duration
  ? route.query.duration.split('-').map(Number)
  : null);

// Filters object
const filters = computed(() => ({
  country: selectedCountry.value,
  budget: selectedBudget.value,
  duration: selectedDuration.value
}));

</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <DescriptionWithLine :text="text"></DescriptionWithLine>
  <FilterPackages v-if="listPackages" :filters="filters" :package-data="listPackages"></FilterPackages>
  <Newsletter></Newsletter>
  <!--  <MiniReviews></MiniReviews>-->
  <section class="py-24 bg-gray-100">
    <div class="container">
      <!--        <div class="elfsight-app-de637865-6596-4396-8bba-ef0f7b50bc9e"></div>-->
      <div class="elfsight-app-0205a974-5637-4472-a992-5e12bca31e38" data-elfsight-app-lazy></div>
    </div>
  </section>
</template>
<style></style>