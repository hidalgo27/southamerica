<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation as CarouselNavigation } from 'vue3-carousel';
const reviews = [
  {
    title: 'Excellent',
    rating: 4.8,
    comment: 'All travvel arrangements worked perfectly, The hotels...',
    owner: 'Deborah',
    date: '2 days ago',
  },
  {
    title: 'Excellent',
    rating: 4.8,
    comment: 'All travvel arrangements worked perfectly, The hotels...',
    owner: 'Deborah',
    date: '2 days ago',
  },
  {
    title: 'Excellent',
    rating: 4.8,
    comment: 'All travvel arrangements worked perfectly, The hotels...',
    owner: 'Deborah',
    date: '2 days ago',
  },
  {
    title: 'Excellent',
    rating: 4.8,
    comment: 'All travvel arrangements worked perfectly, The hotels...',
    owner: 'Deborah',
    date: '2 days ago',
  },
  {
    title: 'Excellent',
    rating: 4.8,
    comment: 'All travvel arrangements worked perfectly, The hotels...',
    owner: 'Deborah',
    date: '2 days ago',
  },
  {
    title: 'Excellent',
    rating: 4.8,
    comment: 'All travvel arrangements worked perfectly, The hotels...',
    owner: 'Deborah',
    date: '2 days ago',
  },
  {
    title: 'Excellent',
    rating: 4.8,
    comment: 'All travvel arrangements worked perfectly, The hotels...',
    owner: 'Deborah',
    date: '2 days ago',
  },
  {
    title: 'Excellent',
    rating: 4.8,
    comment: 'All travvel arrangements worked perfectly, The hotels...',
    owner: 'Deborah',
    date: '2 days ago',
  },
  {
    title: 'Excellent',
    rating: 4.8,
    comment: 'All travvel arrangements worked perfectly, The hotels...',
    owner: 'Deborah',
    date: '2 days ago',
  }
]

const breakpoints = {

  // 700px and up
  700: {
    itemsToShow: 2,
    itemsToScroll: 2,
    snapAlign: 'center',
  },
  // 1024 and up
  1024: {
    itemsToShow: 4,
    snapAlign: 'start',
    itemsToScroll: 4,
  },
};

onMounted(async () => {
  if (process.client) {
    // @ts-ignore
    import('https://static.elfsight.com/platform/platform.js').then((module) => {

    });
  }
});

</script>
<template>
  <section class="py-24 bg-gray-100">
    <div class="container">
      <!--        <div class="elfsight-app-de637865-6596-4396-8bba-ef0f7b50bc9e"></div>-->
      <div class="elfsight-app-0205a974-5637-4472-a992-5e12bca31e38" data-elfsight-app-lazy></div>
    </div>
  </section>
  <!-- <section class="container my-32">
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-6 md:gap-6">
      <div class="md:col-span-1 ">
        <div class="bg-white p-8 rounded-md shadow-md ">
          <p class="text-xl font-semibold mb-2 text-center">
            Excellent
          </p>
          <div class="flex justify-center items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-6 text-green-500">
              <path fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-6 text-green-500">
              <path fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-6 text-green-500">
              <path fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-6 text-green-500">
              <path fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6 text-green-500">
              <defs>
                <linearGradient id="half-mask" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stop-color="white" />
                  <stop offset="50%" stop-color="black" />
                </linearGradient>
                <mask id="half-mask-id">
                  <rect width="24" height="24" fill="url(#half-mask)" />
                </mask>
              </defs>

              <path fill="currentColor"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                mask="url(#half-mask-id)" />
            </svg>
          </div>
          <p class="text-gray-600 mb-2 text-center">
            Based on 4,764 reviews
          </p>
          <p class="text-green-500 font-semibold text-center">
            TripAdvisor
          </p>
        </div>
      </div>
      <Carousel :breakpoints="breakpoints" class="col-span-1 md:col-span-2 lg:col-span-4">
        <Slide v-for="(reviews, index) in reviews" :key="index" class="px-3 relative">
          <div class="text-start">
            <div class="flex  items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="size-6 text-green-500">
                <path fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="size-6 text-green-500">
                <path fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="size-6 text-green-500">
                <path fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="size-6 text-green-500">
                <path fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6 text-green-500">
                <defs>
                  <linearGradient id="half-mask" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stop-color="white" />
                    <stop offset="50%" stop-color="black" />
                  </linearGradient>
                  <mask id="half-mask-id">
                    <rect width="24" height="24" fill="url(#half-mask)" />
                  </mask>
                </defs>

                <path fill="currentColor"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  mask="url(#half-mask-id)" />
              </svg>
            </div>
            <div class="mt-2 font-semibold">
              Excellent bookings
            </div>
            <div class="text-gray-500 text-sm">
              All the travel arrangements worked perfectly. The hotels were all very comfortable...
            </div>
            <div class="text-gray-500 text-sm mt-2">
              Deb, 19 hours ago
            </div>
            <div class="text-gray-500 text-sm mt-2">
              Showing our 5 star reviews
            </div>
          </div>
        </Slide>
        <template #addons>
          <CarouselNavigation>
            <template #prev>
              <div class="absolute -translate-x-7">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </div>
            </template>
            <template #next>
              <div class="absolute translate-x-7">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </template>
          </CarouselNavigation>
        </template>
      </Carousel>
    </div>
  </section> -->
</template>
<style></style>