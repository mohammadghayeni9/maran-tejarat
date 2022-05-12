<template>
  <v-app dir="rtl">
    <div>
      <Header />
    </div>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Header from '~/components/header/Header.vue'
export default {
  data() {
    return {};
  },
  mounted() {
    if (!localStorage.getItem('user-theme')) {
      localStorage.setItem('user-theme', 'light-theme')
      document.documentElement.className = 'light-theme';
    }
  },
};
</script>
