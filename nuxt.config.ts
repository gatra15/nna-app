// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3000,
    host: "0.0.0.0",
  },
  compatibilityDate: "2025-04-26",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  runtimeConfig: {
    public: {
      urlBase: process.env.URL_BASE || "http://nna-api.test/api",
    },
  },
});
