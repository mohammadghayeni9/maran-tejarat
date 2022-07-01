<template>
    <div class="evaluation-form">
        <v-col cols="10 mb-5" class="evaluation-form-title">ثبت ارزیابی</v-col>
        <v-col cols="2 justify-end d-flex">
            <SVGBack class="back-icon" @click="$router.push('/')" />
        </v-col>
        <div class="loading d-flex justify-center" v-if="loading">
            <img :src="require('assets/images/loading.gif')" alt="loading">
        </div>
        <v-col cols="12" class="d-flex justify-center pt-5 mt-5" v-else-if="!indicators">شاخصی برای ثبت ارزیابی وجود ندارد</v-col>
        <perfect-scrollbar class="axes-list" v-else>
            <v-col cols="12" class="pr-0">
                <evaluateCard v-for="axes in axesList" :key="axes.id" :axes="axes" :indicators="indicators" />
            </v-col>
            <v-col cols="12" class="d-flex justify-end mt-5 mb-5">
                <v-btn elevation="2" class="px-12 py-5 rounded-lg record-btn" @click="recordEvaluate">ثبت ارزیابی</v-btn>
            </v-col>
        </perfect-scrollbar>
    </div>
</template>

<script>
import SVGBack from "@/components/icons/back-icon.svg"
import { routes } from "~/API/routes";
import evaluateCard from '~/components/card/evaluateCard.vue';
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
    components: {
        SVGBack,
        evaluateCard,
        PerfectScrollbar,
    },
    data() {
        return {
            axesList: [],
            indicators: [],
            evaluateItems: [],
            loading: false,
        }
    },
    created() {
        this.loading = true;
        this.getAxesList();
        this.getIndicators();
    },
    methods: {
        async getAxesList () {
            try {
                const response = await this.$axios.get(routes.axesList);
                this.axesList = response.data.results;
            } catch (error) {
                console.log(error);
            }
        },
        async getIndicators () {
            try {
                const response = await this.$axios.post(routes.selectedIndicators, {
                    staff: localStorage.getItem('beEvaluatedUserId')
                });
                this.indicators = response.data;
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        async recordEvaluate () {
            try {
                const response = await this.$axios.post(routes.evalUser, {
                    staff: localStorage.getItem('beEvaluatedUserId'),
                    list_of_eval: this.$store.state.states.indicatorsAndItemsToBeSelected
                });
                this.$toast.success('ارزیابی با موفقیت ثبت شد');
            } catch (error) {
                this.$toast.error('ثبت ارزیابی با خطا مواجه شد');
            }
        }
    }
}
</script>

<style scoped lang="scss">
.evaluation-form {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;
    .evaluation-form-title {
        font-size: 1.25rem;
    }
    .back-icon {
        object-fit: cover;
        max-height: 2rem;
        width: fit-content;
        margin-right: auto;
        cursor: pointer;
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
        background-color: var(--color-blue-sky);
        color: var(--color-white);
    }
}
</style>
