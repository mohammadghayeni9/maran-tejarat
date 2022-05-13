<template>
    <div class="event-form">
        <date-picker :column="1" mode="single"></date-picker>
    </div>
</template>

<script>
import datePicker from '@alireza-ab/vue-persian-datepicker'

export default {
    components: {
        datePicker
    },    
}
</script>

<style lang="scss" scoped>
.event-form {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
