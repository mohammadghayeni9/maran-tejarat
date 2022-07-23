<template>
    <div class="assign-indicator">
        <!-- <v-col cols="12" v-if="!loading && isAssignIndicators && !selectIndicatorsIsVisible">
            <v-col cols="12" class="selected-indicator-list rounded-xl px-4 pt-4">
                شما برای این شخص انتساب شاخص ها را انجام داده اید و لیست شاخص‌های انتخابی شما به شرح ذیل می‌باشد :
                <br>
                <br>
                <ol class="pr-10">
                    <li v-for="indicator in selectedIndicators" :key="indicator.indicators_name" class="pb-4">
                        {{indicator.indicators_name}} 
                        <br>
                    </li>
                </ol>
                <v-col cols="12" class="d-flex justify-end flex-wrap px-0">
                    <v-btn elevation="2" class="px-2 py-5 mt-2 rounded-lg record-btn mx-1" @click="selectIndicatorsIsVisible = true">مایلم ثبت شاخص ها را دوباره انجام دهم</v-btn>
                    <v-btn elevation="2" class="px-6 py-5 mt-2 rounded-lg back-btn mx-1" @click="$router.push('/')">بازگشت</v-btn>
                </v-col>
            </v-col>
        </v-col>
        <v-col cols="12">
            <div class="loading d-flex justify-center" v-if="loading">
                <img :src="require('assets/images/loading.gif')" alt="loading">
            </div>
            <v-col cols="12" v-else-if="!indicators.length" class="d-flex justify-center">
                هیچ شاخصی ثبت نشده است
            </v-col>
            <v-card
                v-else-if="selectIndicatorsIsVisible || !isAssignIndicators"
                class="mx-auto rounded-xl overflow-hidden"
                max-width="1200"
                :elevation="2"
            >
                <v-col cols="12">

                </v-col>
                <v-list shaped>
                    <v-list-item-group
                    v-model="selectedIndicatorsCurrent"
                        multiple
                    >
                        <template v-for="(indicator, i) in indicators">
                            <v-divider
                                v-if="!indicator"
                                :key="`divider-${i}`"
                            ></v-divider>

                            <v-list-item
                                v-else
                                :key="`item-${i}`"
                                :value="indicator"
                                active-class="light-blue--text text--accent-4"
                            >
                                <template v-slot:default="{ active }">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="indicator.name"></v-list-item-title>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-checkbox
                                        :input-value="active"
                                        color="light-blue"
                                        ></v-checkbox>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                        </template>
                    </v-list-item-group>
                </v-list>
                <v-col cols="12" class="d-flex justify-end mt-5 mb-2" v-if="!loading && indicators.length">
                    <v-btn elevation="2" class="px-12 py-5 rounded-lg record-btn" @click="assignIndicatorsToUser">ثبت</v-btn>
                </v-col>
            </v-card>
        </v-col> -->
    </div>
</template>

<script>
import { routes } from "~/API/routes";

export default {
    data() {
        return {
            indicators: [],
            selectedIndicators: [],
            selectedIndicatorsCurrent: [],
            selectIndicatorsIsVisible: false,
            loading: false,
        }
    },
    created() {
        this.getIndicators();
        this.getSelectedIndicators();
    },
    methods: {
        async getIndicators() {
            try {
                this.loading = true;
                const response = await this.$axios.get(routes.indicators);
                this.indicators = response?.data?.results;
            } catch (error) {
                console.log(error?.response?.data);
            } finally {
                this.loading = false;
            }
        },
        async getSelectedIndicators() {
            try {
                this.loading = true;
                const response = await this.$axios.post(routes.selectedIndicators, {
                    staff: localStorage.getItem('beEvaluatedUserId')
                });
                this.selectedIndicators = response?.data;
            } catch (error) {
                console.log(error?.response?.data);
            } finally {
                this.loading = false;
            }
        },
        async assignIndicatorsToUser () {
            if (!this.selectedIndicatorsCurrent.length) {
                this.$toast.info('هیچ شاخصی انتخاب نشده است');
            }
            else {
                try {
                    await this.$axios.post(routes.registerIndicators, {
                        be_evaluated: localStorage.getItem('beEvaluatedUserId'),
                        list_of_Indicator: this.listIndicatorsIdComputed
                    });
                    this.getSelectedIndicators();
                    this.selectIndicatorsIsVisible = false;
                    this.$toast.success('شاخص ها با موفقیت انتساب داده شد');
                } catch (error) {
                    this.$toast.error('خطایی رخ داده است دوباره سعی کنید');
                }
            }
        },
    },
    computed: {
        listIndicatorsIdComputed() {
            return [...new Set(this.selectedIndicatorsCurrent.map(indicator => indicator.indicators || indicator.id))]
        },
        isAssignIndicators() {
            return this.selectedIndicators.length > 0
        }
    }
}
</script>

<style lang="scss" scoped>
.assign-indicator {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;
    .assign-indicator-title {
        font-size: 1.25rem;
    }
    .selected-indicator-list {
        background: var(--background-color-primary);
        font-size: 0.95rem;
        span {
            font-size: 0.9rem;
        }
    }
    .record-btn {
        background-color: var(--color-blue-sky);
        color: var(--color-white);
        border: 2px solid var(--color-blue-sky);
    }
    .back-btn {
        background-color: var(--color-white);
        color: var(--color-blue-sky);
        border: 2px solid var(--color-blue-sky);
    }
}
</style>
