<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { useFormStore } from '~/stores/form';
import { useTeamStore } from '~/stores/team';

const teamStore = useTeamStore();
const team = ref([])
const items = ref([])

const getAllTeam = async () => {
  const res: any = await teamStore.getAllTeam();
  team.value = res.teams;

  items.value = team.value.map(member => ({
    id: member.id,
    name: member.nombre,
    region: member.destinos?.map(d => d.nombre).join(', ') || 'N/A',
    description: member.descripcion || 'Sin descripción',
    img: member.imagen_perfil || 'URL_DEFAULT'
  }));
}

const inquireFormStore = useFormStore();

/* const items = ref([
  { id: 1, name: "Susanna Beccati", region: "Central America, South America, Arctic & Antarctica", description: "I was born in Toronto and raised in The West Indies, I have been blessed with the opportunity to grow up around many different cultures & to travel to many different places.", img: "https://master-7rqtwti-io4vvdzre4r5u.ca-1.platformsh.site/s3/files/styles/staff_profile_photo_small/s3/author/JuliaBates.png?itok=T3PyTVgG" },
  { id: 2, name: "John Doe", region: "Europe, Asia", description: "After I realized that I wanted to be in the travel industry, I studied Travel & Tourism and obtained a diploma. I have been in the travel Industry since 2009. I have worked and", img: "https://master-7rqtwti-io4vvdzre4r5u.ca-1.platformsh.site/s3/files/styles/staff_profile_photo_small/s3/author/MarielleMantele.png?itok=jBQsJ6f9" },
  { id: 3, name: "Maria Lopez", region: "North America, Africa", description: "Growing up in a small town in southern India, my thirst for exploring new places, learning about different cultures, and unraveling the mysteries of history has been insatiable. Over the years, I have journeyed across Europe,.", img: "https://master-7rqtwti-io4vvdzre4r5u.ca-1.platformsh.site/s3/files/styles/staff_profile_photo_small/s3/author/Ivor_Dsouza_illustration.png?itok=rgwnL6Yd" },
]); */

const currentSlide = ref(0);

const displayedItems = computed(() => [...items.value]);

const nextSlide = () => {
  items.value.push(items.value.shift()!);
  currentSlide.value = (currentSlide.value + 1) % items.value.length;
};

const progressWidth = computed(() => {
  const totalSlides = items.value.length;
  return totalSlides > 1 ? ((currentSlide.value / (totalSlides - 1)) * 100) : 100;
});

const getCardClass = (index: number) => {
  if (index === 0) return "z-30 scale-100";
  if (index === 1) return "z-20 scale-95 translate-x-4 translate-y-4";
  return "z-10 scale-90 translate-x-8 translate-y-8";
};


onMounted(async () => {
  await getAllTeam()
})
</script>
<template>
  <section class="container my-20">
    <div class="flex items-center justify-center ">
      <div class="grid grid-cols-1 md:grid-cols-2 bg-white overflow-hidden w-full gap-6 xl:max-h-[60vh]">
        <div class="bg-secondary bg-opacity-10 py-8 px-6 md:py-20 lg:py-32 lg:px-16 rounded-md">
          <p class="mb-8 tracking-widest font-bold">
            Crafted by Destination Insiders
          </p>
          <h1 class="font-semibold text-2xl md:text-4xl mb-8 title font-playfair-display tracking-wide  ">
            The People Behind the Perfect Journey
          </h1>
          <p class="mb-8 text-sm md:text-md">
            At SouthAmerica, your dreams shape the journey. Our Destination Specialists bring it to life with unmatched
            expertise and a true passion for Latin America.
          </p>
          <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 text-sm md:text-md">
            <button class="px-4 py-2 border btn-primary-outline text-start rounded-md"
              @click="inquireFormStore.openInquireNowForm()">
              Request a Quote
            </button>
            <NuxtLink to="/about-us/meet-the-team" class="px-4 py-2 border btn-secondary-outline rounded-md">
              Meet the Team
            </NuxtLink>
          </div>
        </div>
        <div class="relative w-full rounded-md overflow-hidden h-[60vh] md:h-full xl:max-h-[60vh]">
          <NuxtImg alt="A beautiful sunset with a giraffe in the foreground"
            class="w-full h-full object-cover rounded-md" src="\images\home\especilist-letter-background.webp"
            loading="lazy" />
          <div
            class="absolute top-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-3 lg:left-1/2 transform lg:-translate-x-1/2  translate-y-10 md:translate-y-16 lg:translate-y-20 xl:translate-y-12">
            <div class="relative w-[30vh] md:w-[36vh] h-[380px] mx-auto">
              <transition-group name="carousel" tag="div" v-if="displayedItems.length > 0">
                <div v-for="(item, index) in displayedItems" :key="item.id"
                  class="absolute w-full h-full p-6 rounded-xl border bg-white transition-all duration-700 flex flex-col justify-between"
                  :class="getCardClass(index)">
                  <div class="flex items-center justify-between mb-4">
                    <div class="">
                      <h2 class="text-xl font-semibold">
                        {{ item.name }}
                      </h2>
                      <p class="text-gray-500 text-xs">
                        {{ item.region }}
                      </p>
                    </div>
                    <div class="ml-4 w-16 h-16 rounded-full overflow-hidden">
                      <NuxtImg alt="Illustration of a person with long hair wearing a white shirt" :src="item.img"
                        loading="lazy" />
                    </div>
                  </div>
                  <hr class="my-4" />
                  <div class="text-gray-700 mb-4 text-sm overflow-hidden text-ellipsis" v-html="item.description">
                  </div>
                  <div class="group">
                    <NuxtLink
                      class="relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0"
                      :to="'/our-experts'">
                      Read More
                    </NuxtLink>
                  </div>
                  <div class="flex justify-end mt-4">
                    <button class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                      @click="nextSlide">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </button>
                  </div>
                </div>
              </transition-group>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.next-button {
  @apply bg-gray-200 hover:bg-gray-300 rounded-full p-3 w-10 h-10 flex items-center justify-center transition self-end;
}

/* Barra de progreso */
.progress-bar-container {
  @apply mx-auto w-1/4 h-[2px] bg-gray-400 rounded-full overflow-hidden mt-12;
}

.progress-bar {
  @apply h-full bg-white transition-all duration-300;
}
</style>