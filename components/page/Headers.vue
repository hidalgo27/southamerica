<script setup lang="ts">
import 'floating-vue/dist/style.css';
import { Dropdown } from 'floating-vue';
import InquireNowForm from '../form/InquireNowForm.vue';

import { useDestinationStore } from '~/stores/destination';

const destinationStore = useDestinationStore();

const countries = ref([]);
const getCountries = async () => {
  const res: any = await destinationStore.getCountries();

  countries.value = res.map((country: any) => ({
    nombre: country.nombre,
    url: country.url,
    imagen: country.imagen,
    destinos: country.destino ? country.destino.map((dest: any) => ({
      nombre: dest.nombre,
      url: dest.url
    })) : []
  }));
};

const position = ref('fixed');
const isOpen = ref(false);
const isHeaderVisible = ref(true);
let lastScrollPosition = 0;
let ticking = false;
const menus = ref([
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
  {
    title: "Our Experts",
    items: [],
  },
  {
    title: "Groups Only",
    items: [],
  },
  {
    title: "About Us",
    items: [],
  },
])

const updateMenu = () => {
  menus.value = [
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
        link: country.url,
        image: country.imagen
      }))
    },
    {
      title: "Experiences",
      items: [
        {
          name: "Travel Styles",
          firstTitle: {
            name: "Explore",
            items: [
              {
                name: "Adventure",
                link: "/experiences/adventure"
              },
              {
                name: "Cruises",
                link: "/experiences/cruises"
              },
              {
                name: "Family",
                link: "/experiences/family"
              }
            ]
          },
          link: "/experiences",
          image: "https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Queenstown/img_HeritageQueenstown_Exterior.jpg"
        },
        {
          name: "Ways to travel",
          firstTitle: {
            name: "Explore",
            items: [
              {
                name: "Escorted Touring",
                link: "/experiences/escorted-touring"
              },
              {
                name: "Rail Vacations",
                link: "/experiences/rail-vacations"
              },
              {
                name: "Vacation Packages with Air",
                link: "/experiences/vacation-packages-with-air"
              },
            ]
          },
          link: "/experiences",
        },
      ],
    },
    {
      title: "Inspiration",
      items: [{ name: "History & Culture", link: "/inspiration/history-and-culture" }, { name: "Trending", link: "/inspiration/trending" }, { name: "Wellness", link: "/inspiration/wellness" }],
      image: "https://images.goway.com/production/styles/content_highlight_3xl/s3/content-highlight/2024-02/iStock-1403046192.jpg?h=ecc2d3bd&itok=Yck4r6Gg",
      url: "/inspiration"
    },
    {
      title: "Specials",
      items: [{ name: "Argentina", link: "/special-offers/argentina" }, { name: "Peru", link: "/special-offers/peru" }, { name: "Ecuador", link: "/special-offers/ecuador" }],
      image: "https://images.goway.com/production/styles/content_highlight_3xl/s3/content-highlight/2024-02/iStock-1403046192.jpg?h=ecc2d3bd&itok=Yck4r6Gg",
      url: "/special-offers"
    },
    {
      title: "Our Experts",
      items: [{ name: "Argentina", link: "/our-experts/argentina" }, { name: "Peru", link: "/our-experts/peru" }, { name: "Ecuador", link: "/our-experts/ecuador" }],
      image: "https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj",
      url: "/our-experts"
    },
    {
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
    },
    {
      title: "About Us",
      items: [{ name: "Our Story", link: "/about-us/our-story" }, { name: "Why SouthAmerica", link: "/about-us/why-southamerica" }, { name: "Meet the Team", link: "/about-us/meet-the-team" }, { name: "Customer Service", link: "/about-us/customer-service" }, { name: "Contact Us", link: "/about-us/contact-us" }, { name: "Careers", link: "/about-us/careers" }, { name: "Our Policies", link: "/about-us/our-policies" }],
      image: "https://admin.goway.app/content/DataObjects/PropertyReference/Image/ext26/image_25013_v1.jpg"
    },
  ]
}

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
  updateMenu();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>
