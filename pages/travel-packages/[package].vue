<script lang="ts" setup>
import { Dropdown } from 'floating-vue';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import WeTravelCheckoutButton from '~/components/page/WeTravelCheckoutButton.vue';
import ImgSlider from '~/components/travel-packages/ImgSlider.vue';
import Itinerary from '~/components/travel-packages/Itinerary.vue';
import OverviewPackage from '~/components/travel-packages/OverviewPackage.vue';
import PackageDetails from '~/components/travel-packages/PackageDetails.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';
import { useFormStore } from '~/stores/form';
import { usePackageStore } from '~/stores/packages';

const inquireFormStore = useFormStore();
const { $gsap } = useNuxtApp();
$gsap.registerPlugin(ScrollToPlugin);

const packageStore = usePackageStore();
const route = useRoute();
const listPackages = ref([]);
const header = ref({
  miniTitle: '',
  title: '',
  subTitle: '',
  url: '',
});

const packageDetail = ref([]);
const getPackageDetail = async () => {
  const res: any = await packageStore.getPackage(route.params.package as string);
  packageDetail.value = res
  header.value.url = packageDetail.value[0].imagen_paquetes[0].nombre;

  packageStore.titlePackages = res[0].titulo
  packageStore.imgPackages = res[0].imagen_paquetes[0].nombre

};

const isFixed = ref(false);

const handleScroll = () => {
  const shouldBeFixed = window.scrollY > window.screen.height - 100;
  isFixed.value = shouldBeFixed;

  const shouldBeVisible = window.scrollY > 50;
  // Animación con GSAP para mostrar u ocultar el elemento
  $gsap.to('.floating-banner', {
    opacity: shouldBeVisible ? 1 : 0,
    y: shouldBeVisible ? 0 : 10, // Se desplaza ligeramente hacia abajo al ocultarse
    duration: 0.5,
    ease: 'power3.out'
  });
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId.substring(1));
  if (!element) return;

  $gsap.to(window, {
    duration: 1, // Tiempo en segundos (ajústalo según prefieras)
    scrollTo: { y: element, offsetY: 155 }, // Desplaza al elemento con un pequeño margen
    ease: "power3.inOut" // Efecto de suavizado
  });
};

onMounted(async () => {
  await getPackageDetail();
  updateIsMobile();
  if (window.scrollY < 50) {
    $gsap.set('.floating-banner', { opacity: 0, y: 10 });
  };
  window.addEventListener("scroll", handleScroll);
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener('resize', updateIsMobile);
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
  const res: any = await packageStore.getPackageByCountry(destination.value.pais.url);
  listPackages.value = res.paquetes;
};

const getDestinationUrl = (itemUrl = '') => {
  if (!destination.value) return '#';
  return `/destinations/${destination.value.pais.url}/${destination.value.url}/${itemUrl}`;
};

watch(destination, () => {
  getPackagesCountry();
});

const isMobile = ref(false);

const updateIsMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 640;
  }
};
let count = 0;
const onShow = () => {
  if (count === 0) {
    document.body.classList.add('no-scroll');
  }
  count++;
};

