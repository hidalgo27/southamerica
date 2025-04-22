<script setup lang="ts">
import { Dropdown } from 'floating-vue';
import 'floating-vue/dist/style.css';
import InquireNowForm from '../form/InquireNowForm.vue';

import { useCategoriesStore } from '~/stores/categories';
import { useDestinationStore } from '~/stores/destination';
import { useFormStore } from '~/stores/form';

const formStore = useFormStore();

const destinationStore = useDestinationStore();
const categoryStore = useCategoriesStore();

const route = useRoute();
defineOptions({ inheritAttrs: false });
const countries = ref([]);
const getCountries = async () => {
  const res: any = await destinationStore.getCountries();

  countries.value = res.map((country: any) => ({
    nombre: country.nombre,
    url: country.url,
    imagen: country.imagen_s,
    destinos: country.destino ? country.destino.map((dest: any) => ({
      nombre: dest.nombre,
      url: dest.url
    })) : []
  }));
};

const categories = ref([])
// const getCategories = async () => {
//   const res: any = await categoryStore.getCategories();
//   categories.value = res.map((category: any) => ({
//     nombre: category.nombre,
//     url: category.url,
//   }));
// };

const getCategories = async () => {
  const res: any = await categoryStore.getCategories();
  categories.value = res
    .filter((category: any) => category.estado === 1)
    .map((category: any) => ({
      nombre: category.nombre,
      url: category.url,
    }));
};

const position = ref('fixed');
const isOpen = ref(false);
const isHeaderVisible = ref(true);
let lastScrollPosition = 0;
let ticking = false;
const menus = ref([
  {
    title: "Travel Packages",
    items: [],
    url: "/travel-packages",
  },
  {
    title: "Destinations",
    items: [],
  },
  {
    title: "Experiences",
    items: [],
  },
  {
    title: "Inspiration",
    items: [],
  },
  {
    title: "Specials",
    items: [],
  },
  // {
  //   title: "Our Experts",
  //   items: [],
  // },
  /* {
    title: "Groups Only",
    items: [],
  }, */
  {
    title: "About Us",
    items: [],
  },
])

const updateMenu = () => {
  menus.value = [
    {
      title: "Travel Packages",
      items: [],
      url: "/travel-packages",
    },
    {
      title: "Destinations",
      items: countries.value.map((country: any) => ({
        name: country.nombre,
        firstTitle: {
          name: "Popular Countries",
          items: country.destinos.map((dest: any) => ({
            name: dest.nombre,
            link: `/destinations/${country.url}/${dest.url}`
          }))
        },
        link: `/destinations/${country.url}`,
        image: country.imagen
      }))
    },
    {
      title: "Experiences",
      items: categories.value.map((category: any) => ({
        name: category.nombre,
        link: `/experiences/${category.url}`
      })),
      image: "https://plus.unsplash.com/premium_photo-1686507182176-7c32d2e8088b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c291dGhhbWVyaWNhfGVufDB8fDB8fHww",
      url: "/experiences"
    },
    {
      title: "Inspiration",
      items: [],
      url: "/inspiration"
    },
    {
      title: "Specials",
      items: [],
      url: "/special-offers"
    },
    // {
    //   title: "Our Experts",
    //   items: countries.value.map((country: any) => ({
    //     name: country.nombre,
    //     link: `/our-experts/${country.url}`,
    //   })),
    //   image: "https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj",
    //   url: "/our-experts"
    // },
    /* {
      title: "Groups Only",
      items: [
        {
          name: "Travel Styles",
          firstTitle: {
            name: "Why Group Travel",
            items: [
              {
                name: "Adventure",
                link: "/groups"
              },
              {
                name: "Cruises",
                link: "/groups"
              },
              {
                name: "Family",
                link: "/groups"
              }
            ]
          },
          link: "/groups",
          image: "https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext25/image_24703_v1.jpg"
        },
       {
          name: "Groups Destination",
          firstTitle: {
            name: "Explore",
            items: [
              {
                name: "Group Specialists",
                link: "/groups"
              },
              {
                name: "Why Group Travel",
                link: "/groups"
              },
            ]
          },
          link: "/groups",
        }, 
      ],
    }, */
    {
      title: "About Us",
      image: "https://plus.unsplash.com/premium_photo-1661964374794-dccd9e44f357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNvdXRoYW1lcmljYXxlbnwwfHwwfHx8MA%3D%3D",
      items: [{ name: "Our Story", link: "/about-us/our-story" }, { name: "Why SouthAmerica", link: "/about-us/why-southamerica" }, { name: "Customer Service", link: "/about-us/customer-service" }, { name: "Contact Us", link: "/about-us/contact-us" }, { name: "Careers", link: "/about-us/careers" }, { name: "Our Policies", link: "/about-us/our-policies" }],
      url: "/about-us"
    },
  ]
}
// { name: "Meet the Team", link: "/about-us/meet-the-team" }
const dropdownStates = ref(menus.value.map(() => false));
const closeDropdowns = () => {
  dropdownStates.value = dropdownStates.value.map(() => false);
};

const hoveredItem = ref(null);

