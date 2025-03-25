<script lang="ts" setup>
import BannerPosition from '~/components/experts/BannerPosition.vue';
import CardBlue from '~/components/experts/CardBlue.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import TextDescription from '~/components/home/TextDescription.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import ImgSlider from '~/components/travel-packages/ImgSlider.vue';
import { ScrollTrigger } from "gsap/ScrollTrigger";
const { $gsap } = useNuxtApp();
$gsap.registerPlugin(ScrollTrigger);

import { useDestinationStore } from '~/stores/destination';
const useDestination = useDestinationStore();
const countries = ref([]);
const curatedTrips = ref([]);
const header = ref({
  miniTitle: 'Who We Are',
  title: 'SouthAmerica Expertise',
  url: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/hero/iStock-689453486.jpg?VersionId=WAnr4B3xR8PsVdqcg8eqLlgRhmfUMR2l&h=f33b7eb6&itok=kqB88MbG',
})

const getCountries = async () => {
  const res: any = await useDestination.getCountries();
  countries.value = res;

  curatedTrips.value = countries.value.map((country: any) => {
    return {
      title: country.nombre,
      image: country.imagen,
      url: country.url,
    };
  });
};

const destination = {
  minititle: "Our Team All Around The Globe",
  title: 'Want to explore the whole world your way? We’re the experts.',
  description: "SouthAmerica's team of born globetrotters have lived, worked, and travelled the world extensively, from our management to our Destination Specialists and support staff. We share your passion for travel, whether you're a culinary explorer seeking new flavours in the bustling markets of Marrakech, an adventurer searching for new summits in the Swiss Alps or dive sites along the Great Barrier Reef, or a family making lifelong memories in the enchanting streets of Kyoto or on the Maldives' white-sand beaches. Come meet our team and make your dream travel plans a reality together.",
}

const imagen_paquetes = [
  {
    "id": 121,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/iStock-1499760492.jpg?VersionId=HMnaGSWLRd5MsxorknBI0tnyjQkJuq3b&h=0624ca61&itok=7XIsIW17",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  },
  {
    "id": 123,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/iStock-1490821055.jpg?VersionId=9WQPj2lCA_C_9Al2HTGgJu6Cvlsrg5wb&h=79355495&itok=dYVr9dPH",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  },
  {
    "id": 124,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/iStock-1434996243.jpg?VersionId=cbKZa5JgWejXT4Ogct1RlUoadGNKF_kX&h=022dcaef&itok=B5cVU9aQ",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  },
  {
    "id": 125,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/iStock-1481251241.jpg?VersionId=r2tSNc28OdjQIBohu1N.rOizjEe5IIfV&h=f82a2171&itok=6bcKbUHP",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  }
]

onMounted(async () => {
  await getCountries();
  $gsap.fromTo('.animatedDiv',
    {
      opacity: 0, y: 50,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.animatedDiv',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
});
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <CardBlue></CardBlue>
  <TextDescription :textDescription="destination"></TextDescription>
  <section class="container my-20">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <nuxt-link v-for="(trip, index) in curatedTrips" :key="index" :to="'/our-experts/' + trip.url"
        class="relative block hover:shadow-lg transition duration-500 ease-in-out h-full bg-white content-between overflow-hidden rounded-md border group">
        <div class="relative overflow-hidden rounded-md">
          <NuxtImg :alt="trip.title" :src="trip.image"
            class="w-full h-96 rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
        </div>
        <div
          class="absolute bottom-6 left-3 md:left-4 bg-white py-4 px-6 flex justify-between items-center rounded-md w-11/12">
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
      <div ref="" class="animatedDiv w-1/2 mx-auto my-8">
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
  <ImgSlider :imagen_paquetes="imagen_paquetes"></ImgSlider>
  <section class="container my-20">
    <div class="max-w-2xl ml-52 ">
      <p class="text-gray-500 mb-6">
        Our Travel Team
      </p>
      <h1 class="text-4xl font-bold mb-12 font-playfair-display">
        We’re Destination Specialists through and through.
      </h1>
      <p class="text-md mb-6">
        At SouthAmerica, our Destination Specialists work in teams that focus on specific regions of the world so they
        can go
        deeper and become true experts who know more than your typical travel advisor. They also draw on their wealth of
        experiences, not only as travel professionals but as travellers and people with diverse interests. When working
        with SouthAmerica, you don’t get cookie cutter advice and travel planning help. You get expert service from
        passionate
        travellers who have dedicated their lives, personally and professionally, to exploring the world.
      </p>
      <p class="text-md mb-6">
        Where are you headed to next?
      </p>
      <NuxtLink to="/destinations" class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700">
        Explore Destinations
      </NuxtLink>
    </div>
  </section>
  <BannerPosition></BannerPosition>
  <MiniReviews></MiniReviews>
</template>
<style></style>