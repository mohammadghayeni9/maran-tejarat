<template>
    <v-col cols="12" class="indicator-items-card pr-0 py-0">
        <v-col cols="12" md="5" class="indicator-title">
            {{ indicator.name }}
            <v-btn class="indicator-agreement-btn py-0" @click="openDialogAndGetEvents(indicator.id)">
                وقایع مرتبط
                <v-dialog v-model="dialog" activator="parent" width="auto">
                    <div class="evaluate-dialog">
                        <div class="loading" v-if="loading">
                            <img :src="require('assets/images/loading.gif')" alt="loading">
                        </div>
                        <div v-else-if="events" class="report-card pa-2 text-right" v-for="event in events" :key="event.id">
                            <report-event-agreement-card type="E" :reportData="event" />
                        </div>
                        <div v-else class="text-center mt-5">
                            واقعه‌ای مرتبط با شاخص موردنظر یافت نشد
                        </div>
                    </div>
                    <v-card-actions class="d-flex justify-center">
                        <v-btn color="primary" @click="dialog = false">بستن</v-btn>
                    </v-card-actions>
                </v-dialog>
            </v-btn>
        </v-col>
        <v-col cols="10" md="5" class="d-flex pr-0 ">
            <v-select :items="indicator.item_of_indicators" item-text="[1]" item-value="[0]" label="انتخاب گویه ارزیابی"
                outlined v-model="itemToBeSelected" @change="setItemForIndicator(indicator.id, itemToBeSelected)">
            </v-select>
        </v-col>
        <v-col cols="2" md="auto" class="score"><span>امتیاز: {{ itemToBeSelectedScore }}</span> </v-col>
    </v-col>
</template>

<script>
import { routes } from '~/API/routes';
import reportEventAgreementCard from './reportEventAgreementCard.vue';
export default {
    props: {
        indicator: {},
        evaluateReports: [],
    },
    components: {
        reportEventAgreementCard
    },
    data() {
        return {
            dialog: false,
            itemToBeSelected: null,
            events: null,
            loading: false,
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
            this.$store.commit('mutation/setItemForIndicator', { obj: '[' + indicatorId + ',' + itemId + ']', indicatorId: indicatorId })
        },
        async openDialogAndGetEvents(indicatorId) {
            this.dialog = true;
            this.loading = true;
            try {
                const response = await this.$axios.post(routes.reportEventForIndicator, {
                    staff: localStorage.getItem('beEvaluatedUserId'),
                    indicator: indicatorId
                })
                this.events = response.data;
            } catch (error) {
                console.log({ error });
            } finally {
                this.loading = false;
            }
        }
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

.v-dialog {
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .evaluate-dialog {
        min-height: 75vh;
        max-height: 75vh;
        overflow: auto;
        margin: auto;
        text-align: center;
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

    .indicator-agreement-btn {
        border-radius: 1rem;
        background-color: var(--color-blue-sky);
        white-space: nowrap;
        color: white;
        font-size: 10px;
        padding: 0.2rem 0.45rem;
        height: 30px;
        cursor: pointer;
        box-shadow: 0 2px 10px #aaaaaa;
    }

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