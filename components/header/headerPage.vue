<template>
    <div class="header-page mb-5">
        <v-col cols="9" lg="4" class="header-page-title">
            {{ title }}<span v-if="seasonVisible"> {{ seasonComputed }} </span>
        </v-col>
        <v-col cols="12" lg="4" class="header-page-name d-flex justify-center order-4 order-lg-3"
            v-if="nameComputed.length && nameVisible">
            {{ nameComputed }}
        </v-col>
        <v-col cols="3" lg="4" class="justify-end d-flex order-3 order-lg-4">
            <v-btn class="px-5 py-4" outlined @click="$router.push('/')">بازگشت</v-btn>
        </v-col>
    </div>
</template>

<script>
export default {
    props: {
        title: '',
        seasonVisible: false,
        nameVisible: {
            default: true
        },
        isEvaluatePage: false,
    },
    computed: {
        seasonComputed() {
            let season;
            if (this.isEvaluatePage) {
                season = localStorage.getItem('season_eval');
            } else {
                season = localStorage.getItem('season');
            }
            if (season === 'B') {
                return 'بهار';
            } else if (season === 'T') {
                return 'تابستان';
            } else if (season === 'P') {
                return 'پاییز';
            } else {
                return 'زمستان';
            }
        },
        nameComputed() {
            return localStorage.getItem('beEvaluatedUser');
        },
    }
}

</script>

<style lang="scss" scoped>
.header-page {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    .header-page-title {
        font-size: 1.25rem;
    }
}
</style>
