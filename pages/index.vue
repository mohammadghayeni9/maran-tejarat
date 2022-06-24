<template>
  <div class="home-view">
    <v-tabs class="home-tabs">
      <v-tab>ارزیابی کننده</v-tab>
      <v-tab>ارزیابی شونده</v-tab>
      <div class="loading d-flex justify-center" v-if="loading">
        <img :src="require('assets/images/loading.gif')" alt="loading">
      </div>
      <v-tab-item v-else-if="!loading">
        <v-tabs class="mt-5">
          <v-tab v-for="unit in units" :key="unit.id">{{ unit.name }}</v-tab>
          <v-tab-item v-for="unit in units" :key="unit.name">
            <homeUsersContent :loading="loading" :unit="unit" :users="users" />
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
      <v-tab-item v-if="!loading">
        <v-col cols="12" class="d-flex justify-center" v-if="reportEventForMe.length && reportAgreementForMe.length && reportMeetingForMe.length">موردی برای نمایش وجود ندارد</v-col>
        <v-tabs class="mt-5" v-else>
          <v-tab v-if="reportEventForMe.length">وقایع</v-tab>
          <v-tab v-if="reportAgreementForMe.length">توافقات</v-tab>
          <v-tab v-if="reportMeetingForMe.length">جلسات</v-tab>
          <v-tab-item v-if="reportEventForMe.length">
            <report-event-agreement-card type="E" v-for="event in reportEventForMe" :key="event.date_report" :reportData="event" class="my-5" />
          </v-tab-item>
          <v-tab-item v-if="reportAgreementForMe.length">
            <report-event-agreement-card type="A" v-for="agreement in reportAgreementForMe" :key="agreement.date_report" :reportData="agreement" class="my-5" />
          </v-tab-item>
          <v-tab-item v-if="reportMeetingForMe.length">
            <report-event-agreement-card type="M" v-for="meeting in reportMeetingForMe" :key="meeting.date_report" :reportData="meeting" class="my-5" />
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import homeUsersContent from "@/components/card/homeUsersContent.vue"
import { routes } from "~/API/routes";
import ReportEventAgreementCard from '~/components/card/reportEventAgreementCard.vue';

export default {
  components: {
    homeUsersContent,
    ReportEventAgreementCard,
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
        const response = await this.$axios.post(routes.reportEventAgreementsForMe, {
          type_report: "E"
        });
        this.reportEventForMe = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAgreementReports () {
      try {
        const response = await this.$axios.post(routes.reportEventAgreementsForMe, {
          type_report: "A"
        });
        this.reportAgreementForMe = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getMeetingReports () {
      try {
        const response = await this.$axios.get(routes.reportMeetingForMe);
        this.reportMeetingForMe = response.data.results;
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
    background-color: var(--background-color-primary) !important;
    overflow: hidden;
    border-radius: var(--card-border-radius);
  }
  .v-tabs-items {
    background-color: transparent !important;
  }
  .loading {
    position: absolute;
    top: -25px;
    left: 1rem;
    transform: scale(0.8);
  }
}
</style>
