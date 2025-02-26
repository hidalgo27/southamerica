<script lang="ts" setup>
import { ScrollTrigger } from "gsap/ScrollTrigger";
const { $gsap } = useNuxtApp();

$gsap.registerPlugin(ScrollTrigger);

defineProps({
  textDescription: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  $gsap.fromTo('.animatedDiv',
    {
      opacity: 0, y: 50,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.animatedDiv',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
});
</script>
<template>
  <section class="container mt-28 mb-12">
    <div class="text-center">
      <p class="mb-6 tracking-widest font-bold">
        {{ textDescription.minititle }}
      </p>
      <h1 class="font-semibold text-4xl w-3/4 mx-auto mb-6 title font-playfair-display tracking-wide">
        {{ textDescription.title }}
      </h1>
      <div class=" w-2/3 mx-auto my-8">
        <div class="animatedDiv" v-html="textDescription.description"></div>
      </div>
    </div>
  </section>
</template>
<style></style>