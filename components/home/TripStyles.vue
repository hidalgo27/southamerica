<script lang="ts" setup>
const curatedTrips = [
  {
    title: 'Safari & Wildlife Vacations',
    alt: 'Safari vehicle with zebras in a wildlife setting',
    image: 'https://picsum.photos/400/300',
    url: '/safari-wildlife',
    icon: 'fas fa-paw',
  },
  {
    title: 'Classic Vacations',
    alt: 'Colosseum in Rome at sunset',
    image: 'https://picsum.photos/400/300',
    url: '/classic-vacations',
    icon: 'fas fa-landmark',
  },
  {
    title: 'Solo & Women Travel',
    alt: 'Two women looking at a map in a city',
    image: 'https://picsum.photos/400/300',
    url: '/solo-women-travel',
    icon: 'fas fa-female',
  },
  {
    title: 'Beach & Island Getaways',
    alt: 'Aerial view of boats in blue water',
    image: 'https://picsum.photos/400/300',
    url: '/beach-island-getaways',
    icon: 'fas fa-umbrella-beach',
  },
  {
    title: 'Adventure Travel',
    alt: 'Person hiking in a desert landscape',
    image: 'https://picsum.photos/400/300',
    url: '/adventure-travel',
    icon: 'fas fa-hiking',
  },
  {
    title: 'Luxury Resorts',
    alt: 'Tropical resort with a pool',
    image: 'https://picsum.photos/400/300',
    url: '/luxury-resorts',
    icon: 'fas fa-spa',
  },
]
</script>
<template>
  <section class="bg-secondary bg-opacity-30 py-12 ">
    <div class="p-8 container ">
      <div class="text-center mb-8">
        <div class="border-title mb-2 mx-auto"></div>
        <p class="mb-6 tracking-widest font-bold">
          Curated Trip Styles
        </p>
        <h1 class="font-semibold text-4xl md:text-7xl mb-6 title font-playfair-display tracking-wide">
          Explore the world your way.
        </h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <nuxt-link v-for="(trip, index) in curatedTrips" :key="index" :to="trip.url"
          class="relative block hover:shadow-lg transition duration-500 ease-in-out h-full bg-white content-between overflow-hidden rounded-md border group">
          <div class="relative overflow-hidden rounded-md">
            <img :alt="trip.alt" :src="trip.image"
              class="w-full h-auto rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
          </div>
          <div class="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center rounded-b-md">
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
        <nuxt-link to="#" class="px-6 py-3 btn-secondary-outline rounded-md hover:bg-red-600 w-full">
          Ver todos los paquetes
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<style></style>