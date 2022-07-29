<template>
  <div class="card-container">
    <div class="card-content">
      <img class="card-avatar" :src="avatarComputed" alt="avatar">
      <div class="card-title">{{ cardData.first_name }} {{cardData.last_name}}</div>
    </div>
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
            @click="setNameAndId(cardData.id, cardData.first_name + ' ' + cardData.last_name)"
          >
            <span>ثبت</span>
          </button>
        </template>

        <v-list>
          <v-list-item
            v-for="item in recordListDropdown"
            :key="item.title"
            link
            :to="'/forms/' + item.link + '/'"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <button class="card-btn assessment-btn" @click="goToEvaluate(cardData.id, cardData.first_name + ' ' + cardData.last_name)">
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
            @click="setNameAndId(cardData.id, cardData.first_name + ' ' + cardData.last_name)"
          >
            <span>گزارش‌ها</span>
          </button>
        </template>

        <v-list>
          <v-list-item
            v-for="item in reportListDropdown"
            :key="item.title"
            link
            :to="'/report/' + item.link + '/'"
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
      id: null,
      recordListDropdown: [
        {
          title: 'ثبت واقعه مهم',
          link: 'event'
        },
        {
          title: 'ثبت توافق',
          link: 'agreement'
        },
        {
          title: 'ثبت جلسه بازخورد',
          link: 'meeting'
        }
      ],
      reportListDropdown: [
        {
          title: 'مشاهده وقایع مهم/توافقات',
          link: 'eventagreement'
        },
        {
          title: 'مشاهده سوابق ارزیابی دوره‌ای',
          link: 'evaluate'
        },
        {
          title: 'مشاهده جلسات بازخورد',
          link: 'meeting'
        }
      ]
    }
  },
  computed: {
    avatarComputed: function() {
      return this.cardData?.picture || require('@/assets/images/placeholder.png');
    },
  },
  methods: {
    setNameAndId(id, name) {
      localStorage.setItem('beEvaluatedUserId', id);
      localStorage.setItem('beEvaluatedUser', name);
    },
    goToEvaluate(id, name) {
      localStorage.setItem('beEvaluatedUserId', id);
      localStorage.setItem('beEvaluatedUser', name);
      if (localStorage.getItem('isEvalTime') == 'true') {
        this.$router.push('/evaluate/');
      } else {
        this.$toast.info('در بازه زمانی ارزیابی قرار نداریم')
      }
    },
  }
}
</script>

<style lang="scss">
.card-container {
  position: relative;
  display: flex;
  flex-flow: column;
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  border: 1px solid var(--color-blue-dark);
  box-shadow: 1px 1px 5px var(--card-box-shadow);
  row-gap: 2rem;
  transition: all 0.5s ease;
  background-color: var(--background-color-primary-lighter);
  min-width: 320px;
  max-width: 520px;
  height: 5.7rem;
  overflow: hidden;
  &:hover {
    box-shadow: var(--card-box-shadow-hover) var(--card-box-shadow);
    height: 9rem;
  }
  .card-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    .card-avatar {
      max-width: 4.5rem;
      min-width: 4.5rem;
      max-height: 4.5rem;
      min-height: 4.5rem;
      border-radius: 50%;
      object-fit: cover;
      padding: 2px;
      border: 2px solid var(--color-blue);
    }
    .card-title {
      text-align: center;
      font-size: 1.05rem;
      color: var(--text-color-primary);
      user-select: none;
    }
  }
  .card-actions {
    position: absolute;
    top: 5.75rem;
    left: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    column-gap: 0.75rem;
    .card-btn {
      outline: none;
      border: none;
      border-radius: 0.4rem;
      padding: 0.3rem 0.8rem;
      // color: var(--text-color-primary);
      color: #fff;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.4s ease;
      box-shadow: 0 3px 10px var(--card-box-shadow);
      width: 5.5rem;
      font-size: 0.8rem;
    }
    .record-btn {
      background-color: var(--color-green);
      &:hover {
        background-color: var(--background-color-primary);
        border: 2px solid var(--color-green);
        color: var(--text-color-primary);
      }
    }
    .assessment-btn {
      background-color: var(--color-blue-sky);
      &:hover {
        background-color: var(--background-color-primary);
        border: 2px solid var(--color-blue-sky);
        color: var(--text-color-primary);
      }
    }
    .report-btn {
      background-color: var(--color-red);
      &:hover {
        background-color: var(--background-color-primary);
        border: 2px solid var(--color-red);
        color: var(--text-color-primary);
      }
    }
  }
}
.v-list-item__title {
  font-size: 0.8rem !important;
}
</style>
