<script setup lang="ts">

const props = defineProps({
  packageDetail: {
    type: Object,
    required: true,
  },
});
const activeTab = ref('prices');

const tabs = [
  { key: 'prices', label: 'Prices' },
  { key: 'inclusions', label: 'Trip Inclusions and Exclusions' },
  { key: 'terms', label: 'Terms and Conditions' }
];

</script>

<template>
  <section class="container mb-20">
    <div class="w-full mx-auto">
      <!-- Tabs -->
      <div class="flex justify-center md:space-x-6 border-b text-xs md:text-lg gap-4 md:gap-6 ">
        <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
          class="py-4 md:p-6 text-center border-b-2 transition duration-300 ease-in-out hover:border-orange-500 hover:text-orange-500"
          :class="activeTab === tab.key ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'">
          {{ tab.label }}
        </button>
      </div>

      <div class="mt-6">
        <Transition name="fade" mode="out-in">
          <div :key="activeTab">
            <div v-if="activeTab === 'prices' && packageDetail?.precio_paquetes?.length"
              class="flex flex-col items-center justify-center w-full p-6">
              <h2 class="text-xl font-playfair-display font-semibold mb-4">Prices</h2>

              <div class="w-full md:w-2/3">
                <table class="border-collapse w-full text-left shadow-md">
                  <thead>
                    <tr class="bg-gray-200">
                      <th class="border p-3 text-center">Estrellas</th>
                      <th class="border p-3">Doble</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-t">
                      <td class="border p-3 text-center">
                        <span v-for="n in 4" :key="n">⭐</span>
                      </td>
                      <td class="border p-3">
                        {{
                          packageDetail.precio_paquetes.find(p => p.estrellas === 2)?.precio_d
                            ? 'US $' + packageDetail.precio_paquetes.find(p => p.estrellas === 2).precio_d
                            : 'Please Inquire'
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <span class="italic text-xs mt-1 block">* price per person</span>
              </div>
            </div>

            <div v-else-if="activeTab === 'inclusions'" class="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg"
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
                <h3 class="text-lg font-playfair-display font-semibold text-red-600 my-6 md:my-12 text-left">
                  Not Included
                </h3>
                <ul class="list-disc text-sm pl-5 text-gray-600 space-y-4 md:space-y-6 text-left">
                  <div v-html="packageDetail.noincluye"></div>
                </ul>
              </div>

              <div v-if="!packageDetail.incluye?.length && !packageDetail.noincluye?.length" class="text-center">
                <p class="text-gray-600 mt-2">No information available.</p>
              </div>
            </div>

            <div v-else-if="activeTab === 'terms'" class="text-start">
              <h2 class="text-xl font-playfair-display font-semibold my-6 md:my-12 text-center md:text-left">
                Terms and Conditions
              </h2>
              <p class="text-gray-600 mt-2 text-center md:text-left">
                Prices are "from" per person based on twin/double share accommodation and for travel in low season.
                Seasonal
                surcharges and blackout dates may apply. Limited seat/spaces and all pricing is subject to change and
                availability. Rates for single or triple travellers are available on request - please inquire.
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>