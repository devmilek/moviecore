<template>
    <div class="hero" :style="{ background: heroBackground }">
        <div class="container">
            <div class="content">
                <h1>{{ props.movie.title }}</h1>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
})

const heroBackground = computed(() => {
    return `linear-gradient(90deg, rgba(15, 23, 42, 0.7) 0%, rgba(0, 0, 0, 0) 81.18%), url('https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}') center no-repeat`
})
</script>

<style scoped>
.hero {
    width: 100%;
    height: 100vh;
    background-size: cover !important;
}

.container {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    height: 100%;
}

.content {
    color: white;
    max-width: 500px;
}
</style>
