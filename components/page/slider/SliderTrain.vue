<template>
  <div class="" >

    <div class="flex justify-start gap-2 mb-2">
      <button class="border p-2  border-gray-500 focus:bg-gray-800 focus:text-white" @click="prevSlide">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 mx-auto">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button class="border p-2  border-gray-500 focus:bg-gray-800 focus:text-white" @click="nextSlide">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
    <div class="relative">
      <carousel  ref="carouselRef" :wrap-around="true" :breakpoints="breakpoints">
        <slide class="">
          <div class="grid grid-cols-12 gap-6 bg-white/50 backdrop-blur-lg">
            <div class="col-span-12 md:col-span-5 grid items-center">
              <div class="p-12 text-left">
                <div class="border-title mb-2"></div>
                <h2 class="text-3xl font-semibold mb-6">Hiram <br>Bingham</h2>
                <p class="tracking-widest">The most luxurious and exclusive train in Peruvian territory will always be the first option we offer to our guests for their visit to the citadel of Machu Picchu.</p>

              </div>
            </div>

            <div class="col-span-12 md:col-span-7">

                <div class="relative items-end grid parallax-container  overflow-hidden h-[700px] 2xl:h-[1000px]">
                  <nuxt-img src="https://img.belmond.com/f_auto/t_2580x3219/photos/hbi/hbi-din-bar05.jpg"  class="parallax-image  h-[920px] 2xl:h-[1300px] absolute inset-0 object-cover w-full"></nuxt-img>
                  <div class=" absolute bottom-0 right-0 text-white text-2xl font-parisienne p-6">Hiram Bingham</div>
                </div>

            </div>
            <div class="col-span-12">
              <div class="px-12 pb-12 font-light leading-relaxed space-y-4 text-left">
                <div class="border-title"></div>
                <h3 class="font-semibold text-2xl">A Journey of Elegance to Machu Picchu</h3>
                <p class="tracking-widest">Step aboard the Hiram Bingham train, an exquisite blend of luxury and adventure that transports travelers through the heart of Peru’s breathtaking Sacred Valley to the legendary Machu Picchu. Operated by Belmond, this opulent train is named after the explorer who brought the ancient Incan citadel to global attention, and it delivers an experience as extraordinary as its destination.</p>
                <p class="tracking-widest">The Hiram Bingham is more than a mode of transportation; it’s a moving masterpiece. Its vintage carriages evoke the romance of 1920s rail travel, adorned with polished wood, brass details, and rich fabrics. Guests are treated to world-class service, beginning with a champagne toast. The train’s two dining cars serve gourmet Peruvian cuisine paired with fine wines crafted by expert chefs. A bar car offers signature cocktails and live Andean music, creating a vibrant atmosphere of celebration.</p>
                <p class="tracking-widest">Large windows ensure uninterrupted views of the dramatic landscapes, from lush valleys to towering peaks. For those seeking a deeper connection with Peru’s culture, the observation car is perfect for panoramic vistas and photo opportunities.</p>
                <p class="tracking-widest">The Hiram Bingham transforms a journey to Machu Picchu into an unforgettable indulgence, blending luxury, history, and natural beauty into one seamless experience. Perfect for discerning travelers seeking unparalleled adventure.</p>
              </div>
            </div>
          </div>
        </slide>
        <slide class="">
          <div class="grid grid-cols-12 gap-6 bg-white/50 backdrop-blur-lg">
            <div class="col-span-12 md:col-span-5 grid items-center">
              <div class="p-12 text-left">
                <div class="border-title mb-2"></div>
                <h2 class="text-3xl font-semibold mb-6">Andean <br>Explorer</h2>
                <p class="tracking-widest">As the name says, discover and explore the Peruvian Andes with the most luxurious train in existence. The Andean Explorer has all the luxuries and comforts for the routes between Cusco, Arequipa, and Puno.</p>

              </div>
            </div>

            <div class="col-span-12 md:col-span-7">

                <div class="relative items-end grid parallax-container  overflow-hidden h-[700px] 2xl:h-[1000px]">
                  <nuxt-img src="https://img.belmond.com/f_auto/t_2580x3219/photos/aep/aep-gst-observation-car02.jpg"  class="parallax-image  h-[920px] 2xl:h-[1300px] absolute inset-0 object-cover w-full"></nuxt-img>
                  <div class=" absolute bottom-0 right-0 text-white text-2xl font-parisienne p-6">Andean Explorer</div>
                </div>

            </div>
            <div class="col-span-12">
              <div class="px-12 pb-12 font-light leading-relaxed space-y-4 text-left tracking-widest">
                <div class="border-title"></div>
                <h3 class="font-semibold text-2xl">Luxury Travel Through Peru’s Majestic Highlands</h3>

                <p>The Andean Explorer, South America’s first luxury sleeper train, offers a captivating journey through the Peruvian Andes, combining world-class elegance with the awe-inspiring beauty of one of the world’s most breathtaking landscapes. Operated by Belmond – PeruRail, this train delivers a once-in-a-lifetime experience, connecting Cusco, the ancient capital of the Inca Empire, to destinations such as Puno, Titicaca Lake, and Arequipa, a UNESCO World Heritage city.</p>
                <p>From the moment you step aboard, you are enveloped in an atmosphere of refined luxury. The Andean Explorer features lavishly designed carriages inspired by traditional Peruvian motifs, with contemporary touches that ensure every comfort. Its spacious cabins range from cozy bunk-bed suites to grand double-bed accommodations, each with en-suite bathrooms and plush amenities.</p>
                <p>Culinary delights await in the train’s elegant dining cars, where guests savor seasonal menus crafted with locally sourced ingredients, blending Peruvian flavors with international flair. The piano lounge car offers a sophisticated retreat for relaxation. In contrast, the observation car—with its open-air deck—provides the perfect vantage point to marvel at the Andes’ snow-capped peaks, serene valleys, and remote villages.</p>
                <p>During the journey, expert-led excursions offer deeper insights into Peru’s rich heritage, including visits to Lake Titicaca’s floating islands, the ancient burial grounds at Raqchi, and the dramatic Colca Canyon. Onboard, attentive staff provide impeccable service, ensuring every need is met with care and precision.</p>
                <p>The Andean Explorer is not just a journey but an immersion into Peru’s natural beauty, culture, and history, elevated by unparalleled luxury. Perfect for discerning travelers, this train promises an extraordinary adventure, weaving comfort and discovery into every mile of its unforgettable route.</p>

              </div>
            </div>
          </div>
        </slide>
        <slide class="">
          <div class="grid grid-cols-12 gap-6 bg-white/50 backdrop-blur-lg">
            <div class="col-span-12 md:col-span-5 grid items-center">
              <div class="p-12 text-left">
                <div class="border-title mb-2"></div>
                <h2 class="text-3xl font-semibold mb-6">Perurail <br>Titicaca</h2>
                <p class="tracking-widest">Luxurious train that covers the route between Cusco and Puno, combining Inca cultures, such as the traditional dances on board and luxurious cabins for your comfort.</p>

              </div>
            </div>

            <div class="col-span-12 md:col-span-7">

              <div class="relative items-end grid parallax-container  overflow-hidden h-[700px] 2xl:h-[1000px]">
                <nuxt-img src="https://www.perurail.com/wp-content/uploads/2024/08/PeruRail-Titicaca-galeria-26.webp"  class="parallax-image  h-[920px] 2xl:h-[1300px] absolute inset-0 object-cover w-full"></nuxt-img>
                <div class=" absolute bottom-0 right-0 text-white text-2xl font-parisienne p-6">Perurail Titicaca</div>
              </div>

            </div>
            <div class="col-span-12">
              <div class="px-12 pb-12 font-light leading-relaxed space-y-4 text-left tracking-widest">
                <div class="border-title"></div>
                <h3 class="font-semibold text-2xl">A Majestic Journey across the Altiplano</h3>
                <p>Embark on an unforgettable journey aboard the Perurail Titicaca Train, a luxurious voyage through the Peruvian Andes that connects the vibrant city of Cusco with the serene shores of Lake Titicaca. Renowned as one of the most scenic train routes in the world, this full-day adventure offers a harmonious blend of breathtaking landscapes, cultural immersion, and unparalleled comfort.</p>
                <p>The train’s elegant carriages evoke the golden age of travel, combining classic design with modern amenities. Guests are greeted with warm Peruvian hospitality and treated to impeccable service throughout their journey. Spacious seating and large panoramic windows ensure uninterrupted views of the dramatic Altiplano scenery, from rolling green plains and snow-capped peaks to traditional villages and grazing alpacas.</p>
                <p>Onboard, the experience is elevated with gourmet dining. Chefs craft exquisite dishes using locally sourced ingredients, offering a taste of Peru’s culinary heritage. A bar and observation car add to the luxury, featuring live traditional music and an open-air deck where guests can soak in the stunning surroundings.</p>
                <p>The Perurail Titicaca Train transforms travel into a celebration of Peru’s natural beauty and rich culture, offering an unforgettable experience for discerning adventurers seeking both relaxation and discovery in the heart of the Andes.</p>

              </div>
            </div>
          </div>
        </slide>
        <slide class="">
          <div class="grid grid-cols-12 gap-6 bg-white/50 backdrop-blur-lg">
            <div class="col-span-12 md:col-span-5 grid items-center">
              <div class="p-12 text-left">
                <div class="border-title mb-2"></div>
                <h2 class="text-3xl font-semibold mb-6">The <br>First Class</h2>
                <p class="tracking-widest">Operated by Incarail, the First Class Train has all the services that a luxury train offers our guests to visit the citadel of Machu Picchu.</p>

              </div>
            </div>

            <div class="col-span-12 md:col-span-7">

              <div class="relative items-end grid parallax-container  overflow-hidden h-[700px] 2xl:h-[1000px]">
                <nuxt-img src="https://www.perurail.com/wp-content/uploads/2024/08/PeruRail-Titicaca-galeria-10.webp"  class="parallax-image  h-[920px] 2xl:h-[1300px] absolute inset-0 object-cover w-full"></nuxt-img>
                <div class=" absolute bottom-0 right-0 text-white text-2xl font-parisienne p-6">The First Class</div>
              </div>

            </div>
            <div class="col-span-12">
              <div class="px-12 pb-12 font-light leading-relaxed space-y-4 text-left tracking-widest">
                <div class="border-title"></div>
                <h3 class="font-semibold text-2xl">A Luxurious Passage to Machu Picchu</h3>
                <p>Embark on an extraordinary journey aboard the IncaRail First Class Train, a refined way to travel through Peru’s stunning Sacred Valley to the iconic Machu Picchu. Designed for those seeking exclusivity and comfort, this train redefines rail travel with its elegant interiors, personalized service, and breathtaking vistas.</p>
                <p>The IncaRail First Class carriage offers a boutique experience with spacious seating and contemporary design inspired by Andean culture. Panoramic windows provide uninterrupted views of the region’s awe-inspiring landscapes, including majestic mountains, lush valleys, and the winding Urubamba River.</p>
                <p>Onboard, guests are treated to world-class service and exquisite culinary offerings. A gourmet menu features fresh, locally sourced ingredients and fine wines, celebrating Peru’s rich culinary heritage. The train’s serene atmosphere is enhanced by live Andean music, creating an immersive cultural experience.</p>
                <p>For added indulgence, the observatory lounge carriage provides an open-air balcony, the perfect spot to savor the journey’s beauty and tranquility. The attentive staff caters to every detail, ensuring a seamless and memorable trip.</p>
                <p>The IncaRail First Class Train transforms the journey to Machu Picchu into an integral part of your adventure, blending luxury, culture, and nature into an unforgettable experience for the discerning traveler.</p>

              </div>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
