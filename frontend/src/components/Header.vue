<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toggle-sidebar'])
const toggleSidebar = ref(true)
const fileInput = ref(null)

// set toggleSidebar to false if the screen width is less than 768px
if (window.innerWidth < 768) {
    toggleSidebarFunc()
}

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

.left-side {
    display: flex;
    align-items: center;
    gap: 12px;
}

.toggle-sidebar-button {
    cursor: pointer;
    display: none;
    background-color: transparent;
    padding: 0;
}

.toggle-sidebar-button svg {
    width: 24px;
    height: 24px;
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

.lolle-color {
    color: #d77a61;
}

@media (max-width: 768px) {
    header {
        padding: 0 var(--spacing-small);
    }

    .toggle-sidebar-button {
        display: block;
    }

    .links-list {
        margin-inline-end: 12px;
    }

    .links-list .lectures {
        display: none;
    }

    .logo {
        margin-inline-start: 12px;
    }
}
</style>

<template>
    <header>
        <div class="left-side">
            <button @click="toggleSidebarFunc()" class="toggle-sidebar-button">
                <svg version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns:svg="http://www.w3.org/2000/svg"
                    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="lines.svg"
                    inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 1200"
                    enable-background="new 0 0 1200 1200" xml:space="preserve" fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path id="rect3039" inkscape:connector-curvature="0"
                            d="M0,0v240h1200V0H0z M0,480v240h1200V480H0z M0,960v240h1200V960H0z"></path>
                    </g>
                </svg>
            </button>
            <router-link to="/dashboard/lectures" class="logo">
                <h3>Note<span class="lolle-color">Sync</span></h3>
            </router-link>
        </div>
        <ul class="links-list">
            <li><router-link to="/dashboard/lectures" class="lectures">Lectures</router-link></li>
            <li><router-link to="/login">Logout</router-link></li>
        </ul>
    </header>
</template>
