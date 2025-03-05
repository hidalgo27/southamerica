<script lang="ts" setup>
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import ImgSlider from '~/components/travel-packages/ImgSlider.vue';

const header = ref({
  miniTitle: 'The SouthAmerica Way',
  title: 'Our Story',
  url: 'https://www.andbeyond.com/wp-content/uploads/sites/5/Lama-and-Machu-Picchu-in-Peru-in-South-America.jpg'
})
const timeline = [
  {
    year: 1970,
    goals: [
      'Bruce Hodge founded SouthAmerica Travel in Toronto.',
      'Bruce worked evenings in a peanut butter factory to make cash flow and grew the company to promote European Camping Tours for 18 to 30-somethings, Adventures in Australia, and Overland Expeditions across Asia and Africa.',
      'By the late 70s, SouthAmerica had become a pioneer operator of overland camping tours across the Americas',

    ],
    image: 'https://images.goway.com/production/styles/run_of_site_ad_3xl/s3/trip_level_ad/portugal_porto_tourist_AdobeStock_178862016.jpeg?VersionId=qnpeclJigVYnXDYm1k_1teCzeyut0dfk&itok=ovtj3gJT'
  },
  {
    year: 1980,
    goals: [
      'SouthAmerica established itself as a global influence.',
      'The travel industry endured major challenges, but our strong foundations allowed SouthAmerica to forge ahead.',
      'We continually innovated, invested in new technology, and challenged the status quo.',
      'Bruce’s wife, son, and daughter have played key roles in our growth.'
    ],
    image: 'https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Radisson_Blu_Plaza_Hotel_Sydney/img_RadissonBluPlazaHotelSydney_Exterior.jpg'
  },
  {
    year: 1990,
    goals: [
      'Our mission has always been to help our clients realize their travel dreams.',
      'We’ve listened as your travel styles and bucket lists have evolved, and you’ve become true Globetrotters.',
      'Today, we are an industry-leading, global travel company.',
      'We’re powered by a 600-person team utilizing cutting-edge technology.',
      'We traded camping tours for 4 and 5-star tailor-made travel experiences to over 100 countries around the world.'
    ],
    image: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj'
  },
  {
    year: 2000,
    goals: [
      'SouthAmerica Travel was founded in Toronto in 1970 by Bruce Hodge, a young Australian economist who moved to Canada to follow his dreams.',
      'He forged a passion for travel during a short stint as a tour guide in England.',
      'Bruce worked evenings in a peanut butter factory to make cash flow and grew the company to promote European Camping Tours for 18 to 30-somethings, Adventures in Australia, and Overland Expeditions across Asia and Africa.',
      'By the late 70s, SouthAmerica had become a pioneer operator of overland camping tours across the Americas',
    ],
    image: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/Sydney%20Opera%20House_AdobeStock_224286843%20%283%29.jpeg?VersionId=YHodoYpc62zmfJzKE.jfp8S2TwCeaB0c&h=a5654313&itok=ZAZ56cvJ'
  },
  {
    year: 2010,
    goals: [
      'SouthAmerica Travel was founded in Toronto in 1970 by Bruce Hodge, a young Australian economist who moved to Canada to follow his dreams.',
      'He forged a passion for travel during a short stint as a tour guide in England.',
      'Bruce worked evenings in a peanut butter factory to make cash flow and grew the company to promote European Camping Tours for 18 to 30-somethings, Adventures in Australia, and Overland Expeditions across Asia and Africa.',
      'By the late 70s, SouthAmerica had become a pioneer operator of overland camping tours across the Americas',
    ],
    image: 'https://images.goway.com/production/styles/content_highlight_3xl/s3/content-highlight/2024-02/iStock-1403046192.jpg?h=ecc2d3bd&itok=Yck4r6Gg'
  },
  {
    year: 2020,
    goals: [
      'SouthAmerica Travel was founded in Toronto in 1970 by Bruce Hodge, a young Australian economist who moved to Canada to follow his dreams.',
      'He forged a passion for travel during a short stint as a tour guide in England.',
      'Bruce worked evenings in a peanut butter factory to make cash flow and grew the company to promote European Camping Tours for 18 to 30-somethings, Adventures in Australia, and Overland Expeditions across Asia and Africa.',
      'By the late 70s, SouthAmerica had become a pioneer operator of overland camping tours across the Americas',
    ],
    image: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext25/image_24703_v1.jpg'
  }
]
const activeTab = ref(0)

