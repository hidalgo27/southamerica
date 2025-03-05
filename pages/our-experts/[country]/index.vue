<script lang="ts" setup>
import SliderDestinations from '~/components/destinations/SliderDestinations.vue';
import BannerPosition from '~/components/experts/BannerPosition.vue';
import Teammates from '~/components/experts/Teammates.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

import { useTeamStore } from '~/stores/team';
import { useRoute } from 'vue-router';

const route = useRoute();
const useTeam = useTeamStore();
const team = ref(null);
const header = ref({
  miniTitle: 'Meet The Team',
  title: '',
  subTitle: 'Destinations Specialists',
  url: '',
});

const getTeam = async () => {
  const res: any = await useTeam.getTeamByCountry(route.params.country as string);
  team.value = res.pais;
  console.log(team.value);
  header.value.title = team.value.nombre;
  header.value.url = team.value.imagen;
};

onMounted(async () => {
  await getTeam();
});
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <section class="container my-20">
    <div class="max-w-2xl md:ml-52 ">
      <p class="text-gray-500 mb-6">
        Our Travel Team
      </p>
      <h1 class="text-4xl font-bold mb-12 font-playfair-display">
        We’re Destination Specialists through and through.
      </h1>
      <p class="text-md mb-6">
        At SouthAmerica, our Destination Specialists work in teams that focus on specific regions of the world so they
        can go
        deeper and become true experts who know more than your typical travel advisor. They also draw on their wealth of
        experiences, not only as travel professionals but as travellers and people with diverse interests. When working
        with SouthAmerica, you don’t get cookie cutter advice and travel planning help. You get expert service from
        passionate
        travellers who have dedicated their lives, personally and professionally, to exploring the world.
      </p>
    </div>
  </section>
  <Teammates v-if="team && team.teams" :teammates="team"></Teammates>
  <SliderDestinations></SliderDestinations>
  <BannerPosition></BannerPosition>
  <MiniReviews></MiniReviews>
</template>
<style></style>