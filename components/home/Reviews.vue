<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';

const carouselRef = ref();
const carouselSlide = ref(1);

const next = () => carouselRef.value.next();
const prev = () => carouselRef.value.prev();

const reviews = ref([
  {
    titulo: '“Group Travel Guidance”',
    descripcion: 'The agent we worked with helped us find the best itinerary for our group of 20, which is no small feat. She was responsive to other needs that unfolded during our booking process, including special meals and seat assignments. We have returned to Goway Travel year after year because of the great service Cathy has provided.',
    name: 'Jessica',
  },
  {
    titulo: '“Communication and Expert Knowledge”',
    descripcion: 'I had an excellent trip because Alice, my Goway Travel agent, was an excellent communicator. Listening to my concerns and then following up in a timely manner made this process enjoyable and productive. It was very helpful that Alice had intimate knowledge of every location and activity that we spoke about. I felt assured that she would be a support throughout my travels and she was.',
    name: 'Greg M.',
  },
  {
    titulo: '“Everything went off without a hitch”',
    descripcion: 'Everything went off without a hitch. Goway reps reviewed everything with us the week before: where to be, when to be there, etc. and it just worked every single time. We were never left waiting for a representative to meet us in destination, they were always where they said they would be, on time. It made for a very worry free travel experience. Highly recommend.',
    name: 'Chris H',
  },
])

</script>
<template>
  <section class="container my-20">
    <div class="flex flex-col lg:flex-row items-center justify-center w-full">
      <div class="relative flex-1 lg:w-1/2 h-96 lg:h-auto">
        <img alt="Hot air balloons over a rocky landscape" class="w-full h-full object-cover rounded-md"
          src="https://picsum.photos/800/600" />
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="bg-white p-8 rounded-md shadow-md text-center">
            <p class="text-xl font-semibold mb-2">
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
            <p class="text-gray-600 mb-2">
              Based on 4,764 reviews
            </p>
            <p class="text-green-500 font-semibold">
              TripAdvisor
            </p>
          </div>
        </div>
      </div>
      <div class="flex-1 lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
        <Carousel ref="carouselRef" v-model="carouselSlide" wrap-around :autoplay="8000" :transition="2000"
          :items-to-show="1">
          <Slide v-for="(review, index) in reviews" :key="index">
            <div class="text-start p-4">
              <h1 class="font-semibold text-3xl md:text-5xl mb-6 title font-playfair-display tracking-wide">{{
                review.titulo }}</h1>
              <p class="text-gray-700 mb-4">{{ review.descripcion }}</p>
              <p class="text-gray-700 ">- {{ review.name }}</p>
            </div>
          </Slide>
        </Carousel>
        <div>
          <button @click="prev" class="p-2 rounded-full border ml-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <button @click="next" class="p-2 rounded-full border ml-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>