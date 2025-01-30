<script lang="ts" setup>
import ListExperiences from '~/components/experiences/ListExperiences.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import TripStyles from '~/components/experiences/TripStyles.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <TripStyles></TripStyles>

  <section>
    <ListExperiences></ListExperiences>
  </section>
  <SliderPackages></SliderPackages>

  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>
<style></style>