<template>
  <div class="h-screen ">
    <Headers class="w-full z-40"></Headers>
    <slot />


    <FooterInquire></FooterInquire>
    <Footer></Footer>
    <ButtonToTop></ButtonToTop>
     <Float></Float>
  </div>
</template>

<script setup lang="ts">
import Headers from "~/components/page/Headers.vue";
import Footer from "~/components/page/Footer.vue";
import Float from "~/components/page/Float.vue";
import ButtonToTop from "~/components/page/ButtonToTop.vue";
import FooterInquire from "~/components/form/FooterInquire.vue";
</script>