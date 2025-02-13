<script lang="ts" setup>
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import CardPackage from '~/components/travel-packages/CardPackage.vue';

const listPackages = [
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    country: 'Peru & Ecuador',
    specials: true,
    imagen: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj',
    duracion: 7,
    url: 'machu-picchu-galapagos-islands',
    precio_paquetes: 4129,
    ahorro: 600,
    etiquetas: ['Premium', 'Escorted Touring', 'Nature'],
    reserva: 'Feb 28, 2025',
  },
  {
    titulo: 'Amazon Rainforest Adventure',
    specials: true,
    imagen: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/contact_cta/South%20Pacific%20-%20AdobeStock_234280596.jpeg?VersionId=5gLq1k8pBdbzBJqcnVlzQeL.1uVJeqtN&h=894b9109&itok=tLPUHzhf',
    duracion: 10,
    url: 'amazon-rainforest-adventure',
    precio_paquetes: 3299,
    ahorro: 500,
    reserva: 'Mar 15, 2025',
  },
  {
    titulo: 'Patagonia Explorer',
    country: 'Argentina',
    imagen: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext26/image_25013_v1.jpg',
    duracion: 12,
    url: 'patagonia-explorer',
    precio_paquetes: 4999,
    ahorro: 800,
    etiquetas: ['Deluxe', 'Hiking', 'Expedition'],
    reserva: 'Apr 10, 2025',
  },
  {
    titulo: 'Peru Cultural Discovery',
    imagen: 'https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Radisson_Blu_Plaza_Hotel_Sydney/img_RadissonBluPlazaHotelSydney_Exterior.jpg',
    duracion: 9,
    url: 'peru-cultural-discovery',
    precio_paquetes: 2899,
    ahorro: 300,
    etiquetas: ['Premium', 'History', 'Local Experience'],
    reserva: 'May 5, 2025',
  },
];

</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <section class="my-20">
    <div class="container">
      <div class="grid grid-cols-3 gap-6">
        <CardPackage v-for="(packages, index) in listPackages" :key="index" :packageData="packages"></CardPackage>
      </div>
    </div>
  </section>
  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>


<style></style>