<script lang="ts" setup>
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
const { $gsap } = useNuxtApp();
$gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const scrollToTop = () => {
  $gsap.to(window, {
    scrollTo: { y: 0, autoKill: true }, // Vuelve al inicio de la página
    duration: 1,
    ease: "power3.inOut",
  });
};

const handleScroll = () => {
  const shouldBeVisible = window.scrollY > 50;
  $gsap.to('.button-float', {
    opacity: shouldBeVisible ? 1 : 0,
    duration: 0.5,
    ease: 'power3.out',
  });
};

onMounted(() => {
  if (window.scrollY < 50) {
    $gsap.set('.button-float', { opacity: 0, scale: 0 });
  }
  window.addEventListener("scroll", handleScroll);
});
</script>
<template>
  <button @click="scrollToTop"
    class="button-float fixed bottom-5 left-6 md:left-12 lg:left-1/2 md:transform md:-translate-x-1/2 bg-orange-100 border-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-orange-200 transition-all z-10">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
      class="size-6 text-gray-400">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
    </svg>
  </button>
</template>