<!--    <div class="flex justify-end gap-2 mt-2">-->
<!--      <button class="border p-2  border-gray-500 focus:bg-gray-800 focus:text-white" @click="prevSlide">-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 mx-auto">-->
<!--          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />-->
<!--        </svg>-->
<!--      </button>-->
<!--      <button class="border p-2  border-gray-500 focus:bg-gray-800 focus:text-white" @click="nextSlide">-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">-->
<!--          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />-->
<!--        </svg>-->
<!--      </button>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import {Carousel, Slide} from "vue3-carousel";
import {auto} from "@popperjs/core";

const items = ref([
  {id: 1, image: 'ruta-de-imagen1.jpg', description: 'Descripción 1'},
  {id: 2, image: 'ruta-de-imagen2.jpg', description: 'Descripción 2'},
  {id: 3, image: 'ruta-de-imagen3.jpg', description: 'Descripción 3'},
  {id: 4, image: 'ruta-de-imagen4.jpg', description: 'Descripción 4'},
  {id: 5, image: 'ruta-de-imagen5.jpg', description: 'Descripción 5'},
]);

const destinos = ref([]) // Array para almacenar los destinos y hoteles
const selectedDestino = ref([])

const breakpoints = {
  350: {
    itemsToShow: 1,
    snapAlign: 'start',
    height: auto
  },
  // 700px and up
  700: {
    itemsToShow: 1,
    snapAlign: 'start',
  },
  // 1024 and up
  1024: {
    itemsToShow: 1,
    snapAlign: 'start',
  },
}

watch(
    () => selectedDestino.value,
    () => {
      if (carouselRef.value) {
        carouselRef.value.slideTo(1); // Reinicia el carrusel al primer slide
      }
    }
);
const carouselRef = ref();

const prevSlide = () => {
  carouselRef.value.prev();
}

const nextSlide = () => {
  carouselRef.value.next();
}

onMounted(async ()=>{
  try {
    // Solicita los destinos y hoteles al backend
    const response = await fetch('https://api.machupicchu.company/api/destinations-hotels')
    const data = await response.json()
    destinos.value = data

    // Selecciona el primer destino por defecto
    if (data.length > 0) {
      selectedDestino.value = data[0]
    }
  } catch (error) {
    console.error('Error fetching destinations and hotels:', error)
  }
})

</script>
<style>
.carousel__slide{
  align-items: start;
}
</style>