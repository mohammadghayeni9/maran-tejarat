<template>
  <div class="meeting-form">
    <v-col cols="12 mb-5" class="meeting-form-title">ثبت جلسه بازخورد</v-col>
    <v-col cols="12" sm="6" lg="4" class="meeting-form-datepicker">
      <persianDatePicker />
    </v-col>
    <v-col cols="12" lg="8">
      <v-textarea label="شرح جلسه" outlined></v-textarea>
    </v-col>
    <v-col cols="12"></v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-btn class="meeting-form-btn" elevation="2">ثبت جلسه بازخورد</v-btn>
    </v-col>
  </div>
</template>

<script>
import persianDatePicker from "@/components/datePicker/persianDatePicker.vue";

export default {
  components: {
    persianDatePicker,
  },
};
</script>

<style lang="scss" scoped>
.meeting-form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .meeting-form-title {
    font-size: 1.25rem;
  }
  .meeting-form-datepicker {
      align-self: start;
      margin-top: 10px !important;
  }
  .meeting-form-btn {
    height: 54px;
    width: 100%;
    background-color: var(--color-blue);
    border-radius: var(--input-border-radius);
    color: var(--text-primary-color);
  }
}
</style>
