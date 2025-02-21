<script lang="ts" setup>
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import TrendingCard from '~/components/inspiration/TrendingCard.vue';
import CardPackage from '~/components/travel-packages/CardPackage.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import NavInspiration from '~/components/inspiration/NavInspiration.vue';

const articles = [
  {
    name: 'Trending',
    items: [
      {
        image: 'https://images.goway.com/production/inline-images/poland_warsaw_jewish_cemetary_ori_raynai.jpg?VersionId=qlgjfn59cpxK4CkLgb07aN4cZ7OXud3l',
        title: 'Luxury Travel Meets Local Wonder in Thailand',
        date: 'Dec 12, 2024',
        author: 'Christian Baines',
      },
      {
        image: 'https://images.goway.com/production/inline-images/poland_zbylitowska_gora_ori_raynai.jpg?VersionId=bOJDUmUtAhGPgT2QmokbhVoZZT39HA7B',
        title: '10 Reasons to Make South Africa Your First Stop on an African Vacation',
        date: 'Dec 12, 2024',
        author: 'Christian Baines',
      },
      {
        image: 'https://images.goway.com/production/inline-images/poland_majdanek_concentration_camp_ori_raynai.jpg?VersionId=9Vb0y9TW9ff8ceahw7utgGBJLDwimO6f',
        title: "It's Time to Fall in Love with Nicaragua",
        date: 'Dec 06, 2024',
        author: 'Christian Baines',
      },
      {
        image: 'https://images.goway.com/production/inline-images/laszlo_selly_ori_raynai.jpg?VersionId=tP_qZt0_3x9GO88obEymH1Fo0LDr2do7',
        title: 'Discover Fiji & the South Pacific with Award-Winning Fiji Airways',
        date: 'Nov 14, 2024',
        author: 'Sael Forster',
      },
    ]
  },
  {
    name: 'History & Culture',
    items: [
      {
        image: 'https://images.goway.com/production/inline-images/poland_warsaw_jewish_cemetary_ori_raynai.jpg?VersionId=qlgjfn59cpxK4CkLgb07aN4cZ7OXud3l',
        title: 'Luxury Travel Meets Local Wonder in Thailand',
        date: 'Dec 12, 2024',
        author: 'Christian Baines',
      },
      {
        image: 'https://images.goway.com/production/inline-images/poland_zbylitowska_gora_ori_raynai.jpg?VersionId=bOJDUmUtAhGPgT2QmokbhVoZZT39HA7B',
        title: '10 Reasons to Make South Africa Your First Stop on an African Vacation',
        date: 'Dec 12, 2024',
        author: 'Christian Baines',
      },
      {
        image: 'https://images.goway.com/production/inline-images/poland_majdanek_concentration_camp_ori_raynai.jpg?VersionId=9Vb0y9TW9ff8ceahw7utgGBJLDwimO6f',
        title: "It's Time to Fall in Love with Nicaragua",
        date: 'Dec 06, 2024',
        author: 'Christian Baines',
      },
      {
        image: 'https://images.goway.com/production/inline-images/laszlo_selly_ori_raynai.jpg?VersionId=tP_qZt0_3x9GO88obEymH1Fo0LDr2do7',
        title: 'Discover Fiji & the South Pacific with Award-Winning Fiji Airways',
        date: 'Nov 14, 2024',
        author: 'Sael Forster',
      },
    ]
  }
];

const journeys = [
  {
    imagen: "https://images.goway.com/production/inline-images/laszlo_selly_ori_raynai.jpg?VersionId=tP_qZt0_3x9GO88obEymH1Fo0LDr2do7",
    url: "",
    etiquetas: ['Journeys'],
    titulo: "Best of 2025: Up and Coming Group Travel Destinations",
    date: "Dec 12, 2024",
    author: "Christian Baines",
  },
  {
    imagen: "https://images.goway.com/production/inline-images/laszlo_selly_ori_raynai.jpg?VersionId=tP_qZt0_3x9GO88obEymH1Fo0LDr2do7",
    url: "",
    etiquetas: ['Journeys'],
    titulo: "Best of 2025: Up and Coming Group Travel Destinations",
    date: "Dec 12, 2024",
    author: "Christian Baines",
  },
  {
    imagen: "https://images.goway.com/production/inline-images/laszlo_selly_ori_raynai.jpg?VersionId=tP_qZt0_3x9GO88obEymH1Fo0LDr2do7",
    url: "",
    etiquetas: ['Journeys'],
    titulo: "Best of 2025: Up and Coming Group Travel Destinations",
    date: "Dec 12, 2024",
    author: "Christian Baines",
  },
]
</script>

<template>
  <HeaderImgNav />
  <NavInspiration></NavInspiration>
  <section class="container my-20">
    <div class="flex justify-between items-center mb-20">
      <h1 class="text-4xl font-bold font-playfair-display">Trending</h1>
      <button class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
        See All
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TrendingCard v-for="(article, index) in articles[0].items" :key="index" category="Trending"
        :image="article.image" :title="article.title" :date="article.date" :author="article.author" />
    </div>
  </section>
  <section class="container my-32">
    <div class="block border-b border-gray-200 w-full"></div>
  </section>
  <section class="container my-20">
    <div class="flex justify-between items-center mb-20">
      <h1 class="text-4xl font-bold font-playfair-display">History & Culture</h1>
      <button class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
        See All
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TrendingCard v-for="(article, index) in articles[1].items" :key="index" category="History & Culture"
        :image="article.image" :title="article.title" :date="article.date" :author="article.author" />
    </div>
  </section>
  <section class="bg-secondary bg-opacity-10">
    <div class="container">
      <div class="flex justify-between items-center mb-20">
        <h1 class="text-4xl font-bold font-playfair-display">History & Culture</h1>
        <button class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
          See All
        </button>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardPackage v-for="(packages, index) in journeys" :key="index" :packageData="packages"></CardPackage>
      </div>
    </div>
  </section>
  <Newsletter></Newsletter>
</template>