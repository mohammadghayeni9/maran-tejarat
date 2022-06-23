<template>
  <div class="event-form">
    <v-col cols="10 mb-5" class="event-form-title">ثبت وقایع مهم</v-col>
    <v-col cols="2 justify-end d-flex">
      <SVGBack class="back-icon" @click="$router.push('/')" />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <persianDatePicker placeholder="تاریخ" @select="selectEventDate" ref="pdp"/>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-select
        :items="items"
        label="انتخاب توافق صورت گرفته"
        outlined
        v-model="agreement"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-text-field label="شرح" outlined v-model="description"></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-select :items="indicators" item-text="name" item-value="axes" label="انتخاب شاخص" outlined v-model="indicator"></v-select>
    </v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-select :items="evaluates" item-text="title" item-value="value" label="ارزیابی" outlined v-model="evaluate"></v-select>
    </v-col>
    <v-col cols="12"></v-col>
    <v-col cols="12" sm="6" lg="4" class="pb-0">
      <v-btn class="event-form-btn disable-btn" elevation="2" v-if="loading">
        <img :src="require('assets/images/loading.gif')" alt="loading">
      </v-btn>
      <v-btn class="event-form-btn" elevation="2" @click="recordEvent" v-else>ثبت واقعه مهم</v-btn>
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
    SVGBack,
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
      evaluates: [
        {
          title: 'فرصت بهبود',
          value: 'O'
        },
        {
          title: 'نقطه قوت',
          value: 'S'
        }
      ]
    }
  },
  mounted() {
    this.getIndicators();
  },
  methods: {
    async recordEvent() {
      try {
        this.loading = true;
        await this.$axios.post(routes.recordEventAgreement, {
          type_report: "E",
          be_evaluated: localStorage.getItem('beEvaluatedUserId'),  //ایدی ارزیابی شونده
          date_report: this.dateComputed,
          agreement: this.agreemnet,
          description: this.description,
          evaluate: this.evaluate,
          indicators: this.indicator
        });
        this.$toast.success('توافق با موفقیت ثبت شد');
        this.eventDate = '';
        this.agreement = '';
        this.description = '';
        this.evaluate = '';
        this.indicator = '';
        this.$refs.pdp.$refs.persianDatePicker.$refs.pdpInput.value = null
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
  computed: {
    dateComputed() {
      return this.$refs?.pdp?.$refs?.persianDatePicker?.$refs?.pdpInput?.value.replaceAll('/', '-');
    }
  }
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
  .disable-btn {
    cursor: default;
    pointer-events: none;
  }
}
</style>
