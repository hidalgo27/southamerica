<script setup lang="ts">
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useIpStore} from "~/stores/ip";
import {Notification, NotificationGroup, notify} from "notiwind";

import {useFormStore} from "~/stores/form";
import moment from "moment-timezone";
const { dataLayer } = useScriptGoogleTagManager()
const { $device } = useNuxtApp()

const formStore = useFormStore()
// const formStore = usePackageStore()
const ipStore = useIpStore()

const today = new Date();

const package_title = ref()

const showLoader = ref(false)

const travelDate = ref()
const traveller = ref()
const hotel = ref([])
const destination = ref([])

const fullName = ref('')
const phone = ref('')
const userEmail = ref('')
const comment = ref('')

const listDestination = ref([])

const geoIp = ref()

const phoneInputRef = ref(null);

const showModalProcess = ref(false)

const formatter = ref({
  date: 'DD MMM YYYY',
  month: 'MMM'
})

const onClickSomething = () => {
  showModalProcess.value = false
}

// VALIDACION
const rules = {
  fullName: { required },
  phone: { required },
  userEmail: { required, email },
  travelDate: { required },
  // comment: { required },
};

const $v = useVuelidate(rules, { fullName, phone, userEmail, travelDate});

const saveInquire = async (obj:any) => {
  await formStore.saveInquire(obj)
}

function getBrowserName() {
  if ($device.isChrome) return 'Chrome'
  if ($device.isSafari) return 'Safari'
  if ($device.isFirefox) return 'Firefox'
  if ($device.isEdge) return 'Edge'
  if ($device.isSamsung) return 'Samsung Browser'
  return 'Unknown'
}

const handleSubmit = async () => {

  $v.value.$validate();
  if ($v.value.$invalid) {
    // manejar errores
    console.log('Formulario no válido');
  } else {
    // manejar envío
    console.log('Formulario válido');

    showLoader.value = true

    let obj = {
      el_package: formStore.titlePackages,
      package: formStore.titlePackages,
      category_d: hotel.value,
      // destino_d: '',
      pasajeros_d: traveller.value,
      // duracion_d: this.duracionSeleccionadosForm,

      el_nombre: fullName.value,
      el_email: userEmail.value,
      el_fecha: travelDate.value ? moment(travelDate.value).format('YYYY-MM-DD HH:mm:ss') : null,
      el_telefono: phone.value,
      el_textarea: comment.value,

      country: geoIp.value.country+" "+geoIp.value.country_calling_code,
      codigo_pais: geoIp.value.country+" "+geoIp.value.country_calling_code,

      producto: "machupicchu.company",
      device: $device.isMobile ? 'Mobile' : $device.isTablet ? 'Tablet' : 'Desktop',
      browser: getBrowserName(),
      origen: "Web",
      inquire_date: moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss')
    }

    dataLayer.push({
      user_properties: {
        "user_id": {"value":  crypto.randomUUID()},
        'email': {"value":  userEmail.value},
        'full_name': {"value":  fullName.value},
        'tentative_date': {"value":  formStore.travelDate},
      },
      'event': 'generate_lead',
      'Package': formStore.titlePackages,
      'HotelCategory':  hotel.value,
      'NumberTravelers': traveller.value,
    });

    await formStore.getInquire(obj).then((res) => {
      if (res){
        saveInquire(obj)
        showLoader.value = false

        travelDate.value = []
        traveller.value = ""
        hotel.value = []
        formStore.destination = []

        fullName.value = ""
        phone.value = ""
        userEmail.value = ""
        comment.value = ""
        formStore.showModalItinerary = false
        formStore.$reset()

        $v.value.$reset()

        notify({
          group: "foo",
          title: 'Well done',
          type: "success",
          text: "Your trip has been successfully created 🙂",
        }, 4000) // 4s

      }else{
        showLoader.value = false
        formStore.showModalItinerary = false
        notify({
          group: "foo",
          title: 'Error',
          type: "error",
          text: "Error :(",
        }, 4000) // 4s
      }
    }).catch((err) => {
      showLoader.value = false
      formStore.showModalItinerary = false

      travelDate.value = []
      traveller.value = ""
      hotel.value = []
      formStore.destination = []

      fullName.value = ""
      phone.value = ""
      userEmail.value = ""
      comment.value = ""

      formStore.$reset()

      $v.value.$reset()

      notify({
        group: "foo",
        title: 'Error',
        type: "error",
        text: "Error :(",
      }, 4000) // 4s
    })


  }
};

