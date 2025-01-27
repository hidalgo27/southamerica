<template>
  <footer class="relative bg-gray-800 text-gray-500 pb-16">
    <div class="container pt-12">
      <div class="mb-10 flex items-center justify-center">
        <div>
          <nuxt-img src="/images/logos/logo-mapi.svg" class="h-[14px] md:h-[25px] invert mx-auto"></nuxt-img>
        </div>
        <div>
          <span class="text-white px-4 text-xs md:text-lg">part of</span>
        </div>
        <div>
          <nuxt-img src="/images/logos/logo-gotoperu.svg" class="h-[14px] md:h-[25px] mx-auto"></nuxt-img>
        </div>
      </div>


      <div class="grid grid-cols-2 gap-4 dark:text-gray-300 md:grid-cols-5 ">
        <div>
          <p class="font-semibold tracking-wide text-secondary mb-6">
            Travel Packages
          </p>
          <ul class="mt-2 space-y-2">
            <li>
              <nuxt-link to="/peru-travel-packages" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Peru Travel Packages</nuxt-link>
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
              <nuxt-link to="/destinations/cusco" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Cusco</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/destinations/machupicchu" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Machu Picchu</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/destinations/sacred-valley" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Sacred Valley</nuxt-link>
            </li>
<!--            <li>-->
<!--              <nuxt-link to="/destinations/galapagos" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Galapagos</nuxt-link>-->
<!--            </li>-->
            <li>
              <nuxt-link to="/destinations" class="transition-colors duration-300 italic underline text-sm text-deep-purple-50 hover:text-teal-accent-400">View Other</nuxt-link>
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
              <nuxt-link to="/why-book-with-us" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Why book with us</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/travel-with-confidence" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Travel with confidence</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/booking-terms-and-conditions" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Booking terms</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about-us" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">About us</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/frequently-asked-questions" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">FAQ</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <p class="font-semibold tracking-wide text-secondary block mb-6">
            Documents
          </p>
          <ul>
            <li>
              <a href="/frequently-asked-questions" class="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400">Terms and conditions</a>
            </li>
          </ul>
          <p class="font-semibold tracking-wide text-secondary mb-6">

          </p>
          <div class="bg-gray-900 p-4 rounded-lg shadow-inner">
            <p class="mb-2 text-gray-300 text-sm">

              CONTACT US: <br> SALES: <br>info@gotoperu.com <br> OPERATIONS 24/7: <br> +1 (202) 4911478
            </p>
          </div>
        </div>
        <div>
          <div class="h-72 overflow-hidden">
            <nuxt-img src="/images/home/angi.png" class="w-[180px] mx-auto"></nuxt-img>
          </div>
          <nuxt-link to="#form-dream-adventure" class="btn-secondary block text-center w-full">Contact Us</nuxt-link>
        </div>
      </div>

      <div class="flex flex-col justify-between pt-5 border-t border-gray-500 sm:flex-row">
        <p class="text-sm dark:text-gray-300">
          © Copyright 2022 Machu Picchu Company. All rights reserved. | GOTOPERU COMPANY EIRL - RUC 20609225441 - Avenida El Sol 449 - Cusco - Cusco - Peru
        </p>
        <div class="flex items-center mt-4 space-x-4 sm:mt-0">
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>