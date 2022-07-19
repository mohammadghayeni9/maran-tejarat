<template>
  <div class="event-form">
    <HeaderPage title="ثبت واقعه مهم" :seasonVisible="false"></HeaderPage>
    <PerfectScrollbar class="event-form-scroller">
      <v-col cols="12" sm="6" lg="4">
        <persianDatePicker placeholder="تاریخ" ref="pdp" />
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-select :items="openAgreements" label="انتخاب توافق صورت گرفته" outlined item-text="description"
          item-value="id" v-model="agreement" @change="getSelectedAgreement"></v-select>
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-text-field label="شرح" outlined v-model="description"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-select :items="indicators" item-text="name" item-value="id" label="انتخاب شاخص" outlined v-model="indicator">
        </v-select>
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0">
        <v-select :items="evaluates" item-text="title" item-value="value" label="ارزیابی" outlined v-model="evaluate">
        </v-select>
      </v-col>
      <v-col cols="12" sm="6" lg="4" class="pb-0" v-if="agreement">
        <v-checkbox v-model="isClosedAgreement" label="آیا توافق پایان یافته است؟"></v-checkbox>
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
import persianDatePicker from "@/components/datePicker/persianDatePicker.vue";
import SVGBack from "@/components/icons/back-icon.svg"
import { routes } from "~/API/routes";
import HeaderPage from "~/components/header/headerPage.vue";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  components: {
    persianDatePicker,
    SVGBack,
    HeaderPage
},
  data() {
    return {
      loading: false,
      eventDate: null,
      agreement: null,
      description: null,
      indicator: null,
      evaluate: null,
      indicators: [],
      reports: [],
      openAgreements: [],
      evaluates: [
        {
          title: 'فرصت بهبود',
          value: 'O'
        },
        {
          title: 'نقطه قوت',
          value: 'S'
        }
      ],
      isClosedAgreement: false,
    }
  },
  created() {
    this.getIndicators();
    this.getOpenAgreements();
  },
  methods: {
    async recordEvent() {
      try {
        this.loading = true;
        await this.$axios.post(routes.recordEventAgreement, {
          type_report: "E",
          be_evaluated: localStorage.getItem('beEvaluatedUserId'),  //ایدی ارزیابی شونده
          date_report: this.dateComputed,
          deadline: this.dateComputed,
          agreement: this.agreement,
          description: this.description,
          assessment_type: this.evaluate,
          indicators: this.indicator,
          is_open_agreement: !this.isClosedAgreement,
        });
        this.$toast.success('واقعه با موفقیت ثبت شد');
        this.eventDate = '';
        this.agreement = '';
        this.description = '';
        this.evaluate = '';
        this.indicator = '';
        this.$refs.pdp.$refs.persianDatePicker.$refs.pdpInput.value = null;
        this.isClosedAgreement = false;
        this.getOpenAgreements();
      } catch (error) {
        this.$toast.error('خطایی رخ داده است دوباره تلاش کنید');
        console.log(error.response.data);
      } finally {
        this.loading = false;
      }
    },
    async getIndicators() {
      try {
        const response = await this.$axios.get(routes.indicators);
        this.indicators = response?.data?.results;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getReportEventAgreements() {
      try {
        const response = await this.$axios.post(routes.reportEventAgreements, {
          staff: localStorage.getItem('beEvaluatedUserId')
        })
        this.reports = response.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getOpenAgreements() {
      try {
        const response = await this.$axios.post(routes.openAgreements, {
          staff: localStorage.getItem('beEvaluatedUserId'),
        })
        this.openAgreements = response.data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    getSelectedAgreement(e) {
      this.agreement = this.openAgreements.find(agree => agree.id == e);
      this.indicator = this.indicators.find(indicator => indicator.id == this.agreement.indicators).id;
      this.agreement = this.openAgreements.find(agree => agree.id == e).id;
    }
  },
  computed: {
    dateComputed() {
      return this.$refs?.pdp?.$refs?.persianDatePicker?.$refs?.pdpInput?.value.replaceAll('/', '-');
    },
  }
};
</script>

<style lang="scss" scoped>
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
