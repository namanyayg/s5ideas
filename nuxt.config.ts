// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-4M18FHDWKK',
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4M18FHDWKK');
          `
        }
      ]
    }
  }
})