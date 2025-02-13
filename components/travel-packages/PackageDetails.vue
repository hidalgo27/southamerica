<script setup lang="ts">

const props = defineProps({
  packageDetail: {
    type: Object,
    required: true,
  },
});
const activeTab = ref('terms');

const tabs = [
  { key: 'departures', label: 'Departures' },
  { key: 'inclusions', label: 'Trip Inclusions and Exclusions' },
  { key: 'terms', label: 'Terms and Conditions' }
];

onMounted(() => {
  console.log('PackageDetails mounted', props.packageDetail);
  console.log('PackageDetails keys', props.packageDetail.value.keys());
});
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
        <div v-if="activeTab === 'departures' && packageDetail?.departures"
          class="grid md:grid-cols-2 items-center justify-center">
          <div class="w-full lg:w-2/3 h-full p-6 mx-auto">
            <img v-if="packageDetail.departures.image" :src="packageDetail.departures.image" alt="Image"
              class="w-full h-full rounded-md" />
          </div>

          <div class="text-start md:text-left">
            <h2 v-if="packageDetail.departures.title" class="text-xl font-playfair-display font-semibold mb-4 md:mb-6">
              {{ packageDetail.departures.title }}
            </h2>
            <p v-if="packageDetail.departures.description" class="text-gray-600">
              {{ packageDetail.departures.description }}
            </p>
            <p v-if="packageDetail.departures.days" class="text-gray-500 mt-2">
              {{ packageDetail.departures.days }}
            </p>
          </div>
        </div>

        <div v-if="activeTab === 'inclusions' && (packageDetail?.incluye?.length || packageDetail?.noincluye?.length)"
          class="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <div v-if="packageDetail.incluye?.length"
            class="border-b-2 md:border-b-0 md:border-r-2 border-gray-200 pb-6 md:pb-0 md:pr-6 md:ml-12">
            <h3
              class="text-lg font-playfair-display font-semibold text-green-600 my-6 md:my-12 text-center md:text-left">
              Included
            </h3>
            <ul class="list-disc text-sm pl-5 text-gray-600 space-y-4 md:space-y-6">
              <li v-for="item in packageDetail.incluye" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div v-if="packageDetail.noincluye?.length" class="md:ml-12">
            <h3 class="text-lg font-playfair-display font-semibold text-red-600 my-6 md:my-12 text-center md:text-left">
              Not Included
            </h3>
            <ul class="list-disc text-sm pl-5 text-gray-600 space-y-4 md:space-y-6">
              <li v-for="item in packageDetail.noincluye" :key="item">{{ item }}</li>
            </ul>
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
