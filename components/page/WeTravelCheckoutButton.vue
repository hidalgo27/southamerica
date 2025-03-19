<script setup>
const props = defineProps({
  tripUuid: {
    type: String,
    required: true,
  },
});

const dataEnv = "https://demo.wetravel.to";
const dataVersion = "v0.3";
const dataUid = "7584";

const loadScript = () => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://demo.cdn.wetravel.com/widgets/embed_checkout.js"]')) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://demo.cdn.wetravel.com/widgets/embed_checkout.js";
    script.async = true;
    script.onload = resolve;
    document.body.appendChild(script);
  });
};

const initializeWidget = () => {
  if (typeof window.WeTravel !== "undefined" && typeof window.WeTravel.initWidget === "function") {
    window.WeTravel.initWidget();
  }
};

onMounted(async () => {
  await loadScript();
  initializeWidget();
});

watch(() => props.tripUuid, () => {
  initializeWidget();
});
</script>

<template>
  <div>
    <button v-if="tripUuid"
      class="wtrvl-checkout_button font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition text-sm md:text-base"
      id="wetravel_button_widget" :data-env="dataEnv" :data-version="dataVersion" :data-uid="dataUid"
      :data-uuid="tripUuid" :href="`https://demo.wetravel.to/checkout_embed?uuid=${tripUuid}`"
      style="background-color:#33ae3f; color:#ffffff;">
      Pay Here
    </button>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins');
</style>
