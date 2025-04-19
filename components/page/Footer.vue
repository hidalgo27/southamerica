<template>
  <section class="container ">
    <div class="block border-b border-gray-200 w-full mb-8"></div>
  </section>
  <section class="container my-20 hidden text-left">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="grid grid-cols-2">
        <NuxtImg src="https: //images.goway.com/production/footer_cta/2023-09/lighthouse_4.svg" alt="icon"
          class="w-full h-full rounded-md" />
        <div class="self-center pl-6">
          <h3 class="text-lg font-semibold">New Specials</h3>
          <div class="group">
            <NuxtLink to="/special-offers"
              class="text-sm relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0">
              Discover</NuxtLink>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <NuxtImg src="https://images.goway.com/production/footer_cta/2023-09/suitcase_4.svg" alt="icon"
          class="w-full rounded-md" />
        <div class="self-center pl-6">
          <h3 class="text-lg font-semibold">Start Planning</h3>
          <div class="group">
            <NuxtLink to="/travel-packages"
              class="text-sm relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0">
              Discover All Trips
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <NuxtImg src="https://images.goway.com/production/footer_cta/2023-09/camera-passport_4.svg" alt="icon"
          class="w-full rounded-md" />
        <div class="self-center pl-6">
          <h3 class="text-lg font-semibold">Follow Along</h3>
          <div class="group self-center ">
            <NuxtLink to="#"
              class="text-sm relative inline-block after:block after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:origin-left hover:after:w-0">
              @southamerica
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer class="relative bg-gray-800 text-gray-500 pb-16">
    <div class="container pt-12">
      <div class="mb-10 flex items-center justify-center">
        <div class="items-center">
          <div class="font-playfair-display font-medium flex items-end text-white text-sm md:text-3xl">
            South
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4 md:size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
            </svg>
            America
            <div class="px-1">
              <span class="text-sm italic">company</span>
            </div>
          </div>
        </div>
        <div>
          <span class="text-white px-4 text-xs md:text-lg">part of</span>
        </div>
        <div>
          <NuxtImg src="/images/logos/logo-gotoperu.svg" class="h-[14px] md:h-[25px] mx-auto"></NuxtImg>
        </div>
      </div>


      <div class="grid grid-cols-2 gap-4 dark:text-gray-300 md:grid-cols-5 ">
        <div>
          <p class="font-semibold tracking-wide text-secondary mb-6">
            Travel Packages
          </p>
          <ul class="mt-2 space-y-2">
            <li>
              <nuxt-link to="/travel-packages"
                class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Latam Travel
                Packages</nuxt-link>
            </li>
            <!--            <li>-->
            <!--              <a href="#" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Days Tours</a>-->
            <!--            </li>-->

          </ul>
        </div>
        <div>
          <p class="font-semibold tracking-wide text-secondary mb-6">
            Destination
          </p>
          <ul class="mt-2 space-y-2">
            <li>
              <nuxt-link to="/destinations/peru"
                class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Peru</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/destinations/brazil"
                class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Brazil</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/destinations/argentina"
                class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Argentina</nuxt-link>
            </li>
            <!--            <li>-->
            <!--              <nuxt-link to="/destinations/galapagos" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Galapagos</nuxt-link>-->
            <!--            </li>-->
            <li>
              <nuxt-link to="/destinations"
                class="transition-colors duration-300 italic underline text-sm text-deep-purple-50 hover:text-teal-accent-400">View
                Other</nuxt-link>
            </li>
          </ul>
        </div>
        <!--        <div>-->
        <!--          <p class="font-semibold tracking-wide text-secondary mb-6">Hotels</p>-->
        <!--          <ul class="mt-2 space-y-2">-->
        <!--            <li>-->
        <!--              <a href="#" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">2 stars</a>-->
        <!--            </li>-->
        <!--            <li>-->
        <!--              <a href="#" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">3 stars</a>-->
        <!--            </li>-->
        <!--            <li>-->
        <!--              <a href="#" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">4 stars</a>-->
        <!--            </li>-->
        <!--            <li>-->
        <!--              <a href="#" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">5 stars</a>-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--        </div>-->

        <div>
          <p class="font-semibold tracking-wide text-secondary mb-6">
            Travel Info
          </p>
          <ul class="mt-2 space-y-2">
            <li>
              <nuxt-link to="#"
                class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Why book with
                us</nuxt-link>
            </li>
            <li>
              <nuxt-link to="#"
                class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Travel with
                confidence</nuxt-link>
            </li>
            <li>
              <nuxt-link to="#"
                class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Booking
                terms</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about-us"
                class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">About
                us</nuxt-link>
            </li>
            <li>
              <nuxt-link to="#"
                class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">FAQ</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <p class="font-semibold tracking-wide text-secondary block mb-6">
            Documents
          </p>
          <ul>
            <li>
              <a href="#" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Terms
                and
                conditions</a>
            </li>
          </ul>
          <p class="font-semibold tracking-wide text-secondary mb-6">

          </p>
          <div class="bg-gray-900 p-4 rounded-lg shadow-inner">
            <p class="mb-2 text-gray-300 text-sm">

              CONTACT US: <br> SALES: <br>info@southamerica.company <br> OPERATIONS 24/7: <br> +1 (202) 491-1478
            </p>
          </div>
        </div>
        <div>
          <div class="h-72 overflow-hidden">
            <NuxtImg src="/images/home/angi.png" class="w-[180px] mx-auto"></NuxtImg>
          </div>
          <nuxt-link to="#form-dream-adventure" class="btn-secondary block text-center w-full">Contact Us</nuxt-link>
        </div>
      </div>

      <div class="flex flex-col justify-between pt-5 border-t border-gray-500 sm:flex-row">
        <p class="text-sm dark:text-gray-300">
          © Copyright 2025 Machu Picchu Company. All rights reserved. | GOTOPERU COMPANY EIRL - RUC 20609225441 -
          Avenida El Sol 449 - Cusco - Cusco - Peru
        </p>
        <div class="flex items-center mt-4 space-x-4 sm:mt-0">
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>