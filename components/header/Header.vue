<template>
    <div class="header">
        <img src="@/components/icons/vispar-logo-text.png" class="logo-header" />
        <!-- <v-switch
            class="switch"
            v-model="themeIsDark"
            inset
            label="تم تاریک"
            color="indigo"
            @change="toggleTeme"
        ></v-switch> -->
        <div class="header-logout" @click="logout">خروج</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            themeIsDark: false
        }
    },
    mounted() {
        if (this.getTheme()) {
            this.themeIsDark = this.getTheme() === 'dark-theme';
        } else {
            this.themeIsDark = false
        }
    },
    methods: {
        getTheme () {
            return localStorage.getItem('user-theme');
        },
        toggleTeme() {
            if (this.themeIsDark) {
                localStorage.setItem('user-theme', 'dark-theme');
                document.documentElement.className = 'dark-theme';
            } else {
                localStorage.setItem('user-theme', 'light-theme');
                document.documentElement.className = 'light-theme';
            }
        },
        logout () {
            localStorage.clear();
            this.$router.push('/account/login/');
            this.$toast.info('با موفقیت خارج شدید')
        }
    }
}
</script>

<style lang="scss">
    .header {
        position: fixed;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background:linear-gradient(10deg, var(--color-blue-sky), var(--color-purple)) !important;
        height: 5rem;
        padding: 0 1.5rem 0 2.5rem;
        @media screen and (max-width: 700px) {
            padding: 0 0 0 1rem;
        }
        .logo-header {
            height: 100%;
        }
        .switch {
            .v-input--switch__track {
                color: rgba(255, 255, 255, 0.9);
            }
        }
        .header-logout {
            color: var(--color-white);
            cursor: pointer;
            user-select: none;
        }
    }
</style>

