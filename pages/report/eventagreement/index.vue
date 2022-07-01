<template>
<div class="event-agreement-report">
    <div class="event-agreement-report-header">
        <v-col cols="10" class="reports-title">فهرست گزارشات</v-col>
        <v-col cols="2 d-flex justify-end">
            <SVGBack class="back-icon" @click="$router.push('/')" />
        </v-col>
    </div>
    <v-col cols="12" class="d-flex justify-center" v-if="!reports.length && !loading">هیچ گزارشی ثبت نشده است</v-col>
    <perfect-scrollbar class="reports-content">
        <v-col cols="12" class="d-flex flex-wrap justify-end px-5 py-0 position-relative" v-if="reports.length && !loading">
            <v-btn outlined color="blue" elevation="1" class="px-8" @click="filterIsVisible = !filterIsVisible">فیلتر</v-btn>
            <v-col cols="12" v-if="filterIsVisible" class="filter-container">
                <v-col cols="12" class="d-flex flex-wrap">
                    <v-col cols="12" class="pa-0">نوع گزارش</v-col>
                    <v-col cols="12" class="pa-0"></v-col>
                    <v-checkbox
                        @change="filterWithReportType"
                        class="pl-7"
                        v-model="reportTypeFilter"
                        label="وقایع"
                        value="E"
                    ></v-checkbox>
                    <v-checkbox
                        @change="filterWithReportType"
                        class="pl-7"
                        v-model="reportTypeFilter"
                        label="اتفاقات"
                        value="A"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" class="d-flex flex-wrap">
                    <v-col cols="12" class="pa-0">نوع واقعه</v-col>
                    <v-col cols="12" class="pa-0"></v-col>
                    <v-checkbox
                        @change="filterWithEventType"
                        class="pl-7"
                        v-model="eventTypeFilter"
                        label="فرصت بهبود"
                        value="O"
                    ></v-checkbox>
                    <v-checkbox
                        @change="filterWithEventType"
                        class="pl-7"
                        v-model="eventTypeFilter"
                        label="نقطه قوت"
                        value="S"
                    ></v-checkbox>
                </v-col>
                <!-- <v-col cols="12" class="d-flex flex-wrap">
                    <v-col cols="12" class="pa-0">فصل ارزیابی</v-col>
                    <v-col cols="12" class="pa-0"></v-col>
                    <v-checkbox
                        class="pl-7"
                        v-model="seasonFilter"
                        label="فصل بهار"
                        value="B"
                    ></v-checkbox>
                    <v-checkbox
                        class="pl-7"
                        v-model="seasonFilter"
                        label="فصل تابستان"
                        value="T"
                    ></v-checkbox>
                    <v-checkbox
                        class="pl-7"
                        v-model="seasonFilter"
                        label="فصل پاییز"
                        value="P"
                    ></v-checkbox>
                    <v-checkbox
                        class="pl-7"
                        v-model="seasonFilter"
                        label="فصل زمستان"
                        value="Z"
                    ></v-checkbox>
                </v-col> -->
            </v-col>
        </v-col>    
        <div class="loading" v-if="loading">
            <img :src="require('assets/images/loading.gif')" alt="loading">
        </div>
        <div class="report-target report-event-target mb-5" v-else-if="!loading && eventReportsComputed.length && eventsIsVisible">
            <span class="target-title">وقایع</span>
            <div v-if="eventReportsComputed">
                <div class="report-card" v-for="report in eventReportsComputed" :key="report.id">
                    <report-event-agreement-card type="E" :reportData="report" />
                </div>
            </div>
        </div>
        <div class="report-target report-agreement-target" v-if="!loading && agreementReportsComputed.length && agreementsIsVisible">
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
import SVGBack from "@/components/icons/back-icon.svg";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { routes } from "~/API/routes";
import ReportEventAgreementCard from '~/components/card/reportEventAgreementCard.vue';

export default {
    components: {
        SVGBack,
        PerfectScrollbar,
        ReportEventAgreementCard
    },
    data () {
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
            let eventReports = this.eventTypeFilterValue.filter((report) => report.type_report === 'E');
            return eventReports;
        },
        agreementReportsComputed() {
            let agreementReports = this.eventTypeFilterValue.filter((report) => report.type_report === 'A');
            return agreementReports;
        },
        filteredValueComputed() {
            return this.eventTypeFilterValue
        }
    },
    methods: {
        async getReportEventAgreements() {
            try {
                this.loading = true;
                const response = await this.$axios.post(routes.reportEventAgreements, {
                    staff: localStorage.getItem('beEvaluatedUserId')
                })
                this.reports = response.data;
                this.filterWithEventType();
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        filterWithReportType() {
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
        },
        filterWithEventType() {
            if (this.eventTypeFilter.length === 1) {
                this.eventTypeFilterValue = this.reports.filter(report => report.assessment_type === this.eventTypeFilter[0]); 
            } else if (this.eventTypeFilter.length === 2){
                this.eventTypeFilterValue = this.reports.filter(report => report.assessment_type === this.eventTypeFilter[0] || report.assessment_type === this.eventTypeFilter[1]);
            } else {
                this.eventTypeFilterValue = this.reports;
            }
        },
        // filterWithSeason() {
        //     if (this.seasonFilter.length > 0 && this.seasonFilter.length < 3) {
        //         return this.reports.filter(report => report.assessment_type === this.seasonFilter[0]); 
        //     } else {
        //         return this.reports
        //     }
        // },
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
        // justify-content: center;
        padding: 1rem 0.2rem 1rem 0.2rem;
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
            &> div {
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
    width: 20rem;
    z-index: 2;
    top: 3.5rem;
    border-radius: var(--input-border-radius);
    background-color: var(--background-color-primary-lighter);
    backdrop-filter: blur(25px);
  }
}
</style>
