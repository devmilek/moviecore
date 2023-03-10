import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGenresStore = defineStore('genres', () => {
    const movieGenres = ref([
        {
            id: 28,
            name: 'Akcja',
        },
        {
            id: 12,
            name: 'Przygodowy',
        },
        {
            id: 16,
            name: 'Animacja',
        },
        {
            id: 35,
            name: 'Komedia',
        },
        {
            id: 80,
            name: 'Kryminał',
        },
        {
            id: 99,
            name: 'Dokumentalny',
        },
        {
            id: 18,
            name: 'Dramat',
        },
        {
            id: 10751,
            name: 'Familijny',
        },
        {
            id: 14,
            name: 'Fantasy',
        },
        {
            id: 36,
            name: 'Historyczny',
        },
        {
            id: 27,
            name: 'Horror',
        },
        {
            id: 10402,
            name: 'Muzyczny',
        },
        {
            id: 9648,
            name: 'Tajemnica',
        },
        {
            id: 10749,
            name: 'Romans',
        },
        {
            id: 878,
            name: 'Sci-Fi',
        },
        {
            id: 10770,
            name: 'film TV',
        },
        {
            id: 53,
            name: 'Thriller',
        },
        {
            id: 10752,
            name: 'Wojenny',
        },
        {
            id: 10759,
            name: 'Akcja i Przygoda',
        },
        {
            id: 35,
            name: 'Komedia',
        },
        {
            id: 80,
            name: 'Kryminał',
        },
        {
            id: 99,
            name: 'Dokumentalny',
        },
        {
            id: 18,
            name: 'Dramat',
        },
        {
            id: 10751,
            name: 'Familijny',
        },
        {
            id: 10762,
            name: 'Kids',
        },
        {
            id: 9648,
            name: 'Tajemnica',
        },
        {
            id: 10763,
            name: 'News',
        },
        {
            id: 10764,
            name: 'Reality',
        },
        {
            id: 10765,
            name: 'Sci-Fi & Fantasy',
        },
        {
            id: 10766,
            name: 'Soap',
        },
        {
            id: 10767,
            name: 'Talk',
        },
        {
            id: 10768,
            name: 'War & Politics',
        },
        {
            id: 37,
            name: 'Western',
        },
    ])
    function getMovieGenreById(id) {
        return movieGenres.value.find((genre) => genre.id === id)
    }
    return { movieGenres, getMovieGenreById }
})
