<template>
  <div class="card-container">
    <div class="card-title">{{ cardData.title }}</div>
    <div class="card-actions">
      <v-menu
        rounded="lg"
        offset-y
        color="info"
      >
        <template v-slot:activator="{ on, attrs }">
          <button 
            class="card-btn record-btn"
            v-bind="attrs"
            v-on="on"  
          >
            <span>ثبت</span>
          </button>
        </template>

        <v-list>
          <v-list-item
            v-for="item in recordListDropdown"
            :key="item.title"
            link
            :to="item.link"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <button class="card-btn assessment-btn">
        <span>امتیازدهی</span>
      </button>
      <v-menu
        rounded="lg"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <button 
            class="card-btn report-btn"
            v-bind="attrs"
            v-on="on"
          >
            <span>گزارش‌ها</span>
          </button>
        </template>

        <v-list>
          <v-list-item
            v-for="item in reportListDropdown"
            :key="item.title"
            link
            :to="item.link"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {},
  },
  data() {
    return {
      recordListDropdown: [
        {
          title: 'ثبت وقایع مهم',
          link: '/forms/event/'
        },
        {
          title: 'ثبت توافق',
          link: '/forms/agreement/'
        },
        {
          title: 'ثبت جلسه بازخورد',
          link: '/forms/event/'
        }
      ],
      reportListDropdown: [
        {
          title: 'مشاهده وقایع مهم / توافقات',
          link: '/forms/event/'
        },
        {
          title: 'مشاهده سوابق ارزیابی دوره‌ای',
          link: '/forms/event/'
        },
        {
          title: 'مشاهده جلسات بازخورد',
          link: '/forms/event/'
        }
      ]
    }
  },
}

</script>

<style lang="scss">
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
    font-size: 1.05rem;
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
      width: 5.5rem;
      font-size: 0.8rem;
	    color: var(--color-text-primary);
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
.v-list-item__title {
  font-size: 0.8rem !important;
}
</style>
