<template>
  <div class="relative">
    <input ref="phoneInput" type="tel" class="is-input-ico peer" placeholder=" " autocomplete="new-password"
      id="phone" />
    <label class="is-input-ico-label" for="phone">Teléfono</label>
    <!--    {{countryData}}-->

    <!--    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">-->
    <!--      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">-->
    <!--        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />-->
    <!--      </svg>-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js'

const emit = defineEmits(['updatePhone'])

const phoneInput = ref(null)
const phoneNumber = ref('')
const isValid = ref(false)
const countryData = ref({ name: "Perú", iso2: "PE", dialCode: "51" })

/**
 * Validar y formatear el número.
 */
const validatePhoneNumber = (rawNumber: string, country: { iso2: string, dialCode: string }) => {
  if (!rawNumber) return { number: 'Número inválido', isValid: false }

  const potentialNumber = `${rawNumber}`

  try {
    const isNumberValid = isValidPhoneNumber(potentialNumber, country.iso2.toUpperCase())
    return {
      number: potentialNumber,
      isValid: isNumberValid
    }
  } catch {
    return { number: 'Número inválido', isValid: false }
  }
}

const getCountryName = (iso2: string, iti: any) => {
  const countries = iti.getSelectedCountryData()
  return countries ? countries.name : 'Desconocido'
}

/**
 * Inicializar intl-tel-input.
 */
const initIntlTelInput = async () => {
  if (!phoneInput.value) return

  const { default: intlTelInput } = await import('intl-tel-input/build/js/intlTelInput.min.js')

  const iti = intlTelInput(phoneInput.value, {
    preferredCountries: ['pe', 'us', 'mx'],
    initialCountry: 'auto',
    separateDialCode: true,
    geoIpLookup: (callback) => {
      fetch('https://ipinfo.io/json?token=') // ← opcional: reemplaza YOUR_TOKEN si tienes uno
        .then(resp => resp.json())
        .then(data => {
          const countryCode = data?.country || 'PE'
          callback(countryCode.toLowerCase())
        })
        .catch(() => callback('pe'))
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  })

  phoneInput.value.addEventListener('input', () => {
    const rawNumber = phoneInput.value?.value || ''
    const selectedCountry = iti.getSelectedCountryData()

    countryData.value = {
      name: getCountryName(selectedCountry.iso2, iti),
      iso2: selectedCountry.iso2.toUpperCase(),
      dialCode: selectedCountry.dialCode
    }

    const { number, isValid: valid } = validatePhoneNumber(rawNumber, countryData.value)
    phoneNumber.value = number
    isValid.value = valid

    emit('updatePhone', {
      number,
      isValid: valid,
      country: countryData.value.name,
      country_code: countryData.value.dialCode,
      dialCode: countryData.value.iso2
    })
  })
}

onMounted(async () => {
  await nextTick()

  fetch("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js")
    .then((res) => {
      if (res.ok) {
        initIntlTelInput()
      }
    })
    .catch((err) => console.error("Error cargando utilsScript:", err))
})
</script>

<style scoped>
@import 'intl-tel-input/build/css/intlTelInput.css';
</style>
