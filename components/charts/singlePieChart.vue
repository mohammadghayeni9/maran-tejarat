<template>
    <v-row class="justify-center">
        <v-col cols="12" class="text-center pb-6" style="font-family: iranSans; font-size: 1.25rem" v-if="title">
            {{ title }}
        </v-col>
        <vue-easy-pie-chart :percent="percent" animate="true" line-cap="round" :line-width="18"
            track-color="transparent" scale-color="transparent" :bar-color="color" :size="170" font-size="1.5rem">
        </vue-easy-pie-chart>
    </v-row>
</template>

<script>
import VueEasyPieChart from 'vue-easy-pie-chart'
import 'vue-easy-pie-chart/dist/vue-easy-pie-chart.css'
export default {
    props: {
        color: {
            type: String,
            required: true,
            default: '#55555588'
        },
        percent: {
            type: Number,
            required: true,
            default: 0
        },
        value: '',
        title: ''
    },
    components: { VueEasyPieChart },
}
</script>

<style lang="scss">
.vue-easy-pie-chart {
    font-family: iranSansFaNum;

    canvas {
        filter: drop-shadow(2px 3px 10px rgba(0, 0, 0, 0.3));
    }
}
</style>
