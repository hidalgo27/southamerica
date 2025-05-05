<script lang="ts" setup>
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import TravelStories from '~/components/home/TravelStories.vue';
import HeaderBlog from '~/components/inspiration/HeaderBlog.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

import { useBlogStore } from '~/stores/blog';

const blogStore = useBlogStore();
const blog = ref();
const topBlogs = ref([]);
const route = useRoute();

const getBlog = async () => {
  const res: any = await blogStore.getBlog(route.params.blog as string);
  blog.value = res[0];
  console.log(blog);
};

const getBlogs = async () => {
  const res: any = await blogStore.getBlogs();
  topBlogs.value = res.blogs.filter((blog: any) => blog.estado == null || blog.estado === 0).slice(0, 3);
};

onMounted(async () => {
  await getBlog();
  await getBlogs();
})
</script>
<template>
  <HeaderBlog v-if="blog" :blog="blog"></HeaderBlog>
  <section class="container my-20 text-sm">
    <div class="lg:w-2/3 mx-auto justify-center gap-6 flex-col flex" v-html="blog?.detalle">
    </div>
    <hr class="my-12 border-gray-300">
    <!-- <div class="flex flex-wrap justify-center items-center gap-2 text-gray-600 text-xs">
      <span class="text-gray-500">Related Topics</span>
      <button class="px-3 py-1 border rounded-full hover:bg-gray-200 transition">
        History & Culture
      </button>
      <button class="flex items-center px-3 py-1 border rounded-full hover:bg-gray-200 transition">
        <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 2C7.03 2 3 6.03 3 11c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 14a5 5 0 110-10 5 5 0 010 10z" />
        </svg>
        Perú
      </button>
      <button class="flex items-center px-3 py-1 border rounded-full hover:bg-gray-200 transition">
        <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 2C7.03 2 3 6.03 3 11c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 14a5 5 0 110-10 5 5 0 010 10z" />
        </svg>
        Cusco
      </button>
    </div> -->
  </section>
  <!-- <section class="bg-secondary bg-opacity-20 rounded-md p-6 flex items-center container w-2/3">
    Imagen del autor
    <div class="w-full p-6 flex justify-center">
      <NuxtImg
        src="https://images.goway.com/production/styles/author_photo_3xl/s3/author/ChristianBaines.png?h=d0e75635&itok=GSLQupow/author.png"
        alt="Christian Baines" class="w-2/3" />
    </div>

    Información del autor
    <div class="ml-6 gap-6 flex flex-col p-6">
      <h2 class="text-2xl font-bold font-playfair-display">Christian Baines</h2>
      <p class="text-sm text-gray-600">SouthAmerica - Contributing Writer</p>
      <p class="text-sm text-gray-700 mt-2">
        Christian’s first globetrotting adventure saw him get lost exploring the streets of Saigon.
        Following his nose to Asia’s best coffee, two lifelong addictions were born. A freelance writer
        and novelist, Christian’s travels have since taken him around his native Australia, Asia, Europe,
        and much of North America. His favourite trips have been through Japan, Spain, and Brazil, though
        with a love of off-beat, artsy cities, he’ll seize any opportunity to return to Paris, New York, or Berlin.
      </p>

      <div class="mt-4 flex items-center">
        <a href="#"
          class="text-sm relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0">
          Read More
        </a>
      </div>
    </div>
  </section> -->
  <TravelStories v-if="topBlogs.length > 0" :topBlogs="topBlogs"></TravelStories>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>