<script lang="ts" setup>
import { useTeamStore } from '~/stores/team';

const teamStore = useTeamStore();
const team = ref([]);
const isLoading = ref(true);

const getTeam = async () => {
  try {
    isLoading.value = true;
    const res = await teamStore.getAllTeam();
    team.value = res.teams;
  } catch (error) {
    console.error('Error loading team:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getTeam();
});
</script>

<template>
  <section class="bg-white ">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else class="container py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <div v-for="member in team" :key="member.id" class="p-4">
        <NuxtLink :to="`/about-us/our-team/${member.id}`">
          <div class="relative overflow-hidden mb-6 group border-gray-200 rounded-lg shadow-lg">
            <NuxtImg :src="member.imagen_perfil || '/images/team/members/member-icon.webp'" alt="Team Member"
              class="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
          </div>
          <h3 class="md:text-lg font-semibold">{{ member.nombre }}</h3>
          <p class="text-xs md:text-sm text-gray-600">{{ member.cargo }}</p>
        </NuxtLink>
      </div>

      <div v-if="!isLoading && team.length === 0" class="col-span-full text-center py-12">
        <p class="text-gray-500">No team members available at the moment.</p>
      </div>
    </div>
  </section>
</template>