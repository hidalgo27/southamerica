<script lang="ts" setup>
</script>
<template>
  <section class="my-20">
    <div class="relative h-[60vh]">
      <NuxtImg alt="A person with a hat walking on a suspension bridge in a forest"
        class="absolute  w-full h-full  object-cover"
        src="https://images.goway.com/production/styles/hero_s1_3xl/s3/contact_cta/South%20Pacific%20-%20AdobeStock_234280596.jpeg?VersionId=5gLq1k8pBdbzBJqcnVlzQeL.1uVJeqtN&h=894b9109&itok=tLPUHzhf" />
      <div class="absolute inset-0 bg-black opacity-50">
      </div>
      <div class="relative flex items-center justify-end m-6 md:right-72 h-full">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md text-start">
          <p class="text-gray-500 mb-6">
            Get Started
          </p>
          <h1 class="text-5xl font-bold text-gray-800 mb-16 font-playfair-display">
            Join our growing team at SouthAmerica.
          </h1>
          <NuxtLink to="/about-us/careers"
            class="btn-ternary rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700 w-full">
            Explore Open Positions
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
<style></style>