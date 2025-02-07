<script setup lang="ts">
import { usePackageStore } from "~/stores/packages";
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const closeForm = () => {
  emit("close");
};
const packageStore = usePackageStore();

const formData = ref({
  firstName: "",
  lastName: "",
  userType: "Consumer",
  agencyName: "",
  email: "",
  phone: "",
  streetAddress: "",
  unitNumber: "",
  adults: 2,
  children: 0,
  startDate: "",
  endDate: "",
  country: "",
  travelStyle: [],
  budget: "",
  comment: "",
});

const submitForm = () => {
  console.log("Formulario enviado:", formData.value);
  closeForm();
};

watchEffect(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = props.isOpen ? "hidden" : "auto";
  }
});

const route = useRoute();
const packageDetail = ref(null);
const getPackageDetail = async () => {
  const res: any = await packageStore.getPackages();
  packageDetail.value = res.find((item: any) => item.url === route.path.split('/')[2]);
};

onMounted(async () => {
  if (route.path.split('/')[2] && route.path.includes('/travel-packages/')) await getPackageDetail();
});

watch(() => route.path, async () => {
  if (route.path.split('/')[2] && route.path.includes('/travel-packages/'))
    await getPackageDetail();
  else
    packageDetail.value = null;
});
</script>
<template>
  <Teleport to="body">
    <!-- Overlay -->
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50" @click="closeForm"></div>

    <!-- Formulario Deslizable -->
    <transition name="slide">
      <div v-if="isOpen"
        class="fixed top-0 right-0 w-full max-w-2xl h-screen bg-white shadow-xl p-6 px-12 z-50 overflow-y-auto">
        <button @click="closeForm"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 rounded-full p-2 border">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <div v-if="packageDetail" class="w-11/12 bg-blue-50 h-24 mb-6 rounded-md flex items-center p-2 shadow-md ">
          <NuxtImg :src="packageDetail.imagen" alt="Trip Image" class="w-16 h-16 rounded-md object-cover" />
          <div class="ml-4">
            <p class="text-xs text-gray-500">Selected Trip Itinerary</p>
            <p class="text-md font-semibold text-gray-800">{{ packageDetail.titulo }}</p>
          </div>
        </div>
        <h2 class="text-2xl font-semibold mb-4 font-playfair-display">Start planning with Goway</h2>

        <form @submit.prevent="submitForm" class="space-y-4 text-sm">
          <!-- Nombres -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium">First Name *</label>
              <input v-model="formData.firstName" type="text" class="input-field" placeholder="John" required />
            </div>
            <div>
              <label class="block text-sm font-medium">Last Name *</label>
              <input v-model="formData.lastName" type="text" class="input-field" placeholder="Smith" required />
            </div>
          </div>

          <!-- Tipo de usuario -->
          <div>
            <label class="block text-sm font-medium">I am a(n): *</label>
            <div class="flex space-x-4">
              <button type="button" class="border px-4 py-2 rounded-full"
                :class="{ 'bg-gray-200 duration-300': formData.userType === 'Consumer' }"
                @click="formData.userType = 'Consumer'">Consumer</button>
              <button type="button" class="border px-4 py-2 rounded-full"
                :class="{ 'bg-gray-200 duration-300': formData.userType === 'Agent' }"
                @click="formData.userType = 'Agent'">Agent</button>
            </div>
          </div>
          <template v-if="formData.userType === 'Agent'">
            <div>
              <label class="block text-sm font-medium">Agency Name *</label>
              <input v-model="formData.agencyName" type="text" class="input-field" placeholder="Agency Name" required />
            </div>
          </template>

          <!-- Email y Teléfono -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium">Email *</label>
              <input v-model="formData.email" type="email" class="input-field" placeholder="Email address" required />
            </div>
            <div>
              <label class="block text-sm font-medium">Phone Number *</label>
              <input v-model="formData.phone" type="tel" class="input-field" placeholder="1234567890" required />
            </div>
          </div>

          <!-- Dirección -->
          <div>
            <label class="block text-sm font-medium">Street Address *</label>
            <input v-model="formData.streetAddress" type="text" class="input-field" placeholder="Street Address"
              required />
          </div>
          <div>
            <label class="block text-sm font-medium">Unit Number (optional)</label>
            <input v-model="formData.unitNumber" type="text" class="input-field" placeholder="Unit Number" />
          </div>

          <!-- Cantidad de adultos y niños -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium">How many adults? *</label>
              <select v-model="formData.adults" class="input-field">
                <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium">How many children? *</label>
              <select v-model="formData.children" class="input-field">
                <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>

          <!-- Duración del viaje -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium">Select Start Date *</label>
              <input v-model="formData.startDate" type="date" class="input-field" required />
            </div>
            <div>
              <label class="block text-sm font-medium">Select End Date *</label>
              <input v-model="formData.endDate" type="date" class="input-field" required />
            </div>
          </div>

          <!-- País de interés -->
          <div v-if="!packageDetail">
            <label class="block text-sm font-medium">Country of Interest *</label>
            <select v-model="formData.country" class="input-field">
              <option value="">Select</option>
              <option>USA</option>
              <option>Canada</option>
              <option>Mexico</option>
              <option>France</option>
              <option>Japan</option>
            </select>
          </div>

          <!-- Estilos de viaje -->
          <div v-if="!packageDetail">
            <label class="block text-sm font-medium">Which travel style(s) are you most interested in? (Max 3)
              *</label>
            <select v-model="formData.travelStyle" multiple class="input-field">
              <option>Adventure</option>
              <option>Luxury</option>
              <option>Family</option>
              <option>Beach</option>
              <option>Cultural</option>
            </select>
          </div>

          <!-- Presupuesto -->
          <div v-if="!packageDetail">
            <label class="block text-sm font-medium">Estimated Per Person Budget *</label>
            <select v-model="formData.budget" class="input-field">
              <option>Select your budget</option>
              <option>$500 - $1000</option>
              <option>$1000 - $5000</option>
              <option>$5000+</option>
            </select>
          </div>

          <!-- Comentario opcional -->
          <div>
            <label class="block text-sm font-medium">What would make an ideal Goway vacation? (Optional)</label>
            <textarea v-model="formData.comment" class="input-field h-20"></textarea>
          </div>

          <fieldset class="mb-6">
            <div class="flex flex-col gap-2">
              <label class="flex items-center gap-2">
                <input type="checkbox" value="" class="h-5 w-5 text-red-500">
                Subscribe to our newsletter and offers
              </label>
            </div>
          </fieldset>

          <!-- Botón de envío -->
          <button type="submit"
            class="btn-ternary py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700 w-full">Submit</button>
        </form>
      </div>
    </transition>
  </Teleport>
</template>
<style scoped>
.input-field {
  @apply w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400;
}

.toggle-btn {
  @apply px-4 py-2 border rounded-lg cursor-pointer transition-colors;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>