<script lang="ts" setup>
const { $gsap } = useNuxtApp();
import { ScrollTrigger } from 'gsap/ScrollTrigger';

$gsap.registerPlugin(ScrollTrigger);
const posts = ref([
  {
    imageUrl: 'https://images.goway.com/production/styles/run_of_site_ad_3xl/s3/trip_level_ad/portugal_porto_tourist_AdobeStock_178862016.jpeg?VersionId=qnpeclJigVYnXDYm1k_1teCzeyut0dfk&itok=ovtj3gJT',
    imageAlt: 'A delicious dish with a wooden background',
    category: 'Food & Drink',
    title: "Prague's Culinary Renaissance",
    excerpt: "People gravitate to Prague for its enchanting cobblestone streets flanked by stunning Baroque and Gothic buildings and for its palate-pleasing...",
    liked: ref(false),
  },
  {
    imageUrl: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/Sydney%20Opera%20House_AdobeStock_224286843%20%283%29.jpeg?VersionId=YHodoYpc62zmfJzKE.jfp8S2TwCeaB0c&h=a5654313&itok=ZAZ56cvJ',
    imageAlt: 'An elderly woman looking thoughtful',
    category: 'Wellness',
    title: 'The Blue Zone Blueprint',
    excerpt: 'American longevity researcher Dan Buettner uses the term “Blue Zone” to define five regions worldwide where people live the longest,...',
    liked: ref(false),
  },
  {
    imageUrl: 'https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj',
    imageAlt: 'A group of people on bicycles with a scenic background',
    category: 'Journeys',
    title: 'Best of 2025: Up and Coming Group Travel Destinations',
    excerpt: 'Welcome to 2025—a new year brimming with exciting possibilities and new travel potential! This is the perfect time to set...',
    liked: ref(false),
  }
])

const toggleLike = (post: any, event: MouseEvent) => {
  post.liked = !post.liked;

  const heart = event.currentTarget as HTMLElement;

  if (post.liked) {
    $gsap.to(heart, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
    $gsap.to('.plus-one', { y: -20, opacity: 1, duration: 0.5, ease: "power2.out" });
    $gsap.to('.plus-one', { opacity: 0, duration: 0.5, delay: 0.5 });
    $gsap.to('.plus-one', { y: 0, duration: 0 });
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
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.story',
        start: 'top 80%',
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
      <div v-for="(post, index) in posts" :key="index"
        class="content-between overflow-hidden rounded-md group cursor-pointer transition duration-500 ease-in-out h-full ">
        <div class="story">
          <div class="overflow-hidden relative rounded-md ">
            <img :alt="post.imageAlt"
              class="w-full h-80 rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105"
              :src="post.imageUrl" />
            <span class="absolute top-2 left-2 bg-white text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
              {{ post.category }}
            </span>
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
          </div>
          <div class="pt-4">
            <h3 class="text-lg font-semibold mb-2">{{ post.title }}</h3>
            <p class="mb-4">{{ post.excerpt }}</p>
            <a class=" relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0 "
              href="#">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>