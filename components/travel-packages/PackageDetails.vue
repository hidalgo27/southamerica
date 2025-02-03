<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('departures');

const tabs = [
  { key: 'departures', label: 'Departures' },
  { key: 'inclusions', label: 'Trip Inclusions and Exclusions' },
  { key: 'terms', label: 'Terms and Conditions' }
];

const content = {
  departures: {
    title: 'Departures',
    description: 'Departs from Rome',
    days: 'Sunday, Monday, Tuesday, Wednesday & Friday',
    image: 'https://picsum.photos/400/300'
  },
  inclusions: {
    title: 'Trip Inclusions and Exclusions',
    includes: [
      'Private arrival and departure airport transfers',
      '3 nights first-class accommodations in Rome',
      '2 nights first-class accommodations in Florence',
      '2 nights first-class accommodations in Venice',
      'Train tickets in 2nd class between Rome, Florence and Venice'
    ],
    excludes: [
      'Travel insurance',
      'International, domestic airfare & airfare taxes',
      'Meals and beverages not explicitly listed as included',
      'Gratuities'
    ]
  },
  terms: {
    title: 'Terms and Conditions',
    description: 'Prices are "from" per person based on twin/double share accommodation and for travel in low season. Seasonal surcharges and blackout dates may apply. Limited seat/spaces and all pricing is subject to change and availability. Rates for single or triple travellers are available on request - please enquire.'
  }
};
</script>

<template>
  <section class="container mb-20">
    <div class="w-full mx-auto">
      <!-- Tabs -->
      <div class="flex justify-center space-x-6 border-b ">
        <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
          class="p-6 text-center border-b-2 transition"
          :class="activeTab === tab.key ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'">
          {{ tab.label }}
        </button>
      </div>

      <!-- Content -->
      <div class="mt-6 ">
        <!-- Departures -->
        <div v-if="activeTab === 'departures'" class="flex items-center space-x-12">
          <img :src="content.departures.image" alt="Image" class="w-96 rounded-md" />
          <div>
            <h2 class="text-xl font-playfair-display font-semibold mb-6">{{ content.departures.title }}</h2>
            <p class="text-gray-600">{{ content.departures.description }}</p>
            <p class="text-gray-500">{{ content.departures.days }}</p>
          </div>
        </div>

        <!-- Inclusions -->
        <div v-if="activeTab === 'inclusions'" class="grid grid-cols-2 gap-6 text-lg">
          <div class="border-r-2 border-gray-200 pr-6 ml-12">
            <h3 class="text-lg font-playfair-display font-semibold text-green-600 my-12">Included</h3>
            <ul class="list-disc pl-5 text-gray-600 space-y-6">
              <li v-for="item in content.inclusions.includes" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="ml-12">
            <h3 class="text-lg font-playfair-display font-semibold text-red-600 my-12">Not Included</h3>
            <ul class="list-disc pl-5 text-gray-600 space-y-6">
              <li v-for="item in content.inclusions.excludes" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div v-if="activeTab === 'terms'" class="text-start">
          <h2 class="text-xl font-playfair-display font-semibold my-12">{{ content.terms.title }}</h2>
          <p class="text-gray-600 mt-2">{{ content.terms.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
