import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    ssr: true,

    modules: ['@nuxt/image', '@nuxt/content', '@nuxt/eslint', 'dayjs-nuxt', '@nuxt/image'],

    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE || 'http://localhost:1337/api'
        }
    },

    image: {
        strapi: {
            baseURL: 'http://localhost:1337/'
        }
    },

    css: ['~/assets/css/main.css'],

    nitro: {
        prerender: {
            routes: ['/']
        }
    },

    vite: {
        plugins: [
            tailwindcss(),
        ],
    }
})