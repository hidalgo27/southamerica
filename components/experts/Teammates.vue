<script lang="ts" setup>
const teammates = [
  {
    name: 'Juan Pedro',
    ocuppation: 'Travel Specialist',
    alt: 'Safari vehicle with zebras in a wildlife setting',
    image: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext26/image_25013_v1.jpg',
    url: '/juan-pedro',
  },
  {
    name: 'Andy Huamani',
    ocuppation: 'Travel Specialist',
    alt: 'Colosseum in Rome at sunset',
    image: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj',
    url: '/andy-huamani',
  },
  {
    name: 'Juan Pedro',
    ocuppation: 'Travel Specialist',
    alt: 'Safari vehicle with zebras in a wildlife setting',
    image: 'https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Queenstown/img_HeritageQueenstown_Exterior.jpg',
    url: '/juan-pedro',
  },
  {
    name: 'Andy Huamani',
    ocuppation: 'Travel Specialist',
    alt: 'Colosseum in Rome at sunset',
    image: 'https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Auckland_Hotel_Wing/img_HeritageAuckland_Exterior.jpg',
    url: '/andy-huamani',
  },
  {
    name: 'Juan Pedro',
    ocuppation: 'Travel Specialist',
    alt: 'Safari vehicle with zebras in a wildlife setting',
    image: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/hero/iStock-1387834068.jpg?h=5940005b&itok=J9Q1AHMz',
    url: '/juan-pedro',
  },
  {
    name: 'Andy Huamani',
    ocuppation: 'Travel Specialist',
    alt: 'Colosseum in Rome at sunset',
    image: 'https://images.goway.com/production/styles/content_highlight_3xl/s3/content-highlight/2024-02/iStock-1403046192.jpg?h=ecc2d3bd&itok=Yck4r6Gg
',
    url: '/andy-huamani',
  },
  {
    name: 'Juan Pedro',
    ocuppation: 'Travel Specialist',
    alt: 'Safari vehicle with zebras in a wildlife setting',
    image: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext25/image_24703_v1.jpg',
    url: '/juan-pedro',
  },
  {
    name: 'Andy Huamani',
    ocuppation: 'Travel Specialist',
    alt: 'Colosseum in Rome at sunset',
    image: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/contact_cta/South%20Pacific%20-%20AdobeStock_234280596.jpeg?VersionId=5gLq1k8pBdbzBJqcnVlzQeL.1uVJeqtN&h=894b9109&itok=tLPUHzhf',
    url: '/andy-huamani',

  }
]
</script>
<template>
  <section class="bg-secondary bg-opacity-30 py-12 ">
    <div class="p-8 container ">
      <div class="text-center mb-8">
        <div class="border-title mb-2 mx-auto"></div>
        <p class="mb-6 tracking-widest font-bold">
          Our Dedicated Team
        </p>
        <h1 class="font-semibold text-4xl md:text-7xl mb-6 title font-playfair-display tracking-wide">
          Helping you explore the world your way.
        </h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <nuxt-link v-for="(teammate, index) in teammates" :key="index" :to="'/our-experts/peru' + teammate.url"
          class="relative block hover:shadow-lg transition duration-500 ease-in-out h-full bg-white content-between overflow-hidden rounded-md border group">
          <div class="relative overflow-hidden rounded-md w-full h-96">
            <img :alt="teammate.alt" :src="teammate.image"
              class="w-full h-full rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 bg-white p-4 flex flex-col justify-center items-center rounded-b-md">
            <span class="font-semibold text-lg">
              {{ teammate.name }}
            </span>
            <span class="text-sm">
              {{ teammate.ocuppation }}
            </span>
          </div>
        </nuxt-link>
      </div>
      <div class="text-center mt-6">
        <nuxt-link class="px-6 py-3 btn-secondary-outline w-full rounded-md">
          Ver todos los perfiles
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<style></style>