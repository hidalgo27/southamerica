<script lang="ts" setup>
import SliderDestinations from '~/components/destinations/SliderDestinations.vue';
import ListExperiences from '~/components/experiences/ListExperiences.vue';
import BannerPosition from '~/components/experts/BannerPosition.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

import { useTeamStore } from '~/stores/team';
const useTeam = useTeamStore();
const team = ref(null);
const route = useRoute();
const items = ref([])
const header = ref({
  miniTitle: '',
  title: '',
  subTitle: '',
  url: '',
})
const getTeam = async () => {
  const res: any = await useTeam.getTeammate(route.params.teammate as number);
  team.value = res.team;
  console.log(team.value);
  header.value.title = team.value.nombre;
  header.value.subTitle = team.value.cargo;
  header.value.url = team.value.imagen_portada;
  items.value = [
    { title: "Fun Facts", content: team.value?.fun_facts },
    { title: "Favourite Quote", content: team.value?.favorite_quote },
    { title: "Favourite Travel Memory", content: team.value?.favorite_travel_memory }
  ];
};
const activeIndex = ref(null);

const toggle = (index: null) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

onMounted(async () => {
  await getTeam();
});
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <section class="container mx-auto py-20">
    <div class="flex flex-col lg:flex-row items-center lg:items-start" v-if="team">
      <div class="relative w-full lg:w-1/3 bottom-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
        <NuxtImg :alt="team.nombre" class="rounded-lg bg-gray-100 transition-all duration-300 w-full h-full"
          :src="team.imagen_perfil" />
      </div>
      <div class="w-full lg:w-2/3 lg:pl-12">
        <div class="flex space-x-2 mb-4">
          <NuxtLink :to="'/destinations/' + pais.url" class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
            v-for="pais in team.paises">
            {{ pais.nombre }}
          </NuxtLink>
        </div>
        <h1 class="title text-5xl md:text-8xl font-bold mb-20 mt-6 font-playfair-display">
          {{ team.nombre }}
        </h1>
        <p class="text-lg mb-32" v-html="team.descripcion">

        </p>
        <div class="border-t border-gray-200">
          <div v-for="(item, index) in items" :key="index"
            :class="activeIndex === index ? 'border border-gray-100 shadow-md duration-300' : ''">
            <div class="py-6 flex justify-between items-center cursor-pointer" @click="toggle(index)"
              :class="activeIndex === index ? 'border-b border-gray-200 duration-300' : 'border-b'">
              <span class="text-lg pl-6">{{ item.title }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 transition-transform duration-300 mr-8"
                :class="{ '-rotate-180': activeIndex === index }">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </div>
            <div v-if="activeIndex === index" class="p-10 px-20 text-gray-800" v-html="item.content">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ListExperiences v-if="team && team.destinos.length > 0" :items="team.destinos"></ListExperiences>
  <SliderDestinations></SliderDestinations>
  <BannerPosition></BannerPosition>
  <MiniReviews></MiniReviews>
</template>

<style></style>