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
    text: 'At SouthAmerica, we are committed to building a workforce that reflects the communities we operate within and to promote a diverse, anti- racist, inclusive, accessible, merit - based, respectful and equitable workplace.',
    image: 'https://images.goway.com/production/styles/run_of_site_ad_3xl/s3/trip_level_ad/portugal_porto_tourist_AdobeStock_178862016.jpeg?VersionId=qnpeclJigVYnXDYm1k_1teCzeyut0dfk&itok=ovtj3gJT',
  },
  {
    title: 'Better Together',
    text: 'We invite all interested individuals to apply and encourage applications from people with disabilities, Indigenous, Black, and racialized individuals, as well as people from diverse ethnic and cultural origins, sexual orientations, gender identities and expressions.',
    image: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext26/image_25013_v1.jpg',
  },
  {
    title: 'Equal Opportunity',
    text: 'SouthAmerica provides equal opportunities for all applicants and is committed to fostering an inclusive, accessible environment, where all employees feel valued, respected and supported throughout the recruitment and employment process. If you require accommodation, we will work with you to meet your needs. For more information on our committment to accessibility, contact us at access@SouthAmerica.com',
    image: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext26/image_25013_v1.jpg',
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

const text = {
  title: 'The SouthAmerica Culture',
  description: 'At SouthAmerica, you’ll enjoy industry-leading work/life balance with competitive vacation, paid personal days, and paid volunteer days to make a difference in your community. You’ll also get your birthday off!\nWe’re a community of passionate globetrotters, so you’ll get travel perks, discounted worldwide travel, work abroad opportunities, and the chance to win free trips.  \nWhether you work remotely or in one of our offices, you’ll find a rich, open, and supportive culture that connects all our teams around the globe.We’re growth- minded and entrepreneurial, supporting our teams in achieving their goals and advancing within the organization.We value teamwork, integrity, and accountability – working together to help our clients realize their travel dreams.  \nOur benefits package also includes retirement savings support, a comprehensive health and dental package, and short - and long - term disability, should you ever need it.'
}

const header = ref({
  miniTitle: 'Let’s Grow Together',
  title: 'Careers at SouthAmerica',
  url: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/hero/AdobeStock_208715920.jpeg?VersionId=sFnTO72WhH2Yd9FvvH48W32BjAK.sT1e&h=439f1a1a&itok=m04aWEyb'
})

const imagen_paquetes = [
  {
    "id": 121,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/Dubai_SkyDiving_202203_Leyan-1.png?h=00da3206&itok=bdXDSPHL",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  },
  {
    "id": 123,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/Juan-Michael-Hanging-Bridges-Arenal.png?h=3a980eaf&itok=ZRpKFWQ1",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  },
  {
    "id": 124,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/Bryan-Torres-del-Paine.jpg?h=86eb6ee5&itok=5KWP8uI5",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  },
  {
    "id": 125,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/IMG_0951.jpg?h=0642ef60&itok=U5lPDbxohttps://images.goway.com/production/styles/visual_media_content_3xl/s3/media/Archive%20-%20Baby%20Kangaroo%20%282000s%29.png?h=3149e7c3&itok=EPp8hKJ2",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  }
]
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <section class="container my-20">
    <div class="flex items-center justify-center mt-28 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 bg-white w-full gap-6 items-stretch">
        <div class="bg-tertiary bg-opacity-10 p-6 rounded-md flex flex-col justify-between h-full">
          <div class="border-t-2 h-32 my-8"></div>
          <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">
            <div class="text-gray-500 text-lg mb-4">
            </div>
            Welcome to SouthAmerica
          </h1>
          <p class="text-gray-600 mb-8">We’re an award-winning, global travel company. For over 50 years we’ve been
            crafting tailor-made travel dreams for clients. Established by Bruce Hodge in 1970, SouthAmerica has
            remained
            family-owned and operated, growing to a team of 600+ specialists.

            In the business of tailor-made travel, we understand that every traveler, and every team member, is unique.
            SouthAmerica is a company built on values, taking care of our people, our clients, and the communities in
            which we
            operate. </p>
          <button class="btn-ternary py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700">Explor all
            positions</button>
        </div>
        <div class="relative w-full rounded-md h-full">
          <NuxtImg class="w-full h-full object-cover rounded-md"
            src="https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj" />
        </div>
      </div>
    </div>
  </section>
  <DescriptionWithLine :text="text"></DescriptionWithLine>
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
          <NuxtImg :src="community_commitment[activeTab].image" class="rounded-md  w-full h-full object-cover">
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
          <NuxtImg
            src="https://images.goway.com/production/styles/content_highlight_3xl/s3/content-highlight/2024-02/iStock-1403046192.jpg?h=ecc2d3bd&itok=Yck4r6Gg"
            class="rounded-md  w-full h-full object-cover">
        </div>

        <div class="space-y-4 ml-20">
          <h1 class="font-semibold text-4xl mb-4 font-playfair-display tracking-wide">
            Become a SouthAmerica Destination Specialist
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
        <NuxtLink to="/about-us/careers" class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700">
          View All Open Positions
        </NuxtLink>
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
  <ImgSlider :imagen_paquetes="imagen_paquetes"></ImgSlider>
  <BannerPosition></BannerPosition>
  <Reviews></Reviews>
</template>
<style></style>