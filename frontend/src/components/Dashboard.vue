<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Home from './Home.vue'

const name = ref('Dashboard')
</script>

<style scoped>
div.wrapper {
    display: grid;
    grid-template-rows: var(--header-height) 1fr;
    height: 100vh;
    height: 100dvh;
}

.sidebar-main-wrapper {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
}

main {
    padding: var(--spacing-normal);
    overflow-y: auto;
}
</style>

<template>
    <div class="wrapper">
        <Header />
        <div class="sidebar-main-wrapper">
            <Sidebar />
            <main>
                <h1>Welcome to {{ name }}</h1>
            </main>
        </div>
    </div>
</template>
