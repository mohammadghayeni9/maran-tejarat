<template>
<div class="event-agreement-report">
    <div class="event-agreement-report-header">
        <v-col cols="10" class="reports-title">فهرست گزارشات</v-col>
        <v-col cols="2 d-flex justify-end">
            <SVGBack class="back-icon" @click="$router.push('/')" />
        </v-col>
    </div>
    <perfect-scrollbar class="reports-content">
      <div class="loading" v-if="loading">
        <img :src="require('assets/images/loading.gif')" alt="loading">
      </div>
      <div class="report-target report-event-target" v-if="!loading">
            <span class="target-title">وقایع</span>
            <div class="report-card" v-for="report in eventReportsComputed" :key="report.id">
                <report-event-agreement-card :reportData="report" />
            </div>
      </div>
      <div class="report-target report-agreement-target" v-if="!loading">
            <span class="target-title">توافقات</span>
            <div class="report-card" v-for="report in agreementReportsComputed" :key="report.id">
                <report-event-agreement-card :reportData="report" />
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
            reports: null,
        }
    },
    created() {
        this.getReportEventAgreements();
    },
    computed: {
        eventReportsComputed() {
            let eventReports = this.reports.filter((report) => report.type_report === 'E');
            return eventReports;
        },
        agreementReportsComputed() {
            let agreementReports = this.reports.filter((report) => report.type_report === 'A');
            return agreementReports;
        },
    },
    methods: {
        async getReportEventAgreements() {
            try {
                this.loading = true;
                const response = await this.$axios.post(routes.reportEventAgreements, {
                    assessor: 1
                })
                this.reports = response.data;
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        }
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
        justify-content: center;
        padding: 1rem 0.2rem 1rem 1rem;
        max-height: 70vh;
        overflow: hidden !important;   
        width: 100%;
        gap: 5rem;
        .report-target {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            width: 100%;
            box-shadow: 0px 1px 10px var(--card-box-shadow);
            padding: 2.5rem 1rem 1.25rem 1rem;
            border-radius: var(--input-border-radius);
            position: relative;
            gap: 1rem;
            .target-title {
                position: absolute;
                background-color: var(--background-color-secondary);
                top: -14px;
                right: 1rem;
                padding: 0 10px;
                font-size: 1.15rem;
            }
        }
        .report-card {
            width: 100%;
        }
  }
}
</style>
