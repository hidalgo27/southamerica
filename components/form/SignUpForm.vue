<script lang="ts" setup>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { useFormStore } from "~/stores/form";
import { useIpStore } from "~/stores/ip";
import { Notification, NotificationGroup, notify } from "notiwind";
import moment from "moment-timezone";

import { useDestinationStore } from "~/stores/destination";
import { useCategoriesStore } from "~/stores/categories";

const { dataLayer } = useScriptGoogleTagManager();
const { $device } = useNuxtApp();

const formStore = useFormStore();
const ipStore = useIpStore();
const categoriesStore = useCategoriesStore();
const destinationStore = useDestinationStore();

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

const countryInputRef = ref<HTMLElement | null>(null);
const companyCountryInputRef = ref<HTMLElement | null>(null);

const showLoader = ref(false);
const geoIp = ref();
// const selectedTitle = ref("");
const formData = ref({
  package: "",
  travelStyle: [],
  destinations: [],
  passengers: 1,
  startDate: null,
  endDate: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  phone_code: "",
  comment: "",
  country: "",
  country_code: "",
  userType: "Consumer",
  agencyName: "",
  agencyCountry: "",
});

/* const checkOptions = [
  "Subscribe to our newsletter and other offers.",
  "Monthly Newsletter Subscription",
  "Special Offers (once a month)",
  "Contest & Local Events (occasionally)",
]; */

const rules = computed(() => ({
  firstName: { required },
  lastName: { required },
  email: { required, email },
  country: { required },
  destinations: { required },
  agencyName: formData.value.userType === "Agent" ? { required } : {},
  agencyCountry: formData.value.userType === "Agent" ? { required } : {},
}))

const $v = useVuelidate(rules, formData);
function getBrowserName() {
  const browserMap = {
    Chrome: $device.isChrome,
    Safari: $device.isSafari,
    Firefox: $device.isFirefox,
    Edge: $device.isEdge,
    "Samsung Browser": $device.isSamsung,
  };

  return Object.keys(browserMap).find((browser) => browserMap[browser]) || "Unknown";
}

const getIp = async () => {
  const res = await ipStore.getIp();
  geoIp.value = res;
};

const handleSubmit = async () => {
  $v.value.$validate();

  if ($v.value.$invalid) {
    console.log("Formulario no válido");
    return;
  }

  showLoader.value = true;

  const obj = {
    category_d: formData.value.travelStyle.map(String),
    destino_d: formData.value.destinations,
    el_nombre: formData.value.firstName + " " + formData.value.lastName,
    el_email: formData.value.email,
    el_fecha: formData.value.startDate
      ? moment(formData.value.startDate).format("YYYY-MM-DD")
      : null,
    el_textarea: "Subscription",
    country: formData.value.country,
    codigo_pais: formData.value.country_code,
    producto: "southamerica.company",
    device: $device.isMobile ? "Mobile" : $device.isTablet ? "Tablet" : "Desktop",
    browser: getBrowserName(),
    origen: "Web",
    inquire_date: moment().tz("America/Lima").format("YYYY-MM-DD HH:mm:ss"),
    company: formData.value.agencyName,
    company_country: formData.value.agencyCountry,
  };

  dataLayer.push({
    user_properties: {
      user_id: { value: crypto.randomUUID() },
      email: { value: formData.value.email },
      full_name: { value: formData.value.firstName + " " + formData.value.lastName },
      tentative_date: { value: formData.value.startDate },
    },
    event: "generate_lead",
  });
  console.log(obj);

  await formStore.getInquire(obj).then((res) => {
    if (res) {
      showLoader.value = false;
      // Resetear formulario
      formData.value = {
        package: '',
        travelStyle: [],
        destinations: [],
        passengers: 1,
        startDate: null,
        endDate: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        phone_code: "",
        comment: "",
        country: "",
        country_code: "",
        userType: "Consumer",
        agencyName: "",
        agencyCountry: "",
      };
      $v.value.$reset();
      closeModal();
      notify({
        group: "foo",
        title: "Success",
        type: "success",
        text: "Thanks to subscribe 🙂",
      }, 4000);
    } else {
      showLoader.value = false;
      notify({
        group: "foo",
        title: "Error",
        type: "error",
        text: "An error ocurred while sending your subscription 😔",
      }, 4000);
    }
  }).catch((err) => {
    showLoader.value = false;
    notify({
      group: "foo",
      title: "Error",
      type: "error",
      text: "An error ocurred while sending your subscription 😔",
    }, 4000);
  });
};


const countries = ref([]);
const categories = ref([]);

