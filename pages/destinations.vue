<script lang="ts" setup>
import CardDestination from '@/components/destinations/CardDestination.vue';

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

const continentes = [
  {
    title: 'Africa',
    description: 'Whether you’re heading on safari or exploring some of the continent’s welcoming cultures, Africa has an adventure in store for you.',
    image: 'https://picsum.photos/300/300',
    countries: [
      {
        title: 'Kenya',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Morocco',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'South Africa',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Tanzania',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Zimbabwe',
        image: 'https://picsum.photos/400/300'
      }
    ]
  },
  {
    title: 'Asia',
    description: 'From the Great Wall of China to the beaches of Thailand, Asia is a continent of contrasts and adventure.',
    image: 'https://picsum.photos/500/300',
    countries: [
      {
        title: 'China',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'India',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Japan',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Thailand',
        image: 'https://picsum.photos/400/300'
      },
    ]
  },
  {
    title: 'Europe',
    description: 'From the beaches of Greece to the mountains of Switzerland, Europe is a continent of history and adventure.',
    image: 'https://picsum.photos/400/400',
    countries: [
      {
        title: 'France',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Italy',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Spain',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'United Kingdom',
        image: 'https://picsum.photos/400/300'
      },
    ]
  },
  {
    title: 'North America',
    description: 'From the beaches of Mexico to the mountains of Canada, North America is a continent of adventure and natural beauty.',
    image: 'https://picsum.photos/700/300',
    countries: [
      {
        title: 'Canada',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Mexico',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'United States',
        image: 'https://picsum.photos/400/300'
      },
    ]
  },
  {
    title: 'Oceania',
    description: 'Oceania is a continent of islands, beaches, and adventure. Explore the Great Barrier Reef, the beaches of Fiji, and the mountains of New Zealand.',
    image: 'https://picsum.photos/400/700',
    countries: [
      {
        title: 'Australia',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Fiji',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'New Zealand',
        image: 'https://picsum.photos/400/300'
      },
    ]
  },
  {
    title: 'South America',
    description: 'South America is a continent of adventure, culture, and natural beauty. Explore the Amazon Rainforest, the Andes Mountains, and the beaches of Brazil.',
    image: 'https://picsum.photos/400/300',
    countries: [
      {
        title: 'Argentina',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Brazil',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Chile',
        image: 'https://picsum.photos/400/300'
      },
      {
        title: 'Peru',
        image: 'https://picsum.photos/400/300'
      },
    ]
  },
]
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
            <h1
              class="text-white/80 drop-shadow-[0_0_1px_rgba(255,255,255,0.5)] leading-tight text-5xl 2xl:text-7xl tracking-wide font-semibold font-playfair-display">
              Design Your Peru Discovery.</h1>
            <p class="text-white text-xl 2xl:text-lg tracking-widest font-light mt-5 ">Uncover the secrets of Machu
              Picchu and the wonders of Peru on a journey tailored just for you.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container mt-28 mb-12">
    <div class="text-center ">
      <div class="border-title mb-2 mx-auto"></div>
      <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide"> Where Are You Headed To Next?
      </h1>
      <div class="w-1/2 mx-auto my-8">
        <p class="tracking-widest font-light">Experience all that the world has to offer in just the way you want. Our
          team of Destination Specialists have been tailoring dream vacations for over 50 years. We handle every part of
          the travel journey, from flights to tours to accommodations to group travel. Let us do the hard work so you
          can sit back, relax, and take in the world. Rely on personalized travel planning and enjoy elevated
          experiences in destination. Follow your fancy and explore new parts of the world in new ways.</p>
      </div>
    </div>
  </section>

  <CardDestination :destinations="continentes"></CardDestination>

</template>

<style></style>