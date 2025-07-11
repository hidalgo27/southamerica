<script lang="ts" setup>
import SectionsAbout from '~/components/about/SectionsAbout.vue';
import StartPlanningBanner from '~/components/about/StartPlanningBanner.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

definePageMeta({
  layout: 'unique-footer'
});

const header = ref({
  miniTitle: 'The SouthAmerica Way',
  title: 'About Us',
  url: '/images/team/banner4.webp',
})
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <section class="bg-primary/10 ">
    <main class="container py-24">
      <h1 class="italic text-4xl mb-6 font-playfair">Our Story</h1>
      <div class="xl:w-2/3 gap-2 leading-relaxed">
        <p>
          <b>SouthAmerica.Company</b> was born with a bold ambition: to reimagine how travelers connect with the soul of
          an
          entire continent. As part of <b>GOTOGROUP</b>, we harness decades of experience crafting immersive journeys
          that go
          far beyond traditional tourism—journeys that are deeply personal, culturally rich, and rooted in the rhythm of
          South America.
        </p>
        <p class="mt-4">
          This is a land of contrasts: from the icy silence of Patagonia to the explosive joy of a Colombian fiesta,
          from the echoes of Incan stones to the whisper of Amazonian rivers. South America pulses with life, diversity,
          and stories waiting to be lived.
        </p>
        <p class="mt-4 font-bold">
          Its energy, its soul, its truth.
        </p>
      </div>
    </main>
    <NuxtImg src="/images/team/portada-team.webp" class="w-full">
    </NuxtImg>
  </section>
  <section class="">
    <main class="container py-24 ">
      <h1 class="italic text-4xl mb-6 font-playfair">Why Travel With Us?</h1>
      <div class="xl:w-2/3 gap-2 leading-relaxed">
        <p>
          Choosing <b>SouthAmerica.Company</b> means choosing to travel with depth, intention, and style. Backed by the
          creative spirit of <b>GOTOGROUP</b> , we specialize in tailor-made experiences across the continent—each
          crafted with
          care, curiosity, and regional insight.
        </p>
        <p class="mt-4">
          From your first message to the moment you return home, we handle every detail with precision and passion. We
          work with trusted local partners, celebrate cultural authenticity, and are fiercely committed to sustainable
          practices. Because real travel isn’t just about places—it’s about people, connection, and transformation.
        </p>
        <p class="mt-4">
          Travel with us, and explore South America as it was meant to be experienced: vividly, meaningfully, and
          entirely your own.
        </p>
      </div>
    </main>
  </section>
  <section class="bg-primary/10 flex flex-col xl:flex-row">
    <main class="container xl:pl-26 xl:pr-24 py-20 order-2 xl:order-1 my-auto">
      <h1 class="italic text-4xl mb-6 font-playfair">More Than Travel—A Way of Living</h1>
      <div class="gap-2 leading-relaxed xl:text-base">
        <p>
          We believe great journeys should move you—emotionally, physically, spiritually. That’s why we design every
          itinerary like a story: one where you are the main character, and the continent reveals itself moment by
          moment.
        </p>
        <p class="mt-4">
          Whether you're trekking through the Andes, dining under the stars in the Atacama, or learning ancestral
          traditions in the Amazon, we make sure each experience is grounded in truth and elevated by joy.
        </p>
        <p class="mt-4">
          It’s about of transformation—written in landscapes, shared through encounters, and remembered for a lifetime.
        </p>
      </div>
    </main>
    <NuxtImg src="images/team/what-next.webp" class="h-[40vh] xl:h-full xl:w-1/2 object-cover order-1 xl:order-2">
    </NuxtImg>
  </section>
  <section class="flex flex-col xl:flex-row">
    <NuxtImg src="/images/team/image-logo.webp" class="h-[40vh] xl:h-full xl:w-1/2 object-cover">
    </NuxtImg>
    <main class="container xl: xl:pl-24 py-20 my-auto">
      <h1 class="italic text-4xl mb-6 font-playfair">Part of GOTOGROUP</h1>
      <div class="gap-2 leading-relaxed xl:text-base">
        <p>
          As part of <b>GOTOGROUP</b>, we carry the spirit of the <b>Qente</b>, the Andean hummingbird—symbol of
          freedom,
          wisdom, and
          harmony between human beings and nature. This emblem guides our work across Latin America and the Caribbean:
          creating meaningful journeys that honor local cultures, protect natural wonders, and build bridges between
          travelers and the communities they visit.
        </p>
        <p class="mt-4">
          With a strong presence in <b>Peru, Argentina, Colombia, Brazil, Ecuador, Costa Rica,</b> and now across
          <b>South America</b>, GOTOGROUP leads a new generation of conscious travel: personal, responsible, and
          soul-stirring.
        </p>
      </div>
    </main>
  </section>
  <section class="bg-primary/10 ">
    <main class="container py-24">
      <h1 class="italic text-4xl mb-6 font-playfair">Let South America Change You</h1>
      <div class="xl:w-2/3 gap-2 leading-relaxed ">
        <p>
          No two journeys should ever be the same—because no two travelers are. That’s why every SouthAmerica.Company
          experience is tailored to your pace, your passions, and your dreams.
        </p>
        <p class="mt-4">
          Let us guide you across a continent that will surprise you, teach you, and stay with you. With expert
          knowledge, meticulous planning, and warm human touch, we bring your South American story to life.
        </p>
        <p class="mt-4 font-bold">
          This is your continent. Your rhythm. Your journey. We’re just here to make it unforgettable.
        </p>
      </div>
    </main>
  </section>
  <!-- <Newsletter></Newsletter> -->
  <SectionsAbout />
  <Reviews></Reviews>
  <StartPlanningBanner />
</template>
<style></style>