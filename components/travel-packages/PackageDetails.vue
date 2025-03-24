<script setup lang="ts">

const props = defineProps({
  packageDetail: {
    type: Object,
    required: true,
  },
});
const activeTab = ref('departures');

const tabs = [
  { key: 'departures', label: 'Departures' },
  { key: 'inclusions', label: 'Trip Inclusions and Exclusions' },
  { key: 'terms', label: 'Terms and Conditions' }
];

</script>

<template>
  <section class="container mb-20">
    <div class="w-full mx-auto">
      <!-- Tabs -->
      <div class="flex justify-center md:space-x-6 border-b text-[0.65rem] md:text-lg">
        <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
          class="p-6 text-center border-b-2 transition"
          :class="activeTab === tab.key ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'">
          {{ tab.label }}
        </button>
      </div>

      <div class="mt-6">
        <div v-if="activeTab === 'departures' && packageDetail?.precio_paquetes?.length"
          class="flex flex-col items-center justify-center w-full p-6">

          <h2 class="text-xl font-playfair-display font-semibold mb-4">
            Tarifas de Alojamiento
          </h2>

          <!-- Tabla de precios por cantidad de estrellas -->
          <table class="border-collapse w-full md:w-2/3 text-left shadow-md">
            <thead>
              <tr class="bg-gray-200">
                <th class="border p-3 text-center">Estrellas</th>
                <th class="border p-3">Simple</th>
                <th class="border p-3">Doble</th>
                <th class="border p-3">Triple</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="price in packageDetail.precio_paquetes" :key="price.id" class="border-t">
                <td class="border p-3 text-center">
                  <span v-for="n in price.estrellas" :key="n">⭐</span>
                </td>
                <td class="border p-3">${{ price.precio_s || 'N/A' }}</td>
                <td class="border p-3">${{ price.precio_d || 'N/A' }}</td>
                <td class="border p-3">${{ price.precio_t || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>


        <div v-if="activeTab === 'inclusions'" class="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg"
          :class="{ 'md:grid-cols-1': !packageDetail.noincluye && !packageDetail.incluye }">
          <div v-if="packageDetail.incluye" class=" pb-6 md:pb-0 md:pr-6 md:ml-12"
            :class="{ 'border-b-2 md:border-b-0 md:border-r-2 border-gray-200': packageDetail?.incluye && packageDetail?.noincluye }">
            <h3
              class="text-lg font-playfair-display font-semibold text-green-600 my-6 md:my-12 text-center md:text-left">
              Included
            </h3>
            <ul class="list-disc text-sm pl-5 text-gray-600 space-y-4 md:space-y-6">
              <div v-html="packageDetail.incluye"></div>
            </ul>
          </div>

          <div v-if="packageDetail.noincluye" class="md:ml-12">
            <h3 class="text-lg font-playfair-display font-semibold text-red-600 my-6 md:my-12 text-center md:text-left">
              Not Included
            </h3>
            <ul class="list-disc text-sm pl-5 text-gray-600 space-y-4 md:space-y-6 text-center">
              <div v-html="packageDetail.noincluye"></div>
            </ul>
          </div>

          <div v-if="!packageDetail.incluye?.length && !packageDetail.noincluye?.length" class="text-center">
            <p class="text-gray-600 mt-2">No information available.</p>
          </div>
        </div>

        <div v-if="activeTab === 'terms'" class="text-start">
          <h2 class="text-xl font-playfair-display font-semibold my-6 md:my-12 text-center md:text-left">
            Terms and Conditions
          </h2>
          <p class="text-gray-600 mt-2 text-center md:text-left">
            Prices are "from" per person based on twin/double share accommodation and for travel in low season. Seasonal
            surcharges and blackout dates may apply. Limited seat/spaces and all pricing is subject to change and
            availability. Rates for single or triple travellers are available on request - please inquire.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
