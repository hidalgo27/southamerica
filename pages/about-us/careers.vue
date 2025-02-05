<script lang="ts" setup>
import BannerPosition from '~/components/experts/BannerPosition.vue';
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import Benefits from '~/components/page/slider/Benefits.vue';
import ImgSlider from '~/components/travel-packages/ImgSlider.vue';

const activeTab = ref(0);
const community_commitment = [
  {
    title: 'Growing Together',
    text: 'At Goway, we are committed to building a workforce that reflects the communities we operate within and to promote a diverse, anti- racist, inclusive, accessible, merit - based, respectful and equitable workplace.',
    image: 'https://picsum.photos/400/300',
  },
  {
    title: 'Better Together',
    text: 'We invite all interested individuals to apply and encourage applications from people with disabilities, Indigenous, Black, and racialized individuals, as well as people from diverse ethnic and cultural origins, sexual orientations, gender identities and expressions.',
    image: 'https://picsum.photos/400/600',
  },
  {
    title: 'Equal Opportunity',
    text: 'Goway provides equal opportunities for all applicants and is committed to fostering an inclusive, accessible environment, where all employees feel valued, respected and supported throughout the recruitment and employment process. If you require accommodation, we will work with you to meet your needs. For more information on our committment to accessibility, contact us at access@goway.com',
    image: 'https://picsum.photos/400/400',
  }
]

const positions = [
  { title: 'Destination Specialist (British Columbia, Canada)', link: '#' },
  { title: 'Product Manager - Europe (Toronto, Canada - Hybrid)', link: '#' },
  { title: 'Vice President - Europe (Toronto, Canada - Hybrid)', link: '#' },
  { title: 'Controller (Toronto, Canada - Hybrid)', link: '#' },
  { title: 'Senior Reservations Consultant (Manila, Philippines - Hybrid)', link: '#' },
  { title: 'Graphic Designer (Manila, Philippines - Remote)', link: '#' },
  { title: 'Sales Support Specialist (Manila, Philippines - Remote/Hybrid)', link: '#' },
  { title: 'Vice President - Africa (Toronto, Canada - Hybrid)', link: '#' },
];
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <section class="container my-20">
    <div class="flex items-center justify-center mt-28 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 bg-white w-full gap-6 items-stretch">
        <div class="bg-tertiary bg-opacity-10 p-6 rounded-md flex flex-col justify-between h-full">
          <div class="border-t-2 h-32 my-8"></div>
          <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">
            <div class="text-gray-500 text-lg mb-4">
            </div>
            Welcome to Goway
          </h1>
          <p class="text-gray-600 mb-8">We’re an award-winning, global travel company. For over 50 years we’ve been
            crafting tailor-made travel dreams for clients. Established by Bruce Hodge in 1970, Goway has remained
            family-owned and operated, growing to a team of 600+ specialists.

            In the business of tailor-made travel, we understand that every traveler, and every team member, is unique.
            Goway is a company built on values, taking care of our people, our clients, and the communities in which we
            operate. </p>
          <button class="btn-ternary py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700">Explor all
            positions</button>
        </div>
        <div class="relative w-full rounded-md h-full">
          <img class="w-full h-full object-cover rounded-md" src="https://picsum.photos/400/300" />
        </div>
      </div>
    </div>
  </section>
  <DescriptionWithLine></DescriptionWithLine>
  <section class="bg-gray-100 my-20">
    <div class="container py-32">
      <p class="text-gray-600 mb-8">Personal and professional growth </p>
      <h1 class="font-semibold text-5xl mb-40 title font-playfair-display tracking-wide">
        Our People Promise
      </h1>
      <Benefits></Benefits>
    </div>
  </section>
  <section class="container my-20">
    <div class="flex justify-center md:space-x-6 border-b text-sm md:text-lg">
      <button v-for="(item, index) in community_commitment" :key="index" @click="activeTab = index"
        class="p-4 text-center border-b-2 transition cursor-pointer"
        :class="activeTab === index ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'">
        {{ item.title }}
      </button>
    </div>

    <div class="flex gap-6 mt-10">
      <div v-if="community_commitment[activeTab]"
        class="bg-white p-8 rounded-md grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-between w-full">
        <div class="relative p-6 w-full rounded-md h-[50vh]">
          <img :src="community_commitment[activeTab].image" class="rounded-md  w-full h-full object-cover">
        </div>

        <div class="space-y-4">
          <h1 class="font-semibold text-4xl mb-4 font-playfair-display tracking-wide">
            {{ community_commitment[activeTab].title }}
          </h1>
          <div class="text-gray-700 leading-relaxed">
            {{ community_commitment[activeTab].text }}
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="bg-white p-8 rounded-md grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-between w-full">
        <div class="relative p-6 w-full rounded-md h-[50vh]">
          <img src="https://picsum.photos/400/300" class="rounded-md  w-full h-full object-cover">
        </div>

        <div class="space-y-4 ml-20">
          <h1 class="font-semibold text-4xl mb-4 font-playfair-display tracking-wide">
            Become a Goway Destination Specialist
          </h1>
          <div class="text-gray-700 leading-relaxed text-sm">
            Our Destination Specialists are passionate about expanding their knowledge of specific regions of the world,
            and have the ability to create custom itineraries, providing individualized service and a personal touch.
          </div>
          <button class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700">Apply Now</button>
        </div>
      </div>
    </div>
  </section>
  <section class="my-20">
    <div class="container p-6">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-sm font-medium text-gray-500">Explore Open Positions</h1>
        <button class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700">
          View All Open Positions
        </button>
      </div>

      <h2 class="text-4xl font-bold mb-12">Let's grow together.</h2>

      <div class="space-y-6 ">
        <div v-for="(position, index) in positions" :key="index"
          class="flex justify-between items-center border-b py-4 w-2/3 mx-auto">
          <span class="text-gray-500">{{ (index + 1).toString().padStart(2, '0') }}</span>
          <span class="flex-1 ml-4">{{ position.title }}</span>
          <NuxtLink :to="position.link"
            class="text-gray-500 hover:text-gray-700 flex items-center transition duration-300">
            Explore
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>

          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
  <ImgSlider></ImgSlider>
  <BannerPosition></BannerPosition>
  <Reviews></Reviews>
</template>
<style></style>