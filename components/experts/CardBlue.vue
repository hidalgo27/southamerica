<script lang="ts" setup>
</script>
<template>
  <section class="container my-20 lg:my-40 relative">
    <div class="px-4 py-8 flex flex-col lg:flex-row items-center relative w-full">
      <div class="w-full lg:w-9/12 mt-8 relative lg:left-1/4 z-0">
        <NuxtImg alt="Group of travelers taking a selfie" class="rounded-lg w-full h-auto object-cover"
          src="images\banners\card-blue-bg.webp" />
      </div>
      <div
        class="bg-blue-100 rounded-md w-full lg:w-1/2 xl:w-1/3 p-8 xl:p-16 mt-8 lg:mt-0 lg:absolute lg:left-0 xl:-bottom-16 z-10">
        <h1 class="text-3xl lg:text-5xl font-bold text-blue-900 font-playfair-display mb-12">
          We’re passionate travellers, just like you.
        </h1>
        <p class="text-blue-900 mb-4">
          We’re driven by a love of travel, and one of the joys of exploring the world is sharing our passion with
          others.
          Keep scrolling to see more about what makes SouthAmerica’s Destination Specialists unique.
        </p>
        <p class="text-blue-900 mb-6">
          Are you ready to get serious about planning your next trip? You can also explore all of the destinations that
          SouthAmerica travels to.
        </p>
        <NuxtLink to="/destinations"
          class="bg-white text-blue-900 border border-blue-900 py-4 px-8 rounded hover:shadow-md">
          Start Planning
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<style></style>