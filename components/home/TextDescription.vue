<script lang="ts" setup>
import gsap from 'gsap';
const animatedDiv = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!animatedDiv.value) return;
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
  <section class="container mt-28 mb-12">
    <div class="text-center ">
      <p class="mb-6 tracking-widest font-bold">
        Trips to Africa
      </p>
      <h1 class="font-semibold text-5xl w-3/4 mx-auto mb-6 title font-playfair-display tracking-wide"> Explore Africa
        your way
        on a
        tailor-made trip with Goway
      </h1>
      <div ref="animatedDiv" class="w-1/2 mx-auto my-8">
        <p class="tracking-widest font-light">There’s a special place in our heart for Africa. Since our earliest days,
          we’ve showcased the treasures of this mighty continent, from the iconic wildlife of East Africa to the ancient
          artifcats of North Africa. An African vacation with Goway showcases not only these wonders, but also the
          underrated and startling pleasures of the continent, from the culinary scene of Southern Africa to the
          bustling cities that define the new century.</p>
      </div>
    </div>
  </section>
</template>
<style></style>