<template>
  <div class="event-form">
    <v-col cols="10 mb-5" class="event-form-title">ثبت وقایع مهم</v-col>
    <v-col cols="2 justify-end d-flex">
      <SVGBack class="back-icon" @click="$router.push('/')" />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <persianDatePicker />
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-select
        :items="items"
        label="انتخاب توافق صورت گرفته"
        outlined
      ></v-select>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-text-field label="شرح" outlined></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-select :items="items" label="انتخاب شاخص" outlined></v-select>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-select :items="items" label="ارزیابی" outlined></v-select>
    </v-col>
    <v-col cols="12"></v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-btn class="event-form-btn" elevation="2">ثبت واقعه مهم</v-btn>
    </v-col>
  </div>
</template>

<script>
import persianDatePicker from "@/components/datePicker/persianDatePicker.vue";
import SVGBack from "@/components/icons/back-icon.svg"

export default {
  components: {
    persianDatePicker,
    SVGBack,
  },
};
</script>

<style lang="scss" scoped>
.event-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .back-icon {
    object-fit: cover;
    max-height: 2rem;
    width: fit-content;
    margin-right: auto;
    cursor: pointer;
  }
  .event-form-title {
    font-size: 1.25rem;
  }
  .event-form-btn {
    height: 54px;
    width: 100%;
    background-color: var(--color-blue);
    border-radius: var(--input-border-radius);
    color: var(--text-primary-color);
  }
}
</style>
