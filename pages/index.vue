<template>
  <div class="home-view">
    <v-tabs class="home-tabs">
      <v-tab>ارزیابی کننده</v-tab>
      <v-tab>ارزیابی شونده</v-tab>
      <div class="loading d-flex justify-center" v-if="loading">
        <img :src="require('assets/images/loading.gif')" alt="loading">
      </div>
      <v-tab-item v-else>
        <v-tabs class="mt-5">
          <v-tab v-for="unit in units" :key="unit.id">{{ unit.name }}</v-tab>
          <v-tab-item v-for="unit in units" :key="unit.name">
            <homeUsersContent :loading="loading" :unit="unit" :users="users" />
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
      <v-tab-item></v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import homeUsersContent from "@/components/card/homeUsersContent.vue"
import { routes } from "~/API/routes";

export default {
  components: {
    homeUsersContent,
  },
  data() {
    return {
      loading: false,
      users: [],
      reportEventForMe: [],
      reportAgreementForMe: [],
      reportMeetingForMe: [],
      units: [],
    }
  },
  methods: {
    async getUsers () {
      try {
        this.loading = true;
        const response = await this.$axios.get(routes.users);
        this.users = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    async getEventReports () {
      try {
        const response = await this.$axios.get(routes.reportEventAgreementsForMe, {
          report_type: "E"
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async getAgreementReports () {
      try {
        const response = await this.$axios.get(routes.reportEventAgreementsForMe, {
          report_type: "A"
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async getMeetingReports () {
      try {
        const response = await this.$axios.get(routes.reportMeetingForMe);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async getUnits () {
      try {
        const response = await this.$axios.get(routes.units);
        this.units = response.data.results;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getUsers();
    this.getUnits();
  },
  mounted() {
    this.getEventReports();
    this.getAgreementReports();
    this.getMeetingReports();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
}
</script>

<style lang="scss">
.home-tabs {
  .v-tabs-bar {
    background-color: var(--background-color-primary-lighter) !important;
    overflow: hidden;
    border-radius: var(--card-border-radius);
  }
  .v-tabs-items {
    background-color: transparent !important;
  }
  .loading {
    position: absolute;
    top: -25px;
    left: 0;
    right: 0;
    transform: scale(0.8);
  }
}
</style>
