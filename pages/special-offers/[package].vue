<script lang="ts" setup>
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import CardPackage from '~/components/travel-packages/CardPackage.vue';

import { usePackageStore } from '~/stores/packages';

const packageStore = usePackageStore();
const listPackages = ref([]);

const header = ref({
  miniTitle: 'Discover our Best Deals',
  title: '',
  subTitle: 'Specials',
  url: '',
})

const itemsPerPage = 9;
const currentPage = ref(1);
const route = useRoute();

const getPackages = async () => {
  const res: any = await packageStore.getOffersByCountry(route.params.package as string);
  listPackages.value = res.paquetes;

  header.value.title = res.pais.nombre;
};

onMounted(async () => {
  await getPackages();
});

// Calcula el total de páginas
const totalPages = computed(() => {
  return Math.ceil(listPackages.value.length / itemsPerPage);
});

// Obtiene los datos paginados
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return listPackages.value.slice(start, start + itemsPerPage);
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
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <section class="my-20">
    <div class="container">
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
    </div>
  </section>
  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>
<style></style>