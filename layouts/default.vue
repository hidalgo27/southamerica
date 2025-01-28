<template>
  <div class="h-screen ">
    <Headers class="w-full z-50"></Headers>
    <slot />

    <Footer></Footer>

    <Float></Float>

  </div>
</template>

<script setup lang="ts">

import Headers from "~/components/page/Headers.vue";
import Footer from "~/components/page/Footer.vue";
import Float from "~/components/page/Float.vue";
</script>