const getCountries = async () => {
  const res: any = await destinationStore.getCountries();
  countries.value = res;
}

const getCategories = async () => {
  const res: any = await categoriesStore.getCategories();
  categories.value = res;
}

// @ts-ignore
let intlTelInput;

const setupIntlTelInput = async (inputElement: HTMLInputElement, type: "phone" | "country" | "companyCountry") => {
  if (!process.client) return;
  await nextTick();
  const iti = intlTelInput(inputElement, {
    initialCountry: "auto",
    // @ts-ignore
    geoIpLookup: (callback) => {
      fetch("https://ipapi.co/json?key=NgKiSgq0Re9Agc6U6mnuP9601tOdj5a5iMh6tjKcRUwzJQEE4H")
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback("us"));
    },
  });

  inputElement.addEventListener("countrychange", async () => {
    const countryData = iti.getSelectedCountryData();

    if (type === "phone") {
      formData.value.phone = "";
      formData.value.phone_code = `+${countryData.dialCode}`;
    } else if (type === "country") {
      formData.value.country = countryData.name;
      formData.value.country_code = countryData.iso2.toUpperCase() + " +" + countryData.dialCode;
    } else if (type === "companyCountry") {
      formData.value.agencyCountry = countryData.name;
    }
  });

  if (type === "companyCountry") {
    const testEvent = new Event("countrychange");
    inputElement.dispatchEvent(testEvent);
  }
  if (type === "country") {
    const testEvent = new Event("countrychange");
    inputElement.dispatchEvent(testEvent);
  }
};

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await nextTick();
    if (process.client) {
      if (countryInputRef.value) await setupIntlTelInput(countryInputRef.value as HTMLInputElement, "country");
    }
  }
})

watch(() => formData.value.userType, async (newType) => {
  if (newType === "Agent") {
    await nextTick();
    if (process.client) {
      if (companyCountryInputRef.value) await setupIntlTelInput(companyCountryInputRef.value as HTMLInputElement, "companyCountry");
    }
  } else if (newType === "Consumer") {
    formData.value.agencyName = "";
    formData.value.agencyCountry = "";
  }
});

