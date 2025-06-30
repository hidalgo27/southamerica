<script lang="ts" setup>

definePageMeta({
  layout: 'unique-footer'
});

import AllTeam from '~/components/about/AllTeam.vue';
import StartPlanningBanner from '~/components/about/StartPlanningBanner.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

const header = {
  title: 'Our Team',
  description: 'Meet the dedicated individuals behind GOTOGROUP, passionate about crafting your perfect Latin American adventure.',
  image: '/images/about-us/our-team.jpg',
  alt: 'Our Team at GOTOGROUP'
};
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <section class="bg-primary/10 ">
    <main class="container py-24">
      <h1 class="italic text-4xl mb-6 font-playfair">Our Team</h1>
      <div class="xl:w-2/3 gap-2 leading-relaxed">
        <p>
          The driving force behind GOTOGROUP is our incredible team; an enthusiastic and diverse group of individuals
          united by a love for Latin America and a belief in the transformative power of travel. We are more than just
          travel agents; we serve as cultural ambassadors, adventure partners, and committed collaborators in crafting
          your dream vacation.
        </p>
        <p class="mt-4">
          For us, travel embodies the essence of making genuine connections: understanding the intricacies of local
          life, mingling with communities, and discovering a place's true character. This philosophy guides every member
          of the GOTOGROUP team, from initial planning to on-the-ground support. We're here to create bespoke excursions
          that showcase Latin America and allow you to experience it firsthand, leaving you with memories that will
          endure long after you return.
        </p>
        <p class="mt-4">
          Discover the dedicated individuals who comprise the GOTOGROUP family and are happy to share their love for
          Latin America with you.
        </p>
      </div>
    </main>
  </section>
  <AllTeam />
  <Reviews />
  <StartPlanningBanner />
</template>
<style></style>