<script lang="ts" setup>
import { Dropdown } from 'floating-vue';
import CardPackage from './CardPackage.vue';

const route = useRoute();
const props = defineProps({
  packageData: {
    type: Array,
    required: true,
  },
  filters: {
    type: Object,
    required: false,
  }
});

const countries = computed(() => {
  const countrySet = new Set();
  props.packageData.forEach((pkg: any) => {
    pkg.paquetes_destinos?.forEach((dest: any) => {
      if (dest.destinos?.pais?.nombre) {
        countrySet.add(dest.destinos.pais.nombre);
      }
    });
  });
  return Array.from(countrySet);
});

const regions = computed(() => {
  const regionSet = new Set();
  props.packageData.forEach((pkg: any) => {
    pkg.paquetes_destinos?.forEach((dest: any) => {
      if (dest.destinos?.nombre) {
        regionSet.add(dest.destinos.nombre);
      }
    });
  });
  console.log(regionSet);
  return Array.from(regionSet);
});

const categorias = computed(() => {
  const categorySet = new Set();
  console.log(props.packageData);
  props.packageData.forEach((pkg: any) => {
    pkg.paquetes_categoria?.forEach((cat: any) => {
      if (cat.categoria?.nombre) {
        categorySet.add(cat.categoria.nombre);
      }
    });
  });
  console.log(categorySet);
  return Array.from(categorySet);
})
// const mixedList2 = ref(["Luxury", "Adventure", "Budget", "Cultural", "Family", "Diversity", "Funny"]);

//RANGO DE PRECIO
const priceRange = ref({ min: 100, max: 10000 });
const min = ref(100);
const max = ref(10000);

const minThumb = computed(() => ((priceRange.value.min - min.value) / (max.value - min.value)) * 100);
const maxThumb = computed(() => 100 - ((priceRange.value.max - min.value) / (max.value - min.value)) * 100);

const updateMin = () => {
  priceRange.value.min = Math.min(priceRange.value.min, priceRange.value.max - 500);
};

const updateMax = () => {
  priceRange.value.max = Math.max(priceRange.value.max, priceRange.value.min + 500);
};

//RANGO DE DURACIÓN
const durationRange = ref({ min: 1, max: 30 });
const minDuration = ref(1);
const maxDuration = ref(30);

const minThumbDuration = computed(() => ((durationRange.value.min - minDuration.value) / (maxDuration.value - minDuration.value)) * 100);
const maxThumbDuration = computed(() => 100 - ((durationRange.value.max - minDuration.value) / (maxDuration.value - minDuration.value)) * 100);

const updateMinDuration = () => {
  durationRange.value.min = Math.min(durationRange.value.min, durationRange.value.max - 1);
};

const updateMaxDuration = () => {
  durationRange.value.max = Math.max(durationRange.value.max, durationRange.value.min + 1);
};

const searchTerms = ref({
  countries: "",
  regions: "",
  categorias: "",
  //mixedList2: "",
});

const filteredItems = (list: string[], term: string) => {
  return list.filter((item) => item.toLowerCase().includes(term.toLowerCase()));
};

const isMobileMenuOpen = ref(false);

const itemsPerPage = 9;
const currentPage = ref(1);
const showSpecialOffers = ref(false);
const selectedCountry = ref("");
const selectedRegion = ref("");
const selectedCategory = ref("");
const sortCriteria = ref({ field: null, order: null });
const sortLabel = computed(() => {
  if (!sortCriteria.value.field) return "Sort By";
  if (sortCriteria.value.field === "price") {
    return sortCriteria.value.order === "asc" ? "Price: Low to High" : "Price: High to Low";
  } else if (sortCriteria.value.field === "duration") {
    return sortCriteria.value.order === "asc" ? "Duration: Low to High" : "Duration: High to Low";
  }
  return "Sort By";
});

