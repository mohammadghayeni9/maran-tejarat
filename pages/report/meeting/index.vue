<template>
    <div class="meeting-report" @click="filterIsVisible = false">
        <HeaderPage title="گزارش جلسات" :seasonVisible="false"></HeaderPage>
        <v-col cols="12" class="d-flex justify-center" v-if="!reports.length && !loading">جلسه‌ی به ثبت رسیده‌ای برای
            نمایش وجود ندارد</v-col>
        <perfect-scrollbar class="reports-content">
            <v-col cols="12" class="d-flex flex-wrap justify-end px-0 py-0 position-relative"
                v-if="reports.length && !loading">
                <v-btn outlined color="blue" elevation="1" class="px-8"
                    @click.stop="filterIsVisible = !filterIsVisible">
                    فیلتر</v-btn>
                <v-col cols="12" v-if="filterIsVisible" class="filter-container" @click.stop>
                    <v-col cols="12" class="d-flex flex-wrap">
                        <v-col cols="12" class="px-0 pt-0">فصل ارزیابی</v-col>
                        <v-col cols="12" class="pa-0"></v-col>
                        <v-row>
                            <v-checkbox class="pl-7" v-model="seasonFilter" label="فصل بهار" value="B">
                            </v-checkbox>
                            <v-checkbox class="pl-7" v-model="seasonFilter" label="فصل تابستان" value="T">
                            </v-checkbox>
                            <v-checkbox class="pl-7 mt-0" v-model="seasonFilter" label="فصل پاییز" value="P">
                            </v-checkbox>
                            <v-checkbox class="pl-7 mt-0" v-model="seasonFilter" label="فصل زمستان" value="Z">
                            </v-checkbox>
                        </v-row>
                    </v-col>
                </v-col>
            </v-col>
            <div v-if="loading" class="loading d-flex mx-auto">
                <img :src="require('assets/images/loading.gif')" alt="loading" class="d-flex mx-auto">
            </div>
            <div class="report-card" v-for="report in filteredValueComputed" :key="report.id" v-else-if="filteredValueComputed.length">
                <report-event-agreement-card type="M" :reportData="report" />
            </div> 
            <div v-else class="mx-auto">
                موردی برای نمایش موجود نیست
            </div>
        </perfect-scrollbar>
    </div>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { routes } from "~/API/routes";
import ReportEventAgreementCard from '~/components/card/reportEventAgreementCard.vue';
import HeaderPage from "~/components/header/headerPage.vue";

export default {
    components: {
        PerfectScrollbar,
        ReportEventAgreementCard,
        HeaderPage
    },
    data() {
        return {
            loading: false,
            reports: [],
            filterIsVisible: false,
            seasonFilter: [],
        }
    },
    created() {
        this.getMeetingReports();
    },
    computed: {
        filteredValueComputed() {
            let filteredValue = [];

            if (this.seasonFilter.length) {
                this.reports.filter((event) => {
                    this.seasonFilter.forEach((season) => {
                        let month = parseInt(event.date_report.substring(5, 7));
                        if (month >= 1 && month <= 3 && season == 'B') {
                            filteredValue.push(event);
                        }
                        if (month > 3 && month <= 6 && season == 'T') {
                            filteredValue.push(event);
                        }
                        if (month > 6 && month <= 9 && season == 'P') {
                            filteredValue.push(event);
                        }
                        if (month > 9 && month <= 12 && season == 'Z') {
                            filteredValue.push(event);
                        }
                    })
                });

                return filteredValue;
            } else {
                return this.reports;
            }
        },
    },
    methods: {
        async getMeetingReports() {
            try {
                this.loading = true;
                const response = await this.$axios.post(routes.reportMeeting, {
                    staff: localStorage.getItem('beEvaluatedUserId')
                })
                this.reports = response.data;
            } catch (error) {
                console.log(error?.response?.data);
            } finally {
                this.loading = false;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.meeting-report {
    margin: auto;
    max-width: 65rem;

    .reports-content {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem 0.2rem 25rem 1.2rem;
        max-height: 70vh;
        overflow: hidden !important;
        width: 100%;
        gap: 2rem;

        .report-card {
            width: 100%;
        }
    }

    .filter-container {
        position: absolute;
        border: 1px solid var(--color-blue-sky);
        width: 22.5rem;
        z-index: 2;
        top: 3.5rem;
        border-radius: var(--input-border-radius);
        background-color: var(--background-color-primary-lighter);
        backdrop-filter: blur(25px);
    }
}
</style>
