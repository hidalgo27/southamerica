<script lang="ts" setup>
const { $gsap } = useNuxtApp();

const props = defineProps({
  packageData: { Object, required: true }
});

const route = useRoute();
const isTravelPackages = route.path.includes("/inspiration") ? '/inspiration/' : '/travel-packages/';
onMounted(() => {
  const imageDivs = document.querySelectorAll(".image-div");
  const animatedDivs = document.querySelectorAll(".animated-div");

  imageDivs.forEach((imageDiv, index) => {
    const animatedDiv = animatedDivs[index];
    if (!animatedDiv) return;

    $gsap.set(animatedDiv, { opacity: 0, y: 100 });

    const handleMouseEnter = () => {
      $gsap.to(animatedDiv, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      $gsap.to(animatedDiv, { opacity: 0, y: 100, duration: 0.5, ease: "power2.out" });
    };

    imageDiv.addEventListener("mouseenter", handleMouseEnter);
    imageDiv.addEventListener("mouseleave", handleMouseLeave);

    onBeforeUnmount(() => {
      imageDiv.removeEventListener("mouseenter", handleMouseEnter);
      imageDiv.removeEventListener("mouseleave", handleMouseLeave);
    });
  });
});
</script>
<template>
  <a :href="isTravelPackages + packageData.url"
    class="image-div bg-white rounded-md border overflow-hidden w-full group  hover:shadow-xl hover:border-transparent transition duration-500 ease-in-out flex flex-col h-[60vh]"
    v-if="packageData">
    <div class="relative overflow-hidden h-full">
      <NuxtImg :src="packageData.imagen" :alt="packageData.titulo" format="webp" quality="75"
        class="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
      <div class="absolute top-4 left-4 flex flex-wrap gap-2 text-start">
        <span v-if="packageData.offers_home"
          class="bg-white text-secondary text-xs font-semibold px-2 py-1 rounded-full ">
          Specials
        </span>
        <NuxtLink v-if="packageData.paquetes_destinos && packageData.paquetes_destinos.length > 0"
          v-for="(region, i) in packageData.paquetes_destinos"
          :to="/destinations/ + region.destinos.pais.url + '/' + region.destinos.url"
          class="bg-blue-800 text-white text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap" :key="i">
          {{ region.destinos.nombre }}
        </NuxtLink>
      </div>
      <div class="animated-div absolute bottom-4 right-4 flex bg-white space-x-2 rounded-full p-2 y-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
          class="size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
    </div>
    <div class="p-6 text-left flex flex-col relative h-5/6">
      <div class="flex flex-col justify-between">
        <div class="flex flex-wrap gap-2 my-4" v-if="packageData.paquetes_categoria">
          <NuxtLink v-for="(tag, i) in packageData.paquetes_categoria" :key="i"
            :to="'/experiences/' + tag.categoria.url"
            class="bg-secondary bg-opacity-10 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
            :class="{ 'bg-white border': i === 0 }">
            {{ tag.categoria.nombre }}
          </NuxtLink>
        </div>
        <div class="text-xl font-semibold font-playfair-display tracking-wide block">
          {{ packageData.titulo }}
        </div>
        <p v-if="packageData.reserva" class="text-gray-500 my-6 flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
            class="size-6 text-secondary">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span class="ml-2"> Book by {{ packageData.reserva }}</span>
        </p>
      </div>
      <div class="flex justify-between items-center text-sm font-bold h-14 mt-auto">
        <div v-if="packageData.precio_paquetes" class=" flex flex-col xl:w-3/5">
          <span v-if="packageData.duracion" class="text-gray-700 text-sm md:text-lg tracking-wide">
            {{ packageData.duracion }} days
          </span>
          <span v-if="packageData.date" class="text-gray-700">
            {{ packageData.date }}
          </span>
          <span v-if="packageData.precio_paquetes && packageData.precio_paquetes[0].precio_d"
            class="block text-gray-700">
            <div class="flex flex-col text-xs xl:text-md 2xl:text-base">
              <div class="">
                From <span class="text-orange-600 text-base 2xl:text-lg">US$ {{ packageData.precio_paquetes[0].precio_d
                }}</span> /
                per person
              </div>
              <div class=" text-right self-end">
                based on 4 stars hotels
              </div>
            </div>
          </span>
          <div v-else class="flex justify-between items-center">Please Inquire</div>
        </div>
        <div v-else-if="packageData.author" class="flex justify-between items-center">
          <span class="block text-gray-700 mr-2">
            By {{ packageData.author }}
          </span>
        </div>
        <div
          class="text-orange-600 flex items-center md:text-xs lg:text-base lg:opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500 ease-in-out">
          <span>Request a Quote</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
            class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      </div>
    </div>
  </a>
</template>
<style></style>