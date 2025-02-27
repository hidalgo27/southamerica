<script lang="ts" setup>

defineProps({
  packageDetail: {
    type: Object,
    required: true,
  },
});

</script>
<template>
  <section class="container my-20">
    <div class="w-full mx-auto">
      <h1 class="text-4xl font-bold mb-6">
        Trip Overview
      </h1>
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-1/2">
          <div v-if="packageDetail.opcional" class="bg-orange-100 p-4 mb-6 rounded">
            <h2 class="font-semibold mb-2">
              Special Offer Details
            </h2>
            <p v-html="packageDetail.opcional">
            </p>
          </div>
          <div v-if="packageDetail.descripcion" v-html="packageDetail.descripcion"></div>
        </div>
        <div class="lg:w-1/2 lg:pl-6">
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>