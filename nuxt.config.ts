// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["@/assets/styles/main.sass", '@morev/vue-transitions/styles'],
    modules: ['@pinia/nuxt',  'nuxt-headlessui'],
    ssr: true,
    runtimeConfig: {
        public: {
            api_url: process.env.API_BASE_URL
        }
    },
    app: {
        head: {
            link: [{rel: 'icon', type: 'image/png', href: '/favicon.png'}]
        },
    },
    nitro: {
        devProxy: {
            "https://64037721302b5d671c502ee9.mockapi.io/api": {
                target: "https://64037721302b5d671c502ee9.mockapi.io",
                changeOrigin: true,
                prependPath: true,
            }
        }
    },
})
;