<template>
  <div class="agreement-form">
    <HeaderPage title="ثبت توافق" :seasonVisible="false"></HeaderPage>
    <PerfectScrollbar class="agreement-form-scroller">
      <v-col cols="12" lg="4" class="pb-0">
        <v-row>
          <v-col cols="12">
            <date-picker :styles="styles" :column="1" mode="single" placeholder="تاریخ" input-format="jYYYY-jMM-jDD"
              v-model="agreementDate" ref="datePicker1" clearable></date-picker>
          </v-col>
          <v-col cols="12" class="pt-7 pb-11">
            <date-picker :styles="styles" :column="1" mode="single" placeholder="موعد انجام"
              input-format="jYYYY-jMM-jDD" v-model="deadlineDate" clearable></date-picker>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="8" class="pb-0">
        <v-textarea label="شرح" outlined v-model="description"></v-textarea>
      </v-col>
      <v-col cols="12" md="6" class="pb-0">
        <v-text-field label="هدف کمی / کیفی" outlined v-model="goal"></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="pb-0">
        <v-select :items="indicators" item-text="name" item-value="id" label="انتخاب شاخص" outlined v-model="indicator">
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-btn class="blue lighten-1 white--text py-5" v-if="!hiddenDescriptionIsVisible" @click="hiddenDescriptionIsVisible = true">نمایش شرح مخفی</v-btn>
        <v-textarea v-else outlined label="شرح مخفی" v-model="hiddenDescription"></v-textarea>
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
      agreementDate: null,
      deadlineDate: null,
      description: null,
      goal: null,
      indicator: null,
      indicators: [],
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
  mounted() {
    this.getIndicators();
  },
  methods: {
    async recordAgreement() {
      if (!this.agreementDate) {
        this.$toast.error('تاریخ الزامی است');
      } else if (!this.deadlineDate) {
        this.$toast.error('موعد انجام الزامی است');
      } else if (!this.description) {
        this.$toast.error('شرح الزامی است');
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
            description: this.description,
            quantitative_qualitative_goal: this.goal,
            indicators: this.indicator,
            is_open_agreement: true,
            description_hidden: this.hiddenDescription,
          });
          this.$toast.success('توافق با موفقیت ثبت شد');
          this.description = null;
          this.goal = null;
          this.indicator = null;
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
    overflow-x: hidden;
    padding-bottom: 12rem;

    @media screen and(max-width: 500px) {
      padding-bottom: 5rem;
    }
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
