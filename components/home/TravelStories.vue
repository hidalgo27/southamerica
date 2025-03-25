<script lang="ts" setup>
const { $gsap } = useNuxtApp();
import { ScrollTrigger } from 'gsap/ScrollTrigger';

$gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  topBlogs: {
    type: Array,
    required: true,
  }
});

const posts = ref(props.topBlogs.map(blog => ({
  imageUrl: blog.imagen_miniatura,
  imageAlt: blog.titulo,
  title: blog.titulo,
  excerpt: blog.detalle,
  url: blog.url,
  liked: ref(false),
})));


const toggleLike = (post: any, event: MouseEvent) => {
  post.liked = !post.liked;

  const heart = event.currentTarget as HTMLElement;
  const plusOne = heart.querySelector('.plus-one') as HTMLElement;

  if (post.liked) {
    $gsap.to(heart, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });

    if (plusOne) {
      $gsap.to(plusOne, { y: -20, opacity: 1, duration: 0.5, ease: "power2.out" });
      $gsap.to(plusOne, { opacity: 0, duration: 0.5, delay: 0.5 });
      $gsap.to(plusOne, { y: 0, duration: 0 });
    }
  } else {
    $gsap.to(heart, { scale: 1, duration: 0.2 });
  }
};

onMounted(() => {
  $gsap.fromTo('.story',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      stagger: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.story',
        start: 'top 60%',
        toggleActions: 'play none none none',
      },
    }
  )
});
</script>

<template>
  <section class="container my-20">
    <div class="text-center mb-8 md:text-start">
      <h2 class="mb-6 tracking-widest font-bold">
        Get Inspired
      </h2>
      <h1 class="font-semibold text-3xl md:text-5xl mb-6 title font-playfair-display tracking-wide">
        Travel stories to inspire you.
      </h1>
      <button class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700">
        Travel Inspiration
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-if="posts" v-for="(post, index) in posts" :key="index"
        class="content-between overflow-hidden  group transition duration-500 ease-in-out h-full ">
        <div class="story">
          <NuxtLink class="overflow-hidden relative rounded-md size-96" :to="'/inspiration/' + post.url">
            <div class="w-full h-96 overflow-hidden rounded-md">
              <NuxtImg :alt="post.imageAlt"
                class="w-full h-full rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105"
                :src="post.imageUrl" loading="lazy" />
            </div>
            <span v-if="post.category"
              class=" absolute top-2 left-2 bg-white text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
              {{ post.category }}
            </span>
          </NuxtLink>
          <div class="absolute top-2 right-2 cursor-pointer" @click="toggleLike(post, $event)">
            <svg xmlns="http://www.w3.org/2000/svg" :fill="post.liked ? 'white' : 'none'" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="text-white w-8 h-8 transition-all duration-300">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span
              class="plus-one absolute top-0 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold opacity-0">
              +1
            </span>
          </div>
          <div class="flex flex-col gap-3 mt-6">
            <NuxtLink class="text-lg font-semibold " :to="'/inspiration/' + post.url">{{ post.title }}</NuxtLink>
            <p class="mb-4 h-24 overflow-hidden text-sm" v-html="post.excerpt"></p>
            <div>
              <NuxtLink
                class="relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0 "
                :to="'/inspiration/' + post.url">
                Read More
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>