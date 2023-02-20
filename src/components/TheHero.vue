<template>
    <div class="hero" :style="{ background: heroBackground }">
        <div class="container">
            <div class="content">
                <h1>{{ props.movie.title ? props.movie.title : props.movie.name }}</h1>
                <div class="subheading">
                    <a v-for="genre in props.movie.genre_ids" class="category" :key="genre">{{
                        genresStore.getMovieGenreById(genre).name
                    }}</a>
                    <div class="rating">
                        <img src="../assets/icons/star.svg" style="stroke: white" />
                        <span>{{ (props.movie.vote_average / 2).toFixed(2) }}</span>
                    </div>
                </div>
                <button @click="seeMore">Zobacz więcej</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useGenresStore } from '../stores/genres.js'
import router from '@/router'

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
})

const genresStore = useGenresStore()

// make hero background dynamic
const heroBackground = computed(() => {
    return `linear-gradient(90deg, rgba(15, 23, 42, 0.7) 0%, rgba(0, 0, 0, 0) 81.18%), url('https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}') center no-repeat`
})

// navigate to movie details page
const seeMore = () => {
    if (props.movie.media_type == 'movie') {
        router.push(`/movie/${props.movie.id}`)
    } else {
        router.push(`/tv/${props.movie.id}`)
    }
}
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
h1 {
    font-size: 48px;
}
.category {
    color: #e2e8f0;
    font-size: 16px;
    margin-right: 8px;
}

button {
    background: #4f46e5;
    color: white;
    border: none;
    padding: 10px 22px;
    border-radius: 8px;
    margin-top: 30px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
}

.subheading {
    display: flex;
    align-items: center;
}

.rating {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.rating span {
    margin-left: 5px;
}
</style>