const disablePastDates = (date:any) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Asegurarse de que solo se comparen las fechas
  return date < today;
};

const getPais = async () => {
  // const res:any = await formStore.getPais()
  const res:any = await formStore.getCountry('peru')
  listDestination.value = res.filter(desti => desti.form === 1);

  // listDestination.value = res
  // if (res.token) {
  //   policyStore['tokenLogin'] = res.token
  //   loadingUser.value = false
  // }
}

const getIp = async () => {
  const res = await ipStore.getIp()
  geoIp.value = res
  // if (res.token) {
  //   policyStore['tokenLogin'] = res.token
  //   loadingUser.value = false
  // }
}


onMounted(async () => {
  await getIp()

  await getPais()

  package_title.value = formStore.titlePackages

  if (process.client) {
    // @ts-ignore
    import('intl-tel-input/build/js/intlTelInput.min.js').then((module) => {
      const intlTelInput = module.default;
      if (phoneInputRef.value) {

        // if (res.token) {
        //   policyStore['tokenLogin'] = res.token
        //   loadingUser.value = false
        // }

        intlTelInput(phoneInputRef.value, {
          initialCountry: "auto",
          // @ts-ignore
          geoIpLookup: function(callback) {
            fetch("https://ipapi.co/json/?key=NgKiSgq0Re9Agc6U6mnuP9601tOdj5a5iMh6tjKcRUwzJQEE4H")
                .then(function(res) { return res.json(); })
                .then(function(data) { callback(data.country_code); })
                .catch(function() { callback("us"); });
          },
        });
      }
    });
  }

})

</script>
<template>
  <div class="container w-full md:w-[800px] my-24" id="form-dream-adventure">

        <div class="w-full">
          <div class="grid grid-cols-1">

            <section class="pb-8 text-center">
