<template>
  <div>
    <input ref="phoneInput" type="tel" />
    <button @click="getPhoneNumber">Get Phone Number</button>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, nextTick} from 'vue';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

const phoneInput = ref(null);
const itiInstance = ref(null); // Usamos un ref para iti

onMounted(async () => {
  await nextTick();
  itiInstance.value = intlTelInput(phoneInput.value, {
    initialCountry: "us", // Puedes cambiar el país inicial
    utilsScript: "/js/utils.js",
  });
});

onUnmounted(() => {
  if (itiInstance.value) {
    itiInstance.value.destroy();
  }
});

const getPhoneNumber = () => {
  if (itiInstance.value) {
    const phoneNumber = itiInstance.value.getNumber();
    if (phoneNumber) {
      console.log("Número en formato internacional:", phoneNumber);
    } else {
      console.log("No se pudo obtener el número. Asegúrate de que sea un número válido.");
    }
  } else {
    console.log("La instancia de intl-tel-input no está lista.");
  }
};
</script>

<style scoped>
/* Aquí puedes agregar estilos personalizados si lo necesitas */
</style>
