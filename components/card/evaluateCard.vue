<template>
    <div class="evaluate-card">
        <div class="axes-title pb-5">{{ axes.name }}</div>
        <v-col cols="12">
            <div v-for="indicator in indicators" :key="indicator.id" >
                <indicator-with-items-card :indicator="indicator" :evaluate-reports="evaluateReports" v-if="indicator.axes === axes.id" />
            </div>
        </v-col>
    </div>
</template>

<script>
import indicatorWithItemsCard from "./indicatorWithItemsCard.vue";

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
        evaluateReports: [],
    },
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
