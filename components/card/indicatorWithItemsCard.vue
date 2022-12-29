<template>
    <v-col cols="12" class="indicator-items-card pr-0 py-0">
        <v-col cols="12" md="5" class="indicator-title">{{ indicator.name }}</v-col>
        <v-col cols="10" md="5" class="d-flex pr-0 ">
            <v-select :items="indicator.item_of_indicators" item-text="[1]" item-value="[0]" label="انتخاب گویه ارزیابی"
                outlined v-model="itemToBeSelected" @change="setItemForIndicator(indicator.id, itemToBeSelected)">
            </v-select>
        </v-col>
        <v-col cols="2" md="auto" class="score"><span>امتیاز: {{ itemToBeSelectedScore }}</span> </v-col>
    </v-col>
</template>

<script>

export default {
    props: {
        indicator: {},
        evaluateReports: [],
    },
    data() {
        return {
            itemToBeSelected: null,
        }
    },
    mounted() {
        if (!this.evaluateReports) return
        for (const report of this.evaluateReports) {
            if (report[0] === this.indicator.name) {
                this.itemToBeSelected = this.indicator.item_of_indicators.find(item => item[1] === report[1])[0];
                this.setItemForIndicator(this.indicator.id, this.itemToBeSelected)
            }
        }
    },
    methods: {
        setItemForIndicator(indicatorId, itemId) {
            this.$store.commit('mutation/setItemForIndicator', { obj: '[' + indicatorId + ',' + itemId + ']', indicatorId: indicatorId})
        },
    },
    computed: {
        itemToBeSelectedScore() {
            let foundItem = this.indicator.item_of_indicators.find(item => item[0] == this.itemToBeSelected)
            return foundItem?.[2];
        },
    }
}
</script>

<style lang="scss">
    .v-select__slot {
        label.v-label {
            font-size: 0.8rem;
        }
        div.v-select__selection {
            font-size: 0.9rem;
        }
    }
</style>

<style lang="scss" scoped>
.indicator-items-card {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.9rem !important;
    .score {
        font-family: IranSansFaNum;
        display: flex;
        flex-wrap: nowrap;
        span {
            white-space: nowrap;
        }
    }
}
</style>