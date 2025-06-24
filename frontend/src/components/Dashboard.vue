<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Lectures from './Lectures.vue'

const name = ref('Dashboard')
const router = useRouter();
const toggleSidebarRef = ref(true)

function authUser() {
    try {
        const response = await fetch('https://lobes.it/api/dashboard', {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) {
            router.push('/login');
            return;
        }
    } catch (error) {
        console.error('Error fetching user authentication:', error);
        router.push('/login');
    }
}

authUser();

function toggleSidebar(val) {
    toggleSidebarRef.value = val.value
}

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
    overflow: hidden;
}

main {
    padding: var(--spacing-normal);
    overflow-y: auto;
}

@media (max-width: 768px) {
    .sidebar-main-wrapper {
        grid-template-columns: 1fr;
    }
}
</style>

<template>
    <div class="wrapper">
        <Header @toggle-sidebar="(val) => toggleSidebar(val)" />
        <div class="sidebar-main-wrapper">
            <Sidebar :toggleSidebar="toggleSidebarRef" @closeSidebar="(val) => toggleSidebar(val)"/>
            <main>
                <h1>Welcome to {{ name }}</h1>
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>
