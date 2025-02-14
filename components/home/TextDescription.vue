<script lang="ts" setup>
const { $gsap } = useNuxtApp();
const animatedDiv = ref<HTMLElement | null>(null);

const props = defineProps({
  destination: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  if (!animatedDiv.value) return;
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $gsap.from(entry.target, {
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
        Trips to {{ destination.nombre }}
      </p>
      <h1 class="font-semibold text-4xl w-3/4 mx-auto mb-6 title font-playfair-display tracking-wide">
        Explore {{ destination.nombre }} your way on a tailor-made trip with SouthAmerica
      </h1>
      <div ref="animatedDiv" class="w-2/3 mx-auto my-8">
        <div v-html="destination.descripcion"></div>
      </div>
    </div>
  </section>
</template>
<style></style>