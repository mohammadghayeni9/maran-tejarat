<template>
    <div class="feedback">
        <v-stepper v-model="stepper">
            <v-stepper-header>
                <template v-for="n in steps">
                    <v-stepper-step :key="`${n}-step`" :complete="stepper > n" :step="n" >
                        سوال {{ n }}
                    </v-stepper-step>
        
                    <v-divider v-if="n !== steps" :key="n"></v-divider>
                </template>
            </v-stepper-header>
        
            <v-stepper-items>
                <v-stepper-content v-for="(feed, index) in feedbacksArray" :key="`${index + 1}-content`" :step="index + 1">
                    <v-card class="mb-3 elevation-0" color="aqua lighten-1">
                        {{index + 1}}. {{ feed.title }}
                        <br>
                        <v-radio-group  row @change="registerPoints($event)">
                            <v-radio v-for="option in feed.options" :label="option.title" :value="option.score"></v-radio>
                        </v-radio-group>
                        <v-textarea outlined label="توضیحات" />
                    </v-card>
        
                    <v-btn color="primary" @click="nextStep(index + 1)">
                        {{ nextBtnTextComputed }}
                    </v-btn>
        
                    <v-btn v-if="stepper > 1" text @click="prevStep(index + 1)">
                        قبلی
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>

export default {
    props: {
        feedbacksArray: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            stepper: 1,
            steps: 5,
            feedbacksResult: [],
        }
    },
    computed: {
        nextBtnTextComputed() {
            return this.stepper === this.steps ? 'ذخیره' : 'بعدی'
        }

    },
    watch: {
        steps(val) {
            if (this.stepper > val) {
                this.stepper = val
            }
        },
    },
    methods: {
        nextStep(n) {
            if (n === this.steps) {
                this.stepper = 1;
                this.$emit('saveFeedbacks', this.feedbacksResult)
            } else {
                this.stepper = n + 1;
            }
        },
        prevStep(n) {
            if (n > 1) {
                this.stepper = n - 1;
            }
        },
        registerPoints(score) {
            console.log(score);
        }
    },

}

</script>

<style lang="scss">
.feedback {
    font-size: 0.85rem;
    border: 2px solid var(--color-blue-dark);
    background-color: var(--background-color-secondary) !important;
    border-radius: 8px;
    .v-label {
        font-size: 0.7rem;
    }
}
</style>
