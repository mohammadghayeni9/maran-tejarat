<template>
    <div class="report-event-agreement-card">
        <div class="alert-icon" v-if="(type == 'E' || type == 'A') && !reportData.be_seen && !isAssesor">جدید</div>
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
        <v-col cols="12" sm="6" class="pb-1" v-if="type === 'M'">
            <span>امتیاز بازخورد جلسه: </span>
            <span class="score" v-if="reportData.is_eval" >{{ reportData.score }}</span>
            <span v-else>بازخوردی ثبت نشده است.</span>
        </v-col>
        <v-col cols="12" sm="6" v-if="reportData.type_report === 'E'">
            <span>نوع ارزیابی: </span>
            {{ assessmentTypeComputed }}
        </v-col>
        <v-col cols="12" class="d-flex justify-end like-wrapper" v-if="reportData.type_report === 'E'">
            <div class="loading d-flex justify-center" v-if="loading">
                <img :src="require('assets/images/loading.gif')" alt="loading">
            </div>
            <SVGLike class="like-svg" v-if="!isAssesor || (isAssesor && reportData.like_dislike == 'L')" :class="vote == 'like' || reportData.like_dislike == 'L' ? 'selected' : ''" @click="likeEvent(reportData.id)" />
            <SVGLike class="dislike-svg" v-if="!isAssesor || (isAssesor && reportData.like_dislike == 'D')" :class="vote == 'dislike' || reportData.like_dislike == 'D' ? 'selected' : ''" @click="dislikeEvent(reportData.id)" />
        </v-col>
        <v-col cols="12" sm="6" v-if="reportData.type_report === 'A'">
            <span>موعد انجام: </span>
            <span dir="ltr">{{ toPersianDigits(reportData.deadline) }}</span>
        </v-col>
        <v-col cols="12" sm="6" v-if="reportData.type_report === 'A' && !reportData.is_open_agreement">
            <span>این توافق پایان یافته است.</span>
        </v-col>
        <v-col class="col-12" v-if="reportData.description_hidden && isAssesor">شرح مخفی: <span>{{ reportData.description_hidden }}</span></v-col>
        <v-col cols="12" class="d-flex justify-end" v-if="type === 'M' && !isAssesor && !reportData.is_eval">
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green lighten-1" class="btn-loading" dark v-if="loading">
                        <img :src="require('assets/images/loading.gif')" alt="loading">
                    </v-btn>
                    <v-btn color="green lighten-1" dark v-bind="attrs" @click="getFeedbackQuestions" v-else>
                        ثبت بازخورد
                    </v-btn>
                </template>
                <div class="feedback-modal">
                    <Feedback :feedbacks-array="feedbackQuestions" :meeting-id="reportData.id" :steps="steps" @saveFeedbacks="saveFeedbacks" />
                </div>
            </v-dialog>
        </v-col>
        <v-col cols="12" class="d-flex justify-end" v-if="type === 'M' && reportData.is_eval">
            <v-dialog v-model="detailDialog" class="detail-dialog" >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green lighten-1" dark v-bind="attrs" @click="getFeedbackdetail(reportData.id)">
                        نمایش جزئیات بازخورد
                    </v-btn>
                </template>
                <div class="feedback-detail-modal">
                    <img :src="require('assets/images/loading.gif')" class="loading1" alt="loading" v-if="loading1">
                    <FeedbackDetail class="feedbac-detail-temp" :feedbackDetail="feedbackDetail" v-else />
                </div>
            </v-dialog>
        </v-col>
    </div>
</template>

<script>
import SVGLike from '@/components/icons/like.svg'
import Feedback from '@/components/feedback/Feedback.vue';
import { routes } from "~/API/routes";
import FeedbackDetail from "../feedback/FeedbackDetail.vue";

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
    FeedbackDetail
},
    data() {
        return {
            loading: false,
            loading1: false,
            vote: null,
            dialog: false,
            detailDialog: false,
            feedbackQuestions: [],
            feedbackDetail: [],
            steps: 0,
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
        async likeEvent(id) {
            if (!this.isAssesor && this.vote !== 'like') {
                try {
                    this.loading = true;
                    this.vote = 'like';
                    const response = await this.$axios.post(routes.likeOrDislike, {
                        id,
                        like_dislike: "L"
                    });
                    await this.getEvents();
                    // this.users = response.data.results;
                } catch (error) {
                    console.log(error?.response?.data);
                } finally {
                    this.loading = false;
                }
            }
        },
        async dislikeEvent(id) {
            if (!this.isAssesor && this.vote !== 'dislike') {
                try {
                    this.loading = true;
                    this.vote = 'dislike';
                    const response = await this.$axios.post(routes.likeOrDislike, {
                        id,
                        like_dislike: "D"
                    });
                    await this.getEvents();
                    // this.users = response.data.results;
                } catch (error) {
                    console.log(error?.response?.data);
                } finally {
                    this.loading = false;
                }
            }        
        },
        getEvents() {
            this.$emit('getEvents')
        },
        async getFeedbackQuestions () {
            try {
                this.loading = true;
                const response = await this.$axios.get(routes.feedbackQuestions);
                this.feedbackQuestions = response?.data?.results;
                this.steps = response?.data?.count;
                this.dialog = true;
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        async getFeedbackdetail (id) {
            try {
                this.detailDialog = true;
                this.loading1 = true;
                const response = await this.$axios.post(routes.feedbackDetail, {
                    feedbackSessionsID: id, 
                });
                this.feedbackDetail = response?.data;
            } catch (error) {
                console.log(error);
            } finally {
                this.loading1 = false;
            }
        },
        saveFeedbacks(value) {
            this.dialog = false;
            this.$emit('refreshReporthMeeting');
        }
    },
}
</script>

<style lang="scss">
.v-dialog--active {
    overflow: hidden !important;
    width: 80% !important;
    padding: 15px;
    background-color: var(--background-color-primary) !important;
    border-radius: 10px;
    
    .feedback-modal {
        width: 100%;
        height: 100%;
    }
    .feedback-detail-modal {
        min-height: 400px;
        max-height: 500px;
        overflow: auto;
        border: 2px solid var(--color-blue-dark);
        border-radius: 10px;
        padding: 12px;
        .loading1 {
            display: flex;
            margin: auto;
        }
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
    position: relative;

    .score {
        font-family: iranSansFaNum;
    }

    .alert-icon {
        color: red;
        position: absolute;
        left: 20px;
        top: 10px;
        font-size: 1.15rem;
        font-weight: bold;
    }

    .btn-loading {
        transform: scale(0.9);
    }

    span {
        font-size: 0.95rem;
    }

    .like-wrapper {
        position: relative;
        .loading {
            position: absolute;
            bottom: 30px;
            left: 25px;
            transform: scale(0.75);
        }
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
