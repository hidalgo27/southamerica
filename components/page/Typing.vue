<template>
  <div class="typing-container">
    <span :class="displayedText.color">{{ displayedText.text }}</span>
    <span class="cursor">|</span>
  </div>
</template>
<script setup lang="ts">

const texts = [
  { text: 'Let’s go to Peru.', color: 'text-primary' },
  { text: 'Go with the Experts.', color: 'text-gray-200' },
  // { text: 'Vamos a Ecuador.', color: 'text-secondary' },
  // { text: 'Go with the Experts.', color: 'text-gray-500' },
];

const typingSpeed = 100; // Velocidad de escritura en milisegundos
const deletingSpeed = 50; // Velocidad de borrado en milisegundos
const delayBetweenCycles = 1000; // Retardo antes de cambiar al siguiente texto

const displayedText = ref({ text: '', color: '' });
const currentTextIndex = ref(0);
const currentCharIndex = ref(0);
const isDeleting = ref(false);

const typeText = () => {
  const currentText = texts[currentTextIndex.value].text;
  const currentColor = texts[currentTextIndex.value].color;

  if (isDeleting.value) {
    if (currentCharIndex.value > 0) {
      currentCharIndex.value--;
      displayedText.value.text = currentText.slice(0, currentCharIndex.value);
      displayedText.value.color = currentColor;
      setTimeout(typeText, deletingSpeed);
    } else {
      isDeleting.value = false;
      currentTextIndex.value = (currentTextIndex.value + 1) % texts.length;
      setTimeout(typeText, delayBetweenCycles);
    }
  } else {
    if (currentCharIndex.value < currentText.length) {
      displayedText.value.text = currentText.slice(0, currentCharIndex.value + 1);
      displayedText.value.color = currentColor;
      currentCharIndex.value++;
      setTimeout(typeText, typingSpeed);
    } else {
      isDeleting.value = true;
      setTimeout(typeText, delayBetweenCycles);
    }
  }
};
onMounted(() => {
  typeText();
});
</script>
<style scoped>
.typing-container {
  display: flex;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
}


.cursor {
  font-weight: bold;
  font-size: 1rem;
  animation: blink 0.7s infinite step-start;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>