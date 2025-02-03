<script lang="ts" setup>
import 'vue3-carousel';
import { Carousel, Slide } from 'vue3-carousel';

const images = [
  { src: 'https://picsum.photos/400/300', alt: 'Rome' },
  { src: 'https://picsum.photos/400/300', alt: 'Florence' },
  { src: 'https://picsum.photos/400/300', alt: 'Venice' },
  { src: 'https://picsum.photos/400/300', alt: 'Amalfi' },
  { src: 'https://picsum.photos/400/300', alt: 'Sicily' },
  { src: 'https://picsum.photos/400/300', alt: 'Milan' },
  { src: 'https://picsum.photos/400/300', alt: 'Naples' },
  { src: 'https://picsum.photos/400/300', alt: 'Turin' },
];

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
    <Carousel :items-to-show="itemsToShow" class="-mx-3" @update:modelValue="updateProgress">
      <Slide v-for="(image, index) in images" :key="index" class="px-3">
        <img :src="image.src" :alt="image.alt" class="w-full rounded-md" />
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