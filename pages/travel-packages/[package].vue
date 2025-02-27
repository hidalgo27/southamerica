<script lang="ts" setup>
import InquireNowForm from '~/components/form/InquireNowForm.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import ImgSlider from '~/components/travel-packages/ImgSlider.vue';
import Itinerary from '~/components/travel-packages/Itinerary.vue';
import OverviewPackage from '~/components/travel-packages/OverviewPackage.vue';
import PackageDetails from '~/components/travel-packages/PackageDetails.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';
import { Dropdown } from 'floating-vue';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { usePackageStore } from '~/stores/packages';

const { $gsap } = useNuxtApp();
$gsap.registerPlugin(ScrollToPlugin);

const packageStore = usePackageStore();
const route = useRoute();
const listPackages = ref([]);

const packageDetail = ref([]);
const getPackageDetail = async () => {
  const res: any = await packageStore.getPackage(route.params.package as string);
  packageDetail.value = res
};

const isOpen = ref(false);
const isVisible = ref(false);
const isFixed = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 50;
  isFixed.value = window.scrollY > window.screen.height - 100;
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId.substring(1));
  if (!element) return;

  $gsap.to(window, {
    duration: 1, // Tiempo en segundos (ajústalo según prefieras)
    scrollTo: { y: element, offsetY: 155 }, // Desplaza al elemento con un pequeño margen
    ease: "power2.inOut" // Efecto de suavizado
  });
};


onMounted(async () => {
  await getPackageDetail();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const buttons = ref([
  { name: 'Trip Overview', url: '#overview' },
  {
    name: 'Vacation Packages',
    items: [
      { name: 'All Vacation Packages', url: 'vacation-packages' },
    ]
  },
  { name: 'Prices & Inclusions', url: '#packageDetail' },
  { name: 'Trips', url: 'vacation-packages' }
]);

const destination = computed(() => {
  return packageDetail.value[0]?.paquetes_destinos[0]?.destinos || null;
});

const getPackagesCountry = async () => {
  console.log(packageDetail.value)
  const res: any = await packageStore.getPackageByCountry(destination.value.pais.url);
  listPackages.value = res.paquetes;
  console.log(listPackages.value);
};
const getDestinationUrl = (itemUrl = '') => {
  if (!destination.value) return '#'; // Prevención de errores
  return `/destinations/${destination.value.pais.url}/${destination.value.url}/${itemUrl}`;
};

watch(destination, () => {
  getPackagesCountry();
});
</script>
<template>
  <HeaderImgNav :packageDetail="packageDetail"></HeaderImgNav>
  <div
    class="fixed bottom-0 md:bottom-12 space-x-2 w-full z-40 md:w-2/3 lg:w-1/2 md:translate-x-1/4 lg:translate-x-1/2 md:rounded-md bg-blue-900 text-white flex justify-between items-center p-4 shadow-md transition-all duration-500 ease-in-out"
    :class="{
      'opacity-0 translate-y-10 pointer-events-none': !isVisible,
      'opacity-100 translate-y-0': isVisible
    }" v-if="packageDetail.length > 0">
    <div class="space-y-2">
      <p class="font-bold">
        {{ packageDetail[0].titulo }}
      </p>
      <p class="text-sm">
        {{ packageDetail[0].duracion }} days - From
        <span class="font-semibold">US$ {{ packageDetail[0].precio_tours }}</span>
        <span v-if="packageDetail[0].descuento" class="opacity-70">
          savings US$ {{ packageDetail[0].descuento }}
        </span>
      </p>
    </div>
    <button class="bg-white text-blue-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition"
      @click="isOpen = true">
      Request a Quote
    </button>
    <InquireNowForm :isOpen="isOpen" @close="isOpen = false"></InquireNowForm>
  </div>
  <nav class="py-6 border-y-2 flex justify-center space-x-72 text-xs mb-20" :class="{
    'fixed top-0 w-full bg-white shadow-md z-20 py-1': isFixed,
    'relative': !isFixed
  }">
    <nuxt-link v-if="isFixed" to="/" class="flex items-center">
      <div class="font-playfair-display text-xl font-medium flex items-end">
        Travel
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
        </svg>
        Packages
      </div>
    </nuxt-link>
    <div class="flex justify-center items-center">
      <div v-for="(button, index) in buttons" :key="index" class="inline-block px-4">
        <client-only>
          <template v-if="button.items">
            <Dropdown>
              <template #default="{ shown }">
                <span class="cursor-pointer">{{ button.name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                  stroke="currentColor" class="size-3 transition-transform duration-200"
                  :class="{ '-rotate-180': shown }">
                  <path fill-rule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clip-rule="evenodd" />
                </svg>
              </template>
              <template #popper>
                <div
                  class="v-popper p-2 bg-white text-gray-800 rounded-md grid grid-cols max-h-48 overflow-y-auto shadow-md border">
                  <NuxtLink v-for="(item, i) in button.items" :key="i" class="py-2 px-4 hover:bg-gray-100"
                    :to="getDestinationUrl(item.url)">
                    <span>{{ item.name }}</span>
                  </NuxtLink>
                </div>
              </template>
            </Dropdown>
          </template>

          <template v-else-if="button.name === 'Trips'">
            <NuxtLink v-if="destination"
              class="relative after:block after:w-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-700 after:origin-left hover:after:w-full"
              :to="getDestinationUrl(button.url)">
              {{ destination.nombre }} {{ button.name }}
            </NuxtLink>
          </template>

          <template v-else>
            <button @click="scrollToSection(button.url)" class=" relative after:block after:w-0 after:h-[2px] after:bg-secondary after:transition-all
              after:duration-700 after:origin-left hover:after:w-full">
              {{ button.name }}
            </button>
          </template>
        </client-only>
      </div>
    </div>
    <button v-if="isFixed" @click="isOpen = true"
      class="btn-primary-outline bg-orange-50 px-4 py-2 rounded-md shadow-md">
      Inquire Now
    </button>
    <InquireNowForm :isOpen="isOpen" @close="isOpen = false"></InquireNowForm>
  </nav>
  <div v-if="packageDetail && packageDetail.length > 0">
    <OverviewPackage :packageDetail="packageDetail[0]" id="overview" />
    <ImgSlider v-if="packageDetail[0].imagen_paquetes" :imagen_paquetes="packageDetail[0].imagen_paquetes" />
    <Itinerary :packageDetail="packageDetail[0]" />
    <PackageDetails :packageDetail="packageDetail[0]" id="packageDetail" />
  </div>
  <div v-else class="flex justify-center items-center ">
    <p>Cargando datos del paquete...</p>
  </div>
  <SliderPackages :listPackages="listPackages"></SliderPackages>
  <EspecialistLetter></EspecialistLetter>
  <MiniReviews></MiniReviews>
</template>
<style></style>