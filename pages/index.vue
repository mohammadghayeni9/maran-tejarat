<template>
  <div class="home-view">
    <div class="home-header">
      <div class="subject-list-title">اسامی همکاران</div>
      <div class="search-box">
        <input
          type="text"
          class="search-input"
          placeholder="جستجو"
          v-model="searchValue"
        />
        <div class="icon-search">
          <img src="@/components/icons/icon-search.png" alt="" />
        </div>
      </div>
    </div>
    <perfect-scrollbar class="home-content">
      <div class="home-card" v-for="user in searchedUsers" :key="user.id">
        <Card :cardData="user" />
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import Card from "@/components/card/Card.vue";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { routes } from "~/API/routes";

export default {
  components: {
    Card,
    PerfectScrollbar,
  },
  data() {
    return {
      searchValue: '',
      users: [],
      cards: [
        {
          id: 1,
          title: 'کاربر شماره 1',
          avatar: require('@/static/icon.png')
        },
        {
          id: 2,
          title: 'کاربر شماره 2',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 3,
          title: 'کاربر شماره 3',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 4,
          title: 'کاربر شماره 4',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 5,
          title: 'کاربر شماره 5',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 6,
          title: 'کاربر شماره 6',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 7,
          title: 'کاربر شماره 7',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 8,
          title: 'کاربر شماره 8',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 9,
          title: 'کاربر شماره 9',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 10,
          title: 'کاربر شماره 10',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 11,
          title: 'کاربر شماره 11',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 12,
          title: 'کاربر شماره 12',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 13,
          title: 'کاربر شماره 13',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 14,
          title: 'کاربر شماره 14',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 15,
          title: 'کاربر شماره 15',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 16,
          title: 'کاربر شماره 16',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 17,
          title: 'کاربر شماره 17',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 18,
          title: 'کاربر شماره 19',
          avatar: require('@/assets/images/placeholder.png')
        },
        {
          id: 19,
          title: 'کاربر شماره 19',
          avatar: require('@/assets/images/placeholder.png')
        },
      ],
    }
  },
  methods: {
    async getUsers () {
      try {
        const response = await this.$axios.get(routes.users);
        this.users = response.data.results;
        console.log(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getUsers();
  },
  computed: {
    searchedUsers: function () {
      return this.users.filter(user => user?.first_name.includes(this.searchValue) || user?.last_name.includes(this.searchValue) || (user?.first_name + ' ' + user?.last_name).includes(this.searchValue));
    }
  },
}
</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>

<style scoped lang="scss">
.home-view {
  .home-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;
    padding: 0.75rem;
    overflow: hidden;
    .subject-list-title {
      font-size: 1.2rem;
      white-space: nowrap;
    }
    .search-box {
      width: 75%;
      max-width: 24rem;
      display: flex;
      position: relative;
    }
    .search-input {
      border: var(--color-blue) solid 3px;
      background: var(--background-color-primary-lighter);
      color: var(--text-primary-color);
      border-radius: 50px;
      outline: none;
      height: calc(2rem + 18px);
      padding: var(--input-padding);
      width: 100%;
      transition: box-shadow 0.6s 0.1s;
      &:hover {
        box-shadow: var(--input-box-shadow-hover) var(--card-box-shadow);
        transition: box-shadow 0.6s;
      }
    }
    .icon-search {
      position: absolute;
      left: 5px;
      width: 2.5rem;
      text-align: center;
      height: 2.5rem;
      img {
        margin: 0.7rem 0 0 0;
      }
    }
  }
  .home-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem 0.2rem;
    max-height: 80vh;
    overflow-y: auto;
    row-gap: 1rem;
    .home-card {
      padding: 0 0.5rem;
      min-width: 33%;
      @media screen and (max-width: 400px) {
        padding: 0;
      }
    }
  }
}
</style>

