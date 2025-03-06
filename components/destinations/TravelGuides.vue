<script lang="ts" setup>
defineProps({
  travelGuides: {
    type: Array,
    required: true
  }
})

const route = useRoute()
const { $gsap } = useNuxtApp();
onMounted(() => {
  const imageDivs = document.querySelectorAll(".image-div");
  const animatedDivs = document.querySelectorAll(".animated-div");

  imageDivs.forEach((imageDiv, index) => {
    const animatedDiv = animatedDivs[index];
    if (!animatedDiv) return;

    $gsap.set(animatedDiv, { opacity: 0, y: 100 });

    const handleMouseEnter = () => {
      $gsap.to(animatedDiv, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      $gsap.to(animatedDiv, { opacity: 0, y: 100, duration: 0.5, ease: "power2.out" });
    };

    imageDiv.addEventListener("mouseenter", handleMouseEnter);
    imageDiv.addEventListener("mouseleave", handleMouseLeave);

    onBeforeUnmount(() => {
      imageDiv.removeEventListener("mouseenter", handleMouseEnter);
      imageDiv.removeEventListener("mouseleave", handleMouseLeave);
    });
  });
});
</script>
<template>
  <section class="container my-20 gap-10">
    <h1 class="text-xl font-playfair-display font-semibold mb-16">Travel Guides</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="guide in travelGuides"
        class="image-div rounded-md border overflow-hidden w-full h-full group flex-grow hover:shadow-xl hover:border-transparent transition duration-500 ease-in-out  bg-white ">
        <div class="p-6 flex flex-col space-y-4 relative overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <NuxtLink
            :to="'/destinations/' + route.params.country + '/' + route.params.region + '/travel-guides/' + guide.url"
            class="text-sm md:text-xl font-bold my-6 font-playfair-display">
            {{ guide.titulo }}
          </NuxtLink>
          <NuxtLink
            :to="'/destinations/' + route.params.country + '/' + route.params.region + '/travel-guides/' + guide.url"
            class="w-full h-24 md:h-48 relative overflow-hidden cursor-pointer rounded-md">
            <NuxtImg :src="guide.imagen_miniatura"
              class="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
            <div class="animated-div absolute bottom-4 right-4 flex bg-orange-500 space-x-2 rounded-full p-2 y-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                stroke="currentColor" class="size-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </NuxtLink>
        </div>
        <div class="flex justify-center mt-4 w-full border-t p-4">
          <NuxtLink
            :to="'/destinations/' + route.params.country + '/' + route.params.region + '/travel-guides/' + guide.url"
            class="text-xs relative after:block after:w-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-700 after:origin-left hover:after:w-full">
            Read Guide
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
<style></style>