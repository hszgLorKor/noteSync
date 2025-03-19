<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const name = ref('Dashboard')
const router = useRouter();

function getDashboard() {
    fetch('http://localhost:3000/dashboard', {
        method: 'GET',
        credentials: 'include'
    }).then(res => {
        if (res.status === 401) {
            router.push('/login')
        } else {
            return res.json()
        }
    }).then(data => {
        console.log(data)
    })
}

getDashboard()
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
