<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toggle-sidebar'])
const toggleSidebar = ref(true)

function toggleSidebarFunc() {
    toggleSidebar.value = !toggleSidebar.value
    emit('toggle-sidebar', toggleSidebar)
}

</script>
<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-medium);
    background-color: #fff;
    color: var(--color-white);
    border-bottom: 1px solid #ccc;
    color: var(--color-black);
}

.links-list {
    display: flex;
    gap: var(--spacing-medium);
    transition: all 0.3s;
}

.links-list li:hover a {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: var(--spacing-tiny);
}
</style>

<template>
    <header>
        <button @click="toggleSidebarFunc()">Toggle Sidebar</button>
        <h4>Header</h4>
        <ul class="links-list">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
            <li><router-link to="/login">Logout</router-link></li>
        </ul>
    </header>
</template>
