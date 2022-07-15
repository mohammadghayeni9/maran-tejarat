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
        <div class="header-menu">
            <v-menu v-model="showMenu" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <div class="header-menu-box" v-bind="attrs" v-on="on">
                        <span>{{ meUsernameComputed }}</span>
                        <img :src="meAvatarComputed" alt="placeholder" class="avatar-image">
                    </div>
                </template>

                <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index" @click="item.handler">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <!-- <div class="header-logout" @click="logout">خروج</div> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            themeIsDark: false,
            showMenu: false,
            items: [
                { 
                    title: 'تغییر رمز ورود',
                    handler: () => {
                        this.$router.push('/account/changepassword/');
                    }
                },
                {
                    title: 'خروج',
                    handler: () => {
                        this.logout();
                    }
                },
            ],
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
        goToChangePassword() {
            this.$router.push('/account/changepassword/');
        },
        logout () {
            localStorage.clear();
            this.$router.push('/account/login/');
            this.$toast.info('با موفقیت خارج شدید')
        }
    },
    computed: {
        meUsernameComputed() {
            return localStorage.getItem('meFullName')
        },
        meAvatarComputed() {
            return this.$axios.defaults.baseURL + localStorage.getItem('meAvatar');
        }
    },
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
        // .switch {
        //     .v-input--switch__track {
        //         color: rgba(255, 255, 255, 0.9);
        //     }
        // }
        .header-menu {
            .header-menu-box {
                display: flex;
                align-items: center;
                column-gap: 0.75rem;
                user-select: none;
                span {
                    color: white;
                }
                .avatar-image {
                    object-fit: cover;
                    max-width: 3.25rem;
                    max-height: 3.25rem;
                    min-width: 3.25rem;
                    min-height: 3.25rem;
                    border-radius: 50%;
                    padding: 2px;
                    border: 2px solid var(--color-purple);
                }
            }
        }
        .header-logout {
            color: var(--color-white);
            cursor: pointer;
            user-select: none;
        }
    }
</style>

