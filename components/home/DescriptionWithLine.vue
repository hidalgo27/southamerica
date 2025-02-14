<script lang="ts" setup>
import { ref, onMounted } from "vue";
const { $gsap } = useNuxtApp();
import { ScrollTrigger } from "gsap/ScrollTrigger";

$gsap.registerPlugin(ScrollTrigger);

defineProps({
  text: {
    type: Object,
    required: true,
  },
});

const animatedSvg = ref<HTMLElement | null>(null);
const animatedDiv = ref<HTMLElement | null>(null);

onMounted(() => {
  if (animatedSvg.value) {
    // Animación de aparición progresiva de derecha a izquierda
    $gsap.fromTo(
      animatedSvg.value,
      {
        clipPath: "inset(0% 0% 0% 100%)" // Inicia oculto a la derecha
      },
      {
        clipPath: "inset(0% 0% 0% 0%)", // Se muestra completamente
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: animatedSvg.value,
          start: "top 80%",
          end: "top 0%", // Ajusta según sea necesario
          scrub: true,
        },
      }
    );

    $gsap.to(animatedSvg.value, {
      clipPath: "none",
      scrollTrigger: {
        trigger: animatedSvg.value.querySelector("g"),
        start: "top 50%",
        end: "top 30%",
        toggleActions: "play none none reverse",
        scrub: true,
      },
    });
  }

  if (animatedDiv.value) {
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
  }
});
</script>

<template>
  <section class="container my-20">
    <svg ref="animatedSvg" class="absolute right-0 w-1/4 overflow-visible" viewBox="0 0 400 200">
      <path d="M400,0 C200,0 150,150 30,160" stroke="#333" stroke-width="0.5" fill="none" stroke-dasharray="1,5"
        stroke-linecap="round" />
      <g>
        <path
          d="M53.2705 173.306C48.8573 185.805 35.1476 192.359 22.649 187.946C10.1505 183.533 3.59599 169.823 8.00919 157.325C12.4224 144.826 26.1321 138.272 38.6307 142.685C51.1292 147.098 57.6837 160.808 53.2705 173.306Z"
          fill="#FDEEE9" fill-opacity="1"></path>
        <path
          d="M34.4116 166.647C33.6761 168.731 31.3911 169.823 29.3081 169.087C27.225 168.352 26.1325 166.067 26.8681 163.984C27.6036 161.901 29.8886 160.808 31.9717 161.544C34.0548 162.279 35.1472 164.564 34.4116 166.647Z"
          fill="#F05B2A"></path>
      </g>
    </svg>

    <div class="text-center">
      <div class="border-title mb-2 mx-auto"></div>
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">{{ text.title }}</h1>
      <div class="w-2/3 mx-auto my-8" ref="animatedDiv">
        <p class="tracking-widest font-light">{{ text.description }}</p>
      </div>
    </div>
  </section>
</template>
