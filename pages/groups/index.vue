<script lang="ts" setup>
import TripStyles from '~/components/experiences/TripStyles.vue';
import CardBlue from '~/components/experts/CardBlue.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import TextDescription from '~/components/home/TextDescription.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import Benefits from '~/components/page/slider/Benefits.vue';

const activeTab = ref('benefits');

const tabs = [
  { key: 'benefits', label: 'Benefits of Group Travel' },
  { key: 'only-groups', label: 'We Only Work with Groups' },
  { key: 'promotional-back', label: `We've Got Your(Promotional) Back` },
  { key: 'bookings', label: 'Goway GroupsOnly Air Bookings' }
];

const content = {
  benefits: {
    title: 'Benefits of Group Travel',
    benefits_list: [
      {
        title: 'Expertise', description: 'Our GroupsOnly Team of Experts will put together a trip that matches your needs and interests, while keeping in mind those special touches needed for smooth group travel.'
      },
      {
        title: 'Value', description: 'Our GroupsOnly Team of Experts will put together a trip that matches your needs and interests, while keeping in mind those special touches needed for smooth group travel.'
      },
      {
        title: 'Flexibility', description: 'Our GroupsOnly Team of Experts will put together a trip that matches your needs and interests, while keeping in mind those special touches needed for smooth group travel.'
      },
      {
        title: 'Peace of Mind', description: 'Our GroupsOnly Team of Experts will put together a trip that matches your needs and interests, while keeping in mind those special touches needed for smooth group travel.'
      },
    ]
  },
  works: {
    title: 'We Only Work with Groups',
    description: 'Working with Goway GroupsOnly means working with our Groups Specialists, enjoying all of our Goway destination expertise with that special Groups boost. We all know organizing a group is more complicated than taking off by yourself, with the family, or with a few friends or colleagues. That’s why Goway GroupsOnly only works with groups of 10 or more. On top of your specialist’s full attention, you’re getting over 50 years of dedicated groups expertise. Our team is so familiar with the challenges and requirements particular to group travel, we’ve go many of them solved before you even think of them. That’s the Goway GroupsOnly difference'
  },
  promotional: {
    title: 'We’ve Got Your (Promotional) Back',
    description: 'Feeling inspired to lead a group of friends or like-minded acquaintances who’d be interested in a group trip? If they just need that extra push to commit, Goway GroupsOnly can help. If you’re not afraid to add a few new friends to the mix, a little marketing or PR boost can make all the difference in filling up those last few group slots. Talk to us about custom solutions that speak to your group, whether it’s e-fliers, blog articles, or help selling your group trip on social media. We can even put together a presentation to get your group excited about the trip.'
  },
  bookings: {
    title: 'Goway GroupsOnly Air Bookings',
    description: 'Not in love with the idea of keeping 10+ people organized at the airport (or worse, through connections!)? You’re not alone. We take the stress out of booking air itineraries for every group, partnering with major airlines around the world. With the most competitive rates, our group base fares are guaranteed until departure.',
    advantages: [
      'Confirmed group space approximately 11 months prior to departure',
      'Secure your space with a deposit rather than full payment when you book, even if you don’t yet have names',
      'Access to group deals that may enable your group leader to fly free',
      'Detailed destination knowledge to match your land and air arrangements',
      'Quick turnaround on quote requests',
    ]
  }
};

