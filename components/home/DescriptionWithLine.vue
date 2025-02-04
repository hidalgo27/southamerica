<script lang="ts" setup>
import gsap from 'gsap';

const animatedDiv = ref<HTMLElement | null>(null);
const animatedPath = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!animatedPath.value || !animatedDiv.value) return;
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.from(entry.target, {
            y: 100,
            opacity: 0,
            duration: 2,
            ease: "power2.out",
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(animatedDiv.value);
});
</script>
<template>
  <section class="container my-20">
    <svg class="absolute right-0 w-1/4 overflow-visible" viewBox="0 0 400 200">
      <path ref="animatedPath" d="M-50,100 C100,150 200,0 400,0" stroke="#333" stroke-width="0.5" fill="none"
        stroke-dasharray="1,5" stroke-linecap="round" />
    </svg>

    <div class="text-center ">
      <div class="border-title mb-2 mx-auto"></div>
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide"> Why South America Company?</h1>
      <div ref="animatedDiv" class="w-1/2 mx-auto my-8">
        <p class="tracking-widest font-light">At South America Company, we specialize in tailor-made trips that
          immortalize the best days exploring Peru and South America. Every detail is meticulously designed to offer the
          maximum comfort, exclusivity, and luxury. From private villas and luxury cruises to customized itineraries, we
          make sure you only worry about enjoying your luxury vacation.</p>
      </div>
    </div>
  </section>
</template>
<style></style>