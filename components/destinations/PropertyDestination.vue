<script lang="ts" setup>
const sections = [
  {
    title: "Iconic Wildlife",
    text: "Africa is blessed with the world’s most iconic animals. Spotting a lion or giraffe at dawn in the warm light of the rising sun is a bucket list experience. But Africa is home to natural wonders beyond the savannah of East Africa. In the deep central jungles lie mountain gorillas while the southern coastlines showcase migrating whales and mighty sharks. Head on a trip to Africa to witness nature come alive in the most startling, beautiful ways.",
    imgSrc: "https://picsum.photos/400/300",
    alt: "Elephant in the savannah with a mountain in the background"
  },
  {
    title: "Majestic Mountains",
    text: "The mountains of Africa are some of the most breathtaking in the world. From the snow-capped peaks of Kilimanjaro to the rugged Drakensberg range, adventurers find solace and excitement among these towering wonders.",
    imgSrc: "https://picsum.photos/400/301",
    alt: "A majestic mountain range with clouds"
  },
  {
    title: "Vibrant Culture",
    text: "Africa is not only about wildlife and landscapes; its people, traditions, and culture add a unique flavor. From the rhythmic beats of the djembe drum to the colorful patterns of traditional fabrics, every experience tells a story.",
    imgSrc: "https://picsum.photos/400/302",
    alt: "A cultural festival with people dancing in colorful attire"
  }
];
</script>

<template>
  <section class="container my-20 space-y-2">
    <div v-for="(section, index) in sections" :key="index"
      class="flex flex-col md:flex-row items-center justify-center bg-white"
      :class="{ 'md:flex-row-reverse': index % 2 !== 0 }">
      <div class="md:w-1/2 p-6">
        <h1 class="text-4xl font-bold font-playfair-display tracking-wide mb-12">{{ section.title }}</h1>
        <p class="text-lg text-gray-700">{{ section.text }}</p>
      </div>
      <div class="md:w-1/2 h-full p-2">
        <img :alt="section.alt" class="w-full h-full rounded-lg shadow-lg" :src="section.imgSrc" />
      </div>
    </div>
  </section>
</template>
<style></style>