<script setup lang="ts">
defineProps({
  category: String,
  image: String,
  title: String,
  date: String,
  author: String,
});
</script>
<template>
  <div class="flex bg-white shadow-md rounded-lg overflow-hidden">
    <div class="w-full">
      <img :src="image" alt="Article Image" class="w-full h-full object-cover rounded-md" />
    </div>
    <div class="flex flex-col justify-between w-full">
      <span class="m-2 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full self-start bg-gray-200 inline-block">
        {{ category }}
      </span>
      <h2 class="m-2 text-lg font-semibold mt-2 font-playfair-display">{{ title }}</h2>
      <div class="text-sm text-gray-500 flex justify-start border-t border-gray-300 ">
        <span class="p-4">{{ date }}</span>
        <div class="border-gray-300 h-full border"></div>
        <span class="text-start p-4">By {{ author }}</span>
      </div>
    </div>
  </div>
</template>