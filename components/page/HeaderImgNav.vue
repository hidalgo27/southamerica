<script lang="ts" setup>
const { $gsap } = useNuxtApp();
import { ScrollTrigger } from 'gsap/ScrollTrigger';

$gsap.registerPlugin(ScrollTrigger);
const route = useRoute();
const breadcrumbs = route.path
  .split('/')
  .filter(Boolean)
  .map((segment, index, array) => {
    return {
      name: segment.replace(/-/g, ' '),
      path: '/' + array.slice(0, index + 1).join('/'),
      isActive: index === array.length - 1,
    };
  });

const props = defineProps({
  packageDetail: {
    type: Array,
    required: false,
  },
  header: {
    type: Object,
    required: false,
  }
});

const loading = ref(true)
const video = ref()
const { onLoaded } = useScriptVimeoPlayer()

let player: any
onMounted(async () => {
  onLoaded(({ Vimeo }) => {
    player = new Vimeo.Player(video.value, {
      id: 1028540009,
      autoplay: true,
      loop: true,
      controls: false,
      muted: true
    })
    player.on('loaded', () => {
      loading.value = false
    })
  })
});

const liked = ref(false)

const toggleLike = (event: { currentTarget: any; }) => {
  liked.value = !liked.value;

  const heart = event.currentTarget;

  if (liked.value) {
    $gsap.to(heart, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
    $gsap.to('.plus-one', { y: -20, opacity: 1, duration: 0.5, ease: "power3.out" });
    $gsap.to('.plus-one', { opacity: 0, duration: 0.5, delay: 0.5 });
    $gsap.to('.plus-one', { y: 0, duration: 0 });
  } else {
    $gsap.to(heart, { scale: 1, duration: 0.2 });
  }
};

const defaultHeader = {
  miniTitle: "",
  title: "Design Your SouthAmerica Discovery.",
  subTitle: "Explore the world in just the way you want.",
  url: "", // Puede ser una imagen o un video
};

const computedHeader = computed(() => props.header || defaultHeader);
</script>

<template>
  <section>
    <div class="relative w-full h-[85vh] md:h-screen">
      <div class="overflow-hidden h-full relative ">
        <div class="mask gradient-cicle-gray items-center flex justify-center -z-20">
          <div v-if="loading" class="mt-40 text-center">
            Cargando ..
          </div>
        </div>
        <NuxtImg v-if="computedHeader.url" :src="computedHeader.url" alt="Header Image"
          class="absolute inset-0 w-full h-full object-cover " />
        <div v-else v-show="!loading" ref="video" class="vimeo-wrapper"></div>
        <div class="relative z-10 flex items-center w-full h-full text-center">
          <nav class="absolute top-0 md:top-40 left-0 text-gray-50 text-md p-4 backdrop-blur-md rounded-md">
            <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
            <span v-if="breadcrumbs.length"> / </span>
            <span v-for="(crumb, index) in breadcrumbs" :key="index">
              <span v-if="crumb.isActive" class="cursor-default capitalize">{{ crumb.name }}</span>
              <NuxtLink v-else :to="crumb.path" class="hover:underline capitalize">
                {{ crumb.name }}
              </NuxtLink>
              <span v-if="index < breadcrumbs.length - 1"> / </span>
            </span>
          </nav>
          <div v-if="!packageDetail" class="container">
            <p class="text-white text-md 2xl:text-xl mb-8">
              {{ computedHeader.miniTitle }}
            </p>
            <h1
              class="text-white/80 drop-shadow-[0_0_1px_rgba(255,255,255,0.5)] leading-tight text-5xl lg:text-7xl 2xl:text-8xl tracking-wide font-semibold font-playfair-display">
              {{ computedHeader.title }}</h1>
            <p class="text-white text-xl 2xl:text-3xl font-playfair-display font-bold tracking-wide mt-5 ">
              {{ computedHeader.subTitle }}
            </p>
          </div>
          <div v-else
            class="container absolute bottom-10 left-4 md:left-10 w-11/12 md:w-2/3 lg:w-1/3 2xl:w-1/4 bg-blue-800/60 text-white p-4 rounded-md shadow-lg"
            v-for="paquete in packageDetail">
            <div class="flex justify-between items-center border-gray-100 border-b">
              <div class="items-center rounded flex flex-wrap gap-2 py-4 text-start">
                <span v-if="paquete.offers_home"
                  class="bg-white text-secondary text-xs font-semibold px-2 py-1 rounded-full ">
                  Specials
                </span>
                <NuxtLink v-for="(region, i) in paquete.paquetes_destinos"
                  :to="/destinations/ + region.destinos.pais.url + '/' + region.destinos.url"
                  class="bg-blue-800 text-white text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap"
                  :key="i">
                  {{ region.destinos.nombre }}
                </NuxtLink>
              </div>
              <div class="top-2 right-2 cursor-pointer" @click="toggleLike($event)">
                <svg xmlns="http://www.w3.org/2000/svg" :fill="liked ? 'white' : 'none'" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" class="text-white size-6 transition-all duration-300">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <span
                  class="plus-one absolute top-0 -right-1.5 transform -translate-x-1/2 text-white text-sm font-bold opacity-0">
                  +1
                </span>
              </div>
            </div>
            <div class="text-white">
              <p v-if="paquete.reserva" class="text-gray-500 my-6 flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6 text-secondary">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span class="ml-2"> Book by {{ paquete.reserva }}</span>
              </p>
              <h2 class="text-start text-white text-2xl font-bold mb-4 font-playfair-display py-12">{{ paquete.titulo }}
              </h2>
              <div class="flex text-start items-center border-t pt-4 text-sm">
                <div v-if="paquete.duracion" class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6 md:size-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span>{{ paquete.duracion }} days</span>
                </div>
                <div v-else-if="paquete.timeRead" class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6 md:size-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>{{ paquete.timeRead }} min read</span>
                </div>
                <div class="block border-l border-gray-200 h-12 mx-4 md:mx-6"></div>
                <div v-if="paquete.precio_paquetes?.[0]" class="text-start flex justify-between items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6 md:size-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                  </svg>
                  <div v-if="paquete.precio_paquetes?.[0]?.precio_d" class="flex">
                    <span class="block mr-2">
                      From <span> US${{ paquete.precio_paquetes[0].precio_d }}</span>
                    </span>
                    <span v-if="paquete.ahorro" class="block">
                      savings <span>US$ {{ paquete.ahorro }}</span>
                    </span>
                  </div>
                </div>
                <span v-else-if="paquete.published" class="block">
                  <span>Published on {{ paquete.published }}</span>
                </span>
                <span v-else class="block">
                  <span>Please Inquire</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style></style>