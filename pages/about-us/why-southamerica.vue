<script lang="ts" setup>
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import TextDescription from '~/components/home/TextDescription.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import Benefits from '~/components/page/slider/Benefits.vue';
const sections = [
  {
    title: "Our Story",
    text: "We are a team of travel enthusiasts who love to explore the world and share our experiences with others. Our mission is to help you plan your next adventure and make it a memorable one. Whether you are looking for a relaxing beach vacation or an action-packed adventure, we have you covered. Our team of experts will help you find the perfect destination and create a customized itinerary that suits your needs. So why wait? Start planning your next trip with us today!",
    imgSrc: "https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Queenstown/img_HeritageQueenstown_Exterior.jpg",
    alt: "A group of people enjoying a beach vacation",
    buttonLabel: "Discover Our Story",
    url: "/our-story"
  },
  {
    title: "Why Goway",
    text: "We know a thing or two about travel at Goway. Our team of Destination Specialists have been tailoring dream vacations for nearly 55 years. We handle every part of the travel journey, from flights to tours to accommodations. Let us do the hard work so you can sit back, relax, and take in the world. Rely on personalized travel planning, elevated experiences, and legendary customer service.",
    imgSrc: "https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj",
    alt: "A group of people enjoying a beach vacation",
    buttonLabel: "Learn More",
    url: "/why-goway"
  },
  {
    title: "Careers",
    text: "Are you interested in an exciting career? Come work with us! We've spent over 50 years building a rich culture of passionate travel professionals. We accomplish this with values built upon taking care of our people, our customers and the communities in which we operate. We have remote opportunities, as well as in our offices in Toronto, Vancouver, Los Angeles, Manila, and Sydney. ",
    imgSrc: "https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Auckland_Hotel_Wing/img_HeritageAuckland_Exterior.jpg",
    alt: "A group of people enjoying a beach vacation",
    buttonLabel: "Explore Careers",
    url: "/careers"
  }
]

const destination = {
  nombre: "South America",
  descripcion: "South America is a continent of superlatives: the highest, the largest, the longest, the deepest, the remotest. Discover the continent's most iconic destinations, from the Amazon rainforest to the Andes Mountains, from the beaches of Rio de Janeiro to the glaciers of Patagonia. Whether you're looking for adventure, culture, or relaxation, South America has something for everyone.",
}
const awards = [
  {
    year: 2024,
    price: "Best Tour Operator for Australia / New Zealand / South Pacific",
    organization: 'Wave awards',
  },
  {
    year: 2023,
    price: "Best Tour Operator for Africa",
    organization: 'Wave awards',
  },
  {
    year: 2022,
    price: "Best Tour Operator for Asia",
    organization: 'Wave awards',
  },
  {
    year: 2021,
    price: "Best Tour Operator for Europe",
    organization: 'Wave awards',
  }
]

const social_responsability = [
  {
    title: 'Tourism Cares',
    text: 'We give back with Tourism Cares, the travel and tourism industry’s leading community for giving and volunteering. Our support is helping to preserve and enrich the travel experience in the US, Canada, and around the world. Together, we bring the industry’s talent, resources, and influence to help destinations in need, as well as support the next generation of travel professionals. ',
    image: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/Sydney%20Opera%20House_AdobeStock_224286843%20%283%29.jpeg?VersionId=YHodoYpc62zmfJzKE.jfp8S2TwCeaB0c&h=a5654313&itok=ZAZ56cvJ',
  },
  {
    title: 'Doctors Without Borders/Médecins Sans Frontières (MSF)',
    text: 'MSF provides emergency medical humanitarian assistance to people facing conflict, epidemics, disasters or exclusion from healthcare in more than 70 countries around the world. Goway believes travel not only enriches the lives of individuals but can also positively impact communities around the world.Through our collective partnership with MSF, your travel will directly contribute to MSF’s general emergency fund and help support people facing humanitarian crises.With every travel purchase, you will help provide MSF teams with the flexibility to respond quickly and effectively wherever people’s healthcare needs are greatest.We invite our customers to join us in our goal to promote sustainable and responsible travel while supporting a meaningful cause.',
    image: 'https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext26/image_25013_v1.jpg',
  }
]
const activeTab = ref(0)
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <TextDescription v-if="destination" :destination="destination"></TextDescription>
  <Benefits></Benefits>
  <DescriptionWithLine></DescriptionWithLine>
  <section class="container my-20 space-y-6">
    <div v-for="(section, index) in sections" :key="index"
      class="grid grid-cols-2 md:grid-rows-1 items-center justify-center bg-white h-[50vh] gap-6">
      <div class=" p-14 bg-orange-100 rounded-md justify-center w-full h-full"
        :class="index % 2 === 0 ? 'order-1' : 'order-2'">
        <h1 class="text-4xl font-bold font-playfair-display tracking-wide mb-12">{{ section.title }}</h1>
        <p class="text-lg text-gray-700 mb-12">{{ section.text }}</p>
        <NuxtLink :to="'/about-us' + section.url" class="btn-secondary hover:bg-white hover:text-gray-700"> {{
          section.buttonLabel }}
        </NuxtLink>
      </div>
      <div class="w-full h-full items-center  justify-center" :class="index % 2 === 0 ? 'order-2' : 'order-1'">
        <img :alt="section.alt" class="w-full h-full object-cover rounded-md shadow-lg" :src="section.imgSrc" />
      </div>
    </div>
  </section>
  <section class="bg-tertiary bg-opacity-30">
    <div class="container py-32 text-center">
      <div class="text-center mb-8">
        <div class="border-title mb-2 mx-auto"></div>
        <p class="mb-6 tracking-widest font-bold">
          Recognition
        </p>
        <h1 class="font-semibold text-4xl md:text-7xl mb-20 title font-playfair-display tracking-wide">
          Awards & Recognition
        </h1>
      </div>

      <div class=" w-full max-w-3xl mx-auto">
        <div v-for="(item, index) in awards" :key="index"
          class="group flex justify-between p-4  border-gray-300 border-t"
          :class="index === awards.length - 1 ? 'border-b' : ''">
          <div class="flex items-center ">
            <span class="text-gray-400 text-md md:text-lg w-8">
              {{ item.year }}
            </span>
            <span class="ml-4 text-sm md:text-lg ">
              {{ item.price }}
            </span>
          </div>
          <div>
            <span class="text-sm md:text-lg ">
              {{ item.organization }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <DescriptionWithLine></DescriptionWithLine>
  <section class="container my-20">
    <div class="flex justify-center md:space-x-6 border-b text-sm md:text-lg">
      <button v-for="(item, index) in social_responsability" :key="index" @click="activeTab = index"
        class="p-4 text-center border-b-2 transition cursor-pointer"
        :class="activeTab === index ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'">
        {{ item.title }}
      </button>
    </div>

    <div class="flex gap-6 mt-10">
      <div v-if="social_responsability[activeTab]"
        class="bg-white p-8 rounded-md grid grid-cols-1 md:grid-cols-2 gap-6 justify-between w-full">
        <div class="relative p-6 w-full rounded-md h-[50vh]">
          <img :src="social_responsability[activeTab].image" class="rounded-md  w-full h-full object-cover">
        </div>

        <div class="space-y-4">
          <h1 class="font-semibold text-4xl mb-4 font-playfair-display tracking-wide">
            {{ social_responsability[activeTab].title }}
          </h1>
          <div class="text-gray-700 leading-relaxed">
            {{ social_responsability[activeTab].text }}
          </div>
        </div>
      </div>
    </div>
  </section>
  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>

<style></style>