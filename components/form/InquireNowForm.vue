<script setup lang="ts">
import { usePackageStore } from "~/stores/packages";
import { useFormStore } from "~/stores/form";
import { useIpStore } from "~/stores/ip";
import { Notification, NotificationGroup, notify } from "notiwind";
import moment from "moment-timezone";

import { useDestinationStore } from "~/stores/destination";
import { useCategoriesStore } from "~/stores/categories";
// Vuelidate
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const { dataLayer } = useScriptGoogleTagManager();
const { $device } = useNuxtApp();

const formStore = useFormStore();
const ipStore = useIpStore();
const packageStore = usePackageStore();
const categoriesStore = useCategoriesStore();

const props = defineProps({ isOpen: Boolean });
const destinationStore = useDestinationStore();
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

// Refs para los inputs de intlTelInput
const phoneInputRef = ref<HTMLElement | null>(null);
const countryInputRef = ref<HTMLElement | null>(null);
const companyCountryInputRef = ref<HTMLElement | null>(null);

const today = moment().format("YYYY-MM-DD");
const emit = defineEmits(["close"]);
const closeForm = () => emit("close");

// Datos del formulario
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
  // streetAddress: "",
  // unitNumber: "",
  // children: 0,
  // budget: "",
  userType: "Consumer",
  agencyName: "",
  agencyCountry: "",
});

// Variables adicionales
const showLoader = ref(false);
const geoIp = ref();

// Validaciones con Vuelidate
const rules = computed(() => ({
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phone: { required },
  country: { required },
  startDate: { required },
  destinations: { required },
  agencyName: formData.value.userType === "Agent" ? { required } : {},
  agencyCountry: formData.value.userType === "Agent" ? { required } : {},
}))

const $v = useVuelidate(rules, formData);

// Función para obtener el navegador
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

// Función para obtener la IP y el país
const getIp = async () => {
  const res = await ipStore.getIp();
  geoIp.value = res;
};

const saveInquire = async (obj: any) => {
  await formStore.saveInquire(obj)
}

// Función para enviar el formulario
const handleSubmit = async () => {
  console.log(packageDetail.value)
  if (packageDetail.value) {
    formData.value.destinations = packageDetail.value.paquetes_destinos.map((item: any) => item.destinos.nombre);
    formData.value.travelStyle = packageDetail.value.paquetes_categoria.map((item: any) => item.categoria.id);
    formData.value.package = packageDetail.value.titulo;
  }
  $v.value.$validate();

  if ($v.value.$invalid) {
    console.log("Formulario no válido");
    return;
  }

  showLoader.value = true;

  const obj = {
    package: formData.value.package || "",
    category_d: formData.value.travelStyle.map(String),
    destino_d: formData.value.destinations,
    pasajeros_d: formData.value.passengers,
    duracion_d: moment(formData.value.endDate).diff(moment(formData.value.startDate), 'days') >= 0
      ? [String(moment(formData.value.endDate).diff(moment(formData.value.startDate), 'days'))]
      : ["Undecided"],
    el_nombre: formData.value.firstName + " " + formData.value.lastName,
    el_email: formData.value.email,
    el_telefono: formData.value.phone,
    el_fecha: formData.value.startDate
      ? moment(formData.value.startDate).format("YYYY-MM-DD")
      : null,
    el_textarea: formData.value.comment,
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

  /* dataLayer.push({
    user_properties: {
      user_id: { value: crypto.randomUUID() },
      email: { value: formData.value.email },
      full_name: { value: formData.value.firstName + " " + formData.value.lastName },
      tentative_date: { value: formData.value.startDate },
    },
    event: "generate_lead",
  }); */
  console.log(obj);


  await formStore.getInquire(obj).then((res) => {
    if (res) {
      saveInquire(obj);
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
      closeForm();
      notify({
        group: "foo",
        title: "Success",
        type: "success",
        text: "Your inquiry has been successfully sent 🙂",
      }, 4000);
    } else {
      showLoader.value = false;
      notify({
        group: "foo",
        title: "Error",
        type: "error",
        text: "An error occurred while sending your inquiry :(",
      }, 4000);
    }
  }).catch((err) => {
    showLoader.value = false;
    notify({
      group: "foo",
      title: "Error",
      type: "error",
      text: "An error occurred while sending your inquiry :(",
    }, 4000);
  });
};

const route = useRoute();
const packageDetail = ref(null);
const getPackageDetail = async () => {
  const res: any = await packageStore.getPackages();
  packageDetail.value = res.find((item: any) => item.url === route.params.package);
};

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

onMounted(async () => {
  if (route.params.package) await getPackageDetail();
  await getIp();
  await getCountries();
  await getCategories();
  // @ts-ignore
  if (process.client) import("intl-tel-input/build/js/intlTelInput.min.js").then((module) => {
    intlTelInput = module.default;
  });
});

watchEffect(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = props.isOpen ? "hidden" : "auto";
  }
});

