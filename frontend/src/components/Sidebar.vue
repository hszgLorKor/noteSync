<script setup>
import { ref } from 'vue'

const semesterList = ref([
    { id: 1, name: 'Semester 1' },
    { id: 2, name: 'Semester 2' },
    { id: 3, name: 'Semester 3' },
    { id: 4, name: 'Semester 4' },
])

</script>

<style scoped>
aside {
    background-color: #fff;
    border-right: 1px solid #ccc;
}

ul {
    padding: 6px 12px;
}

li {
    background-color: skyblue;
    width: 100%;
    margin-block: 0 12px;
    padding: 6px 12px;
    border-radius: 4px;
}

li a {
    display: flex;
    align-items: center;
}

svg {
    width: 24px;
    height: 24px;
    margin-right: 12px;
}
</style>
<template>
    <aside>
        <header>

        </header>
        <ul class="semester-list">
            <li v-for="sem in semesterList" :key="sem.id">
                <RouterLink to='/dashboard'>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                                fill="#0F0F0F"></path>
                        </g>
                    </svg>
                    {{ sem.name }}
                </RouterLink>
            </li>
        </ul>
    </aside>
</template>
