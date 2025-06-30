<script lang="ts" setup>
import WorkWithUsForm from "~/components/form/WorkWithUsForm.vue";

const isModalOpen = ref(false)
const gridItems = [
  {
    id: 1,
    imageUrl: "https://storage.googleapis.com/a1aa/image/cccae178-5777-429b-3be7-69115e5fd1a6.jpg",
    altText: "Underwater scene with a school of striped fish swimming in blue water",
    title: "Travel Packages",
    url: "/travel-packages",
    buttonText: "Explore More"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1620658927695-c33df6fb8130?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29zdGElMjByaWNhfGVufDB8fDB8fHww",
    altText: "Group of elephants walking on grassy savannah under a clear sky",
    title: "Colombia",
    url: "/destinations",
    buttonText: "Discover Destinations",
  },
  {
    id: 3,
    imageUrl: "https://storage.googleapis.com/a1aa/image/d8ee014b-a7cc-4b2e-1a5e-bf3d19fdeaca.jpg",
    altText: "Silhouetted group of people standing on a hilltop at sunset with colorful sky",
    title: "Our Team",
    url: "/about-us/our-team",
    buttonText: "Meet the Entire Team"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29yayUyMHRvZ2V0aGVyfGVufDB8fDB8fHww",
    altText: "Couple holding hands outdoors at twilight with mountains in background",
    title: "Work with Us",
    buttonText: "Contact Us",
    centerText: true,
    isModal: true
  }
];

const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

const unlockBodyScroll = () => {
  document.body.style.overflow = '';
};


const openModal = () => {
  isModalOpen.value = true
  lockBodyScroll();
}

const closeModal = () => {
  isModalOpen.value = false
  unlockBodyScroll();
}

onBeforeUnmount(() => {
  unlockBodyScroll()
})

const handleFormSubmitSuccess = () => {
  closeModal()
}
</script>
<template>
  <div class="pt-24">
    <div class="container flex flex-col">
      <h1 class="text-4xl italic font-playfair mb-6">EXPLORE MORE WITH GOTOGROUP</h1>
    </div>
    <div class="flex flex-wrap w-full h-full">
      <div class="relative flex-1 min-w-[50%] lg:min-w-[25%] h-full" v-for="item in gridItems" :key="item.id">
        <NuxtImg :src="item.imageUrl" :alt="item.altText"
          class="w-full h-[30vh] md:h-[40vh] xl:h-[50vh] object-cover brightness-75" loading="lazy" />
        <div
          class="absolute inset-0 flex flex-col justify-center items-center text-white italic text-2xl md:text-3xl font-playfair"
          :class="{ 'text-center px-4': item.centerText }">
          <div class="font-semibold">{{ item.title }}</div>
          <button v-if="item.isModal" @click="openModal"
            class="mt-4 border border-white px-4 py-1 text-sm md:text-base hover:bg-white hover:text-black transition duration-300 cursor-pointer">
            {{ item.buttonText }}
          </button>
          <NuxtLink v-else :to="item.url || '#'"
            class="mt-4 border border-white px-4 py-1 text-sm md:text-base hover:bg-white hover:text-black transition duration-300">
            {{ item.buttonText }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70"
        @click.self="closeModal">
        <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Botón de cierre -->
          <button @click="closeModal"
            class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Contenido del modal -->
          <div>
            <WorkWithUsForm @submit-success="handleFormSubmitSuccess" @cancel="closeModal" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style>
/* Transición suave para el modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>