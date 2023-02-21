import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetailsView from '@/views/MovieDetailsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/movies/:id',
            name: 'movieDetails',
            component: MovieDetailsView,
        },
        {
            path: '/:mediaType/:id',
            name: 'seriesDetails',
            component: MovieDetailsView,
        },
    ],
})

export default router