const imagen_paquetes = [
  {
    "id": 121,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/Archive%20-%20Alaska%20B%26W.png?h=b353f8d2&itok=FWZONCPI",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  },
  {
    "id": 123,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/Archive%20-%20Trade%20Show.png?h=fdee6af2&itok=Zr2-khQR",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  },
  {
    "id": 124,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/Archive%20-%20Event.png?h=4d6740f7&itok=1Iq9mMAS",
    "alt": null,
    "idpaquetes": 168,
    "created_at": null,
    "updated_at": null
  },
  {
    "id": 125,
    "nombre": "https://images.goway.com/production/styles/visual_media_content_3xl/s3/media/Archive%20-%20Baby%20Kangaroo%20%282000s%29.png?h=3149e7c3&itok=EPp8hKJ2",
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
        <div class="bg-tertiary bg-opacity-10 p-8 rounded-md flex flex-col justify-between h-full">
          <div class="border-t-2 h-6 my-8"></div>
          <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">
            <div class="text-gray-500 text-lg mb-4">
            </div>
            President's Welcome
          </h1>
          <p class="text-gray-600 mb-8">Dear Globetrotter,</p>

          <p class="text-gray-600 mb-8">When I started this journey back in 1970, SouthAmerica was a one-man company
            operating
            out of a small apartment in
            Toronto. Today, we have over 600 team members working across three continents. We’re also marking an
            exciting new chapter for SouthAmerica with a completely new look, and an incredible new goway.com to serve
            you
            better.</p>
          <p class="text-gray-600 mb-8">Consider this website your window into the world. As you explore its pages,
            you’ll discover inspirational
            stories, expert advice, and unforgettable trip ideas to over 100 countries worldwide.</p>

          <p class="text-gray-600 mb-8">Remember that every SouthAmerica vacation is tailor-made. Join us on this new
            journey,
            and when you’re ready for
            your own adventure, get in touch. We’d love to help turn your travel dreams into reality.</p>

          <p class="text-gray-600 ">Sincerely,</p>
          <p class="text-gray-600 ">Bruce Hodge</p>
          <p class="text-gray-600 ">Founder & President</p>
        </div>
        <div class="relative w-full rounded-md h-full">
          <img class="w-full h-full object-cover rounded-md"
            src="https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj" />
        </div>
      </div>
    </div>
  </section>
  <section class="container my-20">
    <div class="w-2/3">
      <p class="text-gray-500 mb-6">
        About Us
      </p>
      <h1 class="text-4xl font-bold mb-12 font-playfair-display">
        A Timeline of SouthAmerica
      </h1>
      <p class="text-md mb-6">SouthAmerica Travel was founded in Toronto in 1970 by Bruce Hodge, a young Australian
        economist
        who moved to Canada to
        follow his dreams. He forged a passion for travel during a short stint as a tour guide in England. </p>
      <p class="text-md mb-6">
        Bruce worked evenings in a peanut butter factory to make cash flow and grew the company to promote European
        Camping Tours for 18 to 30-somethings, Adventures in Australia, and Overland Expeditions across Asia and Africa.
        By the late 70s, SouthAmerica had become a pioneer operator of overland camping tours across the Americas,
        providing
        “Young Adult Adventures.”
      </p>
      <p class="text-md mb-6">
        In the following decades, we have established ourselves as a global influence. While the travel industry endured
        major challenges, our strong foundations allowed SouthAmerica to forge ahead. We continually innovated, invested
        in new
        technology, and challenged the status quo. Bruce’s wife, son, and daughter have played key roles in our growth.
      </p>
      <p class="text-md mb-6">Our mission has always been to help our clients realize their travel dreams. We’ve
        listened as your travel
        styles and bucket lists have evolved, and you’ve become true Globetrotters. Today, we are an industry-leading,
        global travel company. We’re powered by a 600-person team utilizing cutting-edge technology. We traded camping
        tours for 4 and 5-star tailor-made travel experiences to over 100 countries around the world. </p>
      <p>Read more about our milestones over the decades. You can also learn more about the story of our company logo.
      </p>
    </div>
  </section>
  <section class="container my-20">
    <!-- Botones de Navegación -->
    <div class="flex justify-center md:space-x-6 border-b text-sm md:text-lg">
      <button v-for="(item, index) in timeline" :key="item.year" @click="activeTab = index"
        class="p-4 text-center border-b-2 transition cursor-pointer"
        :class="activeTab === index ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'">
        {{ item.year }}
      </button>
    </div>

    <!-- Contenido del Timeline -->
    <div class="flex gap-6 mt-10">
      <div v-if="timeline[activeTab]"
        class="bg-white p-8 rounded-md grid grid-cols-1 md:grid-cols-2 gap-6 justify-between w-full items-center">
        <div class="relative p-6 w-full rounded-md h-[50vh]">
          <img :src="timeline[activeTab].image" alt="Image for {{ timeline[activeTab].year }}"
            class="rounded-md  w-full h-full object-cover">
        </div>


        <div class="space-y-4">
          <h1 class="font-semibold text-4xl mb-4 font-playfair-display tracking-wide">
            {{ timeline[activeTab].year }}
          </h1>
          <li v-for="(goal, goalIndex) in timeline[activeTab].goals" :key="goalIndex"
            class="text-gray-700 leading-relaxed">
            {{ goal }}
          </li>
        </div>
      </div>
    </div>
  </section>
  <ImgSlider :imagen_paquetes="imagen_paquetes"></ImgSlider>
  <EspecialistLetter></EspecialistLetter>
  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>

<style></style>