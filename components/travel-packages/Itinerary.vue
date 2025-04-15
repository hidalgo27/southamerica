<script lang="ts" setup>
const { $gsap } = useNuxtApp()

const props = defineProps({
  packageDetail: {
    type: Object,
    required: true,
  },
});
const openIndexes = ref<number[]>([]); // Abre solo el primer día al cargar
const contentRefs = ref<HTMLElement[]>([]); // Almacena referencias de contenido
const currentItem = ref(null)
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
  if (!props.packageDetail || !props.packageDetail.paquete_itinerario) return;
  openIndexes.value = props.packageDetail.paquete_itinerario.map((_: any, i: any) => i);

  nextTick(() => {
    contentRefs.value.forEach((ref, index) => {
      if (ref) {
        const fullHeight = ref.scrollHeight + 40;
        $gsap.fromTo(ref, { height: 0, opacity: 0 }, {
          height: fullHeight, opacity: 1, duration: 0.5, paddingBottom: '1.5rem', paddingTop: '1.5rem', ease: 'power2.inOut', onComplete() {
            ref.style.padding = '1.5rem 2rem';
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
      $gsap.fromTo(ref, { height: fullHeight }, { height: 0, paddingBottom: 0, paddingTop: 0, opacity: 0, duration: 0.5, ease: 'power2.inOut' });
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
    $gsap.fromTo(contentRef, { height: fullHeight }, { height: 0, paddingBottom: 0, paddingTop: 0, opacity: 0, duration: 0.5, ease: 'power2.inOut' });
    openIndexes.value = openIndexes.value.filter(i => i !== index);
  } else {
    const fullHeight = contentRef.scrollHeight;
    $gsap.set(contentRef, { padding: '0rem 2rem' }); // Establece un padding lateral desde el inicio
    $gsap.fromTo(contentRef,
      { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 },
      {
        height: fullHeight, opacity: 1, paddingTop: '1.5rem', paddingBottom: '1.5rem',
        duration: 0.5, ease: 'power2.inOut',
        onComplete() {
          contentRef.style.height = 'auto'; // Mantiene la altura fluida después de la animación
        }
      }
    );
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
        <h1 class="font-semibold text-2xl md:text-5xl mb-6 title font-playfair-display tracking-wide">
          {{ packageDetail.titulo }}
        </h1>
      </div>
      <article class="my-12">
        <div class="mb-4 text-center">
          <button @click="expandAll" class="px-6 py-3  text-md border border-r-0 border-gray-700 ">
            Expand all
          </button>
          <button @click="collapseAll" class="px-6 py-3  text-md border border-gray-700">
            Collapse all
          </button>
        </div>

        <div class="w-full mx-auto relative">
          <div v-for="(itinerary, index) in packageDetail.paquete_itinerario" :key="index" class="flex item">
            <div class="relative w-20 text-center gap-12 ">
              <div class="absolute -z-10 left-1/2 top-0 bottom-0 border-l-2 border-dashed border-slate-300"></div>
              <div class="py-2 font-bold text-xs" :class="[currentItem == index ? 'text-secondary' : 'text-slate-500']">
                <span class="hidden md:inline">DAY</span> <span class="rounded-full px-2 py-1 text-white"
                  :class="{ 'bg-red-700': packageDetail.duracion == index + 1, 'bg-primary': index + 1 == 1, 'bg-gray-500': index + 1 > 1 }">{{
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

                <div :ref="el => setContentRef(el, index)"
                  class="grid lg:grid-cols-6 overflow-hidden rounded-b-md text-start px-8 lg:flex-row items-center gap-6"
                  :class="{ 'bg-white ': isOpen(index) }">
                  <div
                    class="lg:col-span-2 md:w-1/2 lg:w-full rounded-lg overflow-hidden order-1 lg:order-2 aspect-[4/3] mx-auto">
                    <NuxtImg
                      src="https://s3.us-west-1.amazonaws.com/southamerica-company/itinerary/1744736362891imagen_2025-04-15_115922789_1744736430.png"
                      class="w-full h-full object-cover">
                    </NuxtImg>
                  </div>
                  <div class="lg:col-span-4 order-2 lg:order-1 " v-html="itinerary.itinerarios.descripcion"></div>
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