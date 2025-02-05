<script lang="ts" setup>
import BannerPosition from '~/components/experts/BannerPosition.vue';
import CardBlue from '~/components/experts/CardBlue.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import TextDescription from '~/components/home/TextDescription.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import ImgSlider from '~/components/travel-packages/ImgSlider.vue';

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

const animatedDiv = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!animatedDiv.value) return;
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.from(entry.target, {
            y: 100,
            opacity: 0,
            duration: 2,
            ease: "power2.out",
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(animatedDiv.value);
});
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <CardBlue></CardBlue>
  <TextDescription></TextDescription>
  <section class="container my-20">

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <nuxt-link v-for="(trip, index) in curatedTrips" :key="index" :to="'/our-experts' + trip.url"
        class="relative block hover:shadow-lg transition duration-500 ease-in-out h-full bg-white content-between overflow-hidden rounded-md border group">
        <div class="relative overflow-hidden rounded-md">
          <img :alt="trip.alt" :src="trip.image"
            class="w-full h-96 rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
        </div>
        <div class="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center rounded-b-md">
          <span>
            {{ trip.title }}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      </nuxt-link>
    </div>
  </section>

  <section class="container my-20">
    <div class="text-center ">
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide"> Why South America Company?</h1>
      <div ref="animatedDiv" class="w-1/2 mx-auto my-8">
        <p class="tracking-widest font-light">At South America Company, we specialize in tailor-made trips that
          immortalize the best days exploring Peru and South America. Every detail is meticulously designed to offer the
          maximum comfort, exclusivity, and luxury. From private villas and luxury cruises to customized itineraries, we
          make sure you only worry about enjoying your luxury vacation.</p>
      </div>
      <button class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700">
        Travel Inspiration
      </button>
    </div>
  </section>
  <ImgSlider></ImgSlider>
  <section class="container my-20">
    <div class="max-w-2xl ml-52 ">
      <p class="text-gray-500 mb-6">
        Our Travel Team
      </p>
      <h1 class="text-4xl font-bold mb-12 font-playfair-display">
        We’re Destination Specialists through and through.
      </h1>
      <p class="text-md mb-6">
        At Goway, our Destination Specialists work in teams that focus on specific regions of the world so they can go
        deeper and become true experts who know more than your typical travel advisor. They also draw on their wealth of
        experiences, not only as travel professionals but as travellers and people with diverse interests. When working
        with Goway, you don’t get cookie cutter advice and travel planning help. You get expert service from passionate
        travellers who have dedicated their lives, personally and professionally, to exploring the world.
      </p>
      <p class="text-md mb-6">
        Where are you headed to next?
      </p>
      <button class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700">
        Explore Destinations
      </button>
    </div>
  </section>
  <BannerPosition></BannerPosition>
  <MiniReviews></MiniReviews>
</template>
<style></style>