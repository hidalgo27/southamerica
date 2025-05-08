<script lang="ts" setup>
import { Notification, NotificationGroup, notify } from "notiwind";
definePageMeta({
  layout: "unique-footer",
})

const cards = [
  {
    image: '/images/team/banner3.jpg',
    title: 'Why book with us?',
    description: `Trusting someone to take care of your travel plans isn’t a light decision. This is why you can feel rest assured with us.`,
    url: '/about-us/why-southamerica',
  },
  {
    image: '/images/team/banner2.jpg',
    title: 'Our Purpose',
    description: `We exist to inspire people through remarkable travel experiences, to enable you to see the world as it should be seen.`,
    url: '/about-us/our-story',
  },
  {
    image: '/images/team/banner4.jpg',
    title: 'Our Policies',
    description: `Don’t take it from ourselves. See what accolades we’ve picked up along the way and see some of our most recent awards.`,
    url: '/about-us/our-policies',
  },
]

onMounted(() => {
  notify({
    group: "foo",
    title: 'Well done',
    type: "success",
    text: "Your trip has been successfully created 🙂",
  }, 4000) // 4s
});
</script>
<template>
  <section class="py-12 px-4 container text-center relative mt-12 md:mt-40 font-playfair-display">
    <h2 class="text-2xl md:text-3xl font-semibold mb-4">WHAT HAPPENS NEXT?</h2>
    <p class="text-gray-600 mb-12">
      We can’t wait to get working on your personalized holiday. These are the first, essential steps:
    </p>

    <!-- Línea horizontal para desktop -->
    <div
      class="hidden md:block absolute left-1/2 top-[195px] w-[66%] border-t border-orange-200 transform -translate-x-1/2 z-0">
    </div>

    <div class="flex flex-col md:flex-row justify-between gap-12 relative z-10">
      <!-- Paso 1 -->
      <div class="flex-1">
        <div
          class="size-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-gray-700 border-2 border-white shadow-md">
          1
        </div>
        <p class="text-gray-700">
          Check your inbox for a confirmation of your enquiry. If you’re ready to chat now then give us a call on
          <br />
          <strong class="text-xl">+1 (202) 4911478</strong>.
        </p>
      </div>

      <!-- Paso 2 -->
      <div class="flex-1">
        <div
          class="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-gray-700 border-2 border-white shadow-md">
          2
        </div>
        <p class="text-gray-700">
          Or if you’d prefer to wait, one of our team will be in touch as soon as possible to talk about your travel
          plans in greater depth.
        </p>
      </div>

      <!-- Paso 3 -->
      <div class="flex-1">
        <div
          class="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-gray-700 border-2 border-white shadow-md">
          3
        </div>
        <p class="text-gray-700">
          After that initial conversation, your Travel Expert will develop and fine-tune your perfect itinerary.
        </p>
      </div>
    </div>
    <NuxtLink to="/travel-packages" class="btn-primary-outline flex mt-12 mx-auto rounded-md">
      <span class="text-sm">Explore more</span>
    </NuxtLink>
  </section>
  <section class="py-12 px-4 container my-12 font-playfair-display">
    <h2 class="text-2xl md:text-3xl font-semibold text-center mb-12 tracking-wide uppercase">More About Us</h2>
    <div class="grid gap-10 grid-cols-1 md:grid-cols-3">
      <div v-for="(item, index) in cards" :key="index" class="flex flex-col relative group">
        <div class="w-full h-full overflow-hidden mb-6">
          <NuxtImg :src="item.image" :alt="item.title"
            class="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-105" />
        </div>
        <h3 class="text-lg font-semibold uppercase mb-3">{{ item.title }}</h3>
        <p class="text-sm text-gray-700 mb-4">{{ item.description }}</p>
        <NuxtLink class="btn-secondary-outline flex rounded-md" :to="item.url">
          Read More
        </NuxtLink>
      </div>
    </div>
  </section>
  <NotificationGroup group="foo">
    <div class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-40">
      <div class="w-full max-w-sm">
        <Notification v-slot="{ notifications }" enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-500"
          leave-from="opacity-100" leave-to="opacity-0" move="transition duration-500" move-delay="delay-300">
          <div v-for="notification in notifications" :key="notification.id">
            <div v-if="notification.type === 'success'"
              class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md">
              <div class="flex items-center justify-center w-12 bg-green-500">
                <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                </svg>
              </div>

              <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                  <span class="font-semibold text-green-500">{{ notification.title }}</span>
                  <p class="text-sm text-gray-600">{{ notification.text }}</p>
                </div>
              </div>
            </div>

            <div class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
              v-if="notification.type === 'error'">
              <div class="flex items-center justify-center w-12 bg-red-500">
                <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
              </div>

              <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                  <span class="font-semibold text-red-500">{{ notification.title }}</span>
                  <p class="text-sm text-gray-600">{{ notification.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>

<style></style>