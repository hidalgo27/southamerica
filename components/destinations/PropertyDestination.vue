<script lang="ts" setup>

defineProps({
  properties: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section v-if="properties" class="container my-20 space-y-2">
    <div v-for="(property, index) in properties" :key="index"
      class="grid md:grid-cols-2 items-center justify-center bg-white md:gap-6 ">
      <div class="w-full h-full" :class="{ 'md:order-2': index % 2 !== 1 }">
        <NuxtImg :alt="property.nombre" class="w-full h-full rounded-lg shadow-lg" :src="property.imagen" />
      </div>
      <div class="p-6" :class="{ 'md:order-1': index % 2 !== 0 }">
        <h1 class="text-4xl font-bold font-playfair-display tracking-wide my-12 items-center">
          {{ property.nombre }}
        </h1>
        <div class="text-lg text-gray-700" v-html="property.descripcion"></div>
      </div>
    </div>
  </section>
</template>
<style></style>