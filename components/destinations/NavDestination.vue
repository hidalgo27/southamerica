<script lang="ts" setup>
import { Dropdown } from 'floating-vue';

const buttons = ref([
  { name: 'Overview', id: 'overview' },
  { name: 'Vacation Packages', id: 'itinerary' },
  { name: 'Places to Go', id: 'inclusions' },
  { name: 'Travel Information', id: 'exclusions' },
  { name: 'Travel Guides', id: 'reviews' },
]);
</script>
<template>
  <nav class="py-6 border-y-2 justify-center">
    <div v-for="button in buttons" :key="button.id" class="inline-block px-4">
      <Dropdown :button="button.name">
        <span>{{ button.name }}</span>
        <template #content>
          <ul class="py-2">
            <li class="py-2">
              <a href="#">{{ button.name }}</a>
            </li>
          </ul>
        </template>
      </Dropdown>
    </div>
  </nav>
</template>
<style></style>