<template>
<div class="meeting-report">
    <div class="meeting-report-header">
        <v-col cols="10" class="reports-title">فهرست گزارش جلسات</v-col>
        <v-col cols="2 d-flex justify-end">
            <SVGBack class="back-icon" @click="$router.push('/')" />
        </v-col>
    </div>
    <v-col cols="12" class="d-flex justify-center" v-if="!reports.length && !loading">جلسه‌ی به ثبت رسیده‌ای برای نمایش وجود ندارد</v-col>
    <perfect-scrollbar class="reports-content">
        <div class="loading" v-if="loading">
            <img :src="require('assets/images/loading.gif')" alt="loading">
        </div>
        <div class="report-card" v-for="report in reports" :key="report.id">
            <report-event-agreement-card type="M" :reportData="report" />
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
        }
    },
    created() {
        this.getMeetingReports();
    },
    methods: {
        async getMeetingReports() {
            try {
                this.loading = true;
                const response = await this.$axios.get(routes.reportMeeting)
                this.reports = response.data.results;
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
.meeting-report {
    margin: auto;
    max-width: 65rem;
  .meeting-report-header {
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
        gap: 5rem;
        .report-card {
            width: 100%;
        }
  }
}
</style>
