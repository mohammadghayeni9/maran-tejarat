<template>
  <div class="agreement-form">
    <v-col cols="12 mb-5" class="agreement-form-title">ثبت توافق</v-col>
    <v-col cols="12" sm="6" lg="4">
      <persianDatePicker />
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-text-field label="موعد انجام" outlined></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-text-field label="شرح" outlined></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-text-field label="هدف کمی / کیفی" outlined></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-select :items="items" label="انتخاب شاخص" outlined></v-select>
    </v-col>
    <v-col cols="12"></v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-btn class="agreement-form-btn" elevation="2">ثبت توافق</v-btn>
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
.agreement-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .agreement-form-title {
    font-size: 1.25rem;
  }
  .agreement-form-btn {
    height: 54px;
    width: 100%;
    background-color: var(--color-blue);
    border-radius: var(--input-border-radius);
    color: var(--text-primary-color);
  }
}
</style>
