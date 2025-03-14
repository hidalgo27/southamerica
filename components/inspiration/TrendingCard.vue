<script setup lang="ts">
const props = defineProps({
  category: String,
  image: String,
  title: String,
  url: String,
  date: String,
  author: String,
});

const formattedDate = computed(() => {
  if (!props.date) return '';
  const dateObj = new Date(props.date);
  return dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
});
</script>
<template>
  <div
    class="flex bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-xl hover:border-transparent transition duration-500 ease-in-out h-64">
    <NuxtLink class="w-full h-full overflow-hidden duration-300 rounded-md" :to="'/inspiration/' + url">
      <NuxtImg :src="image" alt="Article Image"
        class="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-105 " />
    </NuxtLink>
    <div class="flex flex-col justify-between w-full">
      <span class="m-4 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full self-start bg-gray-200 inline-block">
        {{ category }}
      </span>
      <h2 class="mx-4 flex flex-wrap text-sm md:text-lg font-semibold mt-2 font-playfair-display">{{ title }}</h2>
      <div class="text-sm text-gray-500 flex justify-start border-t border-gray-300">
        <span v-if="date" class="py-4 px-2 lg:p-4">{{ formattedDate }}</span>
        <div v-if="date && author" class="border-gray-300 h-full border"></div>
        <span class="text-start p-4">By {{ author }}</span>
      </div>
    </div>
  </div>
</template>