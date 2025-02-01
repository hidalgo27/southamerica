<script lang="ts" setup>
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import TravelStories from '~/components/home/TravelStories.vue';
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
  <section class="container my-20">
    <div class="flex items-center justify-center mt-28 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 bg-white w-full gap-6 items-stretch">
        <div class="bg-tertiary bg-opacity-10 p-6 rounded-md flex flex-col justify-between h-full">
          <div class="border-t-2 h-64 my-8"></div>
          <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">
            <div class="text-gray-500 text-lg mb-4">
            </div>

            Get Your Heart Pumping with Goway’s Active & Adventure Vacations

          </h1>
          <p class="text-gray-600 mb-8">If your ideal trip is all about the adrenaline, these trips will push you out of
            your comfort zone and into a new adventure. Hike the Inca Trail, Australia’s Outback, the American
            Southwest,
            or the Himalayas. Share an unforgettable diving encounter, then relax at a luxury spa in the Maldives or
            South
            Pacific. When it’s time to unwind, camp out under the stars of the African savanna or lounge aboard a
            catamaran on Tahiti’s magical lagoons. Wherever the great outdoors is calling you, these vacations are ready
            to answer.</p>

        </div>
        <div class="relative w-full rounded-md h-full">
          <img class="w-full h-full object-cover rounded-md" src="https://picsum.photos/400/300" />
        </div>
      </div>
    </div>
  </section>

  <section class="container my-40">
    <div class="text-center ">
      <h1 class="font-semibold text-5xl w-3/4 mx-auto mb-6 title font-playfair-display tracking-wide">Been shut in long
        enough? Goway’s active vacations will get you moving!
      </h1>
      <div class="w-1/2 mx-auto my-8">
        <p class="tracking-widest font-light">If your dream vacation is all about the great outdoors, these trips invite
          you to hike, boat, safari, cycle, raft, and scuba dive your way to incredible adventures. Whether it’s getting
          your blood pumping on a demanding mountain trail, or lounging under a cloudless sky, enjoying the sun’s rays,
          discover all the outside world has to offer with these active adventures.</p>
      </div>
    </div>
  </section>

  <FilterPackages :package-data="listPackages"></FilterPackages>

  <EspecialistLetter></EspecialistLetter>
  <TravelStories></TravelStories>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>