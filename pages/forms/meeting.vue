<template>
  <div class="meeting-form">
    <HeaderPage title="ثبت جلسه بازخورد" :seasonVisible="false"></HeaderPage>
    <Perfect-scrollbar class="meeting-form-scroller">
      <v-col cols="12" lg="4" class="meeting-form-datepicker">
        <date-picker :styles="styles" :column="1" mode="single" placeholder="تاریخ" input-format="jYYYY-jMM-jDD"
          v-model="meetingDate" clearable></date-picker>
      </v-col>
      <v-col cols="12" lg="8">
        <v-textarea label="شرح جلسه" outlined v-model="description"></v-textarea>
      </v-col>
      <v-col cols="12" class="pt-0">
        <v-btn class="blue lighten-1 white--text py-5" v-if="!hiddenDescriptionIsVisible"
          @click="hiddenDescriptionIsVisible = true">نمایش شرح مخفی</v-btn>
        <v-textarea v-else outlined label="شرح مخفی" v-model="hiddenDescription"></v-textarea>
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
          <v-btn class="meeting-form-btn add" elevation="2" @click="agreementFormIsVisible = true">افزودن توافق +
          </v-btn>
        </v-col>
        <v-col cols="12" class="agreement-form px-0" v-else>
          <v-col cols="12" lg="4" class="pb-0 mt-5">
            <v-row>
              <v-col cols="12">
                <date-picker :styles="styles" :column="1" mode="single" id="date-picker" placeholder="تاریخ"
                  input-format="jYYYY-jMM-jDD" v-model="agreementDate" clearable></date-picker>
              </v-col>
              <v-col cols="12" class="pt-7 pb-11">
                <date-picker :styles="styles" :column="1" mode="single" id="date-picker" placeholder="موعد انجام"
                  input-format="jYYYY-jMM-jDD" v-model="deadlineDate" clearable></date-picker>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="8" class="pb-0">
            <v-textarea label="شرح" outlined v-model="agreementDescription" class="desc-agreement"></v-textarea>
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field label="هدف کمی / کیفی" outlined v-model="goal"></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-select :items="indicators" item-text="name" item-value="id" label="انتخاب شاخص" outlined
              v-model="indicator">
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-btn class="blue lighten-1 white--text py-5" v-if="!agreementHiddenDescriptionIsVisible"
              @click="agreementHiddenDescriptionIsVisible = true">نمایش شرح مخفی</v-btn>
            <v-textarea v-else outlined label="شرح مخفی" v-model="agreementHiddenDescription"></v-textarea>
          </v-col>
          <v-col cols="12"></v-col>
          <v-col cols="12" class="pb-0 d-flex flex-wrap flex-row btn-container">
            <v-btn class="agreement-form-btn disable-btn col-6" elevation="2" v-if="loading">
              <img :src="require('assets/images/loading.gif')" alt="loading">
            </v-btn>
            <v-btn class="agreement-form-btn" elevation="2" @click="recordAgreement" v-else>ثبت توافق</v-btn>
            <v-btn class="agreement-form-btn cancel " elevation="2" @click="agreementFormIsVisible = false">انصراف
            </v-btn>
          </v-col>
        </v-col>
      </v-col>
    </Perfect-scrollbar>
  </div>
</template>

<script>
import datePicker from "@alireza-ab/vue-persian-datepicker";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
import { routes } from "~/API/routes";
import HeaderPage from "~/components/header/headerPage.vue";

