<script lang="ts" setup>
import { Dropdown } from 'floating-vue';
import { useCategoriesStore } from '~/stores/categories';
import { useFormStore } from '~/stores/form';

const inquireFormStore = useFormStore();

const useCategories = useCategoriesStore();
const categories = ref([]);
const items = ref([
  { name: 'All Vacation Packages', url: 'vacation-packages' },
])

// const getCategories = async () => {
//   const res: any = await useCategories.getCategories();
//   categories.value = res;

//   for (let i = 0; i < categories.value.length; i++) {
//     items.value.push({ name: categories.value[i].nombre, url: categories.value[i].url });
//   }
// };
const buttons = ref([
  { name: 'Overview', url: '' },
  {
    name: 'Vacation Packages',
    url: 'vacation-packages',
  },
  {
    name: 'Travel Information',
    items: [
      { name: 'Things to Know', url: 'travel-information/things-to-know' },
      { name: 'Food and Drink', url: 'travel-information/food-and-drink' },
      { name: 'Culture and Traditions', url: 'travel-information/culture-and-traditions' },
      { name: 'Best Time to Visit', url: 'travel-information/best-time-to-visit' }
    ]
  },
  { name: 'Travel Guides', url: 'travel-guides' }
]);

const route = useRoute();
const formOpen = ref(false);
const isFixed = ref(false);
const dropdownStates = ref(buttons.value.map(() => false));

const handleScroll = () => {
  const shouldBeFixed = window.scrollY > window.screen.height + 500;
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

onMounted(async () => {
  // await getCategories();
  updateIsMobile();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', updateIsMobile);
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
  <nav class="py-4 sm:py-6 border-y-2 justify-around sm:px-4 flex text-xs mb-12" :class="{
    'md:fixed top-0 w-full bg-white shadow-md z-20 py-1': isFixed,
    'relative top-0 w-full bg-white shadow-md z-20 py-1': !isFixed
  }">
    <!-- <nuxt-link v-if="isFixed" to="/" class="items-center hidden sm:flex">
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
    </nuxt-link> -->
    <div class="flex justify-around items-center">
      <div v-for="(button, index) in buttons" :key="index" class="flex w-auto px-1 sm:px-4 ">
        <client-only>
          <Dropdown v-if="button.items" v-model:shown="dropdownStates[index]" :positioning-disabled="isMobile"
            @apply-show="isMobile && onShow()" @apply-hide="isMobile && onHide()">
            <template #default>
              <span class="cursor-pointer flex justify-around items-center sm:gap-1">{{ button.name }}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                  stroke="currentColor" class="size-3 transition-transform duration-200 hidden md:flex"
                  :class="{ '-rotate-180': dropdownStates[index] }">
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
                  :to="`/destinations/${route.params.country}/${route.params.region}/${item.url}`">
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
          <NuxtLink v-else :to="`/destinations/${route.params.country}/${route.params.region}/${button.url}`"
            class="relative after:block after:w-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-700 after:origin-left hover:after:w-full">
            {{ button.name }}</NuxtLink>
        </client-only>
      </div>
    </div>
    <!-- <button v-if="isFixed" @click="inquireFormStore.openInquireNowForm()"
      class="py-3 px-5 text-primary border-2 border-primary hover:bg-primary hover:text-white focus:bg-primary focus:text-white cursor-pointer transition-colors duration-300 ease-in-out bg-orange-50 rounded-md shadow-md hidden sm:flex">
      Inquire Now
    </button> -->
    <!-- <a v-if="isFixed" href="#form-dream-adventure"
      class="py-3 px-5 text-primary border-2 border-primary hover:bg-primary hover:text-white focus:bg-primary focus:text-white cursor-pointer transition-colors duration-300 ease-in-out bg-orange-50 rounded-md shadow-md hidden sm:flex">
      Inquire Now
    </a> -->
  </nav>
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