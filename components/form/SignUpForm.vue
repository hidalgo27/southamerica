<script lang="ts" setup>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { Dropdown } from "floating-vue";

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
const phoneInputRef = ref<HTMLElement | null>(null);

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
  acceptedTerms: false,
});

const checkOptions = [
  `I accept the <a href='#' class='relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0'>Privacy Policy</a>`,
  "Monthly Newsletter Subscription",
];
const selectedOptions = ref([]);

const rules = computed(() => ({
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phone: { required },
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
  $v.value.$touch();
  const isValid = await $v.value.$validate();
  const termsAccepted = formData.value.acceptTerms;

  if (!isValid || !termsAccepted) {
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
        acceptedTerms: false,
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
  if (type === "phone") {
    const testEvent = new Event("countrychange");
    inputElement.dispatchEvent(testEvent);
  }
};

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await nextTick();
    if (process.client) {
      if (countryInputRef.value) await setupIntlTelInput(countryInputRef.value as HTMLInputElement, "country");
      if (phoneInputRef.value) await setupIntlTelInput(phoneInputRef.value as HTMLInputElement, "phone");
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

const isMobile = ref(false);

const updateIsMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 640;
  }
};

const selectedTitle = ref('')
const dropdownIsOpen = ref(false)

let count = 0;
const onShow = () => {
  if (count === 0) {
    document.body.classList.add('no-scroll');
  }
  count++;
};

const onHide = () => {
  count--;
  if (count === 0) {
    document.body.classList.remove('no-scroll');
  }
};
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center z-50 justify-center bg-gray-800 bg-opacity-50 scroll"
    @click.self="closeModal">
    <div
      class="bg-white md:rounded-lg shadow-lg md:w-5/6 h-screen md:h-auto relative overflow-y-auto sm:overflow-y-auto">
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        ✕
      </button>

      <div class="flex flex-col md:flex-row md:gap-6 md:h-full">
        <div class="bg-gray-100  rounded-lg md:w-1/3">
          <NuxtImg
            src="https://images.unsplash.com/photo-1743507664175-e1a0ebccfcb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
            alt="Logo" class="w-full h-full object-cover" loading="lazy" />
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
          <h2 class="text-2xl font-semibold mb-4 justify-self-center font-playfair-display tracking-wide">Start your
            journey Today</h2>
          <div
            class="bg-primary bg-opacity-10 bg-rounded flex flex-col justify-center items-center p-4 mb-4 gap-2 text-md tracking-widest">
            <span>Can we help? Call our Travel Experts at</span>
            <span class="font-semibold inline-flex gap-1 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
              </svg>
              +1 (202) 4911478
            </span>
          </div>

          <label for="title" class="block text-gray-600 mb-1">Guest Information*</label>
          <div class="grid grid-cols-8 gap-2">
            <!-- Title -->
            <ClientOnly>
              <Dropdown :positioning-disabled="isMobile" @apply-show="isMobile && onShow()"
                @apply-hide="isMobile && onHide()" class="col-span-2">
                <button type="button"
                  class="input-field flex items-center justify-between w-full text-left text-gray-400"
                  @click="dropdownIsOpen = !dropdownIsOpen">
                  {{ selectedTitle || 'Title *' }}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="size-3 transition-transform duration-200 ml-2"
                    :class="{ '-rotate-180': dropdownIsOpen }">
                    <path fill-rule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
                <template #popper="{ hide }">
                  <div class="v-popper p-1 bg-white text-gray-800 rounded-md shadow-md border w-full md:w-40 text-xs">
                    <button v-for="title in ['Mr.', 'Mrs.', 'Ms.']" :key="title"
                      @click="() => { selectedTitle = title; hide(); dropdownIsOpen = false; }"
                      class="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md ">
                      {{ title }}
                    </button>
                    <button v-if="isMobile" @click="hide()" class="absolute top-2 right-2 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5 text-gray-500 hover:text-gray-800 transition">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </template>
              </Dropdown>
            </ClientOnly>
            <!-- First Name -->
            <div class="col-span-3">
              <input v-model="formData.firstName" type="text" class="input-field w-full" placeholder="First Name *" />
              <div v-if="$v.firstName.$error" class="text-xs text-red-500">First Name required</div>
            </div>

            <!-- Last Name -->
            <div class="col-span-3">
              <input v-model="formData.lastName" type="text" class="input-field w-full" placeholder="Last Name *" />
              <div v-if="$v.lastName.$error" class="text-xs text-red-500">Last Name required</div>
            </div>
          </div>

          <div class="grid grid-cols-2 mt-2 gap-2">
            <div class="">
              <input v-model="formData.email" type="email" class="input-field" placeholder="Email address *" />
              <div v-if="$v.email.$error" class="text-xs text-red-500">
                <span v-if="$v.email.email.$message">{{ $v.email.email.$message }}</span>
              </div>
            </div>
            <div class="relative ">
              <div class="relative">
                <input type="number"
                  class="input-goto peer appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="Phone number *" autocomplete="off" v-model="formData.phone" ref="phoneInputRef"
                  id="phoneNumber" />
              </div>
              <div v-if="$v.phone.$error" class="text-xs text-red-500">Phone Number requered</div>
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
          <!-- <div class="mt-4">
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
          </div> -->

          <!-- Checkboxes -->
          <fieldset class="mt-4 mb-6">
            <legend class="text-gray-600 mb-2">Preferences</legend>
            <div class="flex flex-col gap-2">
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="formData.acceptTerms" class="h-5 w-5 text-red-500" />
                <span class="text-gray-700" v-html="checkOptions[0]"></span>
                <div v-if="!formData.acceptTerms" class="text-xs text-red-500">
                  (Terms Accepted required)
                </div>
              </label>
              <label v-for="(option, index) in checkOptions.slice(1)" :key="index" class="flex items-center gap-2">
                <input type="checkbox" v-model="selectedOptions" :value="option" class="h-5 w-5 text-red-500" />
                <span class="text-gray-700" v-html="option"></span>
              </label>
            </div>
          </fieldset>

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