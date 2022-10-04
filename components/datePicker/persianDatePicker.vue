<template>
  <date-picker
    :styles="styles"
    :column="1"
    mode="single"
    id="date-picker"
    ref="persianDatePicker"
    :placeholder="placeholder"
  ></date-picker>
</template>

<script>
import datePicker from "@alireza-ab/vue-persian-datepicker";

export default {
  props: {
    placeholder: '',
  },
  components: {
    datePicker,
  },
  data() {
    return {
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
    };
  },
};
</script>

<style lang="scss">
.pdp {
  font-family: iranSansFaNum;
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
</style>
