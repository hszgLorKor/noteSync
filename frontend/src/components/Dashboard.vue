<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const name = ref('Dashboard')
</script>

<style scoped>
div {
    display: grid;
    grid-template-rows: 72px 1fr;
    height: 100vh;
    height: 100dvh;
}

main {
    display: grid;
    grid-template-columns: 200px 1fr;
}
</style>

<template>
    <div>
        <Header />
        <main>
            <Sidebar />
            <h1>Welcome to {{ name }}</h1>
        </main>
    </div>
</template>
