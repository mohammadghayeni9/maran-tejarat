<template>
  <div class="meeting-form">
    <v-col cols="10 mb-5" class="meeting-form-title">ثبت جلسه بازخورد</v-col>
    <v-col cols="2 justify-end d-flex">
      <SVGBack class="back-icon" @click="$router.push('/')" />
    </v-col>
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
  </div>
</template>

<script>
import persianDatePicker from "@/components/datePicker/persianDatePicker.vue";
import SVGBack from "@/components/icons/back-icon.svg";
import { routes } from "~/API/routes";

export default {
  components: {
    persianDatePicker,
    SVGBack
  },
  data() {
    return {
      loading: false,
      meetingDate: null,
      description: null,
    }
  },
  methods: {
    async recordMeeting() {
      try {
        this.loading = true;
        await this.$axios.post(routes.recordMeeting, {
          be_evaluated: this.$route.params.id,
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
  },
  computed: {
    dateReportComputed() {
      return this.$refs?.pdp?.$refs?.persianDatePicker?.$refs?.pdpInput?.value.replaceAll('/', '-');
    }
  }
};
</script>

<style lang="scss" scoped>
.meeting-form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
