// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Peru Travel Packages',
      // meta: [
      //   { name: 'description', content: 'My amazing site.' }
      // ],
      script: [ { src: 'https://cdn.wetravel.com/widgets/embed_checkout.js' } ],
      link: [
        { rel: 'apple-touch-icon', sizes: '48x48', href: '/favicon/favicon.png' },
        { rel: 'apple-touch-icon', sizes: '192x192', href: '/favicon/android-chrome-192x192.png' },
        { rel: 'apple-touch-icon', sizes: '512x512', href: '/favicon/android-chrome-512x512.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' }
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#ffffff' },

      ]
    }
  },


  modules: [// needed
  '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', "@nuxt/image", "@nuxtjs/google-fonts", 'floating-vue/nuxt', '@hypernym/nuxt-gsap', '@nuxt/scripts', '@nuxtjs/device', '@samk-dev/nuxt-vcalendar'],
  // gsap: {
  //   composables: true,
  //   provide: false,
  // },
  scripts: {
    registry: {
      googleTagManager: {
        id: 'AW-382248808',
      }
    }
  },
  googleFonts: {
    families: {
      Lato: [100, 300, 400, 700, 900],  // Lato soporta estos pesos
      Parisienne: [400],  // Parisienne solo soporta un peso (regular)
      'Playfair+Display': [400, 700, 900],  // Playfair Display no soporta pesos 100 o 300
      Lora: [400, 700],  // Lora soporta regular (400) y bold (700)
    },
    display: 'swap',
  },

  piniaPersistedstate: {
    storage: 'localStorage'
  },
  css: [
      '~/assets/css/main.css',
    '~/assets/css/page.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['vue3-carousel','@pinia-plugin-persistedstate']
  },
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "https://api.machupicchu.company/api",
      apiInquire: process.env.useNuxtApp || "https://api.gotoecuador.com/api/store/inquire",
      // apiBaseTest: process.env.API_BASE_TEST || "https://app.gotolatam.travel/api",
      apiBaseTest: '',
      gtmContainerId: process.env.NUXT_PUBLIC_GTM_CONTAINER_ID || 'GTM-M4FTLKV3',
      // apiBase: process.env.API_BASE_TEST || "http://localhost:8080/api",
    }
  },
})