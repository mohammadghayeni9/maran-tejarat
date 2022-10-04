<template>
    <div class="report-event-agreement-card">
        <v-col cols="12 pb-1">
            <span v-if="type === 'E'">شرح واقعه: </span>
            <span v-else-if="type === 'A'"> شرح توافق: </span>
            <span v-else-if="type === 'M'"> شرح جلسه: </span>
            {{ reportData.description }}
        </v-col>
        <v-col cols="12" sm="6" class="pb-1">
            <span>تارخ ثبت: </span>
            <span dir="ltr">{{ toPersianDigits(reportData.date_report) }}</span>
        </v-col>
        <v-col cols="12" sm="6" class="pb-1" v-if="type === 'M' && isAssesor">
            <span>امتیاز بازخورد جلسه: </span>
            <span >0</span>
        </v-col>
        <v-col cols="12" sm="6" v-if="reportData.type_report === 'E'">
            <span>نوع ارزیابی: </span>
            {{ assessmentTypeComputed }}
        </v-col>
        <v-col cols="12" class="d-flex justify-end" v-if="reportData.type_report === 'E'">
            <SVGLike class="like-svg" :class="vote == 'like' ? 'selected' : ''" @click="likeEvent" />
            <SVGLike class="dislike-svg" :class="vote == 'dislike' ? 'selected' : ''" @click="dislikeEvent" />
        </v-col>
        <v-col cols="12" sm="6" v-if="reportData.type_report === 'A'">
            <span>موعد انجام: </span>
            <span dir="ltr">{{ toPersianDigits(reportData.deadline) }}</span>
        </v-col>
        <v-col cols="12" sm="6" v-if="reportData.type_report === 'A' && !reportData.is_open_agreement">
            <span>این توافق پایان یافته است.</span>
        </v-col>
        <v-col cols="12" class="d-flex justify-end" v-if="type === 'M' && !isAssesor">
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green lighten-1" dark v-bind="attrs" v-on="on">
                        ثبت بازخورد
                    </v-btn>
                </template>
                <div class="feedback-modal">
                    <Feedback :feedbacks-array="feedbackArray" @saveFeedbacks="saveFeedbacks" />
                </div>
            </v-dialog>
        </v-col>
    </div>
</template>

<script>
import SVGLike from '@/components/icons/like.svg'
import Feedback from '@/components/feedback/Feedback.vue';

export default {
    props: {
        type: '',
        reportData: {},
        isAssesor: {
            type: Boolean,
            default: true,
        }
    },
    components: {
        SVGLike,
        Feedback,
    },
    data() {
        return {
            vote: null,
            dialog: false,
            feedbackArray: [
                {
                    id: 1,
                    title: 'جلسه‌ای که برگزار شد به موقع بود ؟',
                    options: [
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
                },
                {
                    id: 2,
                    title: 'توضیحات در جلسه برایم کافی و شفاف بود .',
                    options: [
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
                },
                {
                    id: 3,
                    title: 'فرصت کافی برای شنیدن حرف من در جلسه داده شد .',
                    options: [
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
                },
                {
                    id: 4,
                    title: 'محتوای جلسه برایم قابل قبول بود .',
                    options: [
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
                },
                {
                    id: 5,
                    title: 'محتوای جلسه خیرخواهانه، بی‌غرض و توانمندساز بود .',
                    options: [
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
                },
            ]
        }
    },
    computed: {
        assessmentTypeComputed() {
            return this.reportData.assessment_type === 'S' ? 'نقطه قوت' : this.reportData.assessment_type === 'O' ? 'فرصت بهبود' : 'ندارد';
        },
    },
    methods: {
        toPersianDigits(str) {
            let persianNum = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return str?.replace(/[0-9]/g, function (w) {
                return persianNum[+w];
            });
        },
        likeEvent() {
            if (!this.isAssesor) {
                this.vote = 'like';
            }
        },
        dislikeEvent() {
            if (!this.isAssesor) {
                this.vote = 'dislike';
            }
        },
        saveFeedbacks(value) {
            this.dialog = false;
            console.log(value);
        }
    },
}
</script>

<style lang="scss">
    .v-dialog--active {
        min-width: 98vw !important;
        overflow: hidden !important;
        padding: 15px;
        background-color: var(--background-color-primary) !important;
        border-radius: 10px;
        .feedback-modal {
            width: 100%;
            height: 100%;
        }
    }
</style>

<style lang="scss" scoped>
.report-event-agreement-card {
    background-color: var(--background-color-primary);
    border-radius: var(--input-border-radius);
    border: 2px solid var(--color-blue-dark);
    min-width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 0.9rem;

    span {
        font-size: 0.95rem;
    }

    .like-svg {
        transition: all 0.4s ease;
        max-width: 28px; 
        max-height: 28px;
        cursor: pointer;
        fill: rgba(128, 128, 128, 0.4);
        margin: 0 5px;
        &.selected {
            animation-name: like-animate;
            animation-duration: 1s;
            fill: var(--color-blue-dark);
        }
    }

    .dislike-svg {
        transition: all 0.4s ease;
        max-width: 28px;
        max-height: 28px;
        transform: rotate(180deg);
        cursor: pointer;
        fill: rgba(128, 128, 128, 0.4);
        margin: 0 5px;
        &.selected {
            animation-name: dislike-animate;
            animation-duration: 1s;
            fill: var(--color-blue-dark);
        }
    }
}

@keyframes like-animate {
    0% {
        transform: rotate(0deg) scale(1);
    }
    35% {
        transform: rotate(-60deg) scale(1.4);
    }
    60% {
        transform: rotate(-20deg) scale(1.7);
    }
    85% {
        transform: rotate(-40deg) scale(1.4);
    }
    100% {
        transform: rotate(0deg) scale(1);
    }
}

@keyframes dislike-animate {
    0% {
        transform: rotate(180deg) scale(1);
    }

    35% {
        transform: rotate(120deg) scale(1.4);
    }

    60% {
        transform: rotate(160deg) scale(1.7);
    }

    85% {
        transform: rotate(140deg) scale(1.4);
    }

    100% {
        transform: rotate(180deg) scale(1);
    }
}
</style>