<template>
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
            <button @click="isOpen = true" class="btn-primary-outline bg-orange-50 "
              href="#form-dream-adventure">Inquire Now</button>
            <InquireNowForm :isOpen="isOpen" @close="isOpen = false"></InquireNowForm>
          </div>
        </div>
      </div>

      <div>
        <nav class="flex flex-row gap-3 item-center justify-center text-start">
          <div v-for="(menu, index) in menus" :key="index" class="relative">
            <client-only>
              <Dropdown>
                <button class="menu-list focus:outline-none" @click="handleDropdownOpen(menu)">
                  {{ menu.title }}
                </button>
                <template #popper>
                  <div
                    class="bg-white text-gray-800 rounded-md w-[80vh] lg:w-[100vh] 2xl:[70vh] flex md:flex-col lg:flex-row gap-6 text-sm"
                    :class="!menu.items[0].firstTitle ? ' h-96 p-6 min-h-96' : ''">
                    <div class="w-full " :class="!menu.items[0].firstTitle ? '' : 'grid grid-flow-col grid-cols-4 '">
                      <div class="col-span-1  relative "
                        :class="!menu.items[0].firstTitle ? '' : 'p-6 border-gray-200 border-r'">
                        <span class="text-xs">{{ menu.title }}</span>
                        <div :class="menu.image ? 'grid grid-cols-3 gap-x-10' : ''">
                          <div v-for="(item, idx) in menu.items" :key="idx" class="text-gray-800">
                            <template v-if="item.firstTitle">
                              <button
                                class="w-full text-start flex items-center p-2 rounded-md my-0.5 justify-between hover:bg-gray-100 group"
                                @mouseover="setHoveredItem(item)">
                                {{ item.name }}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                  stroke-width="1.5" stroke="currentColor" class="size-4 hidden group-hover:block">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
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
                          class=" bg-orange-500 absolute bottom-6 text-center flex items-center p-2 rounded-md justify-between hover:bg-orange-600 text-white duration-300 w-9/12 2xl:w-10/12">
                          Explore all Destinations
                        </NuxtLink>
                      </div>
                      <div v-if="hoveredItem" class="col-span-3">
                        <div
                          class="rounded-md bg-white text-gray-800 p-6 flex md:flex-col lg:flex-row justify-between h-96 min-h-96">
                          <div class="flex flex-col relative w-full h-full">
                            <div v-if="hoveredItem.firstTitle">
                              <span class="text-xs mb-12">{{ hoveredItem.firstTitle.name }}</span>
                              <div class="grid grid-cols-3 gap-x-10">
                                <div v-for="sub in hoveredItem.firstTitle.items" :key="sub.name"
                                  class="py-2 text-gray-800 hover:text-orange-500 duration-300">
                                  <NuxtLink :to="sub.link">{{ sub.name }}</NuxtLink>
                                </div>
                              </div>
                            </div>
                            <NuxtLink v-if="menu.title === 'Destinations'" :to="'/destinations/' + hoveredItem.link"
                              class="text-semibold duration-300 text-md absolute bottom-0 inline-block after:block after:w-full after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:origin-left hover:after:w-0">
                              Explore all {{ hoveredItem.name }}
                            </NuxtLink>
                          </div>

                          <div v-if="hoveredItem.image" class="m-0 w-full h-full lg:w-56 rounded-md overflow-hidden">
                            <NuxtImg :src="hoveredItem.image" class="w-full h-full object-cover"></NuxtImg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="menu.image" class=" w-full h-full lg:w-52 rounded-md overflow-hidden">
                      <NuxtImg :src="menu.image" class="w-full h-full "></NuxtImg>
                    </div>
                  </div>
                </template>
              </Dropdown>
            </client-only>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<style></style>
