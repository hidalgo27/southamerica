<script lang="ts" setup>
import ListExperiences from '~/components/experiences/ListExperiences.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import TravelStories from '~/components/home/TravelStories.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import ImgSlider from '~/components/travel-packages/ImgSlider.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';

import { usePackageStore } from '~/stores/packages';

const packageStore = usePackageStore();
const listPackages = ref([]);

const getPackages = async () => {
  const res = await packageStore.getPackageTop();
  listPackages.value = res;
};

onMounted(async () => {
  await getPackages();
  console.log('listPackages', listPackages.value);
});
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <section class="container my-20 w-2/3 px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
    <div>
      <p class="my-6">Overview</p>
      <h2 class="text-4xl font-bold text-gray-900 font-playfair-display">
        Explore pristine beaches, lush rainforests, and diverse wildlife on an unforgettable trip to Australia.
      </h2>
      <p class="text-gray-700 mt-8">
        Australia, often referred to as the "Land Down Under," is a diverse tourist destination that welcomes
        globetrotters from all corners of the world. This vast and vibrant continent country boasts a unique blend of
        natural beauty, rich cultural heritage, and thrilling adventures, making it impossible for you to exclude it
        from your bucket list.
      </p>
      <p class="text-gray-700 mt-4">
        One of Australia's most iconic features is its stunning natural beauty. From the otherworldly landscapes of the
        Outback to the lush rainforests of <a href="#"
          class="relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0">Queensland's</a>
        Daintree
        National Park and the pristine beaches that stretch along the coasts, the country is a haven for nature
        enthusiasts. The <a href="#"
          class="relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0">Great
          Barrier Reef</a>, the world's
        largest...
      </p>
      <a href="#"
        class="relative inline-block mt-4 after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0">
        ReadMore
      </a>

    </div>
    <div class="pl-40 mt-auto text-sm">
      <h3 class="text-gray-800 font-semibold">At a Glance</h3>
      <ul class="mt-4 space-y-2">
        <li class="flex justify-between border-b py-2">
          <span class="text-gray-600">Population</span>
          <span class="text-gray-900">26,480,576</span>
        </li>
        <li class="flex justify-between border-b py-2">
          <span class="text-gray-600">Languages</span>
          <span class="text-gray-900">English</span>
        </li>
        <li class="flex justify-between border-b py-2">
          <span class="text-gray-600">Currency</span>
          <span class="text-gray-900">Australian Dollar (AUD)</span>
        </li>
        <li class="flex justify-between border-b py-2">
          <span class="text-gray-600">Capital</span>
          <span class="text-gray-900">Canberra</span>
        </li>
      </ul>
    </div>
  </section>
  <SliderPackages :listPackages="listPackages"></SliderPackages>
  <ImgSlider></ImgSlider>
  <ListExperiences></ListExperiences>
  <section class="container my-20">
    <div class="flex items-center justify-center mt-28 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 bg-white w-full gap-6 items-stretch">
        <div class="bg-tertiary bg-opacity-10 p-6 rounded-md flex flex-col justify-between h-full">
          <div class="border-t-2 h-64 my-8"></div>
          <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">
            <div class="text-gray-500 text-lg mb-4">
            </div>
            The land of art, adventure, nature, and wildlife
          </h1>
          <p class="text-gray-600 mb-8">Australia's allure as a tourist attraction lies in its extraordinary natural
            beauty, cultural diversity, vibrant cities, and a myriad of outdoor adventures. And let's not forget the
            unique animals, including kangaroos and koalas, which attract travellers from all over the world. So, it's
            no surprise that Australia vacations are growing in popularity. The country's warm and welcoming atmosphere,
            combined with a commitment to preserving its natural treasures, ensures that Australia remains an
            unforgettable destination for globetrotters who seek a one-of-a-kind experience.</p>

        </div>
        <div class="relative w-full rounded-md h-full">
          <img class="w-full h-full object-cover rounded-md" src="https://picsum.photos/400/300" />
        </div>
      </div>
    </div>
  </section>
  <TravelStories></TravelStories>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews></MiniReviews>
</template>
<style></style>