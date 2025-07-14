<script lang="ts" setup>
import ListExperiences from '~/components/experiences/ListExperiences.vue';
import Reviews from '~/components/home/Reviews.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';
import { useTeamStore } from '~/stores/team';
import { usePackageStore } from '~/stores/packages';
import StartPlanningBanner from '~/components/about/StartPlanningBanner.vue';

definePageMeta({
  layout: 'unique-footer'
});
const teamStore = useTeamStore();
const team = ref<any>(null);
const route = useRoute();
const isLoading = ref(true);
const packageStore = usePackageStore();

const getTeam = async () => {
  try {
    isLoading.value = true;
    const res = await teamStore.getTeammate(route.params.member as string);
    team.value = res.team;
    console.log('Team member loaded:', team.value);
  } catch (error) {
    console.error('Error loading team member:', error);
  } finally {
    isLoading.value = false;
  }
};

const listPackages = ref([])
const getPackages = async () => {
  const res: any = await packageStore.getPackageTop()
  listPackages.value = res
  listPackagesTop.value = res.filter((packageItem: any) => packageItem.estado === 1)
  // console.log(listPackagesTop.value)
  // console.log(listPackages.value)
}

onMounted(async () => {
  await getTeam();
  await getPackages();
});
</script>

<template>
  <section class="bg-secondary/10">
    <!-- Spinner de carga -->
    <div v-if="isLoading" class="container py-24 flex justify-center items-center">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>

    <!-- Contenido del miembro del equipo -->
    <div v-else class="container pb-24 pt-52 flex flex-col lg:flex-row gap-8 items-center">
      <main class="lg:w-2/3">
        <h1 class="italic text-4xl mb-6 font-playfair">{{ team?.nombre }}</h1>
        <div class="gap-2 leading-relaxed">
          <p v-if="team?.cargo" class="text-xl">
            {{ team.cargo }}
          </p>
          <p v-if="team?.actividad" class="mt-4 italic font-bold leading-relaxed tracking-wide">
            {{ team.actividad }}
          </p>
          <p v-if="team?.descripcion" class="mt-4" v-html="team.descripcion"></p>

          <ul v-if="team?.favorite_travel_memory || team?.fun_facts || team?.favorite_quote"
            class="mt-4 space-y-2 list-disc pl-5">
            <li v-if="team.favorite_travel_memory">
              <span class="font-bold">FAVORITE TRAVEL MEMORY:</span>
              <span v-html="team.favorite_travel_memory"></span>
            </li>
            <li v-if="team.fun_facts">
              <span class="font-bold">FUN FACT:</span>
              <span v-html="team.fun_facts"></span>
            </li>
            <li v-if="team.favorite_quote">
              <span class="font-bold">FAVORITE QUOTE:</span>
              <span v-html="team.favorite_quote"></span>
            </li>
          </ul>

          <p v-if="team?.frase" class="italic font-light mt-4" v-html="team.frase"></p>
          <p v-if="team?.frase" class="italic font-light mt-4">
            {{ team.frase }}
          </p>
        </div>
      </main>

      <aside class="lg:w-1/3 flex items-center justify-center">
        <NuxtImg v-if="team.imagen_perfil" :src="team?.imagen_perfil"
          class="w-full max-w-md h-auto rounded-sm object-cover"
          :alt="team?.nombre ? `${team.nombre} photo` : 'Team member photo'" />
      </aside>
    </div>
  </section>

  <!-- Mostrar estos componentes solo cuando los datos estén cargados -->
  <template v-if="!isLoading">
    <ListExperiences v-if="team && team.destinos.length > 0" :items="team.destinos"></ListExperiences>
    <SliderPackages v-if="listPackages" :listPackages="listPackages" :isHome="false" title="My favorites packages">
    </SliderPackages>
    <StartPlanningBanner />
    <Reviews />
  </template>
</template>