<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
const destinations = [
  {
    title: 'Machu Picchu',
    image: 'https://images.goway.com/production/styles/run_of_site_ad_3xl/s3/trip_level_ad/portugal_porto_tourist_AdobeStock_178862016.jpeg?VersionId=qnpeclJigVYnXDYm1k_1teCzeyut0dfk&itok=ovtj3gJT',
    url: 'machu-picchu',
  },
  {
    title: 'Galapagos Islands',
    image: 'https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Auckland_Hotel_Wing/img_HeritageAuckland_Exterior.jpg',
    url: 'galapagos-islands',
  },
  {
    title: 'Amazon Rainforest',
    image: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext26/image_25013_v1.jpg',
    url: 'amazon-rainforest',
  },
  {
    title: 'Lake Titicaca',
    image: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj',
    url: 'lake-titicaca',
  },
  {
    title: 'Nazca Lines',
    image: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/contact_cta/South%20Pacific%20-%20AdobeStock_234280596.jpeg?VersionId=5gLq1k8pBdbzBJqcnVlzQeL.1uVJeqtN&h=894b9109&itok=tLPUHzhf',
    url: 'nazca-lines',
  },
  {
    title: 'Colca Canyon',
    image: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/hero/iStock-1387834068.jpg?h=5940005b&itok=J9Q1AHMz',
    url: 'colca-canyon',
  },
  {
    title: 'Sacred Valley',
    image: 'https://images.goway.com/production/styles/content_highlight_3xl/s3/content-highlight/2024-02/iStock-1403046192.jpg?h=ecc2d3bd&itok=Yck4r6Gg',
    url: 'sacred-valley',
  },
  {
    title: 'Uyuni Salt Flats',
    image: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/hero/iStock-1387834068.jpg?h=5940005b&itok=J9Q1AHMz',
    url: 'uyuni-salt-flats',
  },
  {
    title: 'Torres del Paine',
    image: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/contact_cta/South%20Pacific%20-%20AdobeStock_234280596.jpeg?VersionId=5gLq1k8pBdbzBJqcnVlzQeL.1uVJeqtN&h=894b9109&itok=tLPUHzhf',
    url: 'torres-del-paine',
  }
];

const breakpoints = {
  750: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  1000: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
  1400: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
  1600: {
    itemsToShow: 5,
    snapAlign: 'center',
  }
}
</script>
<template>
  <section class="my-20">
    <div class="container text-center mb-8">
      <div class="border-title mb-2 mx-auto"></div>
      <p class="mb-6 tracking-widest font-bold">
        Top Places To Travel
      </p>
      <h1 class="font-semibold text-4xl md:text-8xl mb-6 title font-playfair-display tracking-wide">
        Where are you headed to next?
      </h1>
    </div>
    <div class="text-center my-6">
      <nuxt-link to="/destinations" class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700">
        Explorar Destinos
      </nuxt-link>
    </div>
    <Carousel wrap-around pause :transition="40000" :autoplay="1000" :items-to-scroll="destinations.length"
      :breakpoints="breakpoints">
      <Slide v-for="(destinations, index) in destinations" :key="index"
        class="justify-center items-center overflow-hidden p-6 w-full">
        <NuxtLink :to="'/destinations/' + destinations.url"
          class="p-2 grid grid-cols-2 items-center overflow-hidden rounded-md group cursor-pointer hover:shadow-lg transition duration-500 ease-in-out w-fit">
          <div class="overflow-hidden relative rounded-md">
            <nuxt-img :src="destinations.image" :alt="destinations.title"
              class="w-full h-40 rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
          </div>
          <div class="w-full relative ">
            <h2 class="text-xl font-semibold text-gray-800 w-full font-playfair-display">
              {{ destinations.title }}
            </h2>
          </div>
        </NuxtLink>
      </Slide>
    </Carousel>
  </section>
</template>
<style></style>
