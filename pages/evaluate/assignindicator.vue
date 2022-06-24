<template>
    <div class="assign-indicator">
        <v-col cols="10 mb-5" class="assign-indicator-title">انتخاب شاخص</v-col>
        <v-col cols="2 justify-end d-flex">
            <SVGBack class="back-icon" @click="$router.push('/')" />
        </v-col>
        <v-col cols="12">
            <div class="loading d-flex justify-center" v-if="loading">
                <img :src="require('assets/images/loading.gif')" alt="loading">
            </div>
            <v-col cols="12" v-else-if="!indicators.length" class="d-flex justify-center">
                هیچ شاخصی ثبت نشده است
            </v-col>
            <v-card
                v-else
                class="mx-auto rounded-xl overflow-hidden"
                max-width="1200"
                :elevation="2"
            >
                <v-list shaped>
                <v-list-item-group
                    v-model="selectedIndicators"
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
            </v-card>
        </v-col>
        <v-col cols="12" class="d-flex justify-end" v-if="!loading && indicators.length">
            <v-btn color="gray--text lighten-4 light-blue" elevation="2" class="px-12 py-5 rounded-lg">ثبت</v-btn>
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
            indicators: [],
            selectedIndicators: [],
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
                console.log(error);
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
                this.selectedIndicators = response?.data?.results;
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
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
    .back-icon {
        object-fit: cover;
        max-height: 2rem;
        width: fit-content;
        margin-right: auto;
        cursor: pointer;
    }
}
</style>
