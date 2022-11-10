<template>
    <div class="feedback-detail">
        <div class="feedback-detail__title">جزئیات بازخورد</div>
        <hr>
        <div class="feedback-detail__content-wrapper" v-if="feedbackDetail.questions">
            <div class="content" v-for="(question, index) in feedbackDetail.questions">
                <div class="question-score">
                    <div class="question">سوال <span>{{index + 1}}</span>: {{ question.question }}</div>
                    <div class="score">امتیاز:  {{ question.score }}</div>
                </div>
                <div class="description">توضیحات: <span v-if="question.description">{{ question.description }}</span><span v-else>...</span></div>
                <hr v-if="(index + 1) !== feedbackDetail.questions.length">
            </div>
        </div>
        <div v-else class="text-center mx-auto mt-10">موردی برای نمایش وجود ندارد.</div>
    </div>
</template>

<script>
export default {
    props: {
        feedbackDetail: {
            type: Object,
            default: {},
        }
    }
}
</script>

<style lang="scss">
.feedback-detail {
        display: flex;
        flex-direction: column;

        &__title {
            font-size: 1.15rem;
            font-family: iranSans-bold;
            padding-bottom: 15px;
        }

        &__content-wrapper {
            padding: 15px 20px;
            display: flex;
            flex-direction: column;
            .content {
                .question-score {
                    display: flex;
                    justify-content: space-between;
                    padding-top: 10px;
                    .question {
                        font-size: 0.9rem;
                        span {
                            font-family: iranSansFaNum;
                        }
                    }
                    .score {
                        font-family: iranSansFaNum;
                    }
                }
                .description {
                    font-size: 0.9rem;
                    padding-top: 12px;
                    padding-bottom: 12px;
                }
            }
        }
    }
</style>
