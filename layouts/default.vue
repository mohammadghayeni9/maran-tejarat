<template>
  <v-app dir="rtl">
    <div class="header-container">
      <Header />
    </div>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Header from "~/components/header/Header.vue";
export default {
  data() {
    return {};
  },
  mounted() {
    if (!localStorage.getItem("user-theme")) {
      localStorage.setItem("user-theme", "light-theme");
      document.documentElement.className = "light-theme";
    }
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  .header-container {
    margin-bottom: 5rem;
  }
  .v-main {
    padding: 2rem 1rem !important;
    margin: auto;
    max-width: 80vw;
    width: 100%;
    overflow: hidden;
    @media screen and (max-width: 700px) {
      max-width: 100vw;
    }
  }
}
</style>