onMounted(async () => {
  await getCountries();
  await getCategories();
  await getIp();
  // @ts-ignore
  if (process.client) import("intl-tel-input/build/js/intlTelInput.min.js").then((module) => {
    intlTelInput = module.default;
  });
});
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center z-50 justify-center bg-gray-800 bg-opacity-50 scroll"
    @click.self="closeModal">
    <div class="bg-white rounded-lg shadow-lg w-5/6 h-screen md:h-auto relative overflow-y-auto sm:overflow-y-auto">
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
        <form @submit.prevent="handleSubmit" class="flex-auto p-6 md:p-10 text-xs ">
          <!-- Botones de título -->
          <!-- <label for="title" class="block text-gray-600 mb-2">Title *</label>
          <div id="title" class="flex gap-3 mb-4">
            <button v-for="title in ['Mr.', 'Mrs.', 'Ms.']" :key="title" type="button"
              class="border px-4 py-2 rounded-full" :class="{ 'bg-gray-200 duration-300': selectedTitle === title }"
              @click="selectedTitle = title">
              {{ title }}
            </button>
          </div> -->

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="first-name" class="block text-gray-600 mb-1">First Name *</label>
              <input v-model="formData.firstName" type="text" class="input-field" placeholder="John" />
              <div v-if="$v.firstName.$error" class="text-xs text-red-500">First Name required</div>
            </div>
            <div>
              <label for="last-name" class="block text-gray-600 mb-1">Last Name *</label>
              <input v-model="formData.lastName" type="text" class="input-field" placeholder="Smith" />
              <div v-if="$v.lastName.$error" class="text-xs text-red-500">Last Name required</div>
            </div>
          </div>

          <div class="mt-4">
            <label for="email" class="block text-gray-600 mb-1">Email *</label>
            <input v-model="formData.email" type="email" class="input-field" placeholder="Email address" />
            <div v-if="$v.email.$error" class="text-xs text-red-500">
              <span v-if="$v.email.email.$message">{{ $v.email.email.$message }}</span>
            </div>
          </div>

          <div clas="mt-4">
            <label class="block text-gray-600 mb-1 mt-4">I am a(n): *</label>
            <div class="flex gap-4 ">
              <button type="button" class="border px-4 py-2 rounded-full"
                :class="{ 'bg-gray-200 duration-300': formData.userType === 'Consumer' }"
                @click="formData.userType = 'Consumer'">Consumer</button>
              <button type="button" class="border px-4 py-2 rounded-full"
                :class="{ 'bg-gray-200 duration-300': formData.userType === 'Agent' }"
                @click="formData.userType = 'Agent'">Agent</button>
            </div>
          </div>
          <template v-if="formData.userType === 'Agent'">
            <div class="mt-4">
              <label class="block text-gray-600 mb-1">Agency Name *</label>
              <input v-model="formData.agencyName" type="text" class="input-field" placeholder="Agency Name" />
              <div v-if="$v.agencyName.$error" class="text-xs text-red-500">Agency Name required</div>
            </div>
            <div class="mt-4">
              <label class="block text-gray-600 mb-1">Agency Country *</label>
              <input type="text" class="input-goto peer" placeholder="" autocomplete="off"
                v-model="formData.agencyCountry" ref="companyCountryInputRef" id="agencyName" @keydown.prevent />
              <div v-if="$v.agencyCountry.$error" class="text-xs text-red-500">Agency Country required</div>
            </div>
          </template>

          <div class="mt-4">
            <label class="lock text-gray-600 mb-1">Where are you from? *</label>
            <input type="text" class="input-goto peer" placeholder="" autocomplete="off" v-model="formData.country"
              ref="countryInputRef" id="country_name" @keydown.prevent />
            <div v-if="$v.country.$error" class="text-xs text-red-500">Country required</div>
          </div>

          <!-- País de interés -->
          <div class="mt-4">
            <label class="block text-gray-600 mb-1">Destination of Interest *</label>
            <div class="overflow-y-auto h-24 max-h-24 border rounded p-3 space-y-1">
              <template v-for="country in countries" :key="country.codigo">
                <div class="font-semibold ">{{ country.nombre }}</div>
                <div v-for="destination in country.destino" :key="destination.id" class="flex items-center">
                  <input type="checkbox" :id="'destination-' + destination.id" :value="destination.nombre"
                    v-model="formData.destinations"
                    class="w-4 h-4 bg-gray-100 border-gray-100 rounded-md focus:ring-2  mr-2" />
                  <label :for="'destination-' + destination.id">{{ destination.nombre }}</label>
                </div>
              </template>
            </div>
            <div v-if="$v.destinations.$error" class="text-xs text-red-500">Destination required</div>
          </div>

          <!-- Estilos de viaje -->
          <div class="mt-4">
            <label class="block text-gray-600 mb-1">Which travel style(s) are you most interested in?
              (Max 3, Optional)</label>
            <div
              class="overflow-y-auto h-24 max-h-24 border border-gray-300 rounded-lg p-3 bg-white shadow-sm space-y-1">
              <template v-for="category in categories" :key="category.id">
                <div class="flex items-center hover:bg-gray-100 rounded-lg ">
                  <input type="checkbox" :id="'category-' + category.id" :value="category.id"
                    v-model="formData.travelStyle"
                    :disabled="formData.travelStyle.length >= 3 && !formData.travelStyle.includes(category.id)"
                    class="w-4 h-4 bg-gray-100 border-gray-100 rounded-md focus:ring-2  mr-2" />
                  <label :for="'category-' + category.id" class="text-gray-700 cursor-pointer">{{ category.nombre
                  }}</label>
                </div>
              </template>
            </div>
          </div>

          <!-- Checkboxes -->
          <!-- <fieldset class="mb-6">
            <legend class="text-gray-600 mb-2">Preferences</legend>
            <div class="flex flex-col gap-2">
              <label v-for="(option, index) in checkOptions" :key="index" class="flex items-center gap-2">
                <input type="checkbox" v-model="selectedOptions" :value="option" class="h-5 w-5 text-red-500">
                {{ option }}
              </label>
            </div>
          </fieldset> -->

          <div class="flex justify-center mt-6 relative ">
            <button type="submit"
              class="btn-ternary py-2 px-4 rounded shadow-md hover:bg-gray-100 hover:text-gray-700 w-full"
              v-show="showLoader == false">Send Inquiry</button>
            <button type="button" class="btn-disabled w-full justify-center flex" disabled v-show="showLoader == true">
              <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </svg>
              Processing...
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <NotificationGroup group="foo">
    <div class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none" style="z-index: 9999">
      <div class="w-full max-w-sm">
        <Notification v-slot="{ notifications }" enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-500"
          leave-from="opacity-100" leave-to="opacity-0" move="transition duration-500" move-delay="delay-300">
          <div v-for="notification in notifications" :key="notification.id">
            <div v-if="notification.type === 'success'"
              class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-md shadow-md">
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
<style>
@import 'intl-tel-input/build/css/intlTelInput.css';
</style>