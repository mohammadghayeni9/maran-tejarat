<template>
    <v-col cols="12" class="indicator-items-card pr-0 py-0">
        <v-col cols="12" md="5" class="indicator-title">{{ indicator.name }}</v-col>
        <v-col cols="10" md="5" class="d-flex pr-0 ">
            <v-select :items="indicator.item_of_indicators" item-text="[1]" item-value="[0]" label="انتخاب آیتم ارزیابی" outlined v-model="itemToBeSelected" @change="setItemForIndicator(indicator.id, itemToBeSelected)"></v-select>
        </v-col>
        <v-col cols="2" md="auto" class="score"><span>امتیاز: {{ toPersianDigits() }}</span>  </v-col>
    </v-col>
</template>

<script>

export default {
    props: {
        indicator: {},
    },
    data() {
        return {
            itemToBeSelected: null,
        }
    },
    methods: {
        setItemForIndicator(indicatorId, itemId) {
            this.$store.commit('mutation/setItemForIndicator', { obj: '[' + indicatorId + ',' + itemId + ']', indicatorId: indicatorId})
        },
        toPersianDigits() {
            let persianNum = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
            return this.itemToBeSelectedScore?.toString()?.replace(/[0-9]/g, function(w){
                return persianNum[+w];
            });
        }
    },
    computed: {
        itemToBeSelectedScore() {
            if (this.itemToBeSelected) {
                return this.indicator.item_of_indicators.find(item => this.itemToBeSelected === item[0])[2];
            }
        }
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
        display: flex;
        flex-wrap: nowrap;
    }
}
</style>