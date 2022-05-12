import colors from "vuetify/es5/util/colors";

export default {
  ssr: false,

  head: {
    titleTemplate: "%s - vispar-app-client",
    title: "vispar-app-client",
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

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "nuxt-svg-loader"],

  axios: {
    baseURL: "https://s-rahmani.ir/visparp/",
  },

  pwa: {
    manifest: {
      lang: "en",
    },
  },

  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
};
