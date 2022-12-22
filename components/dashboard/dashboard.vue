<template>
    <perfect-scrollbar class="dashboard-container">
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
                    <div class="dashboard__section2__agreement-count-title mb-3">میانگین تعداد توافقات ثبت‌شده </div>
                    <div class="dashboard__section2__agreement-count-count">{{ dashboardData.ave_argument }}</div>
                </div>
                <div class="dashboard__section2__agreement-count">
                    <div class="dashboard__section2__agreement-count-title mb-3">تعداد توافقات باز</div>
                    <div class="dashboard__section2__agreement-count-count">{{ dashboardData.num_open_argument }}</div>
                </div>
                <!-- <div class="dashboard__section2__agreement-count">
                    <div class="dashboard__section2__agreement-count-title">بهترین توافق باز</div>
                    <div class="dashboard__section2__agreement-count-count">155</div>
                </div> -->
            </div>
            <div class="dashboard__section3">
                <div class="dashboard__section3__pieChart-wrapper col-12 col-lg-6">
                    <div class="col-12 text-center dashboard__section3__pieChart-wrapper__title">میانگین امتیازدهی در سال جاری</div>
                    <SinglePieChart class="col-12 col-sm-6 mt-1" title="بهار" color="#00753E" :percent="bahar.average" />
                    <SinglePieChart class="col-12 col-sm-6 mt-0" title="تابستان" color="#B46490" :percent="tabestan.average" />
                    <SinglePieChart class="col-12 col-sm-6 mt-0" title="پاییز" color="#D19A30" :percent="paeez.average" />
                    <SinglePieChart class="col-12 col-sm-6 mt-0" title="زمستان" color="#36454F" :percent="zemestan.average" />
                    <NameScoreCard class="col-12 col-sm-6" v-if="maxAverageEvalData" title="بالاترین امتیاز" :name="maxAverageEvalData.be_eval[0]" :score="maxAverageEvalData.score" />
                    <NameScoreCard class="col-12 col-sm-6" v-if="minAverageEvalData" title="پایین‌ترین امتیاز" :name="minAverageEvalData.be_eval[0]" :score="minAverageEvalData.score" />
                </div>
                <div class="dashboard__section3__radarChart-wrapper col-12 col-lg-6">
                    <div class="col-12 text-center dashboard__section3__radarChart-wrapper__title">میانگین امتیازدهی از ابتدا</div>
                    <AreaChart v-if="(averageGeneralEvalData && averageGeneralEvalData.length > 1)" :data="averageGeneralEvalData" />
                    <NameScoreCard class="col-12 col-sm-6 mt-5" v-if="maxAverageGeneralEvalData" title="بالاترین امتیاز" :name="maxAverageGeneralEvalData.name" :score="maxAverageGeneralEvalData.score" />
                    <NameScoreCard class="col-12 col-sm-6 mt-5" v-if="minAverageGeneralEvalData" title="پایین‌ترین امتیاز" :name="minAverageGeneralEvalData.name" :score="minAverageGeneralEvalData.score" />
                </div>
            </div>
        </div>
    </perfect-scrollbar>
</template>
<script>
import ColumnChart from '@/components/charts/columnChart.vue';
import {routes} from '@/API/routes'
import SinglePieChart from '../charts/singlePieChart.vue'
import AreaChart from '../charts/areaChart.vue'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import NameScoreCard from '../card/nameScoreCard.vue';

export default {
    components: { ColumnChart, SinglePieChart, AreaChart, PerfectScrollbar, NameScoreCard },
    data() {
        return {
            agreementChartData: null,
            eventChartData: null,
            dashboardData: {},
            bahar: {},
            tabestan: {},
            paeez: {},
            zemestan: {},
            averageGeneralEvalData: [],
            minAverageGeneralEvalData: null,
            maxAverageGeneralEvalData: null,
            minAverageEvalData: null,
            maxAverageEvalData: null,
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
                //TODO: remove this line in 1402
                this.averageGeneralEvalData.push({
                    year: "1400",
                    average: 25
                });
                this.averageGeneralEvalData.push(...response.data.data.average_eval);
                this.maxAverageGeneralEvalData = response.data.data.max;
                this.minAverageGeneralEvalData = response.data.data.min;
                console.log(this.minAverageGeneralEvalData, this.maxAverageGeneralEvalData);
            } catch (error) {
                console.log(error);
            }
        },
        async getAverageEvalCurrentYear() {
            try {
                const response = await this.$axios.post(routes.dashboard.averageEvalCurrentYear);
                console.log(response.data.data);
                this.bahar = response.data.data.bahar;
                this.tabestan = response.data.data.tabestan;
                this.paeez = response.data.data.paeez;
                this.zemestan = response.data.data.zemestan;
                this.maxAverageEvalData = response.data.data.max_score;
                this.minAverageEvalData = response.data.data.min_score;
                console.log(this.minAverageEvalData, this.maxAverageEvalData);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
    max-height: 75vh;
    overflow: hidden !important;
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
            align-items: start;
            padding: 15px;
            margin-top: 25px;
            row-gap: 50px;

            &__pieChart-wrapper {
                display: flex;
                flex-wrap: wrap;

                &__title {
                    font-size: 1.25rem;
                    margin-bottom: 40px;
                }
            }

            &__radarChart-wrapper {
                display: flex;
                flex-wrap: wrap;

                &__title {
                    font-size: 1.25rem;
                    margin-bottom: 100px;
                }
            }
        }
    }
}
</style>