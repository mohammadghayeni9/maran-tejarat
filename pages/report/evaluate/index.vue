<template>
    <div class="evaluate-report">
        <HeaderPage title="گزارش ارزیابی دوره‌ای" :seasonVisible="false"></HeaderPage>
        <v-col cols="12" class="d-flex justify-between report-evaluate">
            <v-select :items="seasons" item-text="title" item-value="value" label="انتخاب فصل مورد نطر" outlined
                v-model="seasonSelected">
            </v-select>
            <v-select :items="yearsComputed" label="انتخاب سال مورد نظر" outlined v-model="yearSelected">
            </v-select>
        </v-col>
        <v-col cols="12" class="d-flex justify-end px-0">
            <v-btn elevation="2" class="px-6 py-5 rounded-lg back-btn mx-1" @click="getEvaluateReports">
                نمایش
            </v-btn>
        </v-col>
        <div class="loading d-flex justify-center" v-if="loading">
            <img :src="require('assets/images/loading.gif')" alt="loading">
        </div>
        <v-col cols="12" class="d-flex justify-center" v-else-if="!reports.length">ارزیابی ثبت شده‌ای برای نمایش وجود
            ندارد
        </v-col>
        <perfect-scrollbar class="reports-content mt-5" v-else>
            <v-col cols="12" class="season-year-title">{{ seasonComputed }} {{ yearSelected }}</v-col>
            <li class="report-card px-3" v-for="report in reports[0].report" :key="report.id">
                {{ report[0] }} -> {{ report[1] }}
            </li>
            <v-col cols="12">امتیاز کسب‌شده در ارزیابی این فصل: {{ toPersianDigits(reports[0].score) }}</v-col>
        </perfect-scrollbar>
    </div>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { routes } from "~/API/routes";
import HeaderPage from "~/components/header/headerPage.vue";

export default {
    components: {
    PerfectScrollbar,
    HeaderPage
},
    data () {
        return {
            loading: false,
            reports: [],
            date: [],
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
    mounted() {
        this.getEvaluateReports();
    },
    methods: {
        async getEvaluateReports() {
            try {
                this.loading = true;
                const response = await this.$axios.post(routes.reportEvaluate, {
                    staff: localStorage.getItem('beEvaluatedUserId'),
                    season: this.seasonSelected,
                    year: this.yearSelected
                })
                this.reports = response.data;
            } catch (error) {
                console.log(error?.response?.data);
            } finally {
                this.loading = false;
            }
        },
        toPersianDigits(str) {
            let persianNum = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
            return str?.toString()?.replace(/[0-9]/g, function(w){
                return persianNum[+w];
            });
        }
    },
    computed: {
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

<style lang="scss" scoped>
.evaluate-report {
    margin: auto;
    max-width: 65rem;
  .evaluate-report-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;
    padding: 0.75rem;
    overflow: hidden;
    .reports-title {
        font-size: 1.2rem;
        white-space: nowrap;
        margin-right: -20px;
    }
  }
  .report-evaluate {
      column-gap: 3rem;
      padding: 3rem 0 0 0;

      @media screen and (max-width: 450px) {
          gap: 0.5rem;
      }
  }

  .season-year-title {
    font-family: IranSansFaNum;
    font-size: 1.25rem;
  }

  .reports-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 1rem 0.2rem 5rem 0.2rem;
        max-height: 52.5vh;
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
}
</style>
