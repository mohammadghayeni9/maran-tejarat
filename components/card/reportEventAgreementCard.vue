<template>
    <div class="report-event-agreement-card">
        <v-col cols="12 pb-0">
            <span v-if="type === 'E'">شرح واقعه : </span>
            <span v-else-if="type === 'A'"> شرح توافق : </span>
            <span v-else-if="type === 'M'"> شرح جلسه : </span>
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
        type: '',
        reportData: {}
    },
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
