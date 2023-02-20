<template>
    <main v-if="isDataLoaded">
        <TheHero :movie="firstTrendingMovie" />
        {{ genresStore.getMovieGenreById() }}
    </main>
</template>

<script setup>
import movieDB from '../services/movieDB'
import { ref } from 'vue'
import TheHero from '../components/TheHero.vue'
import { useGenresStore } from '../stores/genres.js'

const trendingMovies = ref([])

const firstTrendingMovie = ref({})

const isDataLoaded = ref(false)

const getTrendingMovies = async () => {
    const response = await movieDB.get('/trending/all/week')
    trendingMovies.value = response.data.results

    firstTrendingMovie.value = trendingMovies.value[0]
    isDataLoaded.value = true
    // console.log(firstTrendingMovie.value)
}

getTrendingMovies()

const genresStore = useGenresStore()
</script>

<style scoped></style>
