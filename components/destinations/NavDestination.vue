<script lang="ts" setup>
import { Dropdown } from 'floating-vue';
import InquireNowForm from '~/components/form/InquireNowForm.vue';

const buttons = ref([
  { name: 'Overview', url: '' },
  {
    name: 'Vacation Packages',
    items: [
      { name: 'All Vacation Packages', url: 'vacation-packages' },
      { name: 'Adventure Tours', url: 'adventure-tours' },
      { name: 'Cultural Tours', url: 'cultural-tours' },
      { name: 'Family Tours', url: 'family-tours' },
      { name: 'Luxury Tours', url: 'luxury-tours' },
      { name: 'Wildlife Tours', url: 'wildlife-tours' }
    ]
  },
  { name: 'Places to Go', url: 'places-to-go' },
  {
    name: 'Travel Information',
    items: [
      { name: 'Things to Know', url: 'travel-information/things-to-know' },
      { name: 'Food and Drink', url: 'travel-information/food-and-drink' },
      { name: 'Culture and Traditions', url: 'travel-information/culture-and-tradtions' },
      { name: 'Best Time to Visit', url: 'travel-information/best-time-to-visit' }
    ]
  },
  { name: 'Travel Guides', url: 'travel-guides' }
]);

const route = useRoute();
const isOpen = ref(false);
const isFixed = ref(false);

const handleScroll = () => {
  if (window.scrollY > 600) {
    isFixed.value = true;
  } else {
    isFixed.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<template>
  <nav class="py-6 border-y-2 flex justify-center space-x-72 text-xs mb-20" :class="{
    'fixed top-0 w-full bg-white shadow-md z-10 py-1': isFixed,
    'relative': !isFixed
  }">
    <nuxt-link v-if="isFixed" to="/" class="flex items-center">
      <div class="font-playfair-display text-xl font-medium flex items-end">
        South
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
        </svg>
        America
        <div class="px-1">
          <span class="text-sm italic">company</span>
        </div>
      </div>
    </nuxt-link>
    <div class="flex justify-center items-center">
      <div v-for="(button, index) in buttons" :key="index" class="inline-block px-4 ">
        <Dropdown v-if="button.items">
          <template #default>
            <span class="cursor-pointer">{{ button.name }}</span>
          </template>
          <template #popper>
            <div
              class="v-popper p-2 bg-white text-gray-800 rounded-md grid grid-cols max-h-48 overflow-y-auto shadow-md border">
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
    </div>
    <button v-if="isFixed" @click="isOpen = true"
      class="btn-primary-outline bg-orange-50 px-4 py-2 rounded-md shadow-md">
      Inquire Now
    </button>
    <InquireNowForm :isOpen="isOpen" @close="isOpen = false"></InquireNowForm>
  </nav>
</template>
<style></style>