<script lang="ts" setup>
import NavDestination from '~/components/destinations/NavDestination.vue';
import CardBlue from '~/components/experts/CardBlue.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import TravelGuides from '~/components/destinations/TravelGuides.vue';
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <NavDestination></NavDestination>
  <CardBlue></CardBlue>
  <TravelGuides></TravelGuides>
  <EspecialistLetter> </EspecialistLetter>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>