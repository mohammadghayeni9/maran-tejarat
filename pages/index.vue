<template>
  <div class="home-view">
    <div class="home-header">
      <div class="subject-list-title">لیست همکاران</div>
      <div class="search-box">
        <input
          type="text"
          class="search-input"
          ref="inputSearch"
          placeholder="جستجو"
        />
        <div class="icon-search">
          <img src="@/components/icons/icon-search.png" alt="" />
        </div>
      </div>
    </div>
    <perfect-scrollbar class="home-content">
      <div class="home-card" v-for="i in 20" :key="i">
        <Card :cardData="i" />
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import Card from "@/components/card/Card.vue";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  components: {
    Card,
    PerfectScrollbar
  }
}
</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>

<style scoped lang="scss">
.home-view {
  padding: 2rem 1rem;
  margin: auto;
  max-width: 80vw;
  overflow: hidden;
  @media screen and (max-width: 700px) {
    max-width: 100vw;
  }
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
    align-items: center;
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

