<template>
    <v-col cols="12" class="indicator-items-card pr-0 py-0">
        <v-col cols="12" md="3">{{ indicator.indicators_name }}</v-col>
        <v-col cols="10" md="6">
            <v-select :items="indicator.item_of_indicators" item-text="[1]" item-value="[2]" label="انتخاب آیتم ارزیابی" outlined v-model="itemToBeSelected"></v-select>
        </v-col>
        <v-col cols="2" class="score"><span>امتیاز: </span> <span>54</span></v-col>
    </v-col>
</template>

<script>

export default {
    props: {
        indicator: {},
        itemToBeSelected: null,
    },
}
</script>

<style lang="scss" scoped>
.indicator-items-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    .score {
        display: flex;
    }
}
</style>