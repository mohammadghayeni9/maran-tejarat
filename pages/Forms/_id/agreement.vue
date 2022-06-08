<template>
  <div class="agreement-form">
    <v-col cols="10 mb-5" class="agreement-form-title">ثبت توافق</v-col>
    <v-col cols="2 justify-end d-flex">
      <SVGBack class="back-icon" @click="$router.push('/')" />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <persianDatePicker placeholder="تاریخ" @select="selectAgreementDate" />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <persianDatePicker placeholder="موعد انجام" @select="selectDeadlineDate" />
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-text-field label="شرح" outlined v-model="description"></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-text-field label="هدف کمی / کیفی" outlined v-model="goal"></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-select :items="indicators" item-text="name" item-value="axes" label="انتخاب شاخص" outlined v-model="indicator"></v-select>
    </v-col>
    <v-col cols="12"></v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-btn class="agreement-form-btn" elevation="2" @click="recordAgreement">ثبت توافق</v-btn>
    </v-col>
  </div>
</template>

<script>
import persianDatePicker from "@/components/datePicker/persianDatePicker.vue";
import { routes } from "~/API/routes";
import SVGBack from "@/components/icons/back-icon.svg"


export default {
  components: {
    persianDatePicker,
    SVGBack
  },
  data() {
    return {
      agreementDate: '',
      deadlineDate: '',
      description: '',
      goal: '',
      indicator: '',
      indicators: '',
    }
  },
  mounted() {
    this.getIndicators();
  },
  methods: {
    async recordAgreement() {
      try {
        await this.$axios.post(routes.recordEventAgreement, {
          type_report: "A",
          be_evaluated: this.$route.params.id,  //ایدی ارزیابی شونده
          date_report: this.agreementDate,
          deadline: this.deadlineDate,
          description: this.description,
          quantitative_qualitative_goal: this.goal,
          indicators: this.indicator
        });
        this.$toast.success('توافق با موفقیت ثبت شد');
        this.agreementDate = '';
        this.deadlineDate = '';
        this.description = '';
        this.goal = '';
        this.indicator = '';
      } catch (error) {
        console.log(error);
      }
    },
    async getIndicators() {
      try {
        const response = await this.$axios.get(routes.indicators);
        this.indicators = response?.data?.results;
      } catch (error) {
        console.log(error);
      }
    },
    selectAgreementDate(date) {
      this.agreementDate = date;
    },
    selectDeadlineDate(date) {
      this.deadlineDate = date;
    }
  }
};
</script>

<style lang="scss" scoped>
.agreement-form {
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
