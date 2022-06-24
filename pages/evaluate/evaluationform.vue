<template>
    <div class="evaluation-form">
        <v-col cols="10 mb-5" class="evaluation-form-title">ثبت ارزیابی</v-col>
        <v-col cols="2 justify-end d-flex">
            <SVGBack class="back-icon" @click="$router.push('/')" />
        </v-col>
    </div>
</template>

<script>
import SVGBack from "@/components/icons/back-icon.svg"
import { routes } from "~/API/routes";

export default {
    components: {
        SVGBack,
    },
    data() {
        return {
            axesList: [],
            indicatorList: [],
            evaluateItems: []
        }
    },
    created() {
        this.getAxesList();
        this.getSelectedIndicators();
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
        async getSelectedIndicators () {
            try {
                const response = await this.$axios.post(routes.selectedIndicators, {
                    staff: localStorage.getItem('beEvaluatedUserId')
                });
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
