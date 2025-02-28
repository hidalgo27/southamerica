<script lang="ts" setup>
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

const team = [
  {
    title: 'Leadership Board', members: [
      { name: 'Bruce Hodge', position: 'Founder & President', imgSrc: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/StefanShaloff.png?h=c42dabf0&itok=WUgvN02_' },
      { name: 'Claire Newell', position: 'General Manager', imgSrc: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/ShanazDarr.png?h=6e3d84a6&itok=resVHYTp' },
      { name: 'Randy Durband', position: 'CEO', imgSrc: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/Shamsheer_cottar_illustration.png?VersionId=SjgWomsqcyjOHrXp5nBFUO.408lvH1qU&h=826e7b48&itok=Vj0PNAvo' },
      { name: 'Steve Spivak', position: 'Vice President', imgSrc: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/JessicaKidd.png?h=826e7b48&itok=WKAP-LzM' }
    ]
  },
  {
    title: 'Leadership Team', members: [
      { name: 'Claire Newell', position: 'General Manager', imgSrc: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/JessicaKidd.png?h=826e7b48&itok=WKAP-LzM' },
      { name: 'Bruce Hodge', position: 'Founder & President', imgSrc: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/Shamsheer_cottar_illustration.png?VersionId=SjgWomsqcyjOHrXp5nBFUO.408lvH1qU&h=826e7b48&itok=Vj0PNAvo' }
    ]
  },
  {
    title: 'Product Management', members: [
      { name: 'Randy Durband', position: 'CEO', imgSrc: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/Shamsheer_cottar_illustration.png?VersionId=SjgWomsqcyjOHrXp5nBFUO.408lvH1qU&h=826e7b48&itok=Vj0PNAvo' },
      { name: 'Steve Spivak', position: 'Vice President', imgSrc: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/JessicaKidd.png?h=826e7b48&itok=WKAP-LzM' }
    ]
  },
  {
    title: 'Account Management', members: [
      { name: 'Claire Newell', position: 'General Manager', imgSrc: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/JessicaKidd.png?h=826e7b48&itok=WKAP-LzM' },
      { name: 'Bruce Hodge', position: 'Founder & President', imgSrc: 'https://images.goway.com/production/styles/staff_profile_photo_3xl/s3/author/Shamsheer_cottar_illustration.png?VersionId=SjgWomsqcyjOHrXp5nBFUO.408lvH1qU&h=826e7b48&itok=Vj0PNAvo' }
    ]
  }
];

const activeTab = ref(0);

const text = {
  title: 'A global team, creating global experiences.',
  description: 'At SouthAmerica, we sell trips to all corners of the world. Thus, it’s only fitting that our team is from all across this world, with 45 nationalities represented at the company. We have over 600 team members working out of five offices across three continents. We’re global. We think internationally. And our team is diverse. \nEvery single team member at SouthAmerica brings their own unique experiences, passions, and skills to the table.This is essential to our mission to provide the best tailor- made travel experiences in the world.We’re passionate travellers catering to passionate travellers.\nYou’re only as good as your team, and luckily, we’ve got a great one.'
}
</script>

<template>
  <HeaderImgNav />
  <DescriptionWithLine :text="text" />

  <section class="container my-20 px-4">
    <div class="flex justify-center space-x-4 border-b-2 mb-6">
      <button v-for="(item, index) in team" :key="index" @click="activeTab = index"
        class="px-4 py-2 text-sm md:text-lg font-semibold transition duration-300 ease-in-out"
        :class="activeTab === index ? 'border-b-4 border-orange-500 text-orange-500' : 'text-gray-500 hover:text-orange-400'">
        {{ item.title }}
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6 ">
      <div v-for="member in team[activeTab].members" :key="member.name"
        class="bg-white p-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-self-center w-1/2 h-1/2 text-center">
        <div class="relative p-6 w-full rounded-md h-full">
          <img :src="member.imgSrc" class="rounded-md  w-full h-full object-cover">
        </div>

        <div class="space-y-4">
          <h1 class="font-semibold text-4xl mb-4 font-playfair-display tracking-wide">
            {{ member.name }}
          </h1>
          <div class="text-gray-700 leading-relaxed">
            {{ member.position }}
          </div>
        </div>
      </div>
    </div>
  </section>
  <Newsletter></Newsletter>
  <Reviews></Reviews>
</template>

<style></style>