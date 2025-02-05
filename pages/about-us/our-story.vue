<script lang="ts" setup>
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import ImgSlider from '~/components/travel-packages/ImgSlider.vue';

const timeline = [
  {
    year: 1970,
    goals: [
      'Bruce Hodge founded Goway Travel in Toronto.',
      'Bruce worked evenings in a peanut butter factory to make cash flow and grew the company to promote European Camping Tours for 18 to 30-somethings, Adventures in Australia, and Overland Expeditions across Asia and Africa.',
      'By the late 70s, Goway had become a pioneer operator of overland camping tours across the Americas',

    ],
    image: 'https://picsum.photos/400/300'
  },
  {
    year: 1980,
    goals: [
      'Goway established itself as a global influence.',
      'The travel industry endured major challenges, but our strong foundations allowed Goway to forge ahead.',
      'We continually innovated, invested in new technology, and challenged the status quo.',
      'Bruce’s wife, son, and daughter have played key roles in our growth.'
    ],
    image: 'https://picsum.photos/400/300'
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
    image: 'https://picsum.photos/400/300'
  },
  {
    year: 2000,
    goals: [
      'Goway Travel was founded in Toronto in 1970 by Bruce Hodge, a young Australian economist who moved to Canada to follow his dreams.',
      'He forged a passion for travel during a short stint as a tour guide in England.',
      'Bruce worked evenings in a peanut butter factory to make cash flow and grew the company to promote European Camping Tours for 18 to 30-somethings, Adventures in Australia, and Overland Expeditions across Asia and Africa.',
      'By the late 70s, Goway had become a pioneer operator of overland camping tours across the Americas',
    ],
    image: 'https://picsum.photos/400/300'
  },
  {
    year: 2010,
    goals: [
      'Goway Travel was founded in Toronto in 1970 by Bruce Hodge, a young Australian economist who moved to Canada to follow his dreams.',
      'He forged a passion for travel during a short stint as a tour guide in England.',
      'Bruce worked evenings in a peanut butter factory to make cash flow and grew the company to promote European Camping Tours for 18 to 30-somethings, Adventures in Australia, and Overland Expeditions across Asia and Africa.',
      'By the late 70s, Goway had become a pioneer operator of overland camping tours across the Americas',
    ],
    image: 'https://picsum.photos/400/300'
  },
  {
    year: 2020,
    goals: [
      'Goway Travel was founded in Toronto in 1970 by Bruce Hodge, a young Australian economist who moved to Canada to follow his dreams.',
      'He forged a passion for travel during a short stint as a tour guide in England.',
      'Bruce worked evenings in a peanut butter factory to make cash flow and grew the company to promote European Camping Tours for 18 to 30-somethings, Adventures in Australia, and Overland Expeditions across Asia and Africa.',
      'By the late 70s, Goway had become a pioneer operator of overland camping tours across the Americas',
    ],
    image: 'https://picsum.photos/400/300'
  }
]
const activeTab = ref(0)
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
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

          <p class="text-gray-600 mb-8">When I started this journey back in 1970, Goway was a one-man company operating
            out of a small apartment in
            Toronto. Today, we have over 600 team members working across three continents. We’re also marking an
            exciting new chapter for Goway with a completely new look, and an incredible new goway.com to serve you
            better.</p>
          <p class="text-gray-600 mb-8">Consider this website your window into the world. As you explore its pages,
            you’ll discover inspirational
            stories, expert advice, and unforgettable trip ideas to over 100 countries worldwide.</p>

          <p class="text-gray-600 mb-8">Remember that every Goway vacation is tailor-made. Join us on this new journey,
            and when you’re ready for
            your own adventure, get in touch. We’d love to help turn your travel dreams into reality.</p>

          <p class="text-gray-600 ">Sincerely,</p>
          <p class="text-gray-600 ">Bruce Hodge</p>
          <p class="text-gray-600 ">Founder & President</p>
        </div>
        <div class="relative w-full rounded-md h-full">
          <img class="w-full h-full object-cover rounded-md" src="https://picsum.photos/400/300" />
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
        A Timeline of Goway
      </h1>
      <p class="text-md mb-6">Goway Travel was founded in Toronto in 1970 by Bruce Hodge, a young Australian economist
        who moved to Canada to
        follow his dreams. He forged a passion for travel during a short stint as a tour guide in England. </p>
      <p class="text-md mb-6">
        Bruce worked evenings in a peanut butter factory to make cash flow and grew the company to promote European
        Camping Tours for 18 to 30-somethings, Adventures in Australia, and Overland Expeditions across Asia and Africa.
        By the late 70s, Goway had become a pioneer operator of overland camping tours across the Americas, providing
        “Young Adult Adventures.”
      </p>
      <p class="text-md mb-6">
        In the following decades, we have established ourselves as a global influence. While the travel industry endured
        major challenges, our strong foundations allowed Goway to forge ahead. We continually innovated, invested in new
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
        class="bg-white p-8 rounded-md grid grid-cols-1 md:grid-cols-2 gap-6 justify-between w-full">
        <div class="relative p-6 w-full rounded-md h-full">
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

  <ImgSlider></ImgSlider>
  <EspecialistLetter></EspecialistLetter>
  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>

<style></style>