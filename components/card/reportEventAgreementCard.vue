<template>
    <div class="report-event-agreement-card">
        <v-col cols="12 pb-0">
            <span v-if="reportData.type_report === 'E'">شرح واقعه : </span>
            <span v-else> شرح توافق : </span>
            {{ reportData.description }}
        </v-col>
        <!-- <v-col v-if="reportData.type_report === 'E'">
            <span>ارزیابی : </span>
            {{ reportData. }}
        </v-col> -->
        <v-col cols="col">
            <span>تارخ ثبت : </span>
            {{ reportData.date_report }}
        </v-col>
        <!-- <v-col cols="auto" class="d-flex justify-end pr-0">
            <v-btn>نمایش جزئیات</v-btn>
        </v-col> -->
    </div>
</template>

<script>
export default {
    props: {
        reportData: {}
    },
}
</script>

<style lang="scss" scoped>
    .report-event-agreement-card {
        background-color: var(--background-color-primary-lighter);
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
