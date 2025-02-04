<script setup lang="ts">
import { useRoute } from 'vue-router';
import 'floating-vue/dist/style.css';
import { Dropdown, Menu, Popper } from 'floating-vue';

const route = useRoute();
const bgColor = ref('bg-gray-500');
const position = ref('fixed');
const zIndex = ref();
const isHeaderVisible = ref(true);
let lastScrollPosition = 0;
let ticking = false;

// Función para verificar la ruta y establecer el color
const updateBgColor = () => {
  if (['/why-book-with-us', '/hotels', '/about-us'].includes(route.path)) {
    bgColor.value = 'bg-tertiary';
  } else if (route.path === '/peru-travel-packages') {
    bgColor.value = 'bg-white/50';
  } else {
    bgColor.value = 'bg-secondary';
  }
  console.log(route.path);
  if (route.path !== '/') {
    position.value = 'fixed';
    zIndex.value = 'z-50';
  }
};



// Observa cambios en route.path para detectar correctamente cambios de ruta
watch(() => route.path, updateBgColor);

const menus = ref([
  {
    title: "Destinations", open: false,
    items: [
      {
        name: "Argentina",
        popularCountries: [
          {
            name: "Buenos Aires",
            link: "/buenos-aires"
          },
          {
            name: "Iguazu Falls",
            link: "/iguazu-falls"
          },
          {
            name: "Patagonia",
            link: "/patagonia"
          }
        ],
        popularDestinations: [
          {
            name: "Bariloche",
            link: "/bariloche"
          },
          {
            name: "Mendoza",
            link: "/mendoza"
          },
          {
            name: "Salta",
            link: "/salta"
          }
        ],
        link: "/argentina",
        image: "https://picsum.photos/200/300"
      },
      {
        name: "Peru",
        popularCountries: [
          {
            name: "Cusco",
            link: "/cusco"
          },
          {
            name: "Lima",
            link: "/lima"
          },
          {
            name: "Machu Picchu",
            link: "/machu-picchu"
          }
        ],
        popularDestinations: [
          {
            name: "Arequipa",
            link: "/arequipa"
          },
          {
            name: "Ica",
            link: "/ica"
          },
          {
            name: "Puno",
            link: "/puno"
          }
        ],
        link: "/peru",
        image: "https://picsum.photos/200/300"

      }]
  },
  {
    title: "Experiences", open: false,
    items: [{ name: "Travel Style", link: "/safari" }, { name: "Ways to Travel", link: "/diving" }]
  },
  { title: "Specials", open: false, items: [{ name: "Argentina", link: "/argentina" }, { name: "Peru", link: "/peru" }] },
  { title: "Our Experts", open: false, items: [{ name: "Meet the Team", link: "/team" }] },
  { title: "Groups Only", open: false, items: [{ name: "Private Tours", link: "/private-tours" }] },
  { title: "About Us", open: false, items: [{ name: "Company Info", link: "/info" }] },
  { title: "Travel Packages", open: false, items: [{ name: "Luxury Trips", link: "/luxury" }] },
])

const toggleMenu = (index: number) => {
  console.log(index)
  menus.value = menus.value.map((menu, idx) => ({
    ...menu,
    open: idx === index ? !menu.open : false,
  }));
}

const closeMenus = () => {
  menus.value = menus.value.map((menu) => ({ ...menu, open: false }));
};

const activeItem = ref(null);

const setActiveItem = (item: null) => {
  activeItem.value = item;
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
  closeMenus();
};

// Llama a la función en el montaje inicial
onMounted(() => {
  updateBgColor();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(route, () => {
  closeMenus();
});
</script>
<template>
  <div
    :class="`${position} top-0 left-0 w-full ${zIndex} transition-transform duration-300 ${isHeaderVisible ? '-translate-y-0' : '-translate-y-full'}`">
    <div :class="`rounded-md ${bgColor} hidden sm:block m-3`">
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
            <a class="btn-primary-outline" href="#form-dream-adventure">Get a Quote</a>
          </div>
        </div>
      </div>

      <div>
        <nav class="container flex justify-center text-start">
          <div v-for="(menu, index) in menus" :key="index" class="relative">
            <Menu>
              <button class="menu-list px-4 py-2 focus:outline-none">
                {{ menu.title }}
              </button>
              <template #popper>
                <div v-for="(item, idx) in menu.items" :key="idx" class="p-4 py-2 bg-white text-gray-800">
                  <template v-if="item.popularCountries">
                    <Menu placement="right">
                      <button class="">
                        {{ item.name }}
                      </button>
                      <template #popper>
                        <ul class="submenu">
                          <li v-for="sub in item.popularCountries" :key="sub.name"
                            class="p-4 py-2 bg-white text-gray-800">
                            <NuxtLink :to="sub.link">{{ sub.name }}</NuxtLink>
                          </li>
                        </ul>
                      </template>
                    </Menu>
                  </template>

                </div>
              </template>
            </Menu>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<style></style>