// Filtra los paquetes según el checkbox
const filteredPackages = computed(() => {
  let packages = props.packageData.filter((pkg) => {
    const matchesOffers = showSpecialOffers.value ? pkg.offers_home === 1 : true;
    const matchesCountry = selectedCountry.value
      ? pkg.paquetes_destinos?.some((dest) => dest.destinos?.pais?.nombre === selectedCountry.value)
      : true;
    const matchesRegion = selectedRegion.value
      ? pkg.paquetes_destinos?.some((dest) => dest.destinos?.nombre === selectedRegion.value)
      : true;
    const matchesCategory = selectedCategory.value
      ? pkg.paquetes_categoria?.some((cat) => cat.categoria?.nombre === selectedCategory.value)
      : true;
    const matchesPrice = pkg.precio_paquetes?.length > 0 &&
      pkg.precio_paquetes[0].precio_d >= priceRange.value.min &&
      pkg.precio_paquetes[0].precio_d <= priceRange.value.max;
    const matchesDuration = pkg.duracion >= durationRange.value.min && pkg.duracion <= durationRange.value.max;

    return matchesOffers && matchesCountry && matchesCategory && matchesRegion && matchesDuration;
  });

  // Aplicar ordenación si hay un criterio definido
  if (sortCriteria.value.field) {
    packages.sort((a, b) => {
      let valueA, valueB;

      if (sortCriteria.value.field === 'price') {
        valueA = a.precio_paquetes?.[0]?.precio_d ?? Infinity;
        valueB = b.precio_paquetes?.[0]?.precio_d ?? Infinity;
      } else if (sortCriteria.value.field === 'duration') {
        valueA = a.duracion ?? 0;
        valueB = b.duracion ?? 0;
      } else {
        return 0;
      }

      return sortCriteria.value.order === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }
  return packages;
});

// Se reinicia la paginación cuando cambian los datos o el filtro
watch([() => props.packageData, showSpecialOffers, selectedCountry, selectedRegion, selectedCategory, priceRange, durationRange], () => {
  currentPage.value = 1;
}, { immediate: true });

// Calcula el total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredPackages.value.length / itemsPerPage);
});

// Obtiene los datos paginados
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPackages.value.slice(start, start + itemsPerPage);
});

// Genera la paginación con puntos suspensivos
const paginationRange = computed(() => {
  if (totalPages.value <= 7) return Array.from({ length: totalPages.value }, (_, i) => i + 1);

  const range = [];
  if (currentPage.value > 4) range.push(1, "...");

  const start = Math.max(2, currentPage.value - 2);
  const end = Math.min(totalPages.value - 1, currentPage.value + 2);

  for (let i = start; i <= end; i++) range.push(i);

  if (currentPage.value < totalPages.value - 3) range.push("...", totalPages.value);

  return range;
});

