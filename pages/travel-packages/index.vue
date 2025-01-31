<script lang="ts" setup>
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import FilterPackages from '~/components/travel-packages/FilterPackages.vue';

const listPackages = [
  {
    titulo: 'Machu Picchu & Galapagos Islands',
    country: 'Peru & Ecuador',
    specials: true,
    imagen: 'https://picsum.photos/400/300',
    duracion: 7,
    url: '/machu-picchu-galapagos-islands',
    precio_paquetes: 4129,
    ahorro: 600,
    etiquetas: ['Premium', 'Escorted Touring', 'Nature'],
    reserva: 'Feb 28, 2025',
  },
  {
    titulo: 'Amazon Rainforest Adventure',
    specials: true,
    imagen: 'https://picsum.photos/400/350',
    duracion: 10,
    url: '/amazon-rainforest-adventure',
    precio_paquetes: 3299,
    ahorro: 500,
    reserva: 'Mar 15, 2025',
  },
  {
    titulo: 'Patagonia Explorer',
    country: 'Argentina',
    imagen: 'https://picsum.photos/400/400',
    duracion: 12,
    url: '/patagonia-explorer',
    precio_paquetes: 4999,
    ahorro: 800,
    etiquetas: ['Deluxe', 'Hiking', 'Expedition'],
    reserva: 'Apr 10, 2025',
  },
  {
    titulo: 'Peru Cultural Discovery',
    imagen: 'https://picsum.photos/400/450',
    duracion: 9,
    url: '/peru-cultural-discovery',
    precio_paquetes: 2899,
    ahorro: 300,
    etiquetas: ['Premium', 'History', 'Local Experience'],
    reserva: 'May 5, 2025',
  },
];

</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <FilterPackages :package-data="listPackages"></FilterPackages>
  <Newsletter></Newsletter>
</template>
<style></style>