const setHoveredItem = (item) => {
  hoveredItem.value = item.firstTitle ? item : null;
};
const handleDropdownOpen = (menu) => {
  const firstItemWithTitle = menu.items.find(item => item.firstTitle);
  hoveredItem.value = firstItemWithTitle || null;
};

const handleScroll = () => {
  const currentScrollPosition = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(() => {
      isHeaderVisible.value = currentScrollPosition <= lastScrollPosition || currentScrollPosition < 50;
      lastScrollPosition = currentScrollPosition;
      ticking = false;
    });
    ticking = true;
  }
};

// Llama a la función en el montaje inicial
onMounted(async () => {
  await getCountries();
  await getCategories();
  updateMenu();
  updateIsMobile();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', closeDropdowns);
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('scroll', closeDropdowns);
  window.removeEventListener('resize', updateIsMobile);
});

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

// Cierra dropdowns cuando cambie la ruta
watch(() => route.fullPath, () => {
  closeDropdowns();
  closeMenu();
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

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const toggleDropdown = (index: number) => {
  dropdownStates.value = dropdownStates.value.map((state, i) => i === index ? !state : false);
};
</script>
<template>
  <header v-bind="$attrs" class="header-container">
    <div class="top-0 left-0 w-full z-30 transition-transform duration-300"
      :class="`${position}  ${isHeaderVisible ? '-translate-y-0' : '-translate-y-full'}`">
      <div :class="`rounded-md bg-orange-50 hidden sm:block m-3`">
        <div class="border-b border-secondary border-opacity-20">
          <div class="p-12 flex justify-between py-5 items-center">
            <div class="flex items-center gap-4">
              <nuxt-link to="/">
                <div class="font-playfair-display text-3xl font-medium flex items-end">
                  South
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                  </svg>
                  America
                  <div class="px-1">
                    <span class="text-sm italic">company</span>
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div class="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
            <div class="flex gap-3 items-center">
              <div class="leading-5 text-right">
                <span class="font-semibold block">+1 (202) 4911478</span>
                <span class="text-sm">Or contact your travel advisor</span>
              </div>
              <a class="btn-primary-outline bg-orange-50 " href="#form-dream-adventure">Inquire Now</a>
              <!--              <button @click="formStore.openInquireNowForm()" class="btn-primary-outline bg-orange-50 "-->
              <!--                      href="#form-dream-adventure">Inquire Now</button>-->
              <!-- <InquireNowForm :isOpen="formStore.InquireNowFormOpen" @close="formStore.closeInquireNowForm()">
              </InquireNowForm> -->
            </div>
          </div>
        </div>

        <div>
          <nav class="flex flex-row gap-3 item-center justify-center text-start">
            <div v-for="(menu, index) in menus" :key="index" class="relative">
              <client-only>
                <NuxtLink v-if="!menu.items[0]" :to="menu.url" class="menu-list focus:outline-none flex">
                  {{ menu.title }}
                </NuxtLink>
                <Dropdown v-else v-model:shown="dropdownStates[index]" :positioning-disabled="isMobile"
                  @apply-show="isMobile && onShow()" @apply-hide="isMobile && onHide()">
                  <button class="menu-list focus:outline-none" @click="handleDropdownOpen(menu)">
                    {{ menu.title }}
                  </button>
                  <template #popper="{ hide }">
                    <div
                      class="v-popper bg-white text-gray-800 rounded-t-md md:rounded-md flex md:flex-col lg:flex-row text-sm"
                      :class="[!menu.items[0].firstTitle ? ' h-96 p-6 max-h-96' : '', menu.title === 'Experiences' ? 'w-[50vh]' : 'md:w-[80vh] lg:w-[100vh] gap-6']">
                      <button v-if="isMobile" @click="hide()" class="absolute top-2 right-2 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                          stroke="currentColor" class="w-5 h-5 text-gray-500 hover:text-gray-800 transition">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div :class="[
                        !menu.items[0].firstTitle ? '' : 'grid grid-flow-col md:grid-cols-4',
                        menu.title === 'Experiences' ? 'w-2/3' : 'w-full'
                      ]">
                        <div class="col-span-1 relative "
                          :class="!menu.items[0].firstTitle ? '' : 'py-6 px-2 md:p-6 border-gray-200 border-r'">
                          <span class="text-xs">{{ menu.title }}</span>
                          <div :class="[
                            menu.title === 'Experiences' ? 'grid-cols-1' : '',
                            menu.image && menu.title !== 'Experiences' ? 'grid grid-cols-3 overflow-x-scroll max-h-56 md:max-h-24 lg:max-h-56' : 'overflow-x-scroll max-h-64',
                          ]">
                            <div v-for="(item, idx) in menu.items" :key="idx" class="text-gray-800 ">
                              <template v-if="item.firstTitle">
                                <button
                                  class="w-full text-start flex items-center p-2 rounded-md my-0.5 justify-between hover:bg-gray-100 group "
                                  @mouseover="setHoveredItem(item)">
                                  {{ item.name }}
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-4 hidden group-hover:block">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                      d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                  </svg>
                                </button>
                              </template>
                              <template v-else>
                                <div class="py-2 text-gray-800 hover:text-orange-500 duration-300 text-md">
                                  <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
                                </div>
                              </template>
                            </div>
                          </div>
                          <NuxtLink v-if="menu.title === 'Destinations'" :to="'/destinations'"
                            class=" bg-orange-500 absolute bottom-6 text-center flex items-center py-2 px-1 md:p-2 rounded-md justify-between hover:bg-orange-600 text-white duration-300 w-10/12 md:w-9/12 2xl:w-10/12">
                            Destinations
                          </NuxtLink>
                        </div>
                        <div v-if="hoveredItem" class="col-span-3">
                          <div
                            class="rounded-md bg-white text-gray-800 p-6 gap-2 flex md:flex-col lg:flex-row justify-between h-96 min-h-96">
                            <div class="flex flex-col relative w-full h-full gap-2">
                              <div v-if="hoveredItem.firstTitle">
                                <span class="text-xs mb-12">{{ hoveredItem.firstTitle.name }}</span>
                                <div
                                  class="grid md:grid-cols-3 gap-x-6 overflow-scroll max-h-64 md:max-h-36 lg:max-h-64 mb-2">
                                  <div v-for="sub in hoveredItem.firstTitle.items" :key="sub.name"
                                    class="py-2 text-gray-800 hover:text-orange-500 duration-300">
                                    <NuxtLink :to="sub.link">{{ sub.name }}</NuxtLink>
                                  </div>
                                </div>
                              </div>
                              <NuxtLink v-if="menu.title === 'Destinations'" :to="hoveredItem.link"
                                class="text-semibold duration-300 text-md absolute bottom-0 inline-block after:block after:w-full after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:origin-left hover:after:w-0">
                                Explore all {{ hoveredItem.name }}
                              </NuxtLink>
                            </div>
                            <NuxtLink v-if="hoveredItem.image" :to="hoveredItem.link"
                              class="m-0 w-full h-full lg:w-56 rounded-md overflow-hidden group relative hidden md:block">
                              <NuxtImg :src="hoveredItem.image"
                                class="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-105"
                                loading="lazy">
                              </NuxtImg>
                              <div
                                class="absolute bottom-0 w-full bg-opacity-50 text-white text-center p-2 flex items-center justify-between ">
                                <span>{{ hoveredItem.name }}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                                  stroke="currentColor" class="size-5">
                                  <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                              </div>
                            </NuxtLink>
                          </div>
                        </div>
                      </div>
                      <NuxtLink v-if="menu.image" :to="menu.url"
                        class="hidden md:block w-full h-full lg:w-52 rounded-md overflow-hidden group relative">
                        <NuxtImg :src="menu.image"
                          class="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-105"
                          loading="lazy">
                        </NuxtImg>
                        <div
                          class="absolute bottom-0 w-full bg-opacity-50 text-white text-center p-2 flex items-center justify-between ">
                          <span>{{ menu.title }}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      </NuxtLink>
                    </div>
                  </template>
                </Dropdown>
              </client-only>
            </div>
          </nav>
        </div>
      </div>
      <div class="md:hidden rounded-md bg-orange-50 m-3">
        <div class=" flex justify-between items-center">
          <div class="flex justify-between items-center w-full ">
            <div class="py-3 px-2 flex items-center">
              <nuxt-link to="/">
                <div class="font-playfair-display text-sm md:text-3xl font-medium flex items-end">
                  South
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                  </svg>
                  America
                  <div class="px-1">
                    <span class="text-xs italic">company</span>
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div class="flex items-center py-3 px-2">
              <button @click="formStore.openInquireNowForm()"
                class="inline-block px-2 py-1 sm:py-2 sm:px-4 text-primary border-2 border-primary rounded-md hover:bg-primary hover:text-white focus:bg-primary focus:text-white cursor-pointer transition-colors duration-300 ease-in-out text-xs bg-orange-50">Inquire
                Now</button>
            </div>
          </div>
          <button @click="toggleMobileMenu"
            class=" py-3 px-2 focus:outline-none border-l border-primary border-opacity-25">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"></div>
      <transition name="slide">
        <div v-if="isMobileMenuOpen"
          class="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-80 bg-white p-6 z-50 rounded-t-md">
          <button @click="toggleMobileMenu" class="absolute top-3 right-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav class="flex flex-col gap-2">
            <div v-for="(menu, index) in menus" :key="index">
              <NuxtLink v-if="!menu.items[0]" :to="menu.url" class="w-full text-left p-2 rounded-md flex"
                @click="toggleMobileMenu">
                {{ menu.title }}
              </NuxtLink>
              <button v-else @click="toggleDropdown(index), handleDropdownOpen(menu)"
                class="w-full text-left p-2 rounded-md ">
                {{ menu.title }}
              </button>
            </div>
          </nav>
        </div>
      </transition>
    </Teleport>
  </header>
</template>
<style scoped>
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s;
}

.slide-enter-from {
  transform: translate(-50%, 100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translate(-50%, 100%);
  opacity: 0;
}
</style>
