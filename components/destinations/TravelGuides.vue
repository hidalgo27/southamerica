<script lang="ts" setup>
const travel_guides = ref([
  {
    title: "A Traveller's Guide to Latin America",
    description: "The essential guide to destinations in Latin America...",
    image: "https://storage.googleapis.com/a1aa/image/m5Ii2RLF0wQlSoEyOsw8sp2A-KZU0MOSkD_m5bqeEmM.jpg"
  },
  {
    title: "A Traveller's Guide to Latin America",
    description: "The essential guide to destinations in Latin America...",
    image: "https://storage.googleapis.com/a1aa/image/m5Ii2RLF0wQlSoEyOsw8sp2A-KZU0MOSkD_m5bqeEmM.jpg"
  },
  {
    title: "A Traveller's Guide to Latin America",
    description: "The essential guide to destinations in Latin America...",
    image: "https://storage.googleapis.com/a1aa/image/m5Ii2RLF0wQlSoEyOsw8sp2A-KZU0MOSkD_m5bqeEmM.jpg"
  },
  {
    title: "A Traveller's Guide to Latin America",
    description: "The essential guide to destinations in Latin America...",
    image: "https://storage.googleapis.com/a1aa/image/m5Ii2RLF0wQlSoEyOsw8sp2A-KZU0MOSkD_m5bqeEmM.jpg"
  }
])
</script>
<template>
  <section class="container my-20 gap-10">
    <h1 class="text-xl font-playfair-display font-semibold mb-16">Travel Guides</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="guide in travel_guides"
        class="rounded-md border overflow-hidden w-full h-full group flex-grow hover:shadow-xl hover:border-transparent transition duration-500 ease-in-out">
        <div class="p-6 space-y-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <NuxtLink :to="'/'" class="text-sm md:text-xl font-bold my-6 font-playfair-display">
            {{ guide.title }}
          </NuxtLink>
          <p class="text-gray-500 text-xs my-6 hidden md:block">
            {{ guide.description }}
          </p>
          <div class="w-full h-24 md:h-48 relative overflow-hidden cursor-pointer rounded-md">
            <NuxtImg :src="guide.image"
              class="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
          </div>
        </div>

        <div class="flex justify-center mt-4 w-full border-t p-4">
          <button
            class="text-xs relative after:block after:w-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-700 after:origin-left hover:after:w-full">
            Read Guide
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<style></style>