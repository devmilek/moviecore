<template>
    <div class="cast-tile">
        <img :src="`https://image.tmdb.org/t/p/w500${props.cast.profile_path}`" alt="" />
        <div class="cast-info">
            <h3>{{ props.cast.name }}</h3>
            <p>{{ props.cast.character }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    cast: {
        type: Object,
        required: true,
    },
})
</script>

<style scoped></style>
