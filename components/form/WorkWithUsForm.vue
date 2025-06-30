<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useIpStore } from '~/stores/ip';
import { useMyWorkwithusStore } from '~/stores/workwithus';
import { Notification, NotificationGroup, notify } from 'notiwind';
import TelInput from '~/components/form/widgets/TelInput.vue';

const { $device } = useNuxtApp();

const emit = defineEmits(['submit-success', 'cancel'])

// Datos del formulario
const formData = ref({
  name: '',
  userEmail: '',
  phone: '',
  country: '',
  country_code: '',
  position: '',
  message: '',
  resume_url: '',
  travel_availability: false,
  expected_salary: 0.0,
  linkedin: '',
  experience_years: '',
  education_level: '',
  position_other: '',
  education_other: ''
});

const showLoader = ref(false);
const phoneError = ref(false);
const country2 = ref('');
const country_code2 = ref('');
const ipStore = useIpStore();
const workWithUsStore = useMyWorkwithusStore()
const fileInput = ref<HTMLInputElement | null>(null)
const isLoading = ref(false)
const uploadError = ref<string | null>(null)
const geoIp = ref();

// Validaciones
const rules = {
  name: { required },
  userEmail: { required, email },
  phone: { required },
  resume_url: { required },
  position: { required },
  experience_years: { required },
};

const $v = useVuelidate(rules, formData);

// Opciones para selects
const educationLevels = [
  'High School',
  'Technical Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Other'
];

const positions = [
  'Travel Advisor',
  'Agency Manager',
  'Tourism Coordinator',
  'Community Manager',
  'Tour Package Designer',
  'Tour Guide',
  'Sales Executive',
  'Other'
];

// Manejo del teléfono
const handlePhoneChange = ({ number, isValid, country, country_code, dialCode }) => {
  formData.value.phone = number;
  country2.value = String(country);
  country_code2.value = dialCode + ' +' + country_code;
  phoneError.value = !isValid;
  formData.value.country = country;
  formData.value.country_code = dialCode + ' +' + country_code;
};

// Manejo de archivo
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  // Resetear estado anterior
  uploadError.value = null
  formData.value.resume_url = ''

  // Validaciones
  if (file.type !== 'application/pdf') {
    uploadError.value = 'Please upload a PDF file only'
    input.value = ''
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = 'File size exceeds 5MB limit'
    input.value = ''
    return
  }

  try {
    isLoading.value = true

    // Subir el archivo
    const fileUrl = await workWithUsStore.saveCV(file)

    // Actualizar el formulario con la URL string
    formData.value.resume_url = fileUrl
  } catch (error) {
    uploadError.value = error.message || 'Failed to upload file'
    console.error('Upload error:', error)
  } finally {
    isLoading.value = false
    input.value = ''
  }
}

// Envío del formulario
const handleSubmit = async () => {
  // Validación del formulario
  const isFormValid = await $v.value.$validate();
  const isPositionValid = formData.value.position !== 'Other' ||
    (formData.value.position === 'Other' && formData.value.position_other);
  const hasPhoneErrors = phoneError.value;

  if (!isFormValid || !isPositionValid || hasPhoneErrors) {
    notify({
      group: "foo",
      title: 'Error',
      type: "error",
      text: "Please fill in all required fields correctly.",
    }, 4000);
    return;
  }

  showLoader.value = true;

  try {
    const formPayload = {
      name: formData.value.name,
      email: formData.value.userEmail,
      phone: formData.value.phone,
      country: formData.value.country,
      country_code: formData.value.country_code,
      device: $device.isMobile ? 'mobile' : $device.isTablet ? 'tablet' : 'desktop',
      origin: 'web',
      browser: getBrowserName(),
      position: formData.value.position === 'Other' ? formData.value.position_other : formData.value.position,
      message: formData.value.message,
      resume_url: formData.value.resume_url,
      travel_availability: formData.value.travel_availability,
      expected_salary: formData.value.expected_salary ? parseFloat(formData.value.expected_salary.toString()) : 0.0,
      linkedin: formData.value.linkedin,
      experience_years: formData.value.experience_years,
      education_level: formData.value.education_level === 'Other' ? formData.value.education_other : formData.value.education_level,
    };

    // Enviar datos usando el store correctamente inicializado
    await workWithUsStore.saveWorkSubmit(formPayload);

    emit('submit-success')

    // Notificar éxito
    notify({
      group: "foo",
      title: 'Éxito',
      type: "success",
      text: "Your application has been submitted successfully. We will contact you soon.",
    }, 4000);

    // Resetear formulario
    resetForm();

  } catch (error) {
    console.error('Error to send the form:', error);
    notify({
      group: "foo",
      title: 'Error',
      type: "error",
      text: "Have an error while submitting your application. Please try again later.",
    }, 4000);
  } finally {
    showLoader.value = false;
  }
};

