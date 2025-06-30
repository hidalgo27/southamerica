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
  <section class="container py-12">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="member in team" :key="member.id" class="p-4">
        <NuxtLink :to="`/about-us/our-team/${member.id}`">
          <div class="relative overflow-hidden mb-6 group">
            <NuxtImg
              :src="member.foto || 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29uYXxlbnwwfDJ8MHx8fDA%3D'"
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