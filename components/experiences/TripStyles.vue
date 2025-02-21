<script lang="ts" setup>
const { $gsap } = useNuxtApp();
import { ScrollTrigger } from "gsap/ScrollTrigger";

$gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  $gsap.fromTo(
    '.animatedSvg2',
    {
      clipPath: "inset(0% 0% 0% 100%)"
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.animatedSvg2',
        start: "top 80%",
        end: "top 0%",
        scrub: true,
      },
    }
  );
});

const curatedTrips = [
  {
    title: 'Safari & Wildlife Vacations',
    alt: 'Safari vehicle with zebras in a wildlife setting',
    image: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/contact_cta/South%20Pacific%20-%20AdobeStock_234280596.jpeg?VersionId=5gLq1k8pBdbzBJqcnVlzQeL.1uVJeqtN&h=894b9109&itok=tLPUHzhf',
    url: '/safari-wildlife',
    icon: 'fas fa-paw',
  },
  {
    title: 'Classic Vacations',
    alt: 'Colosseum in Rome at sunset',
    image: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext25/image_24703_v1.jpg',
    url: '/classic-vacations',
    icon: 'fas fa-landmark',
  },
  {
    title: 'Solo & Women Travel',
    alt: 'Two women looking at a map in a city',
    image: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/Sydney%20Opera%20House_AdobeStock_224286843%20%283%29.jpeg?VersionId=YHodoYpc62zmfJzKE.jfp8S2TwCeaB0c&h=a5654313&itok=ZAZ56cvJ',
    url: '/solo-women-travel',
    icon: 'fas fa-female',
  },
  {
    title: 'Beach & Island Getaways',
    alt: 'Aerial view of boats in blue water',
    image: 'https://images.goway.com/production/styles/run_of_site_ad_3xl/s3/trip_level_ad/portugal_porto_tourist_AdobeStock_178862016.jpeg?VersionId=qnpeclJigVYnXDYm1k_1teCzeyut0dfk&itok=ovtj3gJT',
    url: '/beach-island-getaways',
    icon: 'fas fa-umbrella-beach',
  },
  {
    title: 'Adventure Travel',
    alt: 'Person hiking in a desert landscape',
    image: 'https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Auckland_Hotel_Wing/img_HeritageAuckland_Exterior.jpg',
    url: '/adventure-travel',
    icon: 'fas fa-hiking',
  },
  {
    title: 'Luxury Resorts',
    alt: 'Tropical resort with a pool',
    image: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext26/image_25013_v1.jpg',
    url: '/luxury-resorts',
    icon: 'fas fa-spa',
  },
]
</script>
<template>
  <section class="bg-secondary bg-opacity-30 py-20 ">
    <svg class="animatedSvg2 absolute right-0 w-1/3 overflow-visible translate-y-40" viewBox="0 0 800 300">
      <path
        d="M785.428 1.301C756.23 37.4045 731.395 80.1763 693.122 106.756C640.695 143.166 585.853 141.377 532.484 135.109C494.542 130.653 455.604 129.089 417.179 126.451C367.602 123.048 318.162 119.825 266.295 135.462C214.189 151.172 165.575 184.569 120.382 219.264C94.4555 239.168 66.3735 265.321 45.5039 291.126"
        fill="none" stroke="#F05B2A" stroke-width="2" stroke-dasharray="0.1 10" stroke-linecap="round"></path>
      <path
        d="M785.428 1.301C756.23 37.4045 731.395 80.1763 693.122 106.756C640.695 143.166 585.853 141.377 532.484 135.109C494.542 130.653 455.604 129.089 417.179 126.451C367.602 123.048 318.162 119.825 266.295 135.462C214.189 151.172 165.575 184.569 120.382 219.264C94.4555 239.168 66.3735 265.321 45.5039 291.126"
        fill="none" stroke="#F9F4E8" stroke-width="3" stroke-dasharray="849" stroke-dashoffset="1698"
        style="stroke-dashoffset: 849px;"></path>
      <g class="g-svg2">
        <path
          d="M46.8784 314.001C42.4652 326.5 28.7555 333.055 16.2569 328.641C3.75837 324.228 -2.79611 310.518 1.61709 298.02C6.03029 285.521 19.74 278.967 32.2386 283.38C44.7371 287.793 51.2916 301.503 46.8784 314.001Z"
          fill="#F8BCAA" fill-opacity="0.15"></path>
        <path
          d="M28.8197 307.825C28.0841 309.908 25.7992 311 23.7161 310.265C21.633 309.529 20.5406 307.244 21.2761 305.161C22.0116 303.078 24.2966 301.985 26.3797 302.721C28.4628 303.457 29.5552 305.742 28.8197 307.825Z"
          fill="#F05B2A"></path>
      </g>
    </svg>

    <div class="p-8 container z-10">
      <div class="text-center mb-8">
        <div class="border-title mb-2 mx-auto"></div>
        <p class="mb-6 tracking-widest font-bold">
          Curated Trip Styles
        </p>
        <h1 class="font-semibold text-4xl md:text-8xl my-20 title font-playfair-display tracking-wide">
          Explore the world your way.
        </h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <nuxt-link v-for="(trip, index) in curatedTrips" :key="index" :to="'/experiences' + trip.url"
          class="relative block hover:shadow-lg transition duration-500 ease-in-out h-full bg-white content-between overflow-hidden rounded-md border group">
          <div class="relative overflow-hidden rounded-md h-[40vh] 2xl:h-[30vh]">
            <img :alt="trip.alt" :src="trip.image"
              class="w-full h-full rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
          </div>
          <div
            class="absolute bottom-6 left-3 md:left-4 bg-white p-4 flex justify-between items-center rounded-md w-11/12">
            <span>
              {{ trip.title }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
        </nuxt-link>
      </div>
      <div class="text-center mt-6">
        <nuxt-link to="/experiences" class="px-6 py-3 btn-secondary-outline rounded-md">
          Ver todas las experiencias
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<style></style>