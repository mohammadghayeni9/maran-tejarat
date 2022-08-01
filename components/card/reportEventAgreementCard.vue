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
        <v-col cols="12" sm="6" v-if="reportData.type_report === 'E'">
            <span>نوع ارزیابی: </span>
            {{ assessmentTypeComputed }}
        </v-col>
        <v-col cols="12" sm="6" v-if="reportData.type_report === 'A'">
            <span>موعد انجام: </span>
            <span dir="ltr">{{ toPersianDigits(reportData.deadline) }}</span>
        </v-col>
        <v-col cols="12" sm="6" v-if="reportData.type_report === 'A' && !reportData.is_open_agreement">
            <span>این توافق پایان یافته است.</span>
        </v-col>
    </div>
</template>

<script>
export default {
    props: {
        type: '',
        reportData: {}
    },
    computed: {
        assessmentTypeComputed() {
            return this.reportData.assessment_type === 'S' ? 'نقطه قوت' : 'فرصت بهبود'
        },
    },
    methods: {
        toPersianDigits(str) {
            let persianNum = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
            return str?.replace(/[0-9]/g, function(w){
                return persianNum[+w];
            });
        }
    }
}
</script>

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
    }
</style>
