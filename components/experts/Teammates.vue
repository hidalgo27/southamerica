<script lang="ts" setup>
const teammates = [
  {
    name: 'Juan Pedro',
    ocuppation: 'Travel Specialist',
    alt: 'Safari vehicle with zebras in a wildlife setting',
    image: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/StefanShaloff.png?h=c42dabf0&itok=WUgvN02_',
    url: '/juan-pedro',
  },
  {
    name: 'Andy Huamani',
    ocuppation: 'Travel Specialist',
    alt: 'Colosseum in Rome at sunset',
    image: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/Shamsheer_cottar_illustration.png?VersionId=SjgWomsqcyjOHrXp5nBFUO.408lvH1qU&h=826e7b48&itok=Vj0PNAvo',
    url: '/andy-huamani',
  },
  {
    name: 'Juan Pedro',
    ocuppation: 'Travel Specialist',
    alt: 'Safari vehicle with zebras in a wildlife setting',
    image: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/ShanazDarr.png?h=6e3d84a6&itok=resVHYTp',
    url: '/juan-pedro',
  },
  {
    name: 'Andy Huamani',
    ocuppation: 'Travel Specialist',
    alt: 'Colosseum in Rome at sunset',
    image: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/JessicaKidd.png?h=826e7b48&itok=WKAP-LzM',
    url: '/andy-huamani',
  },
  {
    name: 'Juan Pedro',
    ocuppation: 'Travel Specialist',
    alt: 'Safari vehicle with zebras in a wildlife setting',
    image: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/Angela_Main_illustration.png?VersionId=4xsXpTlBqt9m6LDr.7511MsPXK6DEVvT&h=826e7b48&itok=jWuwkAkq',
    url: '/juan-pedro',
  },
  {
    name: 'Andy Huamani',
    ocuppation: 'Travel Specialist',
    alt: 'Colosseum in Rome at sunset',
    image: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/michelle_fones.png?VersionId=.zSNN8.6rx.Fm_lPYcU2ItFOf5yjizHf&h=826e7b48&itok=F_PO61Tq',
    url: '/andy-huamani',
  },
  {
    name: 'Juan Pedro',
    ocuppation: 'Travel Specialist',
    alt: 'Safari vehicle with zebras in a wildlife setting',
    image: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/YolandaSmidt.png?h=9b025431&itok=hxHKdEop',
    url: '/juan-pedro',
  },
  {
    name: 'Andy Huamani',
    ocuppation: 'Travel Specialist',
    alt: 'Colosseum in Rome at sunset',
    image: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/DavidWong.png?h=826e7b48&itok=fvSY1qPB',
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