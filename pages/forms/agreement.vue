<template>
  <div class="agreement-form">
    <v-col cols="10 mb-5" class="agreement-form-title">ثبت توافق</v-col>
    <v-col cols="2 justify-end d-flex">
      <SVGBack class="back-icon" @click="$router.push('/')" />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <persianDatePicker placeholder="تاریخ" ref="pdp"/>
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <persianDatePicker placeholder="موعد انجام" ref="deadlinePdp"/>
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
      <v-btn class="agreement-form-btn disable-btn" elevation="2" v-if="loading">
        <img :src="require('assets/images/loading.gif')" alt="loading">
      </v-btn>
      <v-btn class="agreement-form-btn" elevation="2" @click="recordAgreement" v-else>ثبت توافق</v-btn>
    </v-col>
  </div>
</template>

<script>
import persianDatePicker from "@/components/datePicker/persianDatePicker.vue";
import SVGBack from "@/components/icons/back-icon.svg"
import { routes } from "~/API/routes";


export default {
  components: {
    persianDatePicker,
    SVGBack
  },
  data() {
    return {
      loading: false,
      agreementDate: '',
      deadlineDate: '',
      description: '',
      goal: null,
      indicator: '',
      indicators: '',
    }
  },
  mounted() {
    this.getIndicators();
  },
  methods: {
    async recordAgreement() {
      if (this.goal) {
        try {
          this.loading = true;
          await this.$axios.post(routes.recordEventAgreement, {
            type_report: "A",
            be_evaluated: localStorage.getItem('beEvaluatedUserId'),  //ایدی ارزیابی شونده
            date_report: this.dateReportComputed,
            deadline: this.deadlineComputed,
            description: this.description,
            quantitative_qualitative_goal: this.goal,
            indicators: this.indicator,
            is_open_agreement: true,
          });
          this.$toast.success('توافق با موفقیت ثبت شد');
          this.agreementDate = '';
          this.deadlineDate = '';
          this.description = '';
          this.goal = '';
          this.indicator = '';
          this.$refs.pdp.$refs.persianDatePicker.$refs.pdpInput.value = null;
          this.$refs.deadlinePdp.$refs.persianDatePicker.$refs.pdpInput.value = null;
        } catch (error) {
          this.$toast.error('تمام موارد الزامی می‌باشد');
          console.log(error);
        } finally {
          this.loading = false;
        }
      } else {
        this.$toast.error('تمام موارد الزامی می‌باشد');
      }
    },
    async getIndicators() {
      try {
        const response = await this.$axios.get(routes.indicators);
        this.indicators = response?.data?.results;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    dateReportComputed() {
      return this.$refs?.pdp?.$refs?.persianDatePicker?.$refs?.pdpInput?.value.replaceAll('/', '-');
    },
    deadlineComputed() {
      return this.$refs?.deadlinePdp?.$refs?.persianDatePicker?.$refs?.pdpInput?.value.replaceAll('/', '-');
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
    border-radius: var(--input-border-radius);
    background-color: var(--color-blue-sky);
    color: var(--color-white);
  }
  .disable-btn {
    cursor: default;
    pointer-events: none;
  }
}
</style>
