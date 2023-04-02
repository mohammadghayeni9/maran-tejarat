export default {
  ssr: false,

  head: {
    htmlAttrs: {
      lang: "fa",
    },
    titleTemplate: "%s - ویسپار",
    title: "ویسپار",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: [
    "~/assets/css/style.css",
    "~/assets/css/variable.css",
    "~/assets/css/colors.css",
    "~/assets/css/animation.css",
  ],

  plugins: [],

  components: true,

  buildModules: ["@nuxtjs/vuetify"],

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "nuxt-svg-loader", "@nuxtjs/toast"],

  axios: {
    baseURL: "https://admin.datafication.ir/",
  },

  pwa: {
    manifest: {
      lang: "en",
    },
  },

  vuetify: {
    rtl: true,
  },

  toast: {
    position: "top-right",
    keepOnHover: true,
    duration: "3000",
    className: "global-toast",
  },

  build: {
		transpile: ['@amcharts/amcharts4']
	},

  router: {
    middleware: "auth",
  },
};
