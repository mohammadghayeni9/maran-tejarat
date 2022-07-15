<template>
    <div class="meeting-report">
        <HeaderPage title="گزارش جلسات" :seasonVisible="false"></HeaderPage>
        <v-col cols="12" class="d-flex justify-center" v-if="!reports.length && !loading">جلسه‌ی به ثبت رسیده‌ای برای
            نمایش وجود ندارد</v-col>
        <perfect-scrollbar class="reports-content">
            <div class="loading" v-if="loading">
                <img :src="require('assets/images/loading.gif')" alt="loading">
            </div>
            <div class="report-card" v-for="report in reports" :key="report.id" v-else>
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
import HeaderPage from "~/components/header/headerPage.vue";

export default {
    components: {
    SVGBack,
    PerfectScrollbar,
    ReportEventAgreementCard,
    HeaderPage
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
                const response = await this.$axios.post(routes.reportMeeting, {
                    staff: localStorage.getItem('beEvaluatedUserId')
                })
                this.reports = response.data;
            } catch (error) {
                console.log(error.response.data);
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
        padding: 1rem 0.2rem 1rem 0.2rem;
        max-height: 70vh;
        overflow: hidden !important;   
        width: 100%;
        gap: 2rem;
        .report-card {
            width: 100%;
        }
    }
}
</style>
