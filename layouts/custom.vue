<template>
  <div class="h-screen">
    <Headers class="top-0 absolute w-full  z-50"></Headers>
    <slot></slot>
<!--    <section class="py-2  mt-12 relative z-10">-->

<!--      <FormFooterInquireDetail></FormFooterInquireDetail>-->
<!--    </section>-->

    <section class=" relative z-10  h-auto overflow-hidden">
      <div class="md:absolute md:inset-0 mt-0 2xl:mt-96">
        <FormFooterInquireDetail></FormFooterInquireDetail>
      </div>
      <nuxt-img src="/images/banners/footer-colores3.jpg" class="-mt-80 md:-mt-0 w-full h-full"></nuxt-img>
    </section>

    <Footer></Footer>
<!--    <Float></Float>-->
  </div>
</template>

<script setup lang="ts">

import Headers from "~/components/page/Headers.vue";
import Footer from "~/components/page/Footer.vue";
import Float from "~/components/page/Float.vue";
</script>