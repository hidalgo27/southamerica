<script setup lang="ts">
const loading = ref(true)
const video = ref()
const { onLoaded } = useScriptVimeoPlayer()

let player: any
onMounted(async () => {
  onLoaded(({ Vimeo }) => {
    player = new Vimeo.Player(video.value, {
      id: 1028540009,
      autoplay: true,
      loop: true,
      controls: false,
      muted: true
    })
    player.on('loaded', () => {
      loading.value = false
    })
  })

});


</script>

<template>

  <section>
    <div class="relative w-full h-screen 2xl:h-[70vh] px-3">
      <div class="overflow-hidden h-full relative rounded-md">
      <div class="mask gradient-cicle-gray items-center flex justify-center">
        <div v-if="loading" class="mt-40 text-center">
          Cargando ..
        </div>
      </div>
      <div v-show="!loading" ref="video" loading="lazy" class="vimeo-wrapper"></div>
      <div class="relative z-10 flex items-center  w-full h-full text-center">
        <div class=" container ">
          <h1 class="text-white/80 drop-shadow-[0_0_1px_rgba(255,255,255,0.5)] leading-tight text-5xl 2xl:text-7xl tracking-wide font-semibold font-playfair-display">Design Your Peru Discovery.</h1>
          <p class="text-white text-xl 2xl:text-lg tracking-widest font-light mt-5 ">Uncover the secrets of Machu Picchu and the wonders of Peru on a journey tailored just for you.</p>
        </div>
      </div>
      </div>
    </div>
  </section>

  <section class="container mt-28   mb-12">
    <div class="text-center ">
      <div class="border-title mb-2 mx-auto"></div>
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide"> Why South America Company?</h1>
      <div class="w-1/2 mx-auto  my-8">
        <p class="tracking-widest font-light">At South America Company, we specialize in tailor-made trips that immortalize the best days exploring Peru and South America. Every detail is meticulously designed to offer the maximum comfort, exclusivity, and luxury. From private villas and luxury cruises to customized itineraries, we make sure you only worry about enjoying your luxury vacation.</p>
      </div>
    </div>
  </section>

</template>