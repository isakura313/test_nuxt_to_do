// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["@/assets/styles/main.sass"],
    modules: ['@pinia/nuxt'],
    ssr: true,
    nitro: {
        devProxy: {
            "/api": {
                target:"https://64037721302b5d671c502ee9.mockapi.io",
                changeOrigin: true,
                prependPath: true,
            }
        }
    },
})
;