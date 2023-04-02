<template>
    <div class="change-password">
        <HeaderPage title="تغییر رمز ورود" :seasonVisible="false" :nameVisible="false"></HeaderPage>
        <v-col cols="12" sm="6" lg="4" class="pb-0">
            <v-text-field label="رمز کنونی" outlined type="password" v-model="oldPassword"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" lg="4" class="pb-0">
            <v-text-field label="رمز جدید" outlined type="password" v-model="newPassword"></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-end pb-0">
            <v-btn elevation="2" v-if="loading">
                <img :src="require('assets/images/loading.gif')" alt="loading">
            </v-btn>
            <v-btn elevation="2" @click="changePassword" v-else>تغییر رمز ورود</v-btn>
        </v-col>
    </div>
</template>

<script>
import { routes } from "~/API/routes";

export default {
    data() {
        return {
            oldPassword: null,
            newPassword: null,
            confirmNewPassword: null,
            loading: false,
        }
    },
    methods: {
        async changePassword () {
            if (this.oldPassword && this.newPassword) {
                try {
                    this.loading = true;
                    await this.$axios.put(routes.changePassword, {
                        old_password: this.oldPassword,
                        new_password: this.newPassword
                    });
                    this.$toast.success('رمز ورود با موفقیت تغییر یافت');
                } catch (e) {
                    this.$toast.error(e.response.data.old_password);
                } finally {
                    this.loading = false;
                }
            } else {
                this.$toast.error('تمام موارد الزامی می‌باشد');
            }
        }
    },
}

</script>

<style lang="scss" scoped>

.change-password {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    flex-wrap: wrap;
}
</style>
