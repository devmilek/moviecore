<template>
    <div class="cast-tile">
        <img :src="`https://image.tmdb.org/t/p/w200${props.cast.profile_path}`" alt="" />
        <div class="cast-info">
            <h3>{{ props.cast.name }}</h3>
            <p>{{ props.cast.character ? props.cast.character : props.cast.job }}</p>
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

<style scoped>
.cast-tile {
    display: flex;
    align-items: center;
}

.cast-tile img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
}

.cast-tile h3 {
    font-size: 16px;
    margin-bottom: 4px;
}

.cast-tile p {
    font-size: 14px;
    color: #cbd5e1;
}
</style>
