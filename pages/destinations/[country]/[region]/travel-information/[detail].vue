<script lang="ts" setup>
import NavDestination from '~/components/destinations/NavDestination.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';

import { useDestinationStore } from '~/stores/destination';
import { useBlogStore } from '~/stores/blog';

const route = useRoute();
const destinationStore = useDestinationStore();
const blogStore = useBlogStore();

const region = ref(null);
const post = ref(null);

const header = ref({
  miniTitle: 'Travel Information',
  title: '',
  subTitle: '',
  url: '',
})

const categoryMap: Record<string, string> = {
  'things-to-know': 'Things to Know',
  'food-and-drink': 'Food and Drink',
  'culture-and-traditions': 'Culture and Traditions',
  'best-time-to-visit': 'Best Time to Visit',
};

const categoryStateMap: Record<string, number> = {
  'things-to-know': 1,
  'food-and-drink': 2,
  'culture-and-traditions': 3,
  'best-time-to-visit': 4,
};

const getRegion = async () => {
  const res: any = await destinationStore.getRegion(route.params.region as string);
  region.value = res.destino;
  console.log(route.params.detail as string);
  console.log(region.value);
  if (region.value) {
    header.value.title = region.value.nombre;
    if (categoryMap[route.params.detail]) {
      header.value.subTitle = categoryMap[route.params.detail];

      // Filtrar posts que tengan un estado válido y coincidan con la categoría
      post.value = region.value.posts.filter(
        (post: any) =>
          post.estado === categoryStateMap[route.params.detail]
      )[0];
    }
    getBlog(post.value.url);
  }
};

const getBlog = async (url: string) => {
  const res: any = await blogStore.getBlog(url);
  post.value = res[0];
  console.log(post.value);
  header.value.url = post.value.imagenes[0].nombre;
}

onMounted(async () => {
  await getRegion();
});
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <NavDestination></NavDestination>
  <section class="container my-20 justify-center flex" v-if="post">
    <div class="w-2/3">
      <h1 class="text-5xl font-bold font-playfair-display mb-20">
        {{ post.titulo }}
      </h1>
      <div class="font-medium " v-html="post.detalle"></div>
    </div>
  </section>
  <SliderPackages v-if="region" :listPackages="region.paquetes"></SliderPackages>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews></MiniReviews>
</template>
<style></style>