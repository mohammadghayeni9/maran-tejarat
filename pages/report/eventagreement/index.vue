<template>
    <div class="event-agreement-report" @click="filterIsVisible = false">
        <HeaderPage title="گزارش وقایع/توافق" :seasonVisible="false"></HeaderPage>
        <v-col cols="12" class="d-flex justify-center" v-if="!reports.length && !loading">هیچ گزارشی ثبت نشده است
        </v-col>
        <perfect-scrollbar class="reports-content">
            <v-col cols="12" class="d-flex flex-wrap justify-end px-5 py-0 position-relative"
                v-if="reports.length && !loading">
                <v-btn outlined color="blue" elevation="1" class="px-8"
                    @click.stop="filterIsVisible = !filterIsVisible">
                    فیلتر</v-btn>
                <v-col cols="12" v-if="filterIsVisible" class="filter-container" @click.stop>
                    <v-col cols="12" class="d-flex flex-wrap">
                        <v-col cols="12" class="px-0 pt-0">نوع گزارش</v-col>
                        <v-col cols="12" class="pa-0"></v-col>
                        <v-row>
                            <v-checkbox class="pl-7" v-model="reportTypeFilter" label="وقایع" value="E"></v-checkbox>
                            <v-checkbox class="pl-7" v-model="reportTypeFilter" label="توافق" value="A"></v-checkbox>
                        </v-row>
                    </v-col>
                    <v-col cols="12" class="d-flex flex-wrap">
                        <v-col cols="12" class="px-0 pt-0">نوع واقعه</v-col>
                        <v-col cols="12" class="pa-0"></v-col>
                        <v-row>
                            <v-checkbox class="pl-7" v-model="eventTypeFilter" label="فرصت بهبود" value="O">
                            </v-checkbox>
                            <v-checkbox class="pl-7" v-model="eventTypeFilter" label="نقطه قوت" value="S"></v-checkbox>
                        </v-row>
                    </v-col>
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
            <div class="loading" v-if="loading">
                <img :src="require('assets/images/loading.gif')" alt="loading">
            </div>
            <div class="report-target report-event-target mb-5"
                v-else-if="!loading && eventReportsComputed.length && eventsIsVisible">
                <span class="target-title">وقایع</span>
                <div v-if="eventReportsComputed">
                    <div class="report-card" v-for="report in eventReportsComputed" :key="report.id">
                        <report-event-agreement-card type="E" :reportData="report" />
                    </div>
                </div>
            </div>
            <div class="report-target report-agreement-target"
                v-if="!loading && agreementReportsComputed.length && agreementsIsVisible">
                <span class="target-title">توافقات</span>
                <div v-if="agreementReportsComputed">
                    <div class="report-card" v-for="report in agreementReportsComputed" :key="report.id">
                        <report-event-agreement-card type="A" :reportData="report" />
                    </div>
                </div>
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
            reportTypeFilter: [],
            reportTypeFilterValue: [],
            seasonFilter: [],
            eventTypeFilter: [],
            eventTypeFilterValue: [],
            filterIsVisible: false,
            filteredValue: [],
            eventsIsVisible: true,
            agreementsIsVisible: true,
        }
    },
    created() {
        this.getReportEventAgreements();
    },
    computed: {
        eventReportsComputed() {
            let eventReports = this.filteredValueComputed.filter((report) => report.type_report === 'E');
            return eventReports;
        },
        agreementReportsComputed() {
            let agreementReports = this.filteredValueComputed.filter((report) => report.type_report === 'A');
            return agreementReports;
        },
        filteredValueComputed() {
            let filteredValue = [];
            let filteredEventTypeValue = [];
            if (this.reportTypeFilter.length) {
                if (this.reportTypeFilter.length === 1) {
                    if (this.reportTypeFilter == 'A') {
                        this.eventsIsVisible = false;
                        this.agreementsIsVisible = true;
                    } else {
                        this.agreementsIsVisible = false;
                        this.eventsIsVisible = true;
                    }
                } else {
                    this.eventsIsVisible = true;
                    this.agreementsIsVisible = true;
                }
            } else {
                this.eventsIsVisible = true;
                this.agreementsIsVisible = true;
            }
            this.reports.filter((event) => {
                this.seasonFilter.forEach((season) => {
                    if (event.season_date_report == season) {
                        filteredValue.push(event);
                    }
                })
            })

            if (this.seasonFilter.length) {
                filteredValue.filter((event) => {
                    this.eventTypeFilter.forEach((type) => {
                        if (event.assessment_type == type) {
                            filteredEventTypeValue.push(event);
                        }
                    })
                })
            } else {
                this.reports.filter((event) => {
                    this.eventTypeFilter.forEach((type) => {
                        if (event.assessment_type == type) {
                            filteredValue.push(event);
                        }
                    })
                })
            }

            if (this.seasonFilter.length) {
                if (this.eventTypeFilter.length) {
                    return filteredEventTypeValue;
                } else {
                    return filteredValue;
                }
            } else if (this.eventTypeFilter.length) {
                return filteredValue;
            } else {
                return this.reports;
            }
        },
    },
    methods: {
        async getReportEventAgreements() {
            try {
                this.loading = true;
                const response = await this.$axios.post(routes.reportEventAgreements, {
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
.event-agreement-report {
    margin: auto;
    max-width: 65rem;

    .event-agreement-report-header {
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

    .reports-content {
        display: flex;
        flex-wrap: wrap;
        // justify-content: center;
        padding: 1rem 0.2rem 30rem 0.2rem;
        max-height: 78vh;
        min-height: 20rem;
        overflow: hidden !important;
        width: 100%;
        gap: 2.5rem;

        .report-target {
            // display: flex;
            // flex-wrap: wrap;
            // flex-direction: column;
            width: 100%;
            box-shadow: 0px 1px 10px var(--card-box-shadow);
            padding: 2.5rem 1rem 1.25rem 1rem;
            gap: 1rem;
            border-radius: var(--input-border-radius);
            margin-left: 1rem;
            position: relative;

            &>div {
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
                padding: 0.5rem;
                gap: 1rem;
            }

            .target-title {
                position: absolute;
                background-color: var(--background-color-secondary);
                top: -14px;
                right: 1rem;
                padding: 0 10px;
                font-size: 1.15rem;
            }

            .report-card {
                width: 100%;
            }
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
