<template>
  <div class="home-view">
    <v-tabs class="home-tabs">
      <v-tab v-if="isAssessorComputed">ارزیابی کننده</v-tab>
      <v-tab>ارزیابی شونده</v-tab>
      <div class="loading d-flex justify-center" v-if="loading">
        <img :src="require('assets/images/loading.gif')" alt="loading">
      </div>
      <v-tab-item v-else-if="!loading && isAssessorComputed">
        <v-col cols="12" class="d-flex justify-center mt-5 pt-5" v-if="!units.length">هنوز فردی برای ازریابی به شما
          انتساب داده نشده است</v-col>
        <v-tabs class="mt-5" v-else>
          <v-tab v-for="unit in units" :key="unit[1]">{{ unit[0] }}</v-tab>
          <v-tab-item v-for="unit in units" :key="unit[0]">
            <homeUsersContent :loading="loading" :unit="unit" :users="users" />
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
      <v-tab-item v-if="!loading">
        <v-tabs class="mt-5">
          <v-tab v-if="reportEventForMe.length">وقایع</v-tab>
          <v-tab v-if="reportAgreementForMe.length">توافقات</v-tab>
          <v-tab v-if="reportMeetingForMe.length">جلسات</v-tab>
          <v-tab>سوابق ارزیابی دوره‌ای</v-tab>
          <v-tab-item v-if="reportEventForMe.length">
            <perfect-scrollbar class="reports-content-forMe mt-5">
              <report-event-agreement-card type="E" v-for="event in reportEventForMe" :key="event.date_report"
                :reportData="event" class="my-5" />
            </perfect-scrollbar>
          </v-tab-item>
          <v-tab-item v-if="reportAgreementForMe.length">
            <perfect-scrollbar class="reports-content-forMe mt-5">
              <report-event-agreement-card type="A" v-for="agreement in reportAgreementForMe"
                :key="agreement.date_report" :reportData="agreement" class="my-5" />
            </perfect-scrollbar>
          </v-tab-item>
          <v-tab-item v-if="reportMeetingForMe.length">
            <perfect-scrollbar class="reports-content-forMe mt-5">
              <report-event-agreement-card type="M" v-for="meeting in reportMeetingForMe" :key="meeting.date_report"
                :reportData="meeting" class="my-5" />
            </perfect-scrollbar>
          </v-tab-item>
          <v-tab-item>
            <v-col cols="12" class="d-flex justify-between report-evaluate">
              <v-select :items="seasons" item-text="title" item-value="value" label="انتخاب فصل مورد نطر" outlined
                v-model="seasonSelected">
              </v-select>
              <v-select :items="yearsComputed" label="انتخاب سال مورد نظر" outlined v-model="yearSelected">
              </v-select>
            </v-col>
            <v-col cols="12" class="d-flex justify-end px-0">
              <v-btn elevation="2" class="px-6 py-5 rounded-lg back-btn mx-1" @click="getEvaluateReports">نمایش
              </v-btn>
            </v-col>
            <v-col cols="12">
              <div class="loading d-flex justify-center" v-if="loading">
                <img :src="require('assets/images/loading.gif')" alt="loading">
              </div>
              <v-col cols="12" class="d-flex justify-center" v-else-if="!reportEvaluateForMe.length">
                موردی برای نمایش وجود ندارد
              </v-col>
              <perfect-scrollbar class="reports-content mt-5" v-else>
                <div class="report-card px-3" v-for="report in reportEvaluateForMe[0].report" :key="report.id">
                  {{ report[0] }} -> {{ report[1] }}
                </div>
                <v-col cols="12">امتیاز کسب‌شده در ارزیابی این فصل: {{ toPersianDigits(reportEvaluateForMe[0].score) }}
                </v-col>
              </perfect-scrollbar>
            </v-col>
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
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  components: {
    homeUsersContent,
    ReportEventAgreementCard,
    PerfectScrollbar
  },
  data() {
    return {
      loading: false,
      users: [],
      reportEventForMe: [],
      reportAgreementForMe: [],
      reportMeetingForMe: [],
      reportEvaluateForMe: [],
      units: [],
      extractedUnits: [],
      yearSelected: localStorage.getItem('year'),
      seasonSelected: localStorage.getItem('season'),
      seasons: [
        {
          title: 'بهار',
          value: 'B'
        },
        {
          title: 'تابستان',
          value: 'T'
        },
        {
          title: 'پاییز',
          value: 'P'
        },
        {
          title: 'زمستان',
          value: 'Z'
        }
      ],
    }
  },
  methods: {
    async getUsers () {
      try {
        const response = await this.$axios.get(routes.users);
        this.users = response.data.results;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getEventReports () {
      try {
        const response = await this.$axios.post(routes.reportEventAgreementsForMe, {
          type_report: "E"
        });
        this.reportEventForMe = response.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getAgreementReports () {
      try {
        const response = await this.$axios.post(routes.reportEventAgreementsForMe, {
          type_report: "A"
        });
        this.reportAgreementForMe = response.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getMeetingReports () {
      try {
        const response = await this.$axios.get(routes.reportMeetingForMe);
        this.reportMeetingForMe = response.data.results;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getEvaluateReports () {
      try {
        const response = await this.$axios.post(routes.reportEvaluate, {
          staff: localStorage.getItem('meUserId'),
          season: this.seasonSelected,
          year: this.yearSelected
        })
        this.reportEvaluateForMe = response.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getUnits () {
      try {
        const response = await this.$axios.post(routes.units);
        this.units = response.data.unit;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    toPersianDigits(str) {
      let persianNum = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return str?.toString()?.replace(/[0-9]/g, function (w) {
        return persianNum[+w];
      });
    }
  },
  async created() {
    this.loading = true;
    this.getUsers();
    await this.getUnits();
    this.loading = false;
  },
  mounted() {
    this.getEventReports();
    this.getAgreementReports();
    this.getMeetingReports();
    this.getEvaluateReports();
  },
  computed: {
    isAssessorComputed() {
      return localStorage.getItem('isAssessor') == 'true';
    },
    yearsComputed() {
      let years = [];
      for (let index = localStorage.getItem('year'); index > localStorage.getItem('year') - 20; index--) {
        years.push(index);
      }
      return years;
    }
  }
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
  }
  .report-evaluate {
    gap: 3rem;
    padding: 3rem 0;
    @media screen and (max-width: 450px) {
      gap: 0.5rem;
    }
  }
  .reports-content-forMe {
    max-height: 70vh;
    overflow: hidden !important;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
  }
  .reports-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem 0.2rem 1rem 0.2rem;
    max-height: 70vh;
    overflow: hidden !important;
    width: 100%;
    gap: 2rem;
    background-color: var(--background-color-primary);
    border-radius: var(--card-border-radius);

    .report-card {
      width: 100%;
    }
  }
}
</style>
