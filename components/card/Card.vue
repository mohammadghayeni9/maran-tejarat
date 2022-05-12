<template>
  <div class="card-container">
    <div class="card-title">title {{ cardData }}</div>
    <div class="card-actions">
      <button class="card-btn record-btn" @click="showRecordModal">
        <span>ثبت</span>
      </button>
      <button class="card-btn assessment-btn">
        <span>امتیازدهی</span>
      </button>
      <button class="card-btn report-btn" @click="showReportModal">
        <span>گزارش‌ها</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: Number,
  }
}

</script>

<style scoped lang="scss">
.card-container {
  display: flex;
  flex-flow: column;
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  border: 1px solid var(--color-green);
  box-shadow: 1px 1px 5px var(--card-box-shadow);
  row-gap: 2rem;
  transition: box-shadow 0.6s ease;
  background-color: var(--background-color-primary);
  min-width: 320px;
  max-width: 520px;
  &:hover {
    box-shadow: var(--card-box-shadow-hover) var(--card-box-shadow);
  }
  .card-title {
    text-align: center;
    font-size: 1.25rem;
    font-family: vazir-medium;
    color: var(--text-color-primary);
  }
  .card-actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    column-gap: 0.75rem;
    .card-btn {
      outline: none;
      border: none;
      border-radius: 0.4rem;
      padding: 0.3rem 0.8rem;
      color: var(--text-color-primary);
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.4s ease;
      box-shadow: 0 3px 10px var(--card-box-shadow);
      width: 5rem;
      font-size: 0.8rem;
    }
    .record-btn {
      background-color: var(--color-green);
      &:hover {
        background-color: transparent;
        border: 2px solid var(--color-green);
      }
    }
    .assessment-btn {
      background-color: var(--color-blue);
      &:hover {
        background-color: transparent;
        border: 2px solid var(--color-blue);
      }
    }
    .report-btn {
      background-color: var(--color-red);
      &:hover {
        background-color: transparent;
        border: 2px solid var(--color-red);
      }
    }
  }
}
</style>