<!--              <img src="https://gotoperu-com.s3-us-west-1.amazonaws.com/logos/logo-gotoperu-black.png" alt="" class="mx-auto w-64">-->
              <div class="border-title mb-6 mx-auto"></div>
              <nuxt-img src="/images/logos/logo-mapi.svg" class="w-[250px] md:w-[320px] mx-auto"></nuxt-img>
              <h3 class="my-3 font-semibold text-gray-700 text-2xl mt-12">Free Quote</h3>
              <p class="text-gray-500">Select your travel preferences and we will send you a travel proposal.</p>
            </section>
            <div class="divider-dashed"></div>

            <div class="text-left mt-6">
              <h2 class="text-lg text-secondary mb-5">Get a quote on this travel package:</h2>

              <h2 class="text-xl text-primary mb-5 bg-white/30 text-center px-5 py-2 border border-gray-300 font-semibold rounded-sm">
                {{ formStore.titlePackages }}</h2>

              <h3 class="text-lg text-primary my-5">Hotel Category</h3>
              <div class="grid grid-cols-12 gap-6 my-3 overflow-x-scroll no-scrollbar focus:touch-pan-x">
                <div class="col-span-12 hidden md:col-span-2 border md:flex justify-center items-center rounded-sm ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <div class="col-span-12 md:col-span-10 grid grid-cols-3 gap-3 overflow-x-scroll no-scrollbar focus:touch-pan-x">

                <div class="flex flex-col rounded-sm">
                  <input type="checkbox" id="hotel_5" class="peer hidden" value="5" v-model="hotel" />
                  <label for="hotel_5" class="select-none bg-white/30 cursor-pointer px-5 py-2 border border-gray-300 text-gray-500 rounded-sm divide-y divide-gray-400 transition-colors duration-200 ease-in-out peer-checked:border-2 peer-checked:border-primary peer-checked:text-primary peer-checked:divide-primary  ">
                    <div class="pb-1">
                      <!--                      <img src="/icons/hotel.svg" alt="">-->
                      <h4 class=" pt-1 text-center">Luxury</h4>
                    </div>
                    <div class="flex pt-2 gap-1 justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3 text-secondary" v-for="(index) in 5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </div>
                  </label>
                </div>

                <div class="flex flex-col rounded-sm">
                  <input type="checkbox" id="hotel_4" class="peer hidden" value="4" v-model="hotel" />
                  <label for="hotel_4" class="select-none bg-white/30 cursor-pointer px-5 py-2 border border-gray-300 text-gray-500 rounded-sm divide-y divide-gray-400 transition-colors duration-200 ease-in-out peer-checked:border-2 peer-checked:border-primary peer-checked:text-primary peer-checked:divide-primary  ">
                    <div class="pb-1">
                      <!--                      <img src="/icons/hotel.svg" alt="">-->
                      <h4 class=" pt-1 text-center">Superior</h4>
                    </div>
                    <div class="flex pt-2 gap-1 justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3 text-secondary" v-for="(index) in 4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </div>
                  </label>
                </div>

                <div class="flex flex-col rounded-sm">
                  <input type="checkbox" id="hotel_3" class="peer hidden" value="3" v-model="hotel" />
                  <label for="hotel_3" class="select-none bg-white/30 cursor-pointer px-5 py-2 border border-gray-300 text-gray-500 rounded-sm divide-y divide-gray-400 transition-colors duration-200 ease-in-out peer-checked:border-2 peer-checked:border-primary peer-checked:text-primary peer-checked:divide-primary  ">
                    <div class="pb-1">
                      <!--                      <img src="/icons/hotel.svg" alt="">-->
                      <h4 class=" pt-1 text-center">Best Value</h4>
                    </div>
                    <div class="flex pt-2 gap-1 justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3 text-secondary" v-for="(index) in 3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </div>
                  </label>
                </div>

              </div>
              </div>
              <h3 class="text-lg text-primary my-5">Number of travelers</h3>
              <div class="grid grid-cols-12 gap-6 my-3 overflow-x-scroll no-scrollbar focus:touch-pan-x">
                <div class="col-span-12 hidden md:col-span-2 border md:flex justify-center items-center rounded-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>

                <div class="col-span-12 md:col-span-10 grid grid-cols-7 gap-3">
                <div class="flex" v-for="n in 6" :key="n">
                  <input type="radio" :id="'radio_'+n" class="peer hidden" :value="n" v-model="traveller" />
                  <label :for="'radio_'+n" class="select-none w-full text-center cursor-pointer bg-white/30 text-gray-800 rounded-sm px-5 py-2 transition-colors duration-200 ease-in-out peer-checked:bg-primary peer-checked:text-white"> {{ n }} </label>
                </div>

                <div class="flex">
                  <input type="radio" :id="'radio_7'" class="peer hidden" value="7+" v-model="traveller" />
                  <label :for="'radio_7'" class="select-none w-full text-center cursor-pointer bg-white/30 text-gray-800 rounded-sm py-2 transition-colors duration-200 ease-in-out peer-checked:bg-primary peer-checked:text-white"> 11+ </label>
                </div>
                </div>

              </div>


<!--              <h3 class="text-lg text-primary my-5">Contact information</h3>-->

              <form @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 mt-6 gap-5">
                  <div class="relative">
                    <div class="relative">
                      <div class="bg-white/30 absolute rounded-md inset-0 -z-10"></div>
                      <input
                          type="text"
                          name="search"
                          class="input-goto peer"
                          placeholder=" "
                          autocomplete="off"
                          v-model="fullName"
                          id="fullName"
                      />
                      <label class="input-goto-label" for="fullName">Full Name</label>
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>

                      <div v-if="$v.fullName.$error" class="text-xs text-red-500">El nombre es requerido</div>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div class="relative">
                      <div class="bg-white/30 absolute rounded-md inset-0 -z-10"></div>
                      <input
                          type="text"
                          class="input-goto peer"
                          placeholder=" "
                          autocomplete="off"
                          v-model="phone"
                          ref="phoneInputRef"
                          id="phoneNumber"
                      />
                      <!--                    <input ref="phoneInputRef" v-model="phone" class="is-input-ico peer" placeholder=" " id="phoneNumber" type="tel" />-->
                      <label class="input-goto-label -top-3 text-gray-500" for="phoneNumber">Phone Number</label>
                      <!--                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">-->
                      <!--                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">-->
                      <!--                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />-->
                      <!--                      </svg>-->
                      <!--                    </div>-->
                      <div v-if="$v.phone.$error" class="text-xs text-red-500">El nombre es requerido</div>

                    </div>


                    <div class="relative">
