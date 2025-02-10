<script lang="ts" setup>
import { Dropdown } from 'floating-vue';

const buttons = ref([
  { name: 'Overview', url: '' },
  {
    name: 'Vacation Packages',
    items: [
      {
        name: 'All Vacation Packages', url: 'vacation-packages',
      },
      {
        name: 'Adventure Tours', url: 'adventure-tours',
      },
      {
        name: 'Cultural Tours', url: 'cultural-tours',
      },
      {
        name: 'Family Tours', url: 'family-tours',
      },
      {
        name: 'Luxury Tours', url: 'luxury-tours',
      },
      {
        name: 'Wildlife Tours', url: 'wildlife-tours',
      }
    ]
  },
  { name: 'Places to Go', url: 'places-to-go' },
  {
    name: 'Travel Information',
    items: [
      { name: 'Things to Know', url: 'travel-information/things-to-know' },
      { name: 'Food and Drink', url: 'travel-information/food-and-drink' },
      { name: 'Culture and Traditions', url: 'travel-information/culture-and-tradtions' },
      { name: 'Best Time to Visit', url: 'travel-information/best-time-to-visit' },
    ]
  },
  { name: 'Travel Guides', url: 'travel-guides' },
]);

const route = useRoute();

console.log('route', route.path);
</script>
<template>
  <nav class="py-6 border-y-2 flex justify-center text-xs mb-20">
    <div v-for="(button, index) in buttons" :key="index" class="inline-block px-4">
      <Dropdown v-if="button.items">
        <template #default>
          <span class="cursor-pointer">{{ button.name }}</span>
        </template>
        <template #popper>
          <div class="v-popper py-2 bg-white text-gray-800  rounded-md grid grid-cols h-48">
            <NuxtLink v-for="(item, i) in button.items" :key="i" class="py-2 px-4 hover:bg-gray-100"
              :to="`/destinations/${route.params.country}/${route.params.region}/${item.url}`">
              <span>{{ item.name }}</span>
            </NuxtLink>
          </div>
        </template>
      </Dropdown>

      <NuxtLink v-else :to="`/destinations/${route.params.country}/${route.params.region}/${button.url}`"
        class="relative after:block after:w-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-700 after:origin-left hover:after:w-full">
        {{ button.name }}</NuxtLink>
    </div>
  </nav>
</template>
<style></style>