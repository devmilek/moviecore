<template>
    <header class="navbar" :class="{ scrolled: !topOfPage }">
        <nav class="container">
            <div class="logo">MOVIECORE</div>
            <div class="nav-items">
                <router-link to="/">Filmy</router-link>
                <router-link to="/">Seriale</router-link>
                <router-link to="/">Obsada</router-link>
            </div>
            <div class="right-side">
                <label class="search-input" for="searchInput">
                    <input type="text" id="searchInput" placeholder="Szukaj..." />
                </label>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue'

const topOfPage = ref(true)

const handleScroll = () => {
    if (window.scrollY > 200) {
        topOfPage.value = false
    } else {
        topOfPage.value = true
    }
}

window.addEventListener('scroll', handleScroll)
</script>

<style scoped>
.navbar {
    position: fixed;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0) 100%);
    width: 100%;
    transition: all ease 0.3s;
}

.navbar.scrolled {
    background: #0f172a;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
}

.logo {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: white;
}

.nav-items a {
    text-decoration: none;
    color: #d1d5db;
    font-size: 14px;
    /* font-weight: 500; */
    margin: 0 10px;
}

.nav-items a:hover {
    color: white;
}

.search-input {
    border: 1px solid white;
    border-radius: 8px;
    display: block;
    overflow: hidden;
}

.search-input input {
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
}
</style>
