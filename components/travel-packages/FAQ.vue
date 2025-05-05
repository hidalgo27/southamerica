<script lang="ts" setup>
import { usePackageStore } from "~/stores/packages";

const packageStore = usePackageStore()
const faq = ref([])

const getFAQ = async () => {
  const res: any = await packageStore.getFAQ()
  faq.value = res
  console.log(faq.value)
}

const activeIndex = ref(null);
const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

onMounted(async () => {
  await getFAQ()
})
</script>
<template>
  <section class="bg-secondary bg-opacity-10">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
      <h2 class="mb-4 text-xl md:text-4xl font-extrabold text-start text-gray-900 ">
        Frequently asked questions
      </h2>

      <div class="space-y-4">
        <div v-for="(item, index) in faq" :key="index"
          class="cursor-pointer p-4 md:p-6 bg-white rounded-lg border border-gray-200 " @click="toggle(index)">
          <div class="flex flex-row justify-between items-center gap-6">
            <h3 class="text-sm md:text-lg font-medium text-gray-900 flex-1">{{ item.titulo }}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4 md:size-6 flex-shrink-0 transition-transform duration-300 self-center"
              :class="{ '-rotate-180': activeIndex === index }">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </div>
          <transition name="fade" appear>
            <p v-if="activeIndex === index" class="mt-6 text-base text-gray-500 " v-html="item.descripcion"></p>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>
<style></style>