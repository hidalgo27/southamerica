<script lang="ts" setup>
import ListExperiences from '~/components/experiences/ListExperiences.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import TripStyles from '~/components/home/TripStyles.vue';
import SliderPackages from '~/components/page/slider/SliderPackages.vue';

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
</script>
<template>
  <section>
    <div class="relative w-full h-screen 2xl:h-[70vh] ">
      <div class="overflow-hidden h-full relative ">
        <div class="mask gradient-cicle-gray items-center flex justify-center">
          <div v-if="loading" class="mt-40 text-center">
            Cargando ..
          </div>
        </div>
        <div v-show="!loading" ref="video" loading="lazy" class="vimeo-wrapper"></div>
        <div class="relative z-10 flex items-center  w-full h-full text-center">
          <nav class="absolute top-0 md:top-40 left-0 text-gray-50 text-md p-4">
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
          <div class="container">
            <h1
              class="text-white/80 drop-shadow-[0_0_1px_rgba(255,255,255,0.5)] leading-tight text-5xl 2xl:text-7xl tracking-wide font-semibold font-playfair-display">
              Design Your Peru Discovery.</h1>
            <p class="text-white text-xl 2xl:text-lg tracking-widest font-light mt-5 ">Uncover the secrets of Machu
              Picchu and the wonders of Peru on a journey tailored just for you.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <TripStyles></TripStyles>

  <section>
    <ListExperiences></ListExperiences>
  </section>
  <SliderPackages></SliderPackages>

  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>
<style></style>