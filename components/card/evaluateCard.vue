<template>
    <div class="evaluate-card">
        <div class="axes-title pb-5">{{ axes.name }}</div>
        <v-col cols="12">
            <ol>
                <li v-for="indicator in indicators" :key="indicator.id">
                    <indicator-with-items-card :indicator="indicator" />
                </li>
            </ol>
        </v-col>
    </div>
</template>

<script>
import indicatorWithItemsCard from "./indicatorWithItemsCard.vue";
import { routes } from "~/API/routes";

export default {
    data() {
        return {
        }
    },
    components: {
        indicatorWithItemsCard
    },
    props: {
        axes: {},
        indicators: [],
    },
    methods: {
        // async getAxesList () {
        //     try {
        //         const response = await this.$axios.get(routes.axesList);
        //         this.axesList = response.data.results;
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        // async getIndicators () {
        //     try {
        //         const response = await this.$axios.post(routes.selectedIndicators, {
        //             staff: localStorage.getItem('beEvaluatedUserId')
        //         });
        //         console.log(response);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    }
}
</script>

<style scoped lang="scss">
.evaluate-card {
    display: flex;
    flex-wrap: wrap;
    background-color: var(--background-color-primary);
    margin: 1rem auto;
    border-radius: var(--card-border-radius);
    padding: 0.5rem 1rem;
    .axes-title {
        font-size: 1.25rem;
    }
    ol {
        padding: 0;
        padding-right: 1.5rem;
    }
}
</style>
