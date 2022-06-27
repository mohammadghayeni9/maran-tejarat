<template>
    <div class="evaluation-form">
        <v-col cols="10 mb-5" class="evaluation-form-title">ثبت ارزیابی</v-col>
        <v-col cols="2 justify-end d-flex">
            <SVGBack class="back-icon" @click="$router.push('/')" />
        </v-col>
        <v-col cols="12">
            <evaluateCard v-for="axes in axesList" :key="axes.id" :axes="axes" :indicators="indicators" />
        </v-col>
        <v-col cols="12" class="d-flex justify-end mt-5 mb-2">
            <v-btn elevation="2" class="px-12 py-5 rounded-lg record-btn">ثبت ارزیابی</v-btn>
        </v-col>
    </div>
</template>

<script>
import SVGBack from "@/components/icons/back-icon.svg"
import { routes } from "~/API/routes";
import evaluateCard from '~/components/card/evaluateCard.vue';

export default {
    components: {
        SVGBack,
        evaluateCard,
    },
    data() {
        return {
            axesList: [],
            indicators: [],
            evaluateItems: []
        }
    },
    created() {
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
                console.log(response);
            } catch (error) {
                console.log(error);
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
    .record-btn {
        background-color: var(--color-blue-sky);
        color: var(--color-white);
    }
}
</style>