const destination = {
  nombre: "South America",
  descripcion: "South America is a continent of superlatives: the highest, the largest, the longest, the deepest, the remotest. Discover the continent's most iconic destinations, from the Amazon rainforest to the Andes Mountains, from the beaches of Rio de Janeiro to the glaciers of Patagonia. Whether you're looking for adventure, culture, or relaxation, South America has something for everyone.",
}
</script>
<template>
  <HeaderImgNav></HeaderImgNav>
  <section class="container my-20">
    <div class="flex items-center justify-center mt-28 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 bg-white w-full gap-6 items-stretch">
        <div class="bg-tertiary bg-opacity-10 p-6 rounded-md flex flex-col justify-between h-full">
          <span class="text-lg">About us</span>
          <div class="border-t-2 h-64 my-8"></div>
          <h1 class="font-semibold text-5xl mb-6 title font-playfair-display tracking-wide">
            <div class="text-gray-500 text-lg mb-4">
            </div>
            Your Goway Group Trip, crafted your way.
          </h1>
          <p class="text-gray-600 mb-8">Our GroupsOnly Team of Experts will put together a trip that matches your needs
            and interests, while keeping in mind those special touches needed for smooth group travel.</p>
        </div>
        <div class="relative w-full rounded-md h-full">
          <img class="w-full h-full object-cover rounded-md"
            src="https://images.goway.com/production/styles/hero_s1_3xl/s3/contact_cta/South%20Pacific%20-%20AdobeStock_234280596.jpeg?VersionId=5gLq1k8pBdbzBJqcnVlzQeL.1uVJeqtN&h=894b9109&itok=tLPUHzhf" />
        </div>
      </div>
    </div>
  </section>
  <TextDescription v-if="destination" :destination="destination"></TextDescription>
  <Benefits></Benefits>
  <CardBlue></CardBlue>
  <TripStyles></TripStyles>
  <section class="container my-20">
    <div class="text-center">
      <p class="mb-6 tracking-widest font-bold">
        Trips to Africa
      </p>
      <h1 class="font-semibold text-5xl w-3/4 mx-auto mb-6 title font-playfair-display tracking-wide"> Explore Africa
        your way
        on a
        tailor-made trip with Goway
      </h1>
    </div>

    <div class="w-full mx-auto">
      <!-- Tabs -->
      <div class="flex justify-center md:space-x-6 border-b text-[0.65rem] md:text-lg">
        <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
          class="p-6 text-center border-b-2 transition"
          :class="activeTab === tab.key ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'">
          {{ tab.label }}
        </button>
      </div>

      <!-- Content -->
      <div class="mt-6">


        <!-- Benefits -->
        <div v-if="activeTab === 'benefits'">
          <h2 class="text-xl font-playfair-display font-semibold my-6 md:my-12 text-center md:text-left">{{
            content.benefits.title }}</h2>
          <div class="text-lg">
            <div v-for="benefit in content.benefits.benefits_list" :key="benefit.title"
              class=" border-gray-200 my-20 rounded-md">
              <h3 class="text-lg font-playfair-display font-semibold text-green-600 mb-4">{{ benefit.title }}</h3>
              <p class="text-gray-600">{{ benefit.description }}</p>
            </div>
          </div>
        </div>

        <!-- We Only work with groups -->
        <div v-if="activeTab === 'only-groups'" class="text-start">
          <h2 class="text-xl font-playfair-display font-semibold my-6 md:my-12 text-center md:text-left">{{
            content.works.title }}</h2>
          <p class="text-gray-600 mt-2 text-center md:text-left">{{ content.works.description }}</p>
        </div>
        <!-- We Only work with groups -->
        <div v-if="activeTab === 'promotional-back'" class="text-start">
          <h2 class="text-xl font-playfair-display font-semibold my-6 md:my-12 text-center md:text-left">{{
            content.promotional.title }}</h2>
          <p class="text-gray-600 mt-2 text-center md:text-left">{{ content.promotional.description }}</p>
        </div>

        <!-- Goway GroupsOnly Air Bookings -->
        <div v-if="activeTab === 'bookings'" class="text-start">
          <h2 class="text-xl font-playfair-display font-semibold my-6 md:my-12 text-center md:text-left">{{
            content.bookings.title }}</h2>
          <p class="text-gray-600 mt-2 text-center md:text-left">{{ content.bookings.description }}</p>
          <ul class="my-6 list-disc text-gray-600  ml-6 text-center md:text-left">
            <li v-for="advantage in content.bookings.advantages" :key="advantage">{{ advantage }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>

</template>
<style></style>