const onHide = () => {
  count--;
  if (count === 0) {
    document.body.classList.remove('no-scroll');
  }
};
</script>
<template>
  <HeaderImgNav :header="header" :packageDetail="packageDetail"></HeaderImgNav>
  <div
    class="floating-banner fixed bottom-0 md:bottom-12 space-x-2 w-full z-40 md:w-2/3 lg:w-1/2 md:translate-x-1/4 lg:translate-x-1/2 md:rounded-md bg-blue-900 text-white flex justify-between items-center p-4 shadow-md "
    v-show="packageDetail.length > 0">
    <div class="space-y-2" v-if="packageDetail[0]">
      <p v-if="packageDetail[0].titulo" class="font-bold">
        {{ packageDetail[0].titulo }}
      </p>
      <p class="text-sm"
        v-if="packageDetail[0].duracion || packageDetail[0].precio_paquetes || packageDetail[0].descuento">
        {{ packageDetail[0].duracion }} days -
        <span v-if="packageDetail[0].precio_paquetes?.[0]?.precio_d" class="font-semibold">From US$ {{
          packageDetail[0].precio_paquetes?.[0]?.precio_d }}</span>
        <span v-else>Inquire Now</span>
        <span v-if="packageDetail[0].descuento" class="opacity-70">
          savings US$ {{ packageDetail[0].descuento }}
        </span>
      </p>
    </div>
    <div class="flex gap-2">
      <WeTravelCheckoutButton v-show="packageDetail?.[0]?.codigo_f" :tripUuid="packageDetail?.[0]?.codigo_f || ''">
      </WeTravelCheckoutButton>
      <button
        class="bg-white text-blue-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition text-sm md:text-base"
        @click="inquireFormStore.openInquireNowForm()">
        Request a Quote
      </button>
    </div>
  </div>
  <nav class="py-4 sm:py-6 border-y-2 justify-around sm:px-4 flex text-xs mb-12" :class="{
    'fixed top-0 w-full bg-white shadow-md z-20 py-1': isFixed,
    'relative': !isFixed
  }">
    <nuxt-link v-if="isFixed" to="/" class=" items-center hidden md:flex">
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
      <div v-for="(button, index) in buttons" :key="index" class="flex flex-wrap px-1 sm:px-4">
        <client-only>
          <template v-if="button.items">
            <Dropdown :positioning-disabled="isMobile" @apply-show="isMobile && onShow()"
              @apply-hide="isMobile && onHide()">
              <template #default="{ shown }">
                <span class="cursor-pointer flex gap-1 justify-around items-center">
                  {{ button.name }}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="hidden md:flex size-3 transition-transform duration-200"
                    :class="{ '-rotate-180': shown }">
                    <path fill-rule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </template>
              <template #popper="{ hide }">
                <div
                  class="v-popper p-2 bg-white text-gray-800 md:rounded-md grid grid-cols max-h-48 overflow-y-auto shadow-md border">
                  <NuxtLink v-for="(item, i) in button.items" :key="i" class="py-2 px-4 hover:bg-gray-100"
                    :to="getDestinationUrl(item.url)">
                    <span>{{ item.name }}</span>
                  </NuxtLink>
                  <button v-if="isMobile" @click="hide()" class="absolute top-2 right-2 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-5 h-5 text-gray-500 hover:text-gray-800 transition">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
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
            <button @click="scrollToSection(button.url)" class="relative after:block after:w-0 after:h-[2px] after:bg-secondary after:transition-all
              after:duration-700 after:origin-left hover:after:w-full">
              {{ button.name }}
            </button>
          </template>
        </client-only>
      </div>
    </div>
    <button v-if="isFixed" @click="inquireFormStore.openInquireNowForm()"
      class="py-3 px-5 text-primary border-2 border-primary hover:bg-primary hover:text-white focus:bg-primary focus:text-white cursor-pointer transition-colors duration-300 ease-in-out bg-orange-50 rounded-md shadow-md hidden sm:flex">
      Inquire Now
    </button>
  </nav>
  <div v-if="packageDetail && packageDetail.length > 0">
    <OverviewPackage :packageDetail="packageDetail[0]" id="overview" />
    <ImgSlider v-if="packageDetail[0].imagen_paquetes" :imagen_paquetes="packageDetail[0].imagen_paquetes.slice(1)" />
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
<style>
body.no-scroll {
  overflow: hidden;
}

.v-popper__popper--no-positioning {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.v-popper__popper--no-positioning .v-popper__backdrop {
  display: block;
  background: rgba(0 0 0 / 90%);
}

.v-popper__popper--no-positioning .v-popper__wrapper {
  width: 100%;
  pointer-events: auto;
  transition: transform .15s ease-out;
}

.v-popper__popper--no-positioning.v-popper__popper--hidden .v-popper__wrapper {
  transform: translateY(100%);

}
</style>