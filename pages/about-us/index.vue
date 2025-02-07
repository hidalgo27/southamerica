<script lang="ts" setup>
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

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
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <section class="container my-20 space-y-6">
    <div v-for="(section, index) in sections" :key="index"
      class="grid grid-cols-2 md:grid-rows-1 items-center justify-center bg-white h-[50vh] gap-6">
      <div class=" p-14 bg-gray-100 rounded-md justify-center w-full h-full"
        :class="index % 2 === 0 ? 'order-1' : 'order-2'">
        <h1 class="text-4xl font-bold font-playfair-display tracking-wide mb-12">{{ section.title }}</h1>
        <p class="text-lg text-gray-700 mb-12">{{ section.text }}</p>
        <NuxtLink :to="'/about-us' + section.url" class="btn-ternary  hover:bg-white hover:text-gray-700"> {{
          section.buttonLabel }}
        </NuxtLink>
      </div>
      <div class="w-full h-full items-center  justify-center" :class="index % 2 === 0 ? 'order-2' : 'order-1'">
        <img :alt="section.alt" class="w-full h-full object-cover rounded-md shadow-lg" :src="section.imgSrc" />
      </div>
    </div>
  </section>
  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>
<style></style>