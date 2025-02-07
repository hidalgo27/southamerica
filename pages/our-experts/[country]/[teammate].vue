<script lang="ts" setup>
import SliderDestinations from '~/components/destinations/SliderDestinations.vue';
import ListExperiences from '~/components/experiences/ListExperiences.vue';
import BannerPosition from '~/components/experts/BannerPosition.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
const activeIndex = ref(null);
const items = ref([
  { title: "Fun Facts", content: "Here are some fun facts about me!" },
  { title: "Favourite Quote", content: "This is my favorite quote." },
  { title: "Favourite Travel Memory", content: "My best travel memory is..." }
]);

const toggle = (index: null) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <section class="container mx-auto py-20">
    <div class="flex flex-col lg:flex-row items-center lg:items-start">
      <div id="imageContainer"
        class="relative w-full lg:w-1/3 bottom-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
        <img alt="Illustration of a woman with long black hair, wearing a black top and a gold necklace"
          class="rounded-lg bg-gray-100 transition-all duration-300 w-96 h-[50vh] xl:h-[30vh]"
          src="https://picsum.photos/400/300" />
      </div>
      <div class="w-full lg:w-2/3 lg:pl-12">
        <div class="flex space-x-2 mb-4">
          <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
            Australia &amp; New Zealand
          </span>
          <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
            South Pacific
          </span>
        </div>
        <h1 class="title text-5xl md:text-8xl font-bold mb-20 mt-6 font-playfair-display">
          Kristen Brad
        </h1>
        <p class="text-lg mb-32">
          Born and raised in the Canadian Prairies my appreciation for nature and exploring has been a major part of my
          life from a young age. I was drawn to the South Pacific, New Zealand in particular, and after getting the
          chance to go there I instantly knew why. From pristine beaches and lush native forests to rugged mountains and
          clear blue lakes, New Zealand's outdoors really cannot be beaten. It is a nature lovers paradise!
        </p>
        <div class="border-t border-gray-200">
          <div v-for="(item, index) in items" :key="index"
            :class="activeIndex === index ? 'border border-gray-100 shadow-md duration-300' : ''">
            <div class="py-6 flex justify-between items-center cursor-pointer" @click="toggle(index)"
              :class="activeIndex === index ? 'border-b border-gray-200 duration-300' : 'border-b'">
              <span class="text-lg pl-6">{{ item.title }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 transition-transform duration-300 mr-8"
                :class="{ 'rotate-180': activeIndex === index }">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </div>
            <div v-if="activeIndex === index" class="p-10 px-20 text-gray-800">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ListExperiences></ListExperiences>
  <SliderDestinations></SliderDestinations>
  <BannerPosition></BannerPosition>
  <MiniReviews></MiniReviews>
</template>

<style></style>