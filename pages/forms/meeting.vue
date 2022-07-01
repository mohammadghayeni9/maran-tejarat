<template>
  <div class="meeting-form">
    <v-col cols="10 mb-5" class="meeting-form-title">ثبت جلسه بازخورد</v-col>
    <v-col cols="2 justify-end d-flex">
      <SVGBack class="back-icon" @click="$router.push('/')" />
    </v-col>
    <Perfect-scrollbar class="meeting-form-scroller">
      <v-col cols="12" sm="6" lg="4" class="meeting-form-datepicker">
        <persianDatePicker placeholder="تاریخ" ref="pdp" />
      </v-col>
      <v-col cols="12" lg="8">
        <v-textarea label="شرح جلسه" outlined v-model="description"></v-textarea>
      </v-col>
      <v-col cols="12"></v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-btn class="meeting-form-btn disable-btn" elevation="2" v-if="loading">
          <img :src="require('assets/images/loading.gif')" alt="loading">
        </v-btn>
        <v-btn class="meeting-form-btn" elevation="2" @click="recordMeeting" v-else>ثبت جلسه بازخورد</v-btn>
      </v-col>
      <v-col cols="12" class="px-0 pt-5 mt-5 d-flex justify-center">
        <v-col cols="12" sm="6" lg="4" class="pb-0 d-flex justify-center" v-if="!agreementFormIsVisible">
          <v-btn class="meeting-form-btn add" elevation="2" @click="agreementFormIsVisible = true">افزودن توافق + </v-btn>
        </v-col>
        <v-col cols="12" class="agreement-form px-0" v-else>
          <v-col cols="12" sm="6" lg="4">
            <persianDatePicker placeholder="تاریخ" ref="agreementPdp"/>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <persianDatePicker placeholder="موعد انجام" ref="deadlinePdp"/>
          </v-col>
          <v-col cols="12" sm="6" lg="4" class="pb-0">
            <v-text-field label="شرح" outlined v-model="agreementDescription"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" lg="4" class="pb-0">
            <v-text-field label="هدف کمی / کیفی" outlined v-model="goal"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" lg="4" class="pb-0">
            <v-select :items="indicators" item-text="name" item-value="axes" label="انتخاب شاخص" outlined v-model="indicator"></v-select>
          </v-col>
          <v-col cols="12" sm="6" lg="4" class="pb-0">
            <v-checkbox
              v-model="isOpenAgreement"
              label="آیا این یک توافق باز است؟"
            ></v-checkbox>
          </v-col>
          <v-col cols="12"></v-col>
          <v-col cols="12" class="pb-0 d-flex flex-wrap flex-row btn-container">
            <v-btn class="agreement-form-btn disable-btn col-6" elevation="2" v-if="loading">
              <img :src="require('assets/images/loading.gif')" alt="loading">
            </v-btn>
            <v-btn class="agreement-form-btn" elevation="2" @click="recordAgreement" v-else>ثبت توافق</v-btn>
            <v-btn class="agreement-form-btn cancel " elevation="2" @click="agreementFormIsVisible = false">انصراف</v-btn>
          </v-col>
        </v-col>
      </v-col>
    </Perfect-scrollbar>
  </div>
</template>

<script>
import persianDatePicker from "@/components/datePicker/persianDatePicker.vue";
import SVGBack from "@/components/icons/back-icon.svg";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { routes } from "~/API/routes";

export default {
  components: {
    persianDatePicker,
    SVGBack,
    PerfectScrollbar,
  },
  data() {
    return {
      loading: false,
      meetingDate: null,
      description: null,
      agreementDate: '',
      deadlineDate: '',
      agreementDescription: '',
      goal: '',
      indicator: '',
      indicators: '',
      isOpenAgreement: false,
      agreementFormIsVisible: false,
    }
  },
  methods: {
    async recordMeeting() {
      try {
        this.loading = true;
        await this.$axios.post(routes.recordMeeting, {
          be_evaluated: localStorage.getItem('beEvaluatedUserId'),
          date_report: this.dateReportComputed,
          description: this.description,
        });
        this.$toast.success('جلسه بازخورد با موفقیت ثبت شد');
        this.meetingDate = '';
        this.description = '';
        this.$refs.pdp.$refs.persianDatePicker.$refs.pdpInput.value = null;
      } catch (error) {
        this.$toast.error('خطایی رخ داده است دوباره تلاش کنید');
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async recordAgreement() {
      try {
        this.loading = true;
        await this.$axios.post(routes.recordEventAgreement, {
          type_report: "A",
          be_evaluated: localStorage.getItem('beEvaluatedUserId'),  //ایدی ارزیابی شونده
          date_report: this.agreementDateReportComputed,
          deadline: this.deadlineComputed,
          description: this.agreementDescription,
          quantitative_qualitative_goal: this.goal,
          indicators: this.indicator,
          is_open_agreement: this.isOpenAgreement,
        });
        this.$toast.success('توافق با موفقیت ثبت شد');
        this.agreementDate = '';
        this.deadlineDate = '';
        this.agreementDescription = '';
        this.goal = '';
        this.indicator = '';
        this.isOpenAgreement = false;
        this.$refs.agreementPdp.$refs.persianDatePicker.$refs.pdpInput.value = null;
        this.$refs.deadlinePdp.$refs.persianDatePicker.$refs.pdpInput.value = null;
        this.agreementFormIsVisible = false;
      } catch (error) {
        this.$toast.error('خطایی رخ داده است دوباره تلاش کنید');
        console.log(error);
      } finally {
        this.loading = false;
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
mounted() {
    this.getIndicators();
  },
  computed: {
    dateReportComputed() {
      return this.$refs?.pdp?.$refs?.persianDatePicker?.$refs?.pdpInput?.value.replaceAll('/', '-');
    },
    agreementDateReportComputed() {
      return this.$refs?.agreementPdp?.$refs?.persianDatePicker?.$refs?.pdpInput?.value.replaceAll('/', '-');
    },
    deadlineComputed() {
      return this.$refs?.deadlinePdp?.$refs?.persianDatePicker?.$refs?.pdpInput?.value.replaceAll('/', '-');
    } 
  }
};
</script>

<style lang="scss" scoped>
.meeting-form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .meeting-form-scroller {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem 0.2rem;
    max-height: 80vh;
    overflow-y: auto;
  }
  .back-icon {
    object-fit: cover;
    max-height: 2rem;
    width: fit-content;
    margin-right: auto;
    cursor: pointer;
  }
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
    border-radius: var(--input-border-radius);
    background-color: var(--color-blue-sky);
    color: var(--color-white);
    &.add {
      background-color: var(--color-white);
      color: var(--color-blue-sky);
    }
  }
  .disable-btn {
    cursor: default;
    pointer-events: none;
  }

  .agreement-form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .btn-container {
      gap: 0.5rem;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: center;
    }
    .agreement-form-btn {
      height: 54px;
      width: 45%;
      max-width: 22rem;
      border-radius: var(--input-border-radius);
      background-color: var(--color-blue-sky);
      color: var(--color-white);
      @media screen and (max-width: 500px) {
        width: 100%;
        max-width: 100%;
      }
      &.cancel {
        background-color: var(--color-white);
        color: var(--color-blue-sky);
      }
    }
    .disable-btn {
      cursor: default;
      pointer-events: none;
    }
  }
}
</style>
