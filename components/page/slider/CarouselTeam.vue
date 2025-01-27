<template>
  <div class="container">
    <div class="grid md:grid-cols-7">
      <div class="col-span-2">
        <h2 class="text-3xl font-bold">OUR <br>TEAM</h2>
        <p class="my-6">Meet our team of specialists, <br> who are in charge of customizing <br> your LATAM travel package to make <br> it an unforgettable experience.</p>
        <div class="flex gap-6 hidden md:block">
          <button class="rounded-full border-2 p-2  border-gray-500 focus:bg-gray-800 focus:text-white" @click="prevSlide">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button class="rounded-full border-2 p-2  border-gray-500 focus:bg-gray-800 focus:text-white" @click="nextSlide">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div class="col-span-5">

        <Carousel  ref="carouselRef" :wrap-around="true" :breakpoints="breakpoints">
          <slide v-for="team in listTeam" :key="team.id">
            <!-- Aquí puedes poner el contenido de cada slide, por ejemplo: -->

            <div class="mx-3 p-3 bg-white w-full rounded-xl my-2 shadow-md cursor-pointer">
              <div class="relative">
                <img :src="team.imagen_perfil" alt="" class="rounded-xl">
                <div class="bg-primary py-3 rounded-xl absolute inset-x-0 bottom-0 text-white">
                  Hola, Soy {{ team.nombre }}</div>
              </div>
              <div class="">
                <h3 class="text-lg text-primary my-3">{{ team.nombre }}</h3>
              </div>
            </div>

          </slide>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="CarouselTeam">
import "vue3-carousel/dist/carousel.css"
import {Carousel, Slide} from "vue3-carousel"
import {usePackageStore} from "~/stores/packages"

const packageStore = usePackageStore()

const listTeam = ref([])

const breakpoints = {
  // 500px and up
  350: {
    itemsToShow: 1.2,
    snapAlign: 'start',
  },
  // 700px and up
  700: {
    itemsToShow: 2.2,
    snapAlign: 'center',
  },
  // 1024 and up
  1024: {
    itemsToShow: 2.2,
    snapAlign: 'start',
  },
}

const carouselRef = ref();

const prevSlide = () => {
  carouselRef.value.prev();
}

const nextSlide = () => {
  carouselRef.value.next();
}

const getTeam = async () => {
  const res:any = await packageStore.getTeam()


  listTeam.value = res
  // if (res.token) {
  //   policyStore['tokenLogin'] = res.token
  //   loadingUser.value = false
  // }
}

interface Item {
  id: number;
  name: string;
}

const getUniqueDestinos = (arr:any) => {
  const unique:any = {};
  const uniqueDestinos = [];
  for (const paqueteDestino of arr) {
    const { destinos } = paqueteDestino;
    if (!unique[destinos.pais]) {
      unique[destinos.pais] = true;
      uniqueDestinos.push(destinos);
    }
  }
  return uniqueDestinos;
};

const getThreeStarPrice = (arr:any) => {
  const price = arr.find((priceInfo: { estrellas: number; }) => priceInfo.estrellas === 3);
  return price ? price.precio_d : 'No disponible';
}

onMounted(async () => {
  await getTeam()
})


</script>