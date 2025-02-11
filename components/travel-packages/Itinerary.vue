<script lang="ts" setup>
const { $gsap } = useNuxtApp()

const listPackages = [
  {
    url: 'machu-picchu-galapagos-islands',
    paquete_itinerario: [
      {
        itinerarios:
        {
          titulo: 'Arrival in Lima',
          resumen: 'Upon arrival in Lima, you will be met by our representative and transferred to your hotel. The rest of the day is at leisure.'
        },
      },
      {
        itinerarios:
        {
          titulo: 'Lima to Cusco',
          resumen: 'Fly to Cusco, the ancient Inca capital. Upon arrival, you will be met and transferred to your hotel. The rest of the day is at leisure.'
        },
      },
      {
        itinerarios:
        {
          titulo: 'Cusco',
          resumen: 'Morning at leisure. In the afternoon, enjoy a guided tour of Cusco and nearby ruins.'
        },
      },
      {
        itinerarios:
        {
          titulo: 'Cusco to Sacred Valley',
          resumen: 'Travel to the Sacred Valley of the Incas. En route, visit the Awanacancha textile center and Pisac Market.'
        },
      },
    ],
    duracion: 7,
  }
];

const openIndexes = ref<number[]>([]); // Abre solo el primer día al cargar
const contentRefs = ref<HTMLElement[]>([]); // Almacena referencias de contenido

// Establece referencias para cada contenido
const setContentRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    contentRefs.value[index] = el;

    // Si el día está abierto al cargar, ajustamos la altura a "auto" para que se vea completo
    if (isOpen(index)) {
      el.style.height = 'auto';
    } else {
      el.style.height = '0';
    }
  }
};


// Comprueba si un día está abierto
const isOpen = (index: number) => openIndexes.value.includes(index);

// Función para expandir todo
const expandAll = () => {
  openIndexes.value = listPackages.flatMap((packageData) => packageData.paquete_itinerario.map((_, i) => i)); // Abrimos todos los días

  nextTick(() => {
    contentRefs.value.forEach((ref, index) => {
      if (ref) {
        const fullHeight = ref.scrollHeight + 40;
        $gsap.fromTo(ref, { height: 0, opacity: 0 }, {
          height: fullHeight, opacity: 1, duration: 0.5, ease: 'power2.inOut', onComplete() {
            ref.style.padding = '20px 6px';
            ref.style.height = 'auto';
          }
        });
      }
    });
  });
};

// Función para contraer todo
const collapseAll = () => {
  contentRefs.value.forEach((ref, index) => {
    if (ref) {
      const fullHeight = ref.scrollHeight;
      $gsap.fromTo(ref, { height: fullHeight }, { height: 0, opacity: 0, duration: 0.5, ease: 'power2.inOut' });
    }
  });
  openIndexes.value = []; // Cerramos todos los días
};

// Animación de apertura/cierre con GSAP
const toggleWithGSAP = (index: number) => {
  const contentRef = contentRefs.value[index];

  if (!contentRef) {
    console.error(`Content ref for index ${index} not found`);
    return;
  }

  if (isOpen(index)) {
    const fullHeight = contentRef.scrollHeight; // Captura la altura completa actual
    $gsap.fromTo(contentRef, { height: fullHeight }, { height: 0, padding: 0, opacity: 0, duration: 0.5, ease: 'power2.inOut' });
    openIndexes.value = openIndexes.value.filter(i => i !== index);
  } else {
    const fullHeight = contentRef.scrollHeight + 40;
    $gsap.fromTo(contentRef, { height: 0, opacity: 0 }, {
      height: fullHeight, opacity: 1, duration: 0.5, ease: 'power2.inOut', onComplete() {
        contentRef.style.padding = '20px 6px'; // Añade relleno después de la animación
        contentRef.style.height = 'auto'; // Establece la altura a 'auto' después de la animación
      }
    });
    openIndexes.value.push(index);
  }
};
</script>

<template>
  <section class="bg-tertiary bg-opacity-30 ">
    <div class="container py-12 text-center">
      <div class="text-center mb-8">
        <div class="border-title mb-2 mx-auto"></div>
        <p class="mb-6 tracking-widest font-bold">
          Itinerary Details
        </p>
        <h1 class="font-semibold text-4xl md:text-7xl mb-6 title font-playfair-display tracking-wide">
          Belize Rainforest and Caribbean Beach Tranquility
        </h1>
      </div>
      <article class="my-12" id="itinerary" v-for="packages in listPackages" :key="packages.url">
        <div class="mb-4 text-center">
          <button @click="expandAll" class="px-6 py-3  text-md border border-r-0 border-gray-700 ">
            Expand all
          </button>
          <button @click="collapseAll" class="px-6 py-3  text-md border border-gray-700">
            Collapse all
          </button>
        </div>

        <div class="w-full mx-auto relative">
          <!-- Ajuste en el bucle v-for -->
          <div v-for="(itinerary, index) in packages.paquete_itinerario" :key="index" class="flex item">
            <div class="relative w-20 text-center gap-12">
              <div class="absolute -z-10 left-1/2 top-0 bottom-0 border-l-2 border-dashed border-slate-300"></div>
              <div class="py-2 font-bold text-xs" :class="[currentItem == index ? 'text-secondary' : 'text-slate-500']">
                DAY <span class="rounded-full px-2 py-1 text-white"
                  :class="{ 'bg-red-700': packages.duracion == index + 1, 'bg-primary': index + 1 == 1, 'bg-gray-500': index + 1 > 1 }">{{
                    index + 1 }}</span>
              </div>
            </div>

            <div class="space-y-2 w-full">
              <div class="mb-3">
                <button @click="toggleWithGSAP(index)" class="w-full text-left p-8 flex justify-between items-center "
                  :class="{ 'hover:bg-gray-200 ': !isOpen(index), 'bg-white rounded-t-md border-b-2 border-b-secondary border-opacity-20': isOpen(index) }">
                  {{ itinerary.itinerarios.titulo }}
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="size-6 transition-transform duration-300 mr-8"
                      :class="{ 'rotate-180': isOpen(index) }">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                  </span>
                </button>

                <div :ref="el => setContentRef(el, index)" class="overflow-hidden rounded-b-md"
                  v-html="itinerary.itinerarios.resumen" :class="{ 'bg-white': isOpen(index) }">
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style></style>