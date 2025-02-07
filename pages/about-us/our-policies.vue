<script lang="ts" setup>
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
const sections = [
  {
    title: "Consumer Protection Plans",
    text: "When the unthinkable happens, you’re covered by Goway’s various consumer protection plans and programs across Canada and the United States. Rest easy when your travel.",
    imgSrc: "https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Queenstown/img_HeritageQueenstown_Exterior.jpg",
    alt: "A group of people enjoying a beach vacation",
    buttonLabel: "Read More",
    url: "#"
  },
  {
    title: "Terms and Conditions",
    text: "It’s never fun reading the fine print, but we’ve got the full legal details of booking with Goway that will keep you informed and offer you peace of mind.",
    imgSrc: "https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj",
    alt: "A group of people enjoying a beach vacation",
    buttonLabel: "Read More",
    url: "#"
  },
  {
    title: "Privacy Policy",
    text: "Your data is safe with us whether you’re browsing our website or subscribing to our newsletters. Keep informed about how Goway uses your data and protects your privacy. ",
    imgSrc: "https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj",
    alt: "A group of people enjoying a beach vacation",
    buttonLabel: "Read More",
    url: "#"
  },
  {
    title: "Commitment to Accessibility",
    text: "We strive to provide a website that is accessible for travellers from all walks of life. Learn more about the steps we’re actively taking to help share our love of travel with as wide a community as possible.",
    imgSrc: "https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Auckland_Hotel_Wing/img_HeritageAuckland_Exterior.jpg",
    alt: "A group of people enjoying a beach vacation",
    buttonLabel: "Read More",
    url: "#"
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