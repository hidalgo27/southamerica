<template>
  <div class="h-screen ">
    <Headers class="  w-full  z-50"></Headers>

    <slot/>

    <section class=" relative z-10  h-auto overflow-hidden">
      <div class="md:absolute md:inset-0 mt-0 2xl:mt-96">
        <form-footer-inquire></form-footer-inquire>
      </div>
      <nuxt-img src="/images/banners/banner-test2.webp" class="-mt-80 md:-mt-0 w-full h-full"></nuxt-img>
    </section>
    <Footer></Footer>

    <Float></Float>

  </div>
</template>

<script setup lang="ts">

import Headers from "~/components/page/Headers.vue";
import Footer from "~/components/page/Footer.vue";
import Float from "~/components/page/Float.vue";
</script>