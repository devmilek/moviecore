<template>
    <main v-if="isDataLoaded">
        <div class="container">
            <div class="left-side">
                <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="poster" />
            </div>
            <div class="right-side">
                <header>
                    <h1>{{ movie.title ? movie.title : movie.name }}</h1>
                    <div class="subheading">
                        <div class="genres-container">
                            <router-link
                                to=""
                                v-for="genre in movie.genres"
                                class="genre"
                                :key="genre.id"
                                >{{ genre.name }}</router-link
                            >
                        </div>
                        <div class="infos-container">
                            <div class="info">
                                <img src="../assets/icons/calendar.svg" />
                                {{
                                    route.params.mediaType === 'series'
                                        ? movie.first_air_date
                                        : movie.release_date
                                }}
                            </div>
                            <div class="info">
                                <img src="../assets/icons/clock.svg" />
                                {{
                                    route.params.mediaType === 'series'
                                        ? formatMinutes(movie.episode_run_time[0])
                                        : formatMinutes(movie.runtime)
                                }}
                            </div>
                            <div class="info">
                                <img src="../assets/icons/star.svg" />
                                {{ (movie.vote_average / 2).toFixed(2) }}
                            </div>
                        </div>
                    </div>
                </header>

                <!--MOVIE / SERIE DESC-->
                <article>
                    <h2>Opis</h2>
                    <p>{{ movie.overview }}</p>
                </article>

                <!--COLLECTION-->
                <article
                    v-if="movie.belongs_to_collection"
                    :style="{ background: collectionBackground }"
                    class="collection"
                >
                    <h2>{{ movie.belongs_to_collection.name }}</h2>
                    <p>Zobacz wszystkie części serii</p>
                    <button>Zobacz więcej</button>
                </article>

                <!--SEASONS-->
                <article v-if="route.params.mediaType === 'series'">
                    <header>
                        <h2>Sezony</h2>
                        <p>Zobacz wszystkie sezony</p>
                    </header>
                    <div class="seasons-container">
                        <SeasonTile
                            v-for="season in movie.seasons"
                            :key="season.id"
                            :season="season"
                        />
                    </div>
                </article>

                <!--CAST-->
                <article>
                    <header>
                        <h2>Obsada</h2>
                        <p>Zobacz pełną obsadę</p>
                    </header>
                    <div class="cast-container">
                        <CastTile
                            v-for="cast in movie.credits.cast.splice(0, 6)"
                            :key="cast.id"
                            :cast="cast"
                        />
                    </div>
                </article>

                <!--CREW-->
                <article>
                    <header>
                        <h2>Załoga</h2>
                        <p>Zobacz pełną załogę</p>
                    </header>
                    <div class="cast-container">
                        <CastTile
                            v-for="cast in movie.credits.crew.splice(0, 3)"
                            :key="cast.id"
                            :cast="cast"
                        />
                    </div>
                </article>

                <!--KEYWORDS-->
                <article v-if="movie.keywords">
                    <h2>Słowa kluczowe</h2>
                    <div class="keywords-container">
                        <router-link
                            v-for="keyword in movie.keywords.keywords"
                            :key="keyword.id"
                            :to="`/search/${keyword.name}`"
                            class="keyword"
                            >{{ keyword.name }}</router-link
                        >
                        <router-link
                            v-for="keyword in movie.keywords.results"
                            :key="keyword.id"
                            :to="`/search/${keyword.name}`"
                            class="keyword"
                            >{{ keyword.name }}</router-link
                        >
                    </div>
                </article>
            </div>
        </div>
    </main>
</template>

<script setup>
import movieDB from '../services/movieDB'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import CastTile from '@/components/CastTile.vue'
import SeasonTile from '@/components/SeasonTile.vue'

const movie = ref({})
const isDataLoaded = ref(false)
const route = useRoute()

// format minutes to hours and minutes
const formatMinutes = (min) => {
    const hours = Math.floor(min / 60)
    return hours > 0 ? `${hours}h ${min % 60}min` : `${min}min`
}

// get movie details from db
const getMovieDetails = async () => {
    if (route.params.mediaType == 'movie') {
        const response = await movieDB.get(
            `/movie/${route.params.id}?&append_to_response=watch/providers,credits,keywords`
        )
        movie.value = response.data
        isDataLoaded.value = true
    } else {
        const response = await movieDB.get(
            `/tv/${route.params.id}?&append_to_response=watch/providers,credits,keywords`
        )
        movie.value = response.data
        isDataLoaded.value = true
    }
    // console.log(movie.value)
}

// make a computed property for background image in collection
const collectionBackground = computed(() => {
    return `linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url('https://image.tmdb.org/t/p/original/${movie.value.belongs_to_collection.backdrop_path}') center no-repeat`
})

getMovieDetails()
</script>

<style scoped>
main {
    padding-top: 80px;
}
.poster {
    width: 100%;
    border-radius: 8px;
}
.container {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 35px;
    color: white;
}

.right-side {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.right-side > header h1 {
    font-size: 40px;
}

.subheading {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 30px;
}

.genres-container {
    display: flex;
    gap: 10px;
}

.genre {
    text-decoration: none;
    padding: 4px 14px;
    border: 1px solid #94a3b8;
    border-radius: 24px;
    font-weight: 500;
    font-size: 14px;
    color: #cbd5e1;
}

.infos-container {
    display: flex;
    gap: 20px;
}

.info {
    display: flex;
    align-items: center;
    font-size: 14px;
}

.info img {
    margin-right: 6px;
    width: 20px;
    height: 20px;
}

article h2 {
    font-size: 20px;
}

article p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 160%;
    margin-top: 10px;
}

.collection {
    height: 310px;
    background-size: cover !important;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 48px;
}

article button {
    background: #4f46e5;
    color: white;
    border: none;
    padding: 10px 22px;
    border-radius: 8px;
    margin-top: 30px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    width: max-content;
}

article header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

article header p {
    color: #e2e8f0;
    font-size: 14px;
    cursor: pointer;
}

.cast-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 18px;
}

.keywords-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
}

.keyword {
    text-decoration: none;
    background: #1e293b;
    border-radius: 24px;
    padding: 4px 14px;
    color: #f1f5f9;
    font-size: 14px;
}

.seasons-container {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
