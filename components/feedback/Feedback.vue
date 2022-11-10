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
                        {{index + 1}}. {{ feed.questions }}
                        <br>
                        <v-radio-group  row @change="saveScore($event)">
                            <v-radio v-for="answer in answers" :label="answer.title" :value="answer.score"></v-radio>
                        </v-radio-group>
                        <v-textarea class="textarea-feedback" outlined label="توضیحات" v-model="currentDescription" />
                    </v-card>
        
                    <v-btn color="primary" @click="nextStep(index + 1, feed.id, currentDescription)">
                        {{ nextBtnTextComputed }}
                    </v-btn>
                    <img :src="require('assets/images/loading.gif')" class="feedback-loading" alt="loading" v-if="loading">
        
                    <!-- <v-btn v-if="stepper > 1" text @click="prevStep(index + 1)">
                        قبلی
                    </v-btn> -->
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
import { routes } from "~/API/routes";

export default {
    props: {
        feedbacksArray: {
            type: Array,
            default: [],
        },
        steps: {
            type: Number,
            default: 0
        },
        meetingId: {
            type: Number
        }
    },
    data() {
        return {
            stepper: 1,
            feedbacksResult: [],
            currentScore: null,
            currentDescription: null,
            loading: false,
            answers: [
                {
                    id: 1,
                    title: '(1) خیلی مخالفم',
                    score: 1,
                },
                {
                    id: 2,
                    title: '(2) مخالفم',
                    score: 2,
                },
                {
                    id: 3,
                    title: '(3) متوسط',
                    score: 3,
                },
                {
                    id: 4,
                    title: '(4) موافقم',
                    score: 4,
                },
                {
                    id: 5,
                    title: '(5) خیلی موافقم',
                    score: 5,
                }
            ]
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
        async nextStep(n, id, description) {
            if (this.currentScore) {
                const temp = {
                    id,
                    score: this.currentScore,
                    description
                }
                this.feedbacksResult.push(temp);
                this.currentDescription = null;
                this.currentScore = null;
                if (n === this.steps) {
                    this.loading = true;
                    await this.saveFeedback();
                    this.loading = false;
                    this.$emit('saveFeedbacks', this.feedbacksResult);
                    this.feedbacksResult = [];
                    this.stepper = 1;
                } else {
                    this.stepper = n + 1;
                }
            }
        },
        prevStep(n) {
            if (n > 1) {
                this.stepper = n - 1;
            }
        },
        saveScore(score) {
            this.currentScore = score;
        },
        async saveFeedback () {
            try {
                const response = await this.$axios.post(routes.feedbackAnswers, {
                    feedbackSessionsID: this.meetingId,
                    list_of_eval: this.feedbacksResult 
                });
                this.$toast.error(response?.data?.msg);
            } catch(error) {
                this.$toast.error(error.response.data);
                console.log(error);
            }
        }
    },

}

</script>

<style lang="scss">
.feedback {
    font-size: 0.85rem;
    border: 2px solid var(--color-blue-dark);
    background-color: var(--background-color-secondary) !important;

    .textarea-feedback {
        font-size: 0.9rem;
    }

    border-radius: 8px;

    .feedback-loading {
        margin-bottom: -45px;
    }

    .v-label {
        font-size: 0.7rem;
    }
}
</style>