// Scroll a los resultados después de cambiar de página
const scrollToResult = () => {
  const gridElement = document.querySelector(".results");
  if (gridElement) {
    gridElement.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const setPage = (page: any) => {
  if (page !== "...") currentPage.value = page;
  scrollToResult();
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
  scrollToResult();
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
  scrollToResult();
};

const sortBy = (field: any, order: any) => {
  sortCriteria.value = { field, order };
};

const clearFilters = () => {
  selectedCountry.value = "";
  selectedRegion.value = "";
  selectedCategory.value = "";
  priceRange.value = { min: 100, max: 10000 };
  durationRange.value = { min: 1, max: 30 };
  showSpecialOffers.value = false;
};

onMounted(() => {
  console.log(props.filters);
  if (props.filters) {
    console.log("entra");
    if (props.filters.country) {
      selectedCountry.value = props.filters.country;
    }
    if (props.filters.region) {
      selectedRegion.value = props.filters.region;
    }
    if (props.filters.category) {
      selectedCategory.value = props.filters.category;
    }
    if (props.filters.budget && props.filters.budget.length === 2) {
      priceRange.value = { min: props.filters.budget[0], max: props.filters.budget[1] };
    }
    if (props.filters.duration && props.filters.duration.length === 2) {
      durationRange.value = { min: props.filters.duration[0], max: props.filters.duration[1] };
    }
  }
});
</script>
<template>
  <section class="container">
    <div class="hidden md:block bg-white shadow-md -translate-y-6 relative z-20 rounded-md">
      <div class="grid grid-flow-col items-center rounded-md">
        <client-only>
          <Dropdown class="w-full border-r-2">
            <button
              class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100 focus: rounded-l-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
              </svg>
              <span class="ml-2">{{ selectedCountry || "Countries" }}</span>
            </button>
            <template #popper class="border">
              <div class="md:w-48 lg:w-72 rounded-md shadow-lg max-h-64 bg-white text-gray-800 text-sm p-4 border">
                <input v-model="searchTerms.countries"
                  class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                  type="text" placeholder="Search countries" autocomplete="off" />
                <div class="overflow-y-auto max-h-40">
                  <button v-for="item in filteredItems(countries, searchTerms.countries)" :key="item"
                    @click.prevent="selectedCountry = item"
                    class="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                    {{ item }}
                  </button>
                </div>
              </div>
            </template>
          </Dropdown>
        </client-only>
        <client-only>
          <Dropdown class="w-full border-r-2">
            <button
              class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span class="ml-2">{{ selectedRegion || "Regions" }}</span>
            </button>
            <template #popper class="border">
              <div class="md:w-48 lg:w-72 rounded-md shadow-lg max-h-64 bg-white text-gray-800 text-sm p-4 border">
                <input v-model="searchTerms.regions"
                  class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                  type="text" placeholder="Search regions" autocomplete="off" />
                <div class="overflow-y-auto max-h-40 space-y-1">
                  <button v-for="item in filteredItems(regions, searchTerms.regions)" :key="item" href="#"
                    @click.prevent="selectedRegion = item"
                    class="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                    {{ item }}
                  </button>
                </div>
              </div>
            </template>
          </Dropdown>
        </client-only>
        <client-only>
          <Dropdown class="w-full border-r-2">
            <button
              class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
              <span class="ml-2">{{ selectedCategory || "Experiences" }}</span>
            </button>
            <template #popper class="border">
              <div
                class=" w-full grid grid-cols-1 rounded-md shadow-lg max-h-64 bg-white text-gray-800 text-sm p-4 border">
                <div class="space-y-1 pr-2">
                  <div>
                    <span>Trip Types</span>
                  </div>
                  <input v-model="searchTerms.categorias"
                    class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                    type="text" placeholder="Search items" autocomplete="off" />
                  <div class="overflow-y-auto max-h-36">
                    <button v-for="item in filteredItems(categorias, searchTerms.categorias)" :key="item"
                      @click.prevent="selectedCategory = item"
                      class="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                      {{ item }}
                    </button>
                  </div>
                </div>
                <!-- <div class="space-y-1">
                  <span>Trip Styles</span>
                  <input v-model="searchTerms.mixedList2"
                    class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                    type="text" placeholder="Search items" autocomplete="off" />
                  <div class="overflow-y-auto max-h-36">
                    <button v-for="item in filteredItems(mixedList2, searchTerms.mixedList2)" :key="item" href="#"
                      class="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                      {{ item }}
                    </button>
                  </div>
                </div> -->
              </div>
            </template>
          </Dropdown>
        </client-only>
        <client-only>
          <Dropdown class="w-full border-r-2">
            <button
              class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700  focus:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
              <span class="ml-2">
                {{ priceRange.min === 100 && priceRange.max === 10000 ? "Budget" :
                  `$ ${priceRange.min} - $ ${priceRange.max}` }}
              </span>
            </button>
            <template #popper class="border">
              <div
                class="md:w-48 lg:w-72 rounded-md shadow-lg max-h-64 overflow-y-auto bg-white text-gray-800 text-sm p-4 border">
                <div class="relative w-full space-y-4">
                  <div>
                    <span>Price per double</span>
                  </div>
                  <div>
                    <input type="range" step="100" :min="min" :max="max" v-model="priceRange.min" @input="updateMin"
                      class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">

                    <input type="range" step="100" :min="min" :max="max" v-model="priceRange.max" @input="updateMax"
                      class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">

                    <div class="relative z-10 h-2 mt-2">
                      <div class="absolute left-0 right-0 top-0 bottom-0 bg-gray-200 rounded-md"></div>
                      <div class="absolute top-0 bottom-0 bg-gray-300 rounded-md"
                        :style="{ right: maxThumb + '%', left: minThumb + '%' }"></div>
                      <div
                        class="absolute z-30 w-4 h-4 top-0 left-0 bg-white border-2 border-gray-400 rounded-full -mt-1 -ml-1"
                        :style="{ left: minThumb + '%' }"></div>
                      <div
                        class="absolute z-30 w-4 h-4 top-0 right-0 bg-white border-2 border-gray-400 rounded-full -mt-1 -mr-1"
                        :style="{ right: maxThumb + '%' }"></div>
                    </div>
                  </div>
                  <p class="text-center text-gray-700 text-xs font-semibold">$ {{ priceRange.min }} - $ {{
                    priceRange.max }}</p>
                </div>
              </div>
            </template>
          </Dropdown>
        </client-only>
        <client-only>
          <Dropdown class="w-full">
            <button
              class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span class="ml-2">
                {{ durationRange.min === 1 && durationRange.max === 30 ? "Duration (days)" :
                  `${durationRange.min} - ${durationRange.max} days` }}
              </span>
            </button>
            <template #popper class="border">
              <div
                class="md:w-48 lg:w-72 rounded-md shadow-lg max-h-64 overflow-y-auto bg-white text-gray-800 text-sm p-4 border">
                <div class="relative w-full space-y-4">
                  <div>
                    <span>Price per double</span>
                  </div>
                  <div>
                    <input type="range" step="1" :min="minDuration" :max="maxDuration" v-model="durationRange.min"
                      @input="updateMinDuration"
                      class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">

                    <input type="range" step="1" :min="minDuration" :max="maxDuration" v-model="durationRange.max"
                      @input="updateMaxDuration"
                      class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">

                    <div class="relative z-10 h-2 mt-2">
                      <div class="absolute left-0 right-0 top-0 bottom-0 bg-gray-200 rounded-md"></div>
                      <div class="absolute top-0 bottom-0 bg-gray-300 rounded-md"
                        :style="{ right: maxThumbDuration + '%', left: minThumbDuration + '%' }"></div>
                      <div
                        class="absolute z-30 w-4 h-4 top-0 left-0 bg-white border-2 border-gray-400 rounded-full -mt-1 -ml-1"
                        :style="{ left: minThumbDuration + '%' }"></div>
                      <div
                        class="absolute z-30 w-4 h-4 top-0 right-0 bg-white border-2 border-gray-400 rounded-full -mt-1 -mr-1"
                        :style="{ right: maxThumbDuration + '%' }"></div>
                    </div>
                  </div>
                  <p class="text-center text-gray-700 text-xs font-semibold">
                    {{ durationRange.min }} - {{ durationRange.max }} days
                  </p>
                </div>
              </div>
            </template>
          </Dropdown>
        </client-only>
      </div>
    </div>
    <!-- <div v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 flex items-center justify-center md:hidden">
      <div class="bg-white w-11/12 max-w-md rounded-lg shadow-lg p-4">
        <div class="justify-between flex items-center">
          <h1 class="text-sm text-gray-500">Filter trip itinerarries</h1>
          <button @click="isMobileMenuOpen = false" class="text-gray-500 rounded-full border p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <client-only></client-only>
        <Dropdown>
          <button
            class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100 focus: rounded-l-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span class="ml-2">Destinations</span>
          </button>
          <template #popper>
            <div
              class="mt-2 w-full rounded-md shadow-lg max-h-64 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
              <input v-model="searchTerms.countries"
                class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                type="text" placeholder="Search items" autocomplete="off" />
              <button v-for="item in filteredItems(countries, searchTerms.countries)" :key="item" href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                {{ item }}
              </button>
            </div>
          </template>
        </Dropdown>
        <Dropdown v-if="!route.params.vacationpackages">
          <button
            class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
            </svg>
            <span class="ml-2">Countries</span>
          </button>
          <template #popper>
            <div
              class="mt-2 w-full rounded-md shadow-lg max-h-64 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
              <input v-model="searchTerms.regions"
                class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                type="text" placeholder="Search items" autocomplete="off" />
              <button v-for="item in filteredItems(regions, searchTerms.regions)" :key="item" href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                {{ item }}
              </button>
            </div>
          </template>
        </Dropdown>
        <Dropdown v-if="!route.path.includes('experiences', 0)">
          <button
            class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700 focus:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <span class="ml-2">Experiences</span>
          </button>
          <template #popper>
            <div
              class="mt-2 w-full grid grid-cols-2 rounded-md shadow-lg max-h-64 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5 p-1">
              <div class=" pr-2">
                <input v-model="searchTerms.categorias"
                  class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                  type="text" placeholder="Search items" autocomplete="off" />
                <button v-for="item in filteredItems(categorias, searchTerms.categorias)" :key="item" href="#"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                  {{ item }}
                </button>
              </div>
              <div>
                <input v-model="searchTerms.mixedList2"
                  class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                  type="text" placeholder="Search items" autocomplete="off" />
                <button v-for="item in filteredItems(mixedList2, searchTerms.mixedList2)" :key="item" href="#"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                  {{ item }}
                </button>
              </div>
            </div>
          </template>
        </Dropdown>

        <Dropdown>
          <button
            class="inline-flex items-center justify-center w-full p-4 text-sm font-medium text-gray-700  focus:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            <span class="ml-2">Price Range</span>
          </button>
          <template #popper
            class="mt-2 w-full rounded-md shadow-lg max-h-64 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5 p-2 space-y-1 border">
            <input v-model="priceRange.min" type="range" min="0" max="5000" step="100" class="w-full" />
            <input v-model="priceRange.max" type="range" min="0" max="5000" step="100" class="w-full mt-2" />
            <p class="text-center text-gray-700">$ {{ priceRange.min }} - $ {{ priceRange.max }}</p>
          </template>
        </Dropdown>

        <Dropdown>
          <button
            class="inline-flex items-center justify-center w-full p-auto text-sm font-medium text-gray-700 focus:bg-gray-100 focus: rounded-r-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span class="ml-2">Duration (days)</span>
          </button>
          <template #popper>
            <div
              class="mt-2 w-full rounded-md shadow-lg max-h-64 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5 p-2 space-y-1 border">
              <input v-model="durationRange.min" type="range" min="1" max="30" step="1" class="w-full" />
              <input v-model="durationRange.max" type="range" min="1" max="30" step="1" class="w-full mt-2" />
              <p class="text-center text-gray-700">{{ durationRange.min }} - {{ durationRange.max }} days</p>
            </div>

          </template>
        </Dropdown>
      </div>
    </div>
    <button @click="isMobileMenuOpen = true"
      class="block md:hidden bg-white shadow-md w-full -translate-y-6 relative z-20 rounded-md">
      <div class="bg-white shadow-md rounded-lg flex items-center p-6 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>

        <span class="text-gray-500 flex-grow">Filter By</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </button> -->
    <div class="py-6 mb-32">
      <div class="results text-xs flex justify-between items-center">
        <div class="flex flex-col space-y-4">
          <span>Results ({{ filteredPackages.length }})</span>
          <div class="flex flex-row space-x-2 text-xs items-center">
            <button v-if="selectedCountry" class="flex items-center space-x-2 border-2 px-4 py-2 rounded-full"
              @click="selectedCountry = ''">
              <span>{{ selectedCountry }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <button v-if="selectedRegion" class="flex items-center space-x-2 border-2 px-2 py-2 rounded-full"
              @click="selectedRegion = ''">
              <span>{{ selectedRegion }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <button v-if="selectedCategory" class="flex items-center space-x-2 border-2 px-2 py-2 rounded-full"
              @click="selectedCategory = ''">
              <span>{{ selectedCategory }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <button v-if="priceRange.min !== 100 || priceRange.max !== 10000"
              class="flex items-center space-x-2 border-2 px-2 py-2 rounded-full"
              @click="priceRange = { min: 100, max: 10000 }">
              <span>${{ priceRange.min }} - ${{ priceRange.max }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <button v-if="durationRange.min !== 1 || durationRange.max !== 30"
              class="flex items-center space-x-2 border-2 px-2 py-2 rounded-full"
              @click="durationRange = { min: 1, max: 30 }">
              <span>{{ durationRange.min }} - {{ durationRange.max }} days</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              v-if="selectedCountry || selectedRegion || (priceRange.min !== 100 || priceRange.max !== 10000) || durationRange.min !== 1 || (durationRange.max !== 30)"
              class="relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0"
              @click="clearFilters">
              Remove all
            </button>
          </div>
        </div>
        <div class="flex space-x-4">
          <div v-if="!route.path.includes('special-offers', 1)"
            class="flex items-center space-x-2 border px-8 py-4 rounded-md">
            <span>Special Offer</span>
            <input type="checkbox" class="form-checkbox cursor-pointer" v-model="showSpecialOffers">
          </div>
          <Dropdown class="hidden md:block relative">
            <template #default="{ shown }">
              <button class="bg-white border border-gray-200 rounded-md px-8 py-4 flex items-center space-x-2">
                <span>{{ sortLabel }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                  stroke="currentColor" class="size-3 transition-transform duration-200"
                  :class="{ '-rotate-180': shown }">
                  <path fill-rule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </template>
            <template #popper>
              <div class="bg-white border border-gray-200 text-gray-800 rounded-md shadow-lg p-2 text-sm">
                <button @click="sortBy('price', 'desc')"
                  class="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">Price: High to Low</button>
                <button @click="sortBy('price', 'asc')"
                  class="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">Price: Low to High</button>
                <button @click="sortBy('duration', 'desc')"
                  class="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">Duration: High to Low</button>
                <button @click="sortBy('duration', 'asc')"
                  class="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">Duration: Low to High</button>
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>

    <div>
      <div v-if="paginatedData.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 results">
        <CardPackage v-for="pkg in paginatedData" :key="pkg.id" :packageData="pkg" />
      </div>
      <div v-else class="text-center text-gray-500 mt-4">
        No packages available.
      </div>
      <div v-if="totalPages > 1" class="flex items-center gap-2 justify-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="p-2 text-gray-500 disabled:text-gray-300">
          ←
        </button>
        <template v-for="page in paginationRange" :key="page">
          <button v-if="page !== '...'" @click="setPage(page)"
            :class="['px-3 py-1 rounded-full', { 'bg-gray-200 font-bold': page === currentPage }]">
            {{ page }}
          </button>
          <span v-else class="px-2">...</span>
        </template>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="p-2 text-gray-500 disabled:text-gray-300">
          →
        </button>
      </div>
    </div>
  </section>
</template>
<style scoped>
input[type=range]::-webkit-slider-thumb {
  pointer-events: all;
  width: 24px;
  height: 24px;
  -webkit-appearance: none;
}
</style>