<!--                      <VMenu>-->
<!--                        <input type="text" class="is-input-ico peer" placeholder=" " v-model="formStore.travelDate" @focus="showModalProcess = true">-->
<!--                        <label class="is-input-ico-label" @click="showModalProcess = true">When</label>-->
<!--                        <div class="absolute inset-y-0 left-0 flex items-center pl-2 md:pl-4 pointer-events-none">-->
<!--                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />-->
<!--                          </svg>-->
<!--                        </div>-->
<!--                        <template #popper>-->
<!--                          <vue-tailwind-datepicker as-single no-input :formatter="formatter" v-model="formStore.travelDate" @click="onClickSomething()" class="calendar-w"/>-->
<!--                        </template>-->
<!--                      </VMenu>-->
<!--                      <div class="bg-white/30 absolute rounded-md inset-0 -z-10"></div>-->

<!--                      <vue-tailwind-datepicker as-single  :formatter="formatter" placeholder="Tentative travel date" :disable-date="disablePastDates" v-model="travelDate" input-classes="input-goto peer !pl-3"/>-->
<!--                      <label class="absolute cursor-text text-gray-500 top-0 left-2 backdrop-blur-sm rounded-2xl px-1 transition-all duration-200 ease-in-out text-xs" @click="showModalProcess = true">When</label>-->

                      <client-only>
                        <VDatePicker v-model="travelDate" mode="date" :min-date="today">
                          <template #default="{ togglePopover }">
                            <button
                                class="input-goto peer text-left"
                                @click="togglePopover"
                            >

                              <!--                        <span v-if="filters.created_start && filters.created_end">{{ filters.created_start+' to '+filters.created_end }}</span>-->
                              <span v-if="travelDate">{{ moment(travelDate).format('YYYY-MM-DD') }}</span>
                              <span class="text-gray-500" v-else>Tentative travel date</span>
                              <span class="absolute cursor-text text-gray-500 -top-3 left-2 backdrop-blur-sm rounded-2xl px-1 transition-all duration-200 ease-in-out text-xs" >Inquire Date</span>

                            </button>

                          </template>
                        </VDatePicker>
                      </client-only>

                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>

                      </div>

                      <div v-if="$v.travelDate.$error" class="text-xs text-red-500">Travel date required</div>

                    </div>

                  </div>

                  <div class="relative">
                    <div class="relative">
                      <div class="bg-white/30 absolute rounded-md inset-0 -z-10"></div>
                      <input
                          type="email"
                          name="search"
                          class="input-goto peer"
                          placeholder=" "
                          autocomplete="off"
                          v-model="userEmail"
                          id="userEmail"
                      />
                      <label class="input-goto-label" for="userEmail">Email</label>
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                        </svg>
                      </div>

                      <div v-if="$v.userEmail.$error" class="text-xs text-red-500">
                        <span v-if="$v.userEmail.email.$message">{{ $v.userEmail.email.$message }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="relative">
                    <div class="relative">
                      <div class="bg-white/30 absolute rounded-md inset-0 -z-10"></div>
                    <textarea
                        type="text"
                        name="search"
                        class="input-goto peer !min-h-20 pt-2"
                        placeholder=" "
                        autocomplete="off"
                        v-model="comment"
                        id="commentInputRef"
                    />
                      <label class="input-goto-label text-xs md:text-[15px]" for="commentInputRef">What can we do for you? We have it all. Just ask!</label>
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="flex justify-center mt-12 relative z-20">
                  <button type="submit" class="btn-primary" v-show="showLoader == false">Send</button>
                  <button type="button" class="btn-disabled w-full justify-center flex" disabled v-show="showLoader == true">
                    <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </svg>
                    Processing...
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
  </div>

  <NotificationGroup group="foo">
    <div class="fixed inset-0 flex z-50 items-start justify-end p-6 px-4 py-6 pointer-events-none">
      <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
        >
          <div v-for="notification in notifications" :key="notification.id">
            <div
                v-if="notification.type === 'success'"
                class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white/30 rounded-lg shadow-md"
            >
              <div class="flex items-center justify-center w-12 bg-green-500">
                <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                </svg>
              </div>

              <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                  <span class="font-semibold text-green-500">{{ notification.title }}</span>
                  <p class="text-sm text-gray-600">{{ notification.text }}</p>
                </div>
              </div>
            </div>

            <div
                class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white/30 rounded-lg shadow-md"
                v-if="notification.type === 'error'"
            >
              <div class="flex items-center justify-center w-12 bg-red-500">
                <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"/>
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
