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
              stroke="currentColor" class="w-6 h-6" @click="packageStore.showModalMenu = !packageStore.showModalMenu">
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

      <div class=" ">
        <nav class="container flex justify-center text-center">
          <nuxt-link to="#" class="menu-list" active-class="active">Peru Travel Packages</nuxt-link>
          <nuxt-link to="/destinations" class="menu-list" active-class="active">Destinations</nuxt-link>
          <nuxt-link to="/experiences" class="menu-list" active-class="active">Experiences</nuxt-link>
        </nav>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

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
onMounted(() => {
  updateBgColor();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Observa cambios en route.path para detectar correctamente cambios de ruta
watch(() => route.path, updateBgColor);
</script>