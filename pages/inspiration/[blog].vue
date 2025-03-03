<script lang="ts" setup>
import Newsletter from '~/components/home/Newsletter.vue';
import TravelStories from '~/components/home/TravelStories.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

const inspirationDetail = ref(null)

onMounted(async () => {
  inspirationDetail.value = [
    {
      paquetes_destinos: [
        {
          destinos: {
            pais: {
              url: "history-culture",
            },
            url: "machu-picchu",
            nombre: "History & Culture"
          }
        },
      ],
      titulo: "Queensland Invites You to Vacation Like the Aussies Do",
      timeRead: 6,
      ahorro: 1000,
      published: "October 12, 2021",
    }
  ];
})
</script>
<template>
  <HeaderImgNav v-if="inspirationDetail" :packageDetail="inspirationDetail"></HeaderImgNav>
  <section class="container my-20 text-sm">
    <div class="w-2/3 mx-auto justify-center gap-6 flex-col flex">
      <p>There's a reason Queensland is where Australians go for holidays.</p>
      <p>
        Encompassing the powder-white sands of the <a href="#">Gold Coast</a>, exciting and ever-changing Brisbane, the
        laid-back seaside towns of the Sunshine Coast,
        the breathtaking Whitsundays and the twin natural wonders of the <a href="#">Great Barrier Reef</a> and the
        Daintree rainforest,
        Queensland is a full Australia vacation all on its own. With nonstop flights connecting both the United States
        and Canada,
        it’s never ever been easier to set down in Brissie and begin an unforgettable trip to Australia in the Sunshine
        State.
      </p>
      <h2 class="text-start font-playfair-display font-semibold text-3xl">All that glitters is on the Gold Coast.</h2>
    </div>
    <div class="my-16 border rounded-md overflow-hidden">
      <NuxtImg
        src="https://images.goway.com/production/inline-images/australia_gold_coast_aerial_AdobeStock_566486199.jpg?VersionId=UL7GWHqEIqxvezFxuKISW8yrYdBjQmZ1"
        class="w-full">
      </NuxtImg>
      <p class="py-4 px-2 text-xs">The Gold Coast is ideal for long days at the beach and long nights at local
        restaurants and
        bars.
      </p>
    </div>
    <div class="w-2/3 mx-auto justify-center gap-6 flex-col flex">
      <p>Departing every 30 minutes from Brisbane Airport (BNE), Queensland’s Airtrain makes it easy for those not
        renting a car to reach the Gold Coast in as little as 90 minutes. Once you’re there, it’s hard not to be
        mesmerized by the waves crashing on the seemingly endless white sands. But if you can tear yourself away from
        the beach, the Gold Coast lies at the foot of the world’s largest sub-tropical rainforest. Two regions that
        illustrated its beauty are Springbrook National Park, home to serene Pullingbrook Falls, and Lamington National
        Park, home to countless hiking trails, over 2300 species of wildlife, and even boutique wineries whose products
        you won’t find on North American shelves. T</p>
      <p>
        Be sure to spend a few days on the Gold Coast proper as well. If you don’t have a fear of heights (or you want
        to conquer one), get a bird’s eye view of the region at Skypoint atop the iconic Q1 building in Surfers
        Paradise. Prefer to keep your sightseeing on ground level? Immerse yourself in nature at Burleigh Heads National
        Park, or let your imagination wander amid mind-blowing contemporary Aussie art at HOTA. Visit the Jellurgal
        Aboriginal Culture Centre and get to know the traditional custodians of the region. Feeding the colourful
        lorikeets of Currumbin Sanctuary is a decades-old Gold Coast tradition. Then, feed yourself with delicious eats
        from around the world at Miami Marketta.
      </p>
      <p>
        Whether you’re more into lazing on the beach with a good book, exploring the coast’s canals and waterways by
        kayak, spending a day with the local wildlife or just exploring the coast’s many shopping, dining and nightlife
        options, there’s something on the Gold Coast for everyone.</p>
      <h2 class="text-start font-playfair-display font-semibold text-3xl">Nature thrives in big city Brisbane.</h2>
    </div>
    <div class="my-16 border rounded-md overflow-hidden">
      <NuxtImg
        src="https://images.goway.com/production/inline-images/bolivia_uyuni_salt_flats_reflecton_iStock-533577725_0.jpg?VersionId=mqzGBbtjUed.se.HFu7Apye3z9TenT_N"
        class="w-full">
      </NuxtImg>
      <p class="py-4 px-2 text-xs">
        Uyuni transforms into a liquid mirror in the wet season.
      </p>
    </div>
    <hr class="my-12 border-gray-300">
    <div class="flex flex-wrap justify-center items-center gap-2 text-gray-600 text-xs">
      <span class="text-gray-500">Related Topics</span>
      <button class="px-3 py-1 border rounded-full hover:bg-gray-200 transition">
        History & Culture
      </button>
      <button class="flex items-center px-3 py-1 border rounded-full hover:bg-gray-200 transition">
        <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 2C7.03 2 3 6.03 3 11c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 14a5 5 0 110-10 5 5 0 010 10z" />
        </svg>
        Perú
      </button>
      <button class="flex items-center px-3 py-1 border rounded-full hover:bg-gray-200 transition">
        <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 2C7.03 2 3 6.03 3 11c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 14a5 5 0 110-10 5 5 0 010 10z" />
        </svg>
        Cusco
      </button>
    </div>
  </section>
  <section class="bg-secondary bg-opacity-20 rounded-md p-6 flex items-center container w-2/3">
    <!-- Imagen del autor -->
    <div class="w-full p-6 flex justify-center">
      <NuxtImg
        src="https://images.goway.com/production/styles/author_photo_3xl/s3/author/ChristianBaines.png?h=d0e75635&itok=GSLQupow/author.png"
        alt="Christian Baines" class="w-2/3" />
    </div>

    <!-- Información del autor -->
    <div class="ml-6 gap-6 flex flex-col p-6">
      <h2 class="text-2xl font-bold font-playfair-display">Christian Baines</h2>
      <p class="text-sm text-gray-600">SouthAmerica - Contributing Writer</p>
      <p class="text-sm text-gray-700 mt-2">
        Christian’s first globetrotting adventure saw him get lost exploring the streets of Saigon.
        Following his nose to Asia’s best coffee, two lifelong addictions were born. A freelance writer
        and novelist, Christian’s travels have since taken him around his native Australia, Asia, Europe,
        and much of North America. His favourite trips have been through Japan, Spain, and Brazil, though
        with a love of off-beat, artsy cities, he’ll seize any opportunity to return to Paris, New York, or Berlin.
      </p>

      <!-- <div class="mt-4 flex items-center">
        <a href="#"
          class="text-sm relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0">
          Read More
        </a>
      </div> -->
    </div>
  </section>
  <TravelStories></TravelStories>
  <Newsletter></Newsletter>
</template>
<style></style>