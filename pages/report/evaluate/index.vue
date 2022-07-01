<template>
<div class="evaluate-report">
    <div class="evaluate-report-header">
        <v-col cols="10" class="reports-title"> گزارش ارزیابی دوره‌ای</v-col>
        <v-col cols="2 d-flex justify-end">
            <SVGBack class="back-icon" @click="$router.push('/')" />
        </v-col>
    </div>
    <div class="loading d-flex justify-center" v-if="loading">
        <img :src="require('assets/images/loading.gif')" alt="loading">
    </div>
    <v-col cols="12" class="d-flex justify-center" v-else-if="!reports">ارزیابی ثبت شده‌ای برای نمایش وجود ندارد</v-col>
    <perfect-scrollbar class="reports-content mt-5" v-else>
        <v-col cols="12">{{ season }}  {{ date[0] }}</v-col>
        <div class="report-card px-3" v-for="report in reports[0].report" :key="report.id">
            {{ report[0] }} -> {{ report[1] }}
        </div>
        <v-col cols="12">امتیاز کسب‌شده در ارزیابی این فصل: {{ toPersianDigits(reports[0].score) }}</v-col>
    </perfect-scrollbar>
  </div>
</template>

<script>
import SVGBack from "@/components/icons/back-icon.svg";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { routes } from "~/API/routes";

export default {
    components: {
        SVGBack,
        PerfectScrollbar,
    },
    data () {
        return {
            loading: false,
            reports: [],
            date: [],
            season: ''
        }
    },
    created() {
        this.getEvaluateReports();
        this.date = new Date().toLocaleDateString('fa-IR').split('/');
    },
    methods: {
        async getEvaluateReports() {
            try {
                this.loading = true;
                const response = await this.$axios.post(routes.reportEvaluate, {
                    staff: localStorage.getItem('beEvaluatedUserId'),
                    season: this.seasonComputed,
                    year: this.yearComputed
                })
                this.reports = response.data;
            } catch (error) {
                console.log(error);
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
        yearComputed() {
            this.date = new Date().toLocaleDateString('fa-IR').split('/');
            return this.date[0];
        },
        seasonComputed() {
            this.date = new Date().toLocaleDateString('fa-IR').split('/');
            if (this.date[1] == '۱' || this.date[1] == '۲' || this.date[1] == '۳') {
                this.season = 'بهار';
                return 'B';
            } else if (this.date[1] == '۴' || this.date[1] == '۵' || this.date[1] == '۶') {
                this.season = 'تابستان';
                return 'T';
            } else if (this.date[1] == '۷' || this.date[1] == '۸' || this.date[1] == '۹') {
                this.season = 'پاییز';
                return 'P';
            } else {
                this.season = 'زمستان';
                return 'Z';
            }
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
    .back-icon {
        object-fit: cover;
        max-height: 2rem;
        width: fit-content;
        margin-right: auto;
        margin-left: -20px;
        cursor: pointer;
    }
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