watch(() => route.path, async () => {
  if (route.params.package)
    await getPackageDetail();
  else
    packageDetail.value = null;
});

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await nextTick();
    if (process.client) {
      if (phoneInputRef.value) await setupIntlTelInput(phoneInputRef.value as HTMLInputElement, "phone");
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

watch(() => formData.value.startDate, () => {
  if (moment(formData.value.endDate).isBefore(formData.value.startDate)) {
    formData.value.endDate = "";
  }
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
        <h2 class="text-2xl font-semibold mb-4 font-playfair-display">Start planning with SouthAmerica</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4 text-sm">
          <!-- Nombres -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium">First Name *</label>
              <input v-model="formData.firstName" type="text" class="input-field" placeholder="John" />
              <div v-if="$v.firstName.$error" class="text-xs text-red-500">First Name required</div>
            </div>
            <div>
              <label class="block text-sm font-medium">Last Name *</label>
              <input v-model="formData.lastName" type="text" class="input-field" placeholder="Smith" />
              <div v-if="$v.lastName.$error" class="text-xs text-red-500">Last Name required</div>
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
              <input v-model="formData.agencyName" type="text" class="input-field" placeholder="Agency Name" />
              <div v-if="$v.agencyName.$error" class="text-xs text-red-500">Agency Name required</div>
            </div>
            <div class="relative z-50">
              <label class="block text-sm font-medium">Agency Country *</label>
              <input type="text" class="input-goto peer" placeholder="" autocomplete="off"
                v-model="formData.agencyCountry" ref="companyCountryInputRef" id="agencyName" @keydown.prevent />
              <div v-if="$v.agencyCountry.$error" class="text-xs text-red-500">Agency Country required</div>
            </div>
          </template>

          <!-- Email y Teléfono -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium">Email *</label>
              <input v-model="formData.email" type="email" class="input-field" placeholder="Email address" />
              <div v-if="$v.email.$error" class="text-xs text-red-500">
                <span v-if="$v.email.email.$message">{{ $v.email.email.$message }}</span>
              </div>
            </div>
            <div class="relative">
              <label class="block text-sm font-medium">Phone Number *</label>
              <input type="text" class="input-goto peer" placeholder=" " autocomplete="off" v-model="formData.phone"
                ref="phoneInputRef" id="phoneNumber" />
              <div v-if="$v.phone.$error" class="text-xs text-red-500">Phone Number required</div>
            </div>
          </div>

          <!-- Dirección -->
          <!--<div>
            <label class="block text-sm font-medium">Street Address *</label>
            <input v-model="formData.streetAddress" type="text" class="input-field" placeholder="Street Address"
              required />
          </div>
          <div>
            <label class="block text-sm font-medium">Unit Number (optional)</label>
            <input v-model="formData.unitNumber" type="text" class="input-field" placeholder="Unit Number" />
          </div>-->

          <!-- Cantidad de pasajeros y país proveniente -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium">How many travelers? *</label>
              <select v-model="formData.passengers" class="input-field">
                <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
            <div class="relative">
              <label class="block text-sm font-medium">Where are you from? *</label>
              <input type="text" class="input-goto peer" placeholder="" autocomplete="off" v-model="formData.country"
                ref="countryInputRef" id="country_name" @keydown.prevent />
              <div v-if="$v.country.$error" class="text-xs text-red-500">Country required</div>
            </div>
          </div>

          <!-- Duración del viaje -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium">Select Start Date *</label>
              <client-only>
                <VDatePicker v-model="formData.startDate" mode="date" :min-date="today">
                  <template #default="{ togglePopover }">
                    <button type="button" class="input-field peer text-left" @click="togglePopover">
                      <span v-if="formData.startDate">{{ moment(formData.startDate).format('YYYY-MM-DD') }}</span>
                      <span class="text-gray-500" v-else>Tentative travel startdate</span>
                      <span
                        class="absolute cursor-text text-gray-500 -top-3 left-2 backdrop-blur-sm rounded-2xl px-1 transition-all duration-200 ease-in-out text-xs">Inquire
                        Date</span>
                    </button>
                  </template>
                </VDatePicker>
              </client-only>
              <div v-if="$v.startDate.$error" class="text-xs text-red-500">Start Date required</div>
            </div>
            <div>
              <label class="block text-sm font-medium">Select End Date (Optional)</label>
              <client-only>
                <VDatePicker v-model="formData.endDate" mode="date"
                  :min-date="moment(formData.startDate).add(1, 'days').toDate()">
                  <template #default="{ togglePopover }">
                    <button type="button" class="input-field peer text-left" @click="togglePopover"
                      :disabled="!formData.startDate">
                      <span v-if="formData.endDate">{{ moment(formData.endDate).format('YYYY-MM-DD') }}</span>
                      <span class="text-gray-500" v-else>Tentative travel end date</span>
                      <span
                        class="absolute cursor-text text-gray-500 -top-3 left-2 backdrop-blur-sm rounded-2xl px-1 transition-all duration-200 ease-in-out text-xs">Inquire
                        Date</span>
                    </button>
                  </template>
                </VDatePicker>
              </client-only>
            </div>
          </div>

          <!-- País de interés -->
          <div v-if="!packageDetail">
            <label class="block text-sm font-medium">Destination of Interest *</label>
            <div class="overflow-y-auto h-48 max-h-48 border rounded p-2">
              <template v-for="country in countries" :key="country.codigo">
                <div class="font-semibold mt-2">{{ country.nombre }}</div>
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
          <div v-if="!packageDetail && categories && categories.length > 0">
            <label class="block text-sm font-medium text-gray-700">Which travel style(s) are you most interested in?
              (Max 3, Optional)</label>
            <div class="overflow-y-auto h-48 max-h-48 border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
              <template v-for="category in categories" :key="category.id">
                <div class="flex items-center hover:bg-gray-100 rounded-lg">
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

          <!-- Presupuesto -->
          <!-- <div v-if="!packageDetail">
            <label class="block text-sm font-medium">Estimated Per Person Budget *</label>
            <select v-model="formData.budget" class="input-field">
              <option>Select your budget</option>
              <option>$500 - $1000</option>
              <option>$1000 - $5000</option>
              <option>$5000+</option>
            </select>
          </div> -->

          <!-- Comentario opcional -->
          <div>
            <label class="block text-sm font-medium">What would make an ideal SouthAmerica vacation? (Optional)</label>
            <textarea v-model="formData.comment" class="input-field h-20"></textarea>
          </div>

          <!--<fieldset class="mb-6">
            <div class="flex flex-col gap-2">
              <label class="flex items-center gap-2">
                <input type="checkbox" value="" class="h-5 w-5 text-red-500">
                Subscribe to our newsletter and offers
              </label>
            </div>
          </fieldset>-->

          <!-- Botón de envío -->
          <div class="flex justify-center mt-12 relative ">
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
    </transition>
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
  </Teleport>
</template>
<style>
@import 'intl-tel-input/build/css/intlTelInput.css';

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