export default {
  components: {
    datePicker,
    PerfectScrollbar,
    HeaderPage
  },
  data() {
    return {
      hiddenDescriptionIsVisible: false,
      hiddenDescription: null,
      agreementHiddenDescriptionIsVisible: false,
      agreementHiddenDescription: null,
      loading: false,
      meetingDate: null,
      description: null,
      agreementDate: null,
      deadlineDate: null,
      agreementDescription: '',
      goal: '',
      indicator: '',
      indicators: '',
      agreementFormIsVisible: false,
      localeConfigs: {
        fa: {
          inputFormat: 'jYYYY/jMM/jDD'
        },
      },
      styles: {
        "primary-color": "var(--color-green)",
        "secondary-color": "var(--color-blue)",
        "in-range-background": "var(--accent-color)",
        "icon-background": "var(--color-green)",
        "text-color": "var(--text-primary-color)",
        "hover-color": "var(--color-green)",
        "border-color": "var(--color-green)",
        "z-index": 1000,
        "disabled-opacity": 0.3,
        "overlay-color": "transparent",
        "main-box-shadow": "1px 1px 8px 1px --card-box-shadow",
        "day-dimensions": "2.08rem",
        radius: "0.25rem",
        background: "var(--background-color-primary)",
      },
    }
  },
  methods: {
    async recordMeeting() {
      if (!this.meetingDate) {
        this.$toast.error('تاریخ الزامی است');
      } else if (!this.description) {
        this.$toast.error('شرح جلسه الزامی است');
      } else {
        try {
          this.loading = true;
          await this.$axios.post(routes.recordMeeting, {
            be_evaluated: localStorage.getItem('beEvaluatedUserId'),
            date_report: this.meetingDate,
            description: this.description,
            description_hidden: this.hiddenDescription,
          });
          this.$toast.success('جلسه بازخورد با موفقیت ثبت شد');
          this.description = '';
          this.hiddenDescription = null;
          this.hiddenDescriptionIsVisible = false;
        } catch (error) {
          this.$toast.error('خطایی رخ داده است دوباره تلاش کنید');
          console.log(error?.response?.data);
        } finally {
          this.loading = false;
        }
      }
    },
    async recordAgreement() {
      if (!this.agreementDate) {
        this.$toast.error('تاریخ الزامی است');
      } else if (!this.deadlineDate) {
        this.$toast.error('موعد انجام الزامی است');
      } else if (!this.agreementDescription) {
        this.$toast.error('شرح توافق الزامی است');
      } else if (!this.indicator) {
        this.$toast.error('شاخص الزامی است');
      } else {
        try {
          this.loading = true;
          await this.$axios.post(routes.recordEventAgreement, {
            type_report: "A",
            be_evaluated: localStorage.getItem('beEvaluatedUserId'),  //ایدی ارزیابی شونده
            date_report: this.agreementDate,
            deadline: this.deadlineDate,
            description: this.agreementDescription,
            quantitative_qualitative_goal: this.goal,
            indicators: this.indicator,
            is_open_agreement: true,
            description_hidden: this.agreementHiddenDescription,
          });
          this.$toast.success('توافق با موفقیت ثبت شد');
          this.agreementDescription = '';
          this.goal = '';
          this.indicator = '';
          this.agreementFormIsVisible = false;
          this.agreementHiddenDescription = null;
          this.agreementHiddenDescriptionIsVisible = false;
        } catch (error) {
          this.$toast.error('خطایی رخ داده است دوباره تلاش کنید');
          console.log(error?.response?.data);
        } finally {
          this.loading = false;
        }
      }
    },
    async getIndicators() {
      try {
        const response = await this.$axios.post(routes.selectedIndicators, {
          staff: localStorage.getItem('beEvaluatedUserId')
        });
        this.indicators = response.data;
      } catch (error) {
        console.log(error?.response?.data);
      }
    }
  },
  mounted() {
    this.getIndicators();
  },
};
</script>

<style lang="scss">
.pdp {
  .pdp-icon {
    display: none;
  }

  .pdp-group {
    input.pdp-input {
      border: 1px solid var(--bordr-input-color);
      border-radius: var(--input-border-radius);
      padding: var(--input-padding);
      min-height: 54px;
      color: var(--text-primary-color);
      background-color: var(--background-color-secondary);
      outline: none !important;

      &::placeholder {
        color: var(--text-color-primary);
      }
    }
  }
}

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
    overflow-x: hidden;
    padding-bottom: 5rem;
  }

  .meeting-form-datepicker {
    align-self: start;
    margin-top: 10px !important;
    transform: translateY(-10px);
    z-index: 10;
  }

  .meeting-form-btn {
    height: 54px !important;
    width: 100% !important;
    border-radius: var(--input-border-radius) !important;
    background-color: var(--color-blue-sky) !important;
    color: var(--color-white) !important;

    &.add {
      background-color: var(--color-white) !important;
      color: var(--color-blue-sky) !important;
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
      background-color: var(--color-blue-sky) !important;
      color: var(--color-white) !important;

      @media screen and (max-width: 500px) {
        width: 100%;
        max-width: 100%;
      }

      &.cancel {
        background-color: var(--color-white) !important;
        color: var(--color-blue-sky) !important;
      }
    }

    .disable-btn {
      cursor: default;
      pointer-events: none;
    }
  }
}

.desc-agreement {
  @media screen and (min-width: 1264px) {
    margin-top: 20px !important;
  }
}
</style>
