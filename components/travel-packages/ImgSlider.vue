<script lang="ts" setup>
import 'vue3-carousel';
import { Carousel, Slide } from 'vue3-carousel';
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  imagen_paquetes: {
    type: Array,
    required: true
  },
});

const images = ref([]);
const currentSlide = ref(0);
const itemsToShow = ref(1);

const breakpoints = {
  600: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  1024: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
};

const updateItemsToShow = () => {
  if (images.value.length <= 2) {
    itemsToShow.value = 1;
  } else if (window.innerWidth >= 1024) {
    itemsToShow.value = 3;
  } else if (window.innerWidth >= 600) {
    itemsToShow.value = 2;
  } else {
    itemsToShow.value = 1;
  }
};

const updateImages = () => {
  images.value = props.imagen_paquetes.map((image: any) => ({
    src: image.nombre,
    alt: image.alt,
  }));
};

onMounted(() => {
  updateImages();
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
});

watch(() => props.imagen_paquetes, updateImages, { deep: true });

const progressWidth = computed(() => {
  const maxSlideIndex = images.value.length - itemsToShow.value;
  return maxSlideIndex > 0 ? ((currentSlide.value / maxSlideIndex) * 100) : 100;
});

const carouselRef = ref();
const next = () => carouselRef.value.next();
const prev = () => carouselRef.value.prev();

const maxSlideIndex = computed(() => images.value.length - itemsToShow.value);

const showPrev = computed(() => currentSlide.value > 0);
const showNext = computed(() => currentSlide.value < maxSlideIndex.value);
const showButtons = computed(() => images.value.length > itemsToShow.value);

</script>
<template>
  <section class="my-20" v-if="images.length > 0">
    <div v-if="images.length > 2" class="relative w-full">
      <!-- Botón izquierdo -->
      <button v-if="showButtons && showPrev" @click="prev"
        class="absolute top-1/2 -translate-y-1/2 left-6 z-10 p-2 bg-white/80 hover:bg-white rounded-full border shadow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>

      <!-- Botón derecho -->
      <button v-if="showButtons && showNext" @click="next"
        class="absolute top-1/2 -translate-y-1/2 right-6 z-10 p-2 bg-white/80 hover:bg-white rounded-full border shadow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>

      <!-- Carrusel -->
      <Carousel ref="carouselRef" v-if="images.length > 2" :breakpoints="breakpoints"
        @update:modelValue="(index) => currentSlide = index" class="">
        <Slide v-for="(image, index) in images" :key="index" class="px-3 relative w-full h-full">
          <NuxtImg :src="image.src" :alt="image.alt" class="w-full h-full rounded-md" />
        </Slide>
      </Carousel>
    </div>

    <!-- Si hay 1 o 2 imágenes, centrarlas sin carrusel -->
    <div v-else class="flex items-center gap-3 w-full h-48 md:h-96 lg:h-[60vh] 2xl:h-[70vh]">
      <template v-if="images.length === 1">
        <NuxtImg :src="images[0].src" :alt="images[0].alt" class="w-full h-full rounded-md object-cover mx-auto" />
      </template>
      <template v-else-if="images.length === 2">
        <div class="grid grid-cols-2 gap-3 w-full h-full">
          <NuxtImg v-for="(image, index) in images" :key="index" :src="image.src" :alt="image.alt"
            class="w-full h-full rounded-md object-cover" />
        </div>
      </template>
    </div>

    <!-- Barra de progreso solo si hay más de 2 imágenes -->
    <div v-if="images.length > 3" class="progress-bar-container">
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
  background-color: #FF5733;
  /* Cambia este color si es necesario */
}
</style>
