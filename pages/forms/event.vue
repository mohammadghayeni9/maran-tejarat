<template>
  <div class="event-form">
    <HeaderPage title="ثبت واقعه مهم" :seasonVisible="false"></HeaderPage>
    <PerfectScrollbar class="event-form-scroller">
      <v-col cols="12" sm="6" lg="4">
        <date-picker :styles="styles" :column="1" mode="single" id="date-picker" placeholder="تاریخ"
          input-format="jYYYY-jMM-jDD" v-model="eventDate" clearable></date-picker>
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-select :items="openAgreements" label="انتخاب توافق صورت گرفته" outlined item-text="description"
          item-value="id" v-model="agreement" @change="getSelectedAgreement" append-outer-icon="$clear"
          @click:append-outer="clearAgreementBox"></v-select>
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-select :items="indicators" item-text="name" item-value="id" label="انتخاب شاخص" outlined v-model="indicator">
        </v-select>
      </v-col>
      <v-col cols="12" lg="8" class="pb-0">
        <v-textarea label="شرح" outlined v-model="description"></v-textarea>
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-select :items="evaluates" item-text="title" item-value="value" label="ارزیابی" outlined v-model="evaluate">
        </v-select>
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0" v-if="agreement">
        <v-checkbox v-model="isClosedAgreement" label="آیا توافق پایان یافته است؟"></v-checkbox>
      </v-col>
      <v-col cols="12">
        <v-btn class="blue lighten-1 white--text py-5" v-if="!hiddenDescriptionIsVisible"
          @click="hiddenDescriptionIsVisible = true">نمایش شرح مخفی</v-btn>
        <v-textarea v-else outlined label="شرح مخفی" v-model="hiddenDescription"></v-textarea>
      </v-col>
      <v-col cols="12"></v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-btn class="event-form-btn disable-btn" elevation="2" v-if="loading">
          <img :src="require('assets/images/loading.gif')" alt="loading">
        </v-btn>
        <v-btn class="event-form-btn" elevation="2" @click="recordEvent" v-else>ثبت واقعه مهم</v-btn>
      </v-col>
    </PerfectScrollbar>
  </div>
</template>

<script>
import datePicker from "@alireza-ab/vue-persian-datepicker";
import { routes } from "~/API/routes";
import HeaderPage from "~/components/header/headerPage.vue";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  components: {
    datePicker,
    HeaderPage,
    PerfectScrollbar
  },
  data() {
    return {
      hiddenDescriptionIsVisible: false,
      hiddenDescription: null,
      loading: false,
      eventDate: '',
      agreement: null,
      description: null,
      indicator: null,
      evaluate: null,
      indicators: [],
      reports: [],
      openAgreements: [],
      evaluates: [
        {
          title: 'نقطه قوت',
          value: 'S'
        },
        {
          title: 'فرصت بهبود',
          value: 'O'
        }
      ],
      isClosedAgreement: false,
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
  created() {
    this.getIndicators();
    this.getOpenAgreements();
  },
  methods: {
    async recordEvent() {
      if (!this.eventDate) {
        this.$toast.error('تاریخ الزامی است');
      } else if (!this.description) {
        this.$toast.error('شاخص الزامی است');
      } else if (!this.indicator) {
        this.$toast.error('شرح الزامی است');
      } else {
        try {
          this.loading = true;
          await this.$axios.post(routes.recordEventAgreement, {
            type_report: "E",
            be_evaluated: localStorage.getItem('beEvaluatedUserId'),  //ایدی ارزیابی شونده
            date_report: this.eventDate,
            deadline: this.eventDate,
            agreement: this.agreement,
            description: this.description,
            assessment_type: this.evaluate,
            indicators: this.indicator,
            is_open_agreement: !this.isClosedAgreement,
            description_hidden: this.hiddenDescription,
          });
          this.$toast.success('واقعه با موفقیت ثبت شد');
          this.agreement = '';
          this.description = '';
          this.evaluate = '';
          this.indicator = '';
          this.isClosedAgreement = false;
          this.hiddenDescriptionIsVisible = false;
          this.hiddenDescription = null;
          this.getOpenAgreements();
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
    },
    async getReportEventAgreements() {
      try {
        const response = await this.$axios.post(routes.reportEventAgreements, {
          staff: localStorage.getItem('beEvaluatedUserId')
        })
        this.reports = response.data;
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    async getOpenAgreements() {
      try {
        const response = await this.$axios.post(routes.openAgreements, {
          staff: localStorage.getItem('beEvaluatedUserId'),
        })
        this.openAgreements = response.data;
      } catch (error) {
        console.log(error?.response?.data);
      }
    },
    getSelectedAgreement(e) {
      this.agreement = this.openAgreements.find(agree => agree.id == e);
      this.indicator = this.indicators.find(indicator => indicator.id == this.agreement.indicators).id;
      this.agreement = this.openAgreements.find(agree => agree.id == e).id;
    },
    clearAgreementBox() {
      if (this.agreement) {
        this.indicator = null;
      }
      this.agreement = null;
    }
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

.event-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  .event-form-scroller {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem 0.2rem;
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 12rem;

    @media screen and(max-width: 500px) {
      padding-bottom: 5rem;
    }
  }

  .event-form-btn {
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
