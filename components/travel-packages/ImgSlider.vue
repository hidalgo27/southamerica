<script lang="ts" setup>
import 'vue3-carousel';
import { Carousel, Slide } from 'vue3-carousel';

const images = [
  { src: 'https://images.goway.com/production/styles/content_highlight_3xl/s3/content-highlight/2024-02/iStock-1403046192.jpg?h=ecc2d3bd&itok=Yck4r6Gg', alt: 'Rome' },
  { src: 'https://images.goway.com/production/styles/run_of_site_ad_3xl/s3/trip_level_ad/portugal_porto_tourist_AdobeStock_178862016.jpeg?VersionId=qnpeclJigVYnXDYm1k_1teCzeyut0dfk&itok=ovtj3gJT', alt: 'Florence' },
  { src: 'https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Radisson_Blu_Plaza_Hotel_Sydney/img_RadissonBluPlazaHotelSydney_Exterior.jpg', alt: 'Venice' },
  { src: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/Sydney%20Opera%20House_AdobeStock_224286843%20%283%29.jpeg?VersionId=YHodoYpc62zmfJzKE.jfp8S2TwCeaB0c&h=a5654313&itok=ZAZ56cvJ', alt: 'Amalfi' },
  { src: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/Sydney%20Opera%20House_AdobeStock_224286843%20%283%29.jpeg?VersionId=YHodoYpc62zmfJzKE.jfp8S2TwCeaB0c&h=a5654313&itok=ZAZ56cvJ', alt: 'Sicily' },
  { src: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj', alt: 'Milan' },
  { src: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext25/image_24703_v1.jpg', alt: 'Naples' },
];

const breakpoints = {
  600: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  // 1024 and up
  1024: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
};

const currentSlide = ref(0);
const itemsToShow = ref(1);

const updateProgress = (index: number) => {
  currentSlide.value = index;
};

const updateItemsToShow = () => {
  if (window.innerWidth >= 1024) {
    itemsToShow.value = 3;
  } else if (window.innerWidth >= 600) {
    itemsToShow.value = 2;
  } else {
    itemsToShow.value = 1;
  }
};

onMounted(() => {
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
});

const progressWidth = computed(() => {
  const maxSlideIndex = images.length - itemsToShow.value;
  return maxSlideIndex > 0
    ? ((currentSlide.value / maxSlideIndex) * 100)
    : 100;
});
</script>

<template>
  <section class="my-20">
    <Carousel :breakpoints="breakpoints" @update:modelValue="updateProgress">
      <Slide v-for="(image, index) in images" :key="index" class="px-3 relative">
        <img :src="image.src" :alt="image.alt" class="w-full h-full rounded-md" />
      </Slide>
    </Carousel>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
    </div>
  </section>
</template>

<style>
.progress-bar-container {
  width: 98%;
  margin: auto;
  height: 4px;
  background-color: #e5e7eb;
  margin-top: 2rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease-in-out;
  @apply bg-secondary
}
</style>