<template>
    <div class="dashboard">
        <div class="dashboard__title">داشبورد اطلاعاتی فصل <span>{{ seasonComputed }}</span></div>
        <div class="dashboard__section1">
            <div class="dashboard__section1__wrapper-count">
                <div class="dashboard__section1__wrapper-count-title">تعداد ارزیابی‌شوندگان</div>
                <div class="dashboard__section1__wrapper-count-count">{{ dashboardData.num_be_eval }}</div>
            </div>
            <div class="dashboard__section1__wrapper-agreement">
                <div class="dashboard__section1__wrapper-agreement-title">تعداد توافق‌های ثبت‌شده</div>
                <div class="dashboard__section1__wrapper-agreement-chart">
                    <column-chart v-if="agreementChartData" :data="agreementChartData" />
                </div>
            </div>
            <div class="dashboard__section1__wrapper-event">
                <div class="dashboard__section1__wrapper-event-title">تعداد وقایع ثبت‌شده</div>
                <div class="dashboard__section1__wrapper-agreement-chart">
                    <column-chart v-if="eventChartData" :data="eventChartData" />
                </div>
            </div>
        </div>
        <div class="dashboard__section2">
            <div class="dashboard__section2__agreement-count">
                <div class="dashboard__section2__agreement-count-title">میانگین تعداد توافقات ثبت‌شده </div>
                <div class="dashboard__section2__agreement-count-count">{{ dashboardData.ave_argument }}</div>
            </div>
            <div class="dashboard__section2__agreement-count">
                <div class="dashboard__section2__agreement-count-title">تعدا دتوافقات باز</div>
                <div class="dashboard__section2__agreement-count-count">{{ dashboardData.num_open_argument }}</div>
            </div>
            <!-- <div class="dashboard__section2__agreement-count">
                <div class="dashboard__section2__agreement-count-title">بهترین توافق باز</div>
                <div class="dashboard__section2__agreement-count-count">155</div>
            </div> -->
        </div>
        <!-- <div class="dashboard__section3"></div> -->
    </div>
</template>
<script>
import ColumnChart from '@/components/charts/columnChart.vue';
import {routes} from '@/API/routes'

export default {
    components: { ColumnChart },
    data() {
        return {
            agreementChartData: null,
            eventChartData: null,
            dashboardData: {},
        }
    },
    mounted() {
        this.getEventAgreemntChartData();
        this.getDashboardData();
        this.getAverageEvalFromBegin();
        this.getAverageEvalCurrentYear();
    },
    computed: {
        seasonComputed() {
            if (localStorage.getItem('season') == 'B') return 'بهار'
            else if (localStorage.getItem('season') == 'T') return 'تابستان'
            else if (localStorage.getItem('season') == 'P') return 'پاییز'
            else if (localStorage.getItem('season') == 'Z') return 'زمستان'
        }
    },
    methods: {
        async getEventAgreemntChartData() {
            try {
                const response = await this.$axios.post(routes.dashboard.eventArgumentChart);
                this.agreementChartData = response.data.num_argument.reverse();
                this.eventChartData = response.data.num_event.reverse();
            } catch (error) {
                console.log(error);
            }
        },
        async getDashboardData() {
            try {
                const response = await this.$axios.post(routes.dashboard.dashboardData);
                this.dashboardData = response.data.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getAverageEvalFromBegin() {
            try {
                const response = await this.$axios.post(routes.dashboard.averageEvalFromBegin);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
        async getAverageEvalCurrentYear() {
            try {
                const response = await this.$axios.post(routes.dashboard.averageEvalCurrentYear);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.dashboard {
        display: flex;
        flex-direction: column;
        padding: 10px 0px;
        margin-bottom: 20px;

        &__title {
            border-radius: var(--card-border-radius);
            background-color: var(--background-color-primary);
            font-size: 1.25rem;
            margin-top: 12px;
            padding: 10px 20px;

            span {
                border-radius: 5px;
                padding: 0 8px;
                color: var(--color-blue-sky);
                border-bottom: 5px solid var(--color-blue-sky);
            }
        }

        &__section1 {
            border-radius: var(--card-border-radius);
            background-color: var(--background-color-primary);
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            padding: 15px;
            margin-top: 25px;
            row-gap: 30px;

            &__wrapper-count {
                flex-basis: 20%;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                min-width: 165px;
                gap: 20px;

                &-title {
                    font-size: 1.1rem;
                }

                &-count {
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    font-size: 3.25rem;
                    font-family: iranSansFaNum;
                }
            }

            &__wrapper-agreement {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                flex-basis: 40%;
                min-width: 255px;
            }

            &__wrapper-event {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                flex-basis: 40%;
                min-width: 255px;
            }
        }

        &__section2 {
            border-radius: var(--card-border-radius);
            background-color: var(--background-color-primary);
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            padding: 15px;
            margin-top: 25px;
            row-gap: 30px;

            &__agreement-count {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex-basis: 33%;
                min-width: 260px;

                &-title {
                    font-size: 1.1rem;
                }
                
                &-count {
                    font-size: 2rem;
                    font-family: iranSansFaNum;
                }
            }
        }

        &__section3 {
            border-radius: var(--card-border-radius);
            background-color: var(--background-color-primary);
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            padding: 15px;
            margin-top: 25px;
        }
    }
</style>