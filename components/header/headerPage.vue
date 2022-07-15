<template>
    <div class="header-page mb-5">
        <v-col cols="9" lg="4" class="header-page-title">
            {{ title }}<span v-if="seasonVisible"> {{ seasonComputed }} </span>
        </v-col>
        <v-col cols="12" lg="4" class="header-page-name d-flex justify-center order-4 order-lg-3" v-if="nameComputed.length">
            {{ nameComputed }}
        </v-col>
        <v-col cols="3" lg="4" class="justify-end d-flex order-3 order-lg-4">
            <SVGBack class="back-icon" @click="$router.push('/')" />
        </v-col>
    </div>
</template>

<script>
import SVGBack from "@/components/icons/back-icon.svg"

export default {
    components: {
        SVGBack,
    },
    props: {
        title: '',
        seasonVisible: false
    },
    computed: {
        seasonComputed() {
            const season = localStorage.getItem('season');
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
    .back-icon {
        object-fit: cover;
        max-height: 2rem;
        width: fit-content;
        margin-right: auto;
        cursor: pointer;
    }
}
</style>
