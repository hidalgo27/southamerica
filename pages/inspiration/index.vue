<script lang="ts" setup>
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import TrendingCard from '~/components/inspiration/TrendingCard.vue';
import CardPackage from '~/components/travel-packages/CardPackage.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import NavInspiration from '~/components/inspiration/NavInspiration.vue';

import { useBlogStore } from '~/stores/blog';

const blogStore = useBlogStore();
const blogs = ref([]);
const categories = ref({
  25: 'Curiosidades',
  26: 'Cusco',
  27: 'Travel Information',
});
const header = ref({
  title: 'Inspiration',
  subTitle: 'Travel Stories, Tips, and Guides',
  url: 'https://www.goway.com/static/author-hero-bc1c42d3868a64f674a983f54bb90d51.jpeg'
})

const articles = ref({});

const getBlogs = async () => {
  const res: any = await blogStore.getBlogs();
  blogs.value = res.blogs.filter((blog: any) => blog.estado === null || blog.estado === 0);
  console.log(blogs.value);
  articles.value = blogs.value.reduce((acc: any, blog: any) => {
    const category = categories.value[blog.categoria_id];
    if (!acc[category]) {
      acc[category] = {
        name: category,
        items: [],
      };
    }
    acc[category].items.push({
      image: blog.imagen_miniatura,
      title: blog.titulo,
      date: blog.created_at,
      url: blog.url,
      author: blog.user_id.toString(),
    });
    return acc;
  }, {});

  console.log(articles.value);
};

onMounted(async () => {
  await getBlogs();
});

/* const journeys = [
  {
    imagen: "https://images.goway.com/production/inline-images/laszlo_selly_ori_raynai.jpg?VersionId=tP_qZt0_3x9GO88obEymH1Fo0LDr2do7",
    url: "best-of-2025-up-and-coming-group-travel-destinations",
    paquetes_categoria: [{
      nombre: 'Journeys',
      categoria: { url: 'journeys', }
    },],
    titulo: "Best of 2025: Up and Coming Group Travel Destinations",
    date: "Dec 12, 2024",
    author: "Christian Baines",
  },
  {
    imagen: "https://images.goway.com/production/inline-images/laszlo_selly_ori_raynai.jpg?VersionId=tP_qZt0_3x9GO88obEymH1Fo0LDr2do7",
    url: "best-of-2025-up-and-coming-group-travel-destinations",
    paquetes_categoria: [{
      nombre: 'Journeys',
      categoria: { url: 'journeys', }
    },],
    titulo: "Best of 2025: Up and Coming Group Travel Destinations",
    date: "Dec 12, 2024",
    author: "Christian Baines",
  },
  {
    imagen: "https://images.goway.com/production/inline-images/laszlo_selly_ori_raynai.jpg?VersionId=tP_qZt0_3x9GO88obEymH1Fo0LDr2do7",
    url: "best-of-2025-up-and-coming-group-travel-destinations",
    paquetes_categoria: [{
      nombre: 'Journeys',
      categoria: { url: 'journeys', }
    },],
    titulo: "Best of 2025: Up and Coming Group Travel Destinations",
    date: "Dec 12, 2024",
    author: "Christian Baines",
  },
] */
</script>

<template>
  <HeaderImgNav :header="header" />
  <!--<NavInspiration></NavInspiration>-->
  <section v-for="(category, catIndex) in articles" :key="catIndex" class="container my-20">
    <div class="flex justify-between items-center mb-20">
      <h1 class="text-4xl font-bold font-playfair-display">{{ category.name }}</h1>
      <!-- <button class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
        See All
      </button> -->
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TrendingCard v-for="(article, index) in category.items" :key="index" :category="category.name"
        :image="article.image" :title="article.title" :date="article.date" :author="article.author"
        :url="article.url" />
    </div>

    <div v-if="catIndex !== articles.length - 1" class="container my-32">
      <div class="border-b border-gray-200 w-full"></div>
    </div>
  </section>

  <!-- <section class="bg-secondary bg-opacity-10 my-20 p-20">
    <div class="container">
      <div class="flex justify-between items-center mb-20">
        <h1 class="text-4xl font-bold font-playfair-display">Journeys</h1>
        <button class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
          See All
        </button>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="journeys">
        <CardPackage v-for="(packages, index) in journeys" :key="index" :packageData="packages">
        </CardPackage>
      </div>
    </div>
  </section> -->
  <Newsletter></Newsletter>
</template>