<template>
    <div class="season-tile">
        <img :src="`https://image.tmdb.org/t/p/w200${props.season.poster_path}`" alt="" />
        <div class="season-info">
            <header>
                <h3>{{ props.season.name }}</h3>
                <p>
                    {{ getYearFromDate(props.season.air_date).year }} •
                    {{ props.season.episode_count }} odcinków
                </p>
            </header>
            <p v-if="props.season.overview">{{ props.season.overview }}</p>
            <p v-else>Premiera sezonu odbyła się {{ formatDate(props.season.air_date) }}</p>
            <button>Przejdź do sezonu</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    season: {
        type: Object,
        required: true,
    },
})

// format date
function getYearFromDate(dateString) {
    const [year, month, day] = dateString.split('-')
    return { year, month, day }
}

function formatDate(dateString) {
    const months = [
        'stycznia',
        'lutego',
        'marca',
        'kwietnia',
        'maja',
        'czerwca',
        'lipca',
        'sierpnia',
        'września',
        'października',
        'listopada',
        'grudnia',
    ]

    const date = new Date(dateString)
    const day = date.getDate()
    const monthName = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${monthName} ${year} roku`
}
</script>

<style scoped>
.season-tile {
    display: flex;
    align-items: center;
}

img {
    width: 130px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 20px;
}

header {
    display: flex;
    align-items: center;
}

header p {
    margin-left: 10px;
    font-size: 12px;
}

h3 {
    font-size: 16px;
    margin-bottom: 4px;
}

p {
    font-size: 14px;
    color: #cbd5e1;
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
    width: max-content;
}
</style>
