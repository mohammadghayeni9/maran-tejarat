<template>
  <div class="login-view" @keypress.enter="login">
    <SVGBlob1 class="svg-blob1" />
    <SVGBlob2 class="svg-blob2" />
    <SVGBlob3 class="svg-blob3" />
    <div class="login-view-container">
      <div class="login-view-wrapper">
        <img
          class="login-view-logo"
          :src="require('@/components/icons/vispar-logo.png')"
        />
        <div class="login-view-title">
          به سامانه مدیریت عملکرد گروه صنعتی ویسپار خوش آمدید
        </div>
      </div>
      <div class="login-view-form">
        <input
          type="text"
          v-model="username"
          placeholder="نام کاربری خود را وارد نمایید"
          class="login-input"
        />
        <input
          type="password"
          v-model="password"
          placeholder="رمز عبور خود را وارد نمایید"
          class="login-input"
        />
        <button class="login-button" @click="login">ورود</button>
      </div>
    </div>
  </div>
</template>

<script>
import SVGBlob1 from "~/components/icons/blob1.svg";
import SVGBlob2 from "~/components/icons/blob2.svg";
import SVGBlob3 from "~/components/icons/blob3.svg";

import { routes } from "~/API/routes";

export default {
  components: {
    SVGBlob1,
    SVGBlob2,
    SVGBlob3,
  },
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    async login() {
      localStorage.clear();
      if (this.username.length && this.password.length) {
        try {
          const response = await this.$axios.$post(routes.login, {
            email: this.username,
            password: this.password,
          });
          localStorage.setItem("access_token", response.access);
          localStorage.setItem("refresh_token", response.refresh);
          this.$toast.success('با موفقیت وارد شدید');
          this.$router.push("/");
        } catch (e) {
          if (e.response?.status === 401) {
            this.$toast.error('نام کاربری یا رمز ورود اشتباه وارد شده است');
          }
        }
      } else {
        this.$toast.error('نام کاربری و رمز ورود الزامی است');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #eeeef4;
  position: relative;
  overflow: hidden;
  .svg-blob1 {
    position: absolute;
    top: 15rem;
    right: 5rem;
    width: 45rem;
    height: 45rem;
    animation-name: blob-animate;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .svg-blob2 {
    position: absolute;
    top: -4rem;
    left: 0;
    right: 0;
    margin: auto;
    width: 25rem;
    height: 25rem;
    animation-name: blob-animate;
    animation-duration: 8s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .svg-blob3 {
    position: absolute;
    top: 30rem;
    left: 10rem;
    width: 30rem;
    height: 30rem;
    animation-name: blob-animate;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .login-view-container {
    border: 1px solid #c0c8ee;
    width: 65vw;
    height: 75vh;
    margin: auto;
    border-radius: 2rem;
    box-shadow: 0 0 25px #aaaaaa25;
    backdrop-filter: blur(30px);

    @media screen and (max-width: 1000px) {
      width: 80vw;
      height: 85vh;
    }
    @media screen and (max-width: 650px) {
      width: 95vw;
      height: 95vh;
    }
    .login-view-wrapper {
      .login-view-logo {
        display: flex;
        justify-content: center;
        margin: 1.5rem auto;
        width: 10rem;
        height: 10rem;
      }
      .login-view-title {
        display: flex;
        justify-content: center;
        color: #222;
        font-size: 1.25rem;
        text-align: center;
        margin: 1rem 2.5rem;
      }
    }
    .login-view-form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 2rem;
      max-width: 20rem;
      margin: auto;
      @media screen and (max-width: 420px) {
        max-width: 100%;
        margin: 0 2.5rem;
      }
      .login-input {
        outline: none;
        border: 1px solid #c0c8ee;
        border-radius: var(--input-border-radius);
        margin-top: 1.5rem;
        width: 100%;
        padding: var(--input-padding);
        background-color: #f0f3f9;
        &::placeholder {
          font-size: 0.8rem;
        }
      }
      .login-button {
        margin-top: 4rem;
        outline: none;
        border: none;
        padding: var(--input-padding);
        border-radius: var(--input-border-radius);
        width: 100%;
        background-color: #0ca2b9;
        color: white;
        cursor: pointer;
        &.disabled {
          pointer-events: none;
          background-color: rgb(165, 175, 195);
        }
      }
    }
  }
}
</style>
