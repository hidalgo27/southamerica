<script lang="ts" setup>
const { $gsap } = useNuxtApp();
import { ScrollTrigger } from "gsap/ScrollTrigger";

$gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  text: {
    type: Object,
    required: true,
  },
  line: {
    type: Number,
    default: false,
  }
});

onMounted(async () => {
  await nextTick();
  if (props.line === 1) {
    $gsap.fromTo(
      '.animatedSvg',
      {
        clipPath: "inset(0% 0% 0% 100%)"
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.animatedSvg',
          start: "top 80%",
          end: "top 0%",
          scrub: true,
        },
      }
    );

    $gsap.fromTo('.g-svg',
      { opacity: 0, }
      , {
        opacity: 1,
        scrollTrigger: {
          trigger: '.g-svg',
          start: "top 50%",
          end: "top 0%",
          toggleActions: "play none none reverse",
          scrub: true,
        },
      });
  }

  if (props.line === 2) {
    {
      $gsap.fromTo(
        '.animatedSvgDown',
        {
          clipPath: "inset(0% 0% 100% 0%)"
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.animatedSvgDown',
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      $gsap.fromTo('.g-svg-down',
        { opacity: 0, }
        , {
          opacity: 1,
          scrollTrigger: {
            trigger: '.g-svg-down',
            start: "top 60%",
            end: "top 0%",
            toggleActions: "play none none reverse",
            scrub: true,
          },
        });
    }
  }

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
  <section class="container my-20">
    <svg v-if="line === 1" class="absolute right-0 hidden md:flex md:w-1/3 lg:w-1/4 overflow-visible"
      viewBox="0 0 400 200">
      <path d="M400,0 C200,0 150,150 30,160" stroke="#333" stroke-width="0.5" fill="none" stroke-dasharray="1,5"
        stroke-linecap="round" class="animatedSvg" />
      <g class="g-svg">
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
      <div class="w-2/3 mx-auto my-8 animatedDiv">
        <p class="tracking-widest font-light">{{ text.description }}</p>
      </div>
    </div>
    <svg v-if="line === 2" class="mx-auto hidden md:flex md:w-1/3 lg:w-1/4 my-16" viewBox="0 0 400 200">
      <line x1="200" y1="143" x2="200" y2="1" stroke="#F05B2A" stroke-width="2" stroke-linecap="round"
        stroke-dasharray="0.1 10" class="animatedSvgDown"></line>
      <g class="g-svg-down">
        <circle cx="200" cy="170.765" r="24" transform="rotate(180 200 170.765)" fill="#FDEEE9" fill-opacity="0.4">
        </circle>
        <circle cx="200" cy="171.104" r="4" transform="rotate(180 200 171.104)" fill="#F05B2A"></circle>
      </g>
    </svg>
  </section>
</template>
