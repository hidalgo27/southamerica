<script setup>
const props = defineProps({
  tripUuid: {
    type: String,
    required: true
  }
});

const dataEnv = 'https://demo.wetravel.to';
const dataVersion = 'v0.3';
const dataUid = '7584';

onMounted(() => {
  if (!document.querySelector('script[src="https://demo.cdn.wetravel.com/widgets/embed_checkout.js"]')) {
    const script = document.createElement('script');
    script.src = 'https://demo.cdn.wetravel.com/widgets/embed_checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }
});
</script>
<template>
  <div id="wetravel_button_wrapper">
    <button id="wetravel_button_widget" :data-env="dataEnv" :data-version="dataVersion" :data-uid="dataUid"
      :data-uuid="tripUuid" :href="`https://demo.wetravel.to/checkout_embed?uuid=${tripUuid}`"
      class="wtrvl-checkout_button z-50 bg-[#33ae3f] text-white rounded-md px-4 py-2 text-center cursor-pointer font-semibold hover:bg-green-600 transition text-sm md:text-base">
      Pay Here
    </button>
  </div>
</template>
<style>
//@import "https://fonts.googleapis.com/css?family=Poppins"
</style>
