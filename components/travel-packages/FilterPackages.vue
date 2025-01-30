<script lang="ts" setup>
import CardPackage from '~/components/page/CardPackage.vue';

defineProps({
  packageData: {
    type: Object,
    required: true,
  },
});

const continents = ref(["Africa", "Antarctica", "Europe", "Asia", "North America", "South America", "Australia"]);
const countries = ref(["Peru", "Brazil", "Argentina", "Chile", "Colombia", "Ecuador", "Venezuela", "Bolivia", "Paraguay", "Uruguay"]);
const mixedList1 = ref(["Mountain", "Beach", "City", "Desert"]);
const mixedList2 = ref(["Luxury", "Adventure", "Budget", "Cultural"]);
const priceRange = ref({ min: 1, max: 10000 });
const durationRange = ref({ min: 1, max: 30 });
const dropdownState = ref({
  destination: false,
  country: false,
  mixedList: false,
  price: false,
  duration: false,
});

const toggleDropdownState = (key: keyof typeof dropdownState.value) => {
  Object.keys(dropdownState.value).forEach((k) => {
    dropdownState.value[k as keyof typeof dropdownState.value] = k === key ? !dropdownState.value[k as keyof typeof dropdownState.value] : false;
  });
};

const searchTerms = ref({
  destinations: "",
  countries: "",
  mixedList1: "",
  mixedList2: "",
});


const filteredItems = (list: string[], term: string) => {
  return list.filter((item) => item.toLowerCase().includes(term.toLowerCase()));
};

const closeDropdowns = (event: Event) => {
  if (!(event.target as HTMLElement).closest(".relative")) {
    Object.keys(dropdownState.value).forEach((k) => {
      dropdownState.value[k as keyof typeof dropdownState.value] = false;
    });
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdowns);
});
</script>
<template>
  <section class="container">
    <div class="bg-white shadow-md -translate-y-6 relative z-20 rounded-md">
      <div class="grid grid-cols-5 justify-center items-center rounded-md">
        <div class="relative z-20">
          <button @click="toggleDropdownState('destination')"
            class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 border-r-2  focus:bg-gray-100 focus: rounded-l-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span class="ml-2">Destinations</span>
          </button>
          <div v-if="dropdownState.destination"
            class="absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
            <input v-model="searchTerms.destinations"
              class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
              type="text" placeholder="Search items" autocomplete="off" />
            <a v-for="item in filteredItems(continents, searchTerms.destinations)" :key="item" href="#"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
              {{ item }}
            </a>
          </div>
        </div>
        <div class="relative z-20">
          <button @click="toggleDropdownState('country')"
            class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 border-r-2  focus:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
            </svg>
            <span class="ml-2">Countries</span>
          </button>
          <div v-if="dropdownState.country"
            class="absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
            <input v-model="searchTerms.countries"
              class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
              type="text" placeholder="Search items" autocomplete="off" />
            <a v-for="item in filteredItems(countries, searchTerms.countries)" :key="item" href="#"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
              {{ item }}
            </a>
          </div>
        </div>
        <div class="relative z-20">
          <button @click="toggleDropdownState('mixedList')"
            class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 border-r-2  focus:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>

            <span class="ml-2">Experiences</span>
          </button>
          <div v-if="dropdownState.mixedList"
            class="absolute grid grid-cols-2 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 space-x-3">
            <div class="border-r-2 pr-2">
              <input v-model="searchTerms.mixedList1"
                class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                type="text" placeholder="Search items" autocomplete="off" />
              <a v-for="item in filteredItems(mixedList1, searchTerms.mixedList1)" :key="item" href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                {{ item }}
              </a>
            </div>
            <div>
              <input v-model="searchTerms.mixedList2"
                class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                type="text" placeholder="Search items" autocomplete="off" />
              <a v-for="item in filteredItems(mixedList2, searchTerms.mixedList2)" :key="item" href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                {{ item }}
              </a>
            </div>
          </div>
        </div>

        <div class="relative z-20">
          <button @click="toggleDropdownState('price')"
            class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 border-r-2 focus:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            <span class="ml-2">Price Range</span>
          </button>
          <div v-if="dropdownState.price"
            class="absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2">
            <input v-model="priceRange.min" type="range" min="0" max="5000" step="100" class="w-full" />
            <input v-model="priceRange.max" type="range" min="0" max="5000" step="100" class="w-full mt-2" />
            <p class="text-center text-gray-700">$ {{ priceRange.min }} - $ {{ priceRange.max }}</p>
          </div>
        </div>

        <div class="relative z-20">
          <button @click="toggleDropdownState('duration')"
            class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100 focus: rounded-r-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span class="ml-2">Duration (days)</span>
          </button>
          <div v-if="dropdownState.duration"
            class="absolute items-center right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2">
            <input v-model="durationRange.min" type="range" min="1" max="30" step="1" class="w-full" />
            <input v-model="durationRange.max" type="range" min="1" max="30" step="1" class="w-full mt-2" />
            <p class="text-center text-gray-700">{{ durationRange.min }} - {{ durationRange.max }} days</p>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-center">
        <span>Results {{ packageData.length }}</span>
        <div class="flex space-x-4">
          <div class="flex items-center space-x-2 border px-4 py-2 rounded-md">
            <span>Special Offer</span>
            <input type="checkbox" class="form-checkbox">
          </div>
          <div class="relative">
            <button class="bg-white border border-gray-300 rounded-md px-4 py-2">
              Sort By <i class="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <CardPackage v-for="(packages, index) in packageData" :key="index" :packageData="packages"></CardPackage>
    </div>
  </section>
</template>
<style></style>