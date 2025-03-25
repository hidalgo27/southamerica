<script lang="ts" setup>

const props = defineProps({
  teammates: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <section class="bg-secondary bg-opacity-30 py-12 ">
    <div class="p-8 container ">
      <div class="text-center mb-8">
        <div class="border-title mb-2 mx-auto"></div>
        <p class="mb-6 tracking-widest font-bold">
          Our Dedicated Team
        </p>
        <h1 class="font-semibold text-4xl md:text-7xl mb-6 title font-playfair-display tracking-wide">
          Helping you explore the world your way.
        </h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <nuxt-link v-for="(teammate, index) in teammates.teams" :key="index"
          :to="'/our-experts/' + teammates.url + '/' + teammate.id"
          class="relative block hover:shadow-lg transition duration-500 ease-in-out h-full bg-white content-between overflow-hidden rounded-md border group">
          <div class="relative overflow-hidden rounded-md w-full h-96">
            <NuxtImg :alt="teammate.nombre" :src="teammate.imagen_perfil"
              class="w-full h-full rounded-md object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 bg-white p-4 flex flex-col justify-center items-center rounded-b-md">
            <span class="font-semibold text-lg">
              {{ teammate.nombre }}
            </span>
            <span class="text-sm">
              {{ teammate.cargo }}
            </span>
          </div>
        </nuxt-link>
      </div>
      <!-- <div class="text-center mt-6">
        <nuxt-link class="px-6 py-3 btn-secondary-outline w-full rounded-md">
          Ver todos los perfiles
        </nuxt-link>
      </div> -->
    </div>
  </section>
</template>
<style></style>