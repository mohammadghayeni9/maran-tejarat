<template>
    <div class="evaluation-form">
        <HeaderPage title="امتیازدهی پایان فصل" :isEvaluatePage="true" :seasonVisible="true"></HeaderPage>
        <div class="loading d-flex justify-center text-center w-100" v-if="loading">
            <img :src="require('assets/images/loading.gif')" alt="loading">
        </div>
        <v-col cols="12" class="d-flex justify-center pt-5 mt-5" v-else-if="!indicators">شاخصی برای ثبت ارزیابی وجود
            ندارد</v-col>
        <perfect-scrollbar class="axes-list" v-else>
            <v-col cols="12" class="pr-0">
                <evaluateCard v-for="axes in axesList" :key="axes.id" :axes="axes" :indicators="indicators" :evaluate-reports="evaluateReportsComputed" />
            </v-col>
            <v-col cols="12" class="d-flex justify-end mt-5 mb-5 pb-5">
                <v-col class="mr-auto" v-if="evaluateReports.length">
                    <span>امتیاز کسب شده: </span>
                    <span class="score">{{ evaluateReportsScoreComputed }}</span>
                </v-col>
                <v-btn elevation="2" class="px-12 py-5 rounded-lg record-btn" @click="recordEvaluate">
                    <span v-if="!recordBtnLoading"><span v-if="!evaluateReports.length">ثبت</span><span v-else>ویرایش</span> امتیاز</span>
                    <img v-else :src="require('assets/images/loading.gif')" class="record-loading" alt="loading">
                </v-btn>
            </v-col>
        </perfect-scrollbar>
    </div>
</template>

<script>
import { routes } from "~/API/routes";
import evaluateCard from '~/components/card/evaluateCard.vue';
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import HeaderPage from "~/components/header/headerPage.vue";

export default {
    components: {
    evaluateCard,
    PerfectScrollbar,
    HeaderPage
},
    data() {
        return {
            axesList: [],
            indicators: [],
            evaluateItems: [],
            evaluateReports: [],
            loading: false,
            recordBtnLoading: false,
        }
    },
    async created() {
        this.loading = true;
        this.getAxesList();
        this.getIndicators();
        await this.getEvaluateReports();
        this.loading = false;
    },
    methods: {
        async getAxesList () {
            try {
                const response = await this.$axios.get(routes.axesList);
                this.axesList = response.data.results;
            } catch (error) {
                console.log(error?.response?.data);
            }
        },
        async getIndicators () {
            try {
                const response = await this.$axios.post(routes.selectedIndicators, {
                    staff: localStorage.getItem('beEvaluatedUserId')
                });
                this.indicators = response.data;
            } catch (error) {
                console.log(error?.response?.data);
            }
        },
        async getEvaluateReports() {
            try {
                const response = await this.$axios.post(routes.reportEvaluate, {
                    staff: localStorage.getItem('beEvaluatedUserId'),
                    season: localStorage.getItem('season_eval'),
                    year: localStorage.getItem('year')
                })
                this.evaluateReports = response.data;
            } catch (error) {
                console.log(error?.response?.data);
            }
        },
        async recordEvaluate () {
            if (this.recordBtnLoading) return;
            try {
                this.recordBtnLoading = true;
                await this.$axios.post(routes.evalUser, {
                    staff: localStorage.getItem('beEvaluatedUserId'),
                    list_of_eval: this.$store.state.states.indicatorsAndItemsToBeSelected
                });
                this.$toast.success('ارزیابی با موفقیت ثبت شد');
                this.getEvaluateReports();
            } catch (error) {
                this.$toast.error('ثبت ارزیابی با خطا مواجه شد');
            } finally {
                this.recordBtnLoading = false
            }
        },
    },
    computed: {
        evaluateReportsComputed() {
            return this.evaluateReports?.[0]?.report;
        },
        evaluateReportsScoreComputed() {
            return this.evaluateReports?.[0]?.score;
        }
    },
}
</script>

<style scoped lang="scss">
.evaluation-form {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;
    .loading {
        width: 100%;
    }
    .axes-list {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        padding: 1rem 0.2rem;
        max-height: 80vh;
        overflow-y: auto;
    }
    .record-btn {
        background-color: var(--color-blue-sky) !important;
        color: var(--color-white) !important;
    }
    .record-loading {
        width: 66px;
    }
    .score {
        font-family: IranSansFaNum;
    }
}
</style>
