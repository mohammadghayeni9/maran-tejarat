<template>
  <div class="agreement-form">
    <HeaderPage title="ثبت توافق" :seasonVisible="false"></HeaderPage>
    <PerfectScrollbar class="agreement-form-scroller">
      <v-col cols="12" sm="6" lg="4">
        <persianDatePicker placeholder="تاریخ" ref="pdp" />
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <persianDatePicker placeholder="موعد انجام" ref="deadlinePdp" />
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-text-field label="شرح" outlined v-model="description"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-text-field label="هدف کمی / کیفی" outlined v-model="goal"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-select :items="indicators" item-text="name" item-value="id" label="انتخاب شاخص" outlined v-model="indicator">
        </v-select>
      </v-col>
      <v-col cols="12"></v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-btn class="agreement-form-btn disable-btn" elevation="2" v-if="loading">
          <img :src="require('assets/images/loading.gif')" alt="loading">
        </v-btn>
        <v-btn class="agreement-form-btn" elevation="2" @click="recordAgreement" v-else>ثبت توافق</v-btn>
      </v-col>
    </PerfectScrollbar>
  </div>
</template>

<script>
import persianDatePicker from "@/components/datePicker/persianDatePicker.vue";
import SVGBack from "@/components/icons/back-icon.svg"
import { routes } from "~/API/routes";
import HeaderPage from "~/components/header/headerPage.vue";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  components: {
    persianDatePicker,
    SVGBack,
    HeaderPage,
    PerfectScrollbar
},
  data() {
    return {
      loading: false,
      agreementDate: '',
      deadlineDate: '',
      description: null,
      goal: null,
      indicator: null,
      indicators: [],
    }
  },
  mounted() {
    this.getIndicators();
  },
  methods: {
    async recordAgreement() {
      if (this.goal && this.description && this.indicator) {
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
          this.description = null;
          this.goal = null;
          this.indicator = null;
          this.$refs.pdp.$refs.persianDatePicker.$refs.pdpInput.value = null;
          this.$refs.deadlinePdp.$refs.persianDatePicker.$refs.pdpInput.value = null;
        } catch (error) {
          this.$toast.error('خطایی رخ داده است دوباره تلاش کنید');
          console.log(error.response.data);
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
        console.log(error.response.data);
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
  .agreement-form-scroller {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem 0.2rem;
    max-height: 70vh;
    overflow-y: auto;
  }
  .agreement-form-btn {
    height: 54px !important;
    width: 100% !important;
    border-radius: var(--input-border-radius) !important;
    background-color: var(--color-blue-sky) !important;
    color: var(--color-white) !important;
  }
  .disable-btn {
    cursor: default;
    pointer-events: none;
  }
}
</style>
