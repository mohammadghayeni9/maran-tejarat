<template>
    <div>
      <div v-if="users.length">
        <div class="home-header">
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
        <div class="loading" v-if="loading">
            <img :src="require('assets/images/loading.gif')" alt="loading">
        </div>
        <perfect-scrollbar class="home-content" v-else>
            <div class="home-card" v-for="user in searchedUsers" :key="user.id">
                <Card :cardData="user" />
            </div>
        </perfect-scrollbar>
      </div>
      <v-col  cols="12" class="d-flex justify-center mt-5" v-if="!users.length || !searchedUsers.length">
        کاربری یافت نشد
      </v-col>
    </div>
</template>

<script>
import Card from "@/components/card/Card.vue";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
    components: {
        Card,
        PerfectScrollbar,
    },
    props: {
        users: [],
        loading: false,
        unit: '',
    },
    data() {
        return {
            searchValue: '',
        }
    },
    computed: {
        searchedUsers: function () {
            return this.users.filter(user => 
                (user?.first_name.includes(this.searchValue) || 
                user?.last_name.includes(this.searchValue) || 
                (user?.first_name + ' ' + user?.last_name).includes(this.searchValue)) && user.unit == this.unit[1]
            );
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
    justify-content: center;
    column-gap: 1rem;
    padding: 0.75rem;
    overflow: hidden;
    margin-top: 1rem;
    .subject-list-title {
      font-size: 1.2rem;
      white-space: nowrap;
    }
    .search-box {
      width: 75%;
      max-width: 24rem;
      display: flex;
      position: relative;
      @media screen and (max-width: 400px) {
        width: 100%;
      }
    }
    .search-input {
      border: var(--color-blue-dark) solid 2px;
      background: var(--background-color-primary);
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
    padding: 1rem 0.2rem 10rem 0.2rem;
    max-height: 80vh;
    overflow-y: auto;
    row-gap: 1rem;
    .home-card {
      margin-bottom: 1rem;
      padding: 0 0.5rem;
      min-width: 33%;
      @media screen and (max-width: 400px) {
        padding: 0;
      }
    }
  }
}
</style>
