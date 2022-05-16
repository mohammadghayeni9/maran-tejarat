<template>
  <div class="event-form">
      <v-col cols="12 mb-5">ثبت وقایع مهم</v-col>
    <v-col cols="12" lg="6" xl="4">
      <persianDatePicker />
    </v-col>
    <v-col cols="12" lg="6" xl="4">
      <v-select :items="items" label="انتخاب توافق صورت گرفته" outlined></v-select>
    </v-col>
    <v-col cols="12" lg="6" xl="4">
      <v-text-field
        label="شرح"
        outlined
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="6" xl="4">
      <v-select :items="items" label="انتخاب شاخص" outlined></v-select>
    </v-col>
    <v-col cols="12" lg="6" xl="4">
      <v-select :items="items" label="ارزیابی" outlined></v-select>
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
.event-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
