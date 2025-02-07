<script lang="ts" setup>
const props = defineProps(["isOpen"]);
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

watchEffect(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = props.isOpen ? "hidden" : "auto";
  }
});
const selectedTitle = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const selectedType = ref("");
const country = ref("");
const selectedOptions = ref([]);

const checkOptions = [
  "Subscribe to our newsletter and other offers.",
  "Monthly Newsletter Subscription",
  "Special Offers (once a month)",
  "Contest & Local Events (occasionally)",
];

const handleSubmit = () => {
  alert(`Registered: ${firstName.value} ${lastName.value} - ${email.value}`);
};
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center z-50 justify-center bg-gray-800 bg-opacity-50 scroll"
    @click.self="closeModal">
    <div class="bg-white rounded-lg shadow-lg w-5/6 h-screen md:h-3/4 relative overflow-y-auto sm:overflow-y-auto">
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        ✕
      </button>

      <div class="flex flex-col md:flex-row md:gap-6 md:h-full">
        <div class="bg-gray-100  rounded-lg p-6 lg:p-20 md:w-1/3">
          <h2 class="text-3xl font-bold mb-4 font-playfair-display">Sign Up</h2>
          <p class="text-gray-600 mb-2 text-xs md:text-md md:mb-6">Join our newsletter to access Travel Specials,
            Inspiration, and Expert Guides.
          </p>
          <ul class="md:space-y-4 text-gray-600 text-xs">
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-4 m-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
              Exclusive Savings</li>
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-4 m-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
              Insider Contests</li>
            <li class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-4 m-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              Trending Guides</li>
          </ul>
        </div>
        <form @submit.prevent="handleSubmit" class="flex-auto p-6 md:p-10 text-xs">
          <!-- Botones de título -->
          <label for="title" class="block text-gray-600 mb-2">Title *</label>
          <div id="title" class="flex gap-3 mb-4">
            <button v-for="title in ['Mr.', 'Mrs.', 'Ms.']" :key="title" type="button"
              class="border px-4 py-2 rounded-full" :class="{ 'bg-gray-200 duration-300': selectedTitle === title }"
              @click="selectedTitle = title">
              {{ title }}
            </button>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="first-name" class="block text-gray-600 mb-1">First Name *</label>
              <input id="first-name" v-model="firstName" type="text" placeholder="John"
                class="w-full border p-2 rounded">
            </div>
            <div>
              <label for="last-name" class="block text-gray-600 mb-1">Last Name *</label>
              <input id="last-name" v-model="lastName" type="text" placeholder="Smith"
                class="w-full border p-2 rounded">
            </div>
          </div>

          <div class="mt-4">
            <label for="email" class="block text-gray-600 mb-1">Email *</label>
            <input id="email" v-model="email" type="email" placeholder="Email address"
              class="w-full border p-2 rounded">
          </div>

          <label for="user-type" class="block text-gray-600 mt-4 mb-2">I am a(n): *</label>
          <div id="user-type" class="flex gap-3 mb-4">
            <button v-for="type in ['Consumer', 'Agent']" :key="type" type="button"
              class="border px-4 py-2 rounded-full" :class="{ 'bg-gray-200 duration-300': selectedType === type }"
              @click="selectedType = type">
              {{ type }}
            </button>
          </div>

          <div>
            <label for="country" class="block text-gray-600 mb-1">Country of Residence *</label>
            <select id="country" v-model="country" class="w-full border p-2 rounded mb-4">
              <option disabled value="">Select your country</option>
              <option>USA</option>
              <option>Canada</option>
              <option>UK</option>
            </select>
          </div>

          <!-- Checkboxes -->
          <fieldset class="mb-6">
            <legend class="text-gray-600 mb-2">Preferences</legend>
            <div class="flex flex-col gap-2">
              <label v-for="(option, index) in checkOptions" :key="index" class="flex items-center gap-2">
                <input type="checkbox" v-model="selectedOptions" :value="option" class="h-5 w-5 text-red-500">
                {{ option }}
              </label>
            </div>
          </fieldset>

          <button type="submit"
            class="btn-ternary py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700 w-full">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<style></style>