// Función para resetear el formulario
const resetForm = () => {
  formData.value = {
    name: '',
    userEmail: '',
    phone: '',
    country: '',
    country_code: '',
    position: '',
    message: '',
    resume_url: '',
    travel_availability: false,
    expected_salary: 0.0,
    linkedin: '',
    experience_years: '',
    education_level: '',
    position_other: '',
    education_other: ''
  };
  $v.value.$reset();
};

// Helper para detectar navegador
function getBrowserName() {
  if ($device.isChrome) return 'Chrome';
  if ($device.isSafari) return 'Safari';
  if ($device.isFirefox) return 'Firefox';
  if ($device.isEdge) return 'Edge';
  return 'Unknown';
}

// Obtener información de IP al montar
onMounted(async () => {
  const res = await ipStore.getIp();
  geoIp.value = res;
  if (res) {
    formData.value.country = res.country;
    formData.value.country_code = res.country_calling_code;
  }
});

const showEducationOther = computed(() => formData.value.education_level === 'Other');
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 rounded-lg  my-12">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">
      Join Our Team
    </h2>
    <p class="text-center text-gray-600 mb-8">
      We are always looking for talented individuals to join our team. If you are passionate about travel and have the
      skills
      we need, we would love to hear from you!
    </p>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Información Personal -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </h3>
        </div>

        <div class="">
          <div class="relative">
            <div class="relative">
              <input type="text" name="search" class="is-input-ico peer" placeholder=" " autocomplete="new-password"
                v-model="formData.name" />
              <label class="is-input-ico-label">Full Name *</label>
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
            <div v-if="$v.name.$error" class="text-xs text-red-500">Full Name required</div>
          </div>
        </div>

        <div class="relative">
          <div class="relative">
            <input type="email" name="search" class="is-input-ico peer" placeholder=" " autocomplete="off"
              v-model="formData.userEmail" />
            <label class="is-input-ico-label">Email *</label>
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
              </svg>
            </div>
          </div>
          <div v-if="$v.userEmail.$error" class="text-xs text-red-500">
            <span v-if="$v.userEmail.email.$message">{{ $v.userEmail.email.$message }}</span>
          </div>
        </div>

        <div class="relative">
          <TelInput @updatePhone="handlePhoneChange"></TelInput>
          <div v-if="$v.phone.$error" class="text-xs text-red-500">Phone Number required</div>
          <div v-if="phoneError" class="text-xs text-red-500">
            No Valid Phone Number
          </div>
        </div>

        <div class="relative">
          <div class="relative">
            <div class="relative">
              <select id="education" v-model="formData.education_level" class="is-input-ico peer" autocomplete="off">
                <option v-for="level in educationLevels" :key="level" :value="level">
                  {{ level }}
                </option>
              </select>
              <label class="is-input-ico-label">Education Level</label>
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Custom Education Input (shown when "Other" is selected) -->
          <div v-if="showEducationOther" class="mt-4 relative">
            <div class="relative">
              <input type="text" id="education_other" v-model="formData.education_other" class="is-input-ico peer"
                placeholder=" " autocomplete="off" />
              <label class="is-input-ico-label">Specify your education level</label>
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Información Profesional -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Profesional Information</h3>
        </div>

        <!-- Job Position Section -->
        <div class="relative">
          <!-- Dropdown de Posición -->
          <div class="relative">
            <div class="relative">
              <select id="position" v-model="formData.position" class="is-input-ico peer" autocomplete="off"
                :class="{ 'border-red-500': $v.position.$error }" @blur="$v.position.$touch()">
                <option v-for="position in positions" :key="position" :value="position">
                  {{ position }}
                </option>
              </select>
              <label class="is-input-ico-label" :class="{ 'text-red-500': $v.position.$error }">
                Job Position *
              </label>
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
            </div>
            <div v-if="$v.position.$error" class="text-xs text-red-500 mt-1">
              Please select a job position
            </div>
          </div>

          <!-- Campo de texto para "Other" -->
          <div v-if="formData.position === 'Other'" class="mt-4 relative">
            <div class="relative">
              <input type="text" id="position_other" v-model="formData.position_other" class="is-input-ico peer"
                placeholder=" " autocomplete="off" />
              <label class="is-input-ico-label">
                Specify your position *
              </label>
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
            </div>
            <div v-if="!formData.position_other" class="text-xs text-red-500 mt-1">
              Please specify your position
            </div>
          </div>
        </div>

        <!-- Años de Experiencia -->
        <div class="relative">
          <div class="relative">
            <div class="relative">
              <input type="number" id="experience_years" class="is-input-ico peer hide-number-arrows" placeholder=" "
                autocomplete="off" v-model="formData.experience_years" min="0" max="50" />
              <label class="is-input-ico-label">Years of Experience *</label>
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div v-if="$v.experience_years.$error" class="text-xs text-red-500 mt-1">
              <span v-if="$v.experience_years.required">Years of experience required</span>
              <span v-if="$v.experience_years.min">Minimum 0 years required</span>
              <span v-if="$v.experience_years.max">Maximum 50 years allowed</span>
            </div>
          </div>
        </div>

        <!-- Expectativa Salarial -->
        <div class="relative">
          <div class="relative">
            <div class="relative">
              <input type="double" id="expected_salary" class="is-input-ico peer hide-number-arrows" placeholder=" "
                autocomplete="off" v-model="formData.expected_salary" min="0" />
              <label class="is-input-ico-label">Expected Salary</label>
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        <!-- Perfil de LinkedIn -->
        <div class="relative">
          <div class="relative">
            <div class="relative">
              <input type="url" id="linkedin" class="is-input-ico peer" placeholder=" " autocomplete="off"
                v-model="formData.linkedin" />
              <label class="is-input-ico-label">LinkedIn Profile</label>
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Disponibilidad y CV -->
      <div class="space-y-6">
        <!-- Disponibilidad para viajar -->
        <div class="flex items-center pl-4">
          <div class="relative flex items-center">
            <input type="checkbox" id="travel_availability" v-model="formData.travel_availability"
              class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
            <label for="travel_availability" class="ml-3 block text-sm text-gray-700 items-center">
              Do you have availability to travel?
            </label>
          </div>
        </div>

        <!-- Mensaje/Carta de Presentación -->
        <div class="relative">
          <div class="relative">
            <textarea id="message" v-model="formData.message" rows="4" class="is-input-ico peer"
              placeholder=" "></textarea>
            <label class="is-input-ico-label">Cover Letter/Message</label>
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="relative">
            <div class="relative">
              <!-- Input file oculto -->
              <input type="file" id="resume_file" ref="fileInput" class="hidden" accept=".pdf,application/pdf"
                @change="handleFileUpload" :disabled="isLoading" />

              <!-- Input visual personalizado -->
              <div class="is-input-ico peer cursor-pointer" :class="{
                'border-red-500': $v.resume_url.$error || uploadError,
                'opacity-70 cursor-not-allowed': isLoading,
                'border-green-500': formData.resume_url && !isLoading && !uploadError
              }" @click="!isLoading && $refs.fileInput.click()">
                <span class="truncate">
                  {{
                    isLoading ? 'Uploading...' :
                      formData.resume_url ? 'CV uploaded successfully' :
                        'Select PDF file'
                  }}
                </span>
                <label class="is-input-ico-label" :class="{
                  'text-red-500': $v.resume_url.$error || uploadError,
                  'text-green-600': formData.resume_url && !isLoading && !uploadError
                }">
                  Upload your CV (PDF only) *
                </label>
                <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg v-if="isLoading" class="animate-spin h-5 w-5 text-gray-400" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  <svg v-else-if="formData.resume_url && !uploadError" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3"
                  v-if="!isLoading && !formData.resume_url">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
              </div>
            </div>
            <span v-if="$v.resume_url.$error" class="text-xs text-red-500 mt-1">Please upload your CV</span>
            <span v-else-if="uploadError" class="text-xs text-red-500 mt-1">{{ uploadError }}</span>
            <p v-else class="text-xs text-gray-500 mt-1 pl-4">Maximum file size: 5MB</p>
          </div>
        </div>
      </div>

      <!-- Botón de envío -->
      <div class="flex justify-center mt-12">
        <button type="submit" class="btn-secondary" v-show="showLoader == false">Send</button>
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

    <!-- Notificaciones -->
    <NotificationGroup group="foo">
      <div class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-50">
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
  </div>
</template>
<style>
@import 'intl-tel-input/build/css/intlTelInput.css';

.iti__selected-dial-code {
  padding-top: 12px;
}

/* Estilo para ocultar las flechas en los inputs number */
.hide-number-arrows::-webkit-outer-spin-button,
.hide-number-arrows::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.hide-number-arrows {
  -moz-appearance: textfield;
}
</style>