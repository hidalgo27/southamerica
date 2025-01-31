<script lang="ts" setup>
import gsap from 'gsap';
const sectionRef = ref<HTMLElement | null>(null);
const posts = ref([
  {
    imageUrl: 'https://picsum.photos/400/300',
    imageAlt: 'A delicious dish with a wooden background',
    category: 'Food & Drink',
    title: "Prague's Culinary Renaissance",
    excerpt: "People gravitate to Prague for its enchanting cobblestone streets flanked by stunning Baroque and Gothic buildings and for its palate-pleasing..."
  },
  {
    imageUrl: 'https://picsum.photos/400/300',
    imageAlt: 'An elderly woman looking thoughtful',
    category: 'Wellness',
    title: 'The Blue Zone Blueprint',
    excerpt: 'American longevity researcher Dan Buettner uses the term “Blue Zone” to define five regions worldwide where people live the longest,...'
  },
  {
    imageUrl: 'https://picsum.photos/400/300',
    imageAlt: 'A group of people on bicycles with a scenic background',
    category: 'Journeys',
    title: 'Best of 2025: Up and Coming Group Travel Destinations',
    excerpt: 'Welcome to 2025—a new year brimming with exciting possibilities and new travel potential! This is the perfect time to set...'
  }
])

onMounted(() => {
  if (!sectionRef.value) return;
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.from('.slide', {
            y: 100,
            opacity: 0,
            duration: 2,
            ease: "power2.out",
            stagger: 0.3,
          });
          observer.unobserve(entry.target);
        }
      });
    },
  );

  observer.observe(sectionRef.value);
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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref="sectionRef">
      <div v-for="(post, index) in posts" :key="index"
        class="content-between overflow-hidden rounded-md group cursor-pointer transition duration-500 ease-in-out h-full ">
        <div class="slide">
          <div class="overflow-hidden relative rounded-md ">
            <img :alt="post.imageAlt"
              class="w-full h-80 rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105"
              :src="post.imageUrl" />
            <span class="absolute top-2 left-2 bg-white text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
              {{ post.category }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="absolute top-2 right-2 text-white w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
          <div class="pt-4">
            <h3 class="text-lg font-semibold mb-2">{{ post.title }}</h3>
            <p class="mb-4">{{ post.excerpt }}</p>
            <div class="group">
              <a class="font-semibold" href="#">
                Read More
              </a>
              <div class="border border-primary mt-1 w-20 transition-all duration-700 ease-in-out group-hover:w-0">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>