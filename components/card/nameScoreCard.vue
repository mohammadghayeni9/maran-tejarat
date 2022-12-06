<template>
    <div class="name-score-wrapper mx-auto text-center">
        <div class="name-score-wrapper__title col-12 mx-auto">{{ title }}</div>
        <div class="name-score-wrapper__name col-12 mx-auto">{{ name }}</div>
        <div class="name-score-wrapper__score col-12 mx-auto">{{ score }}</div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            default: 0
        }
    }
}
</script>
<style lang="scss" scoped>
.name-score-wrapper {
    &__title {
        font-size: 1.25rem;
    }
    &__name {
        margin-top: 12px;
    }
    &__score {
        font-family: iranSansFaNum;
    }
}
</style>