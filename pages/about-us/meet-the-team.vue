<script lang="ts" setup>
import DescriptionWithLine from '~/components/home/DescriptionWithLine.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

const team = [
  {
    title: 'Leadership Board', members: [
      { name: 'Bruce Hodge', position: 'Founder & President', imgSrc: 'https://picsum.photos/200/200' },
      { name: 'Claire Newell', position: 'General Manager', imgSrc: 'https://picsum.photos/200/200' },
      { name: 'Randy Durband', position: 'CEO', imgSrc: 'https://picsum.photos/200/200' },
      { name: 'Steve Spivak', position: 'Vice President', imgSrc: 'https://picsum.photos/200/200' }
    ]
  },
  {
    title: 'Leadership Team', members: [
      { name: 'Claire Newell', position: 'General Manager', imgSrc: 'https://picsum.photos/200/200' },
      { name: 'Bruce Hodge', position: 'Founder & President', imgSrc: 'https://picsum.photos/200/200' }
    ]
  },
  {
    title: 'Product Management', members: [
      { name: 'Randy Durband', position: 'CEO', imgSrc: 'https://picsum.photos/200/200' },
      { name: 'Steve Spivak', position: 'Vice President', imgSrc: 'https://picsum.photos/200/200' }
    ]
  },
  {
    title: 'Account Management', members: [
      { name: 'Claire Newell', position: 'General Manager', imgSrc: 'https://picsum.photos/200/200' },
      { name: 'Bruce Hodge', position: 'Founder & President', imgSrc: 'https://picsum.photos/200/200' }
    ]
  }
];

const activeTab = ref(0);
</script>

<template>
  <HeaderImgNav />
  <DescriptionWithLine />

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
        class="bg-white p-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-1/2 h-1/2 text-center">
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