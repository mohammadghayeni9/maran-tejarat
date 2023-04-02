<template>
  <div class="home-view" @click.stop="filterIsVisible = false">
    <v-tabs class="home-tabs">
      <v-tab v-if="isAssessorComputed">ارزیابی کننده</v-tab>
      <v-tab>ارزیابی شونده <span class="new-event-count" v-if="newEventCount > 0">{{ newEventCount }}</span></v-tab>
      <div class="loading d-flex justify-center" v-if="loading">
        <img :src="require('assets/images/loading.gif')" alt="loading">
      </div>
      <v-tab-item v-else-if="!loading && isAssessorComputed">
        <v-col cols="12" class="d-flex justify-center mt-5 pt-5" v-if="!units.length">هنوز فردی برای ارزیابی به شما
          انتساب داده نشده است.</v-col>
        <v-tabs class="mt-5" v-model="activeUnitTab" @change="setActiveUnitTab">
          <v-tab>داشبورد</v-tab>
          <v-tab v-for="unit in units" :key="unit[1]">{{ unit[0] }}</v-tab>
          <v-tab-item>
              <dashboard />
          </v-tab-item>
          <v-tab-item v-for="unit in units" :key="unit[0]">
            <homeUsersContent :loading="loading" :unit="unit" :users="users" />
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
      <v-tab-item v-if="!loading">
        <v-tabs class="mt-5">
          <v-tab>داشبورد</v-tab>
          <v-tab v-if="reportEventForMe.length">وقایع</v-tab>
          <v-tab v-if="reportAgreementForMe.length">توافقات</v-tab>
          <v-tab v-if="reportMeetingForMe.length">جلسات</v-tab>
          <v-tab>سوابق ارزیابی دوره‌ای</v-tab>
          <v-tab-item>
            <be-eval-dashboard />
          </v-tab-item>
          <v-tab-item v-if="reportEventForMe.length" class="position-relative">
            <v-btn outlined color="blue" elevation="1" class="mr-auto d-flex justify-end ml-2 mt-5 px-8"
              @click.stop="filterIsVisible = !filterIsVisible">
              فیلتر</v-btn>
            <v-col cols="12" v-if="filterIsVisible" class="filter-container" @click.stop>
              <v-col cols="12" class="d-flex flex-wrap">
                <v-col cols="12" class="pa-0">نوع ارزیابی</v-col>
                <v-col cols="12" class="pa-0"></v-col>
                <v-checkbox class="pl-7" v-model="eventTypeFilter" label="فرصت بهبود" value="O"></v-checkbox>
                <v-checkbox class="pl-7" v-model="eventTypeFilter" label="نقطه قوت" value="S"></v-checkbox>
              </v-col>
            </v-col>
            <perfect-scrollbar class="reports-content-forMe mt-5">
              <report-event-agreement-card type="E" v-for="event in filterWithEventTypeData" :key="event.date_report"
                :reportData="event" @getEvents="getEventReports" :is-assesor="false" class="my-5" />
              <v-col cols="12 d-flex justify-center mt-5 mb-10 " v-if="!filterWithEventTypeData.length">موردی برای نمایش
                وجود ندارد.</v-col>
            </perfect-scrollbar>
          </v-tab-item>
          <v-tab-item v-if="reportAgreementForMe.length">
            <perfect-scrollbar class="reports-content-forMe mt-5">
              <report-event-agreement-card type="A" v-for="agreement in reportAgreementForMe"
                :key="agreement.date_report" :reportData="agreement" :is-assesor="false" class="my-5" />
            </perfect-scrollbar>
          </v-tab-item>
          <v-tab-item v-if="reportMeetingForMe.length">
            <perfect-scrollbar class="reports-content-forMe mt-5">
              <report-event-agreement-card type="M" :isAssesor="false" v-for="meeting in reportMeetingForMe" :key="meeting.date_report"
                :reportData="meeting" class="my-5" @refreshReporthMeeting="getMeetingReports" />
            </perfect-scrollbar>
          </v-tab-item>
          <v-tab-item>
            <v-col cols="12 px-1" class="d-flex justify-between report-evaluate pb-0">
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
              <div class="d-flex justify-center" v-if="beEvaluateLoading">
                <img :src="require('assets/images/loading.gif')" alt="loading">
              </div>
              <v-col cols="12" class="d-flex justify-center" v-else-if="!reportEvaluateForMe.length">
                موردی برای نمایش وجود ندارد
              </v-col>
              <perfect-scrollbar class="reports-content mt-5" v-else>
                <v-col cols="12" class="season-year-title">{{ seasonComputed }} {{ yearSelected }}</v-col>
                <li class="report-card px-3" v-for="report in reportEvaluateForMe[0].report" :key="report.id">
                  {{ report[0] }} -> {{ report[1] }}
                </li>
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
import dashboard from '~/components/dashboard/dashboard.vue';
import beEvalDashboard from '~/components/dashboard/beEvalDashboard.vue';
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  components: {
    homeUsersContent,
    ReportEventAgreementCard,
    PerfectScrollbar,
    dashboard,
    beEvalDashboard
  },
  data() {
    return {
      loading: false,
      beEvaluateLoading: false,
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
      filterIsVisible: false,
      eventTypeFilter: null,
      activeUnitTab: null,
      newEventCount: 0,
    }
  },
  methods: {
    setActiveUnitTab () {
      localStorage.setItem('activeUnitTab', this.activeUnitTab)
    },
    async getUsers () {
      try {
        const response = await this.$axios.get(routes.users);
        this.users = response.data.results;
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    async getEventReports () {
      try {
        const response = await this.$axios.post(routes.reportEventAgreementsForMe, {
          type_report: "E"
        });
        this.reportEventForMe = response.data;
        if (this.reportEventForMe.length) {
          this.reportEventForMe.forEach((event) => {
            if (!event.be_seen) {
              this.newEventCount += 1;
            }
          })
        }
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    async getAgreementReports () {
      try {
        const response = await this.$axios.post(routes.reportEventAgreementsForMe, {
          type_report: "A"
        });
        this.reportAgreementForMe = response.data;
        if (this.reportAgreementForMe.length) {
          this.reportAgreementForMe.forEach((event) => {
            if (!event.be_seen) {
              this.newEventCount += 1;
            }
          })
        }
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    async getMeetingReports () {
      try {
        const response = await this.$axios.get(routes.reportMeetingForMe);
        this.reportMeetingForMe = response.data.results;
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    async getEvaluateReports () {
      try {
        this.beEvaluateLoading = true;
        const response = await this.$axios.post(routes.reportEvaluate, {
          staff: localStorage.getItem('meUserId'),
          season: this.seasonSelected,
          year: this.yearSelected
        })
        this.reportEvaluateForMe = response.data;
        this.beEvaluateLoading = false;
      } catch (error) {
        console.log(error?.response?.data);
      } finally {
        this.beEvaluateLoading = false;
      }
    },
    async getUnits () {
      try {
        const response = await this.$axios.post(routes.units);
        this.units = response.data.unit;
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    toPersianDigits(str) {
      let persianNum = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return str?.toString()?.replace(/[0-9]/g, function (w) {
        return persianNum[+w];
      });
    },
  },
  async created() {
    this.loading = true;
    this.getUnits();
    await this.getUsers();
    this.activeUnitTab = Number(localStorage.getItem('activeUnitTab'));
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
    },
    seasonComputed() {
      if (this.seasonSelected === 'B') {
        return 'بهار';
      } else if (this.seasonSelected === 'T') {
        return 'تابستان';
      } else if (this.seasonSelected === 'P') {
        return 'پاییز';
      } else {
        return 'زمستان';
      }
    },
    filterWithEventTypeData() {
      if (this.eventTypeFilter?.length === 1) {
        return this.reportEventForMe.filter(report => report.assessment_type === this.eventTypeFilter[0]);
      } else return this.reportEventForMe
    }
  }
}
</script>

<style lang="scss">
.home-tabs {
  .new-event-count {
    position: absolute;
    font-family: iranSansFaNum;
    font-size: 1.1rem;
    color: red;
    left: -10px;
    top: 0;
    width: 24px;
    height: 24px;
    border: 1px solid red;
    border-radius: 50%;
  }
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
  .season-year-title {
    font-family: IranSansFaNum;
    font-size: 1.25rem;
  }
  .reports-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem 0.2rem 1rem 0.2rem;
    max-height: 52vh;
    overflow: hidden !important;
    width: 100%;
    gap: 2rem;
    background-color: var(--background-color-primary);
    border-radius: var(--card-border-radius);

    @media screen and (max-width: 400px) {
      max-height: 40vh;
    }
    .report-card {
      width: 100%;
      list-style: disc;
    }
  }
  .filter-container {
    position: absolute;
    border: 1px solid var(--color-blue-sky);
    width: 20rem;
    z-index: 20;
    top: 3.75rem;
    left: 0.5rem;
    border-radius: var(--input-border-radius);
    background-color: var(--background-color-primary-lighter);
    backdrop-filter: blur(25px);
  }
}
</style>
