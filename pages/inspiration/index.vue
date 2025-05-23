<script lang="ts" setup>
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';
import TrendingCard from '~/components/inspiration/TrendingCard.vue';
import CardPackage from '~/components/travel-packages/CardPackage.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import NavInspiration from '~/components/inspiration/NavInspiration.vue';

import { useBlogStore } from '~/stores/blog';

const blogStore = useBlogStore();
const blogs = ref([]);
// const categories = ref({
//   25: 'Curiosidades',
//   26: 'Cusco',
//   27: 'Travel Information',
// });
const header = ref({
  title: 'South America Journal',
  subTitle: 'Travel Stories, Tips, and Guides',
  url: 'images/banners/inspiration_banner.webp'
})
const text = ref(
  {
    title: 'Breathe South America',
    description: "A journey of discovery, where every breath you take is filled with the essence of South America. From the Amazon to Patagonia, we’ll guide you through the continent's untold stories, incredible landscapes, and hidden gems. Step into the rhythm of South America, where each experience is designed to ignite your passion for travel."
  }
)

const articles = ref([]);

const getBlogs = async () => {
  const res: any = await blogStore.getBlogs();
  articles.value = res.blogs
    .filter((blog: any) => blog.estado === null || blog.estado === 0)
    .map((blog: any) => ({
      image: blog.imagen_miniatura,
      title: blog.titulo,
      date: blog.created_at,
      url: blog.url,
      author: blog.user_id.toString(),
      excerpt: blog.detalle || '', // si tienes resumen, inclúyelo
    }));

  // console.log(articles.value);
  // articles.value = blogs.value.reduce((acc: any, blog: any) => {
  //   const category = categories.value[blog.categoria_id];
  //   if (!acc[category]) {
  //     acc[category] = {
  //       name: category,
  //       items: [],
  //     };
  //   }
  //   acc[category].items.push({
  //     image: blog.imagen_miniatura,
  //     title: blog.titulo,
  //     date: blog.created_at,
  //     url: blog.url,
  //     author: blog.user_id.toString(),
  //   });
  //   return acc;
  // }, {});

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
  <DescriptionWithLine :text="text" :line="1"></DescriptionWithLine>
  <!--<NavInspiration></NavInspiration>-->
  <section class="container my-20 space-y-32">
    <div v-for="(article, index) in articles" :key="index" class="flex items-center justify-center">
      <div class="grid grid-cols-1 md:grid-cols-2 bg-white w-full gap-6">

        <!-- Contenido -->
        <div class="bg-gray-100 bg-opacity-100 p-6 rounded-md flex flex-col justify-end h-full" :class="{
          'md:order-1': index % 2 === 0,
          'md:order-2': index % 2 !== 0
        }">
          <!-- <div class="text-gray-500 text-sm md:text-base">
            Por {{ article.author }} — {{ article.date }}
          </div> -->
          <!-- <div class="border-y-2 my-6"></div> -->
          <h1 class="font-semibold text-3xl lg:text-5xl my-6 font-playfair-display tracking-wide">
            {{ article.title }}
          </h1>
          <!-- <div class="text-base md:text-lg text-gray-600">
            {{ article.excerpt || 'Resumen no disponible.' }}
          </div> -->
          <p class="mb-4 h-24 overflow-hidden text-sm" v-html="article.excerpt"></p>
          <NuxtLink :to="'/inspiration/' + article.url"
            class="btn-ternary mt-6 py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700 w-fit">
            Read More
          </NuxtLink>
        </div>

        <!-- Imagen -->
        <div class="relative w-full rounded-md h-[60vh]" :class="{
          'order-2': index % 2 === 0,
          'order-1': index % 2 !== 0
        }">
          <NuxtImg :alt="article.title" class="w-full h-full object-cover rounded-md shadow-lg" :src="article.image" />
        </div>
      </div>
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