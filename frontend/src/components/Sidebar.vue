<script setup>
import { ref } from 'vue'

const semesterList = ref([
    { id: 1, name: 'Semester 1', showSubjects: false },
    { id: 2, name: 'Semester 2', showSubjects: false },
    { id: 3, name: 'Semester 3', showSubjects: false },
    { id: 4, name: 'Semester 4', showSubjects: false },
])

const subjects = ref([
    { id: 1, name: 'Mathematics', semesterId: 1 },
    { id: 2, name: 'Physics', semesterId: 1 },
    { id: 3, name: 'Chemistry', semesterId: 1 },
    { id: 4, name: 'Biology', semesterId: 1 },
    { id: 5, name: 'Computer Science', semesterId: 2 },
    { id: 6, name: 'English', semesterId: 2 },
    { id: 7, name: 'History', semesterId: 2 },
    { id: 8, name: 'Geography', semesterId: 2 },
    { id: 9, name: 'Economics', semesterId: 3 },
    { id: 10, name: 'Accounting', semesterId: 3 },
    { id: 11, name: 'Business Studies', semesterId: 3 },
    { id: 12, name: 'Marketing', semesterId: 3 },
    { id: 13, name: 'Sociology', semesterId: 4 },
    { id: 14, name: 'Psychology', semesterId: 4 },
    { id: 15, name: 'Political Science', semesterId: 4 },
    { id: 16, name: 'Philosophy', semesterId: 4 },
])

function showSubjects(id) {
    const sem = semesterList.value.find(sem => sem.id === id)
    sem.showSubjects = !sem.showSubjects
}

function getSubjects(id) {
    return subjects.value.filter(sub => sub.semesterId === id)
}

</script>

<style scoped>
aside {
    background-color: #fff;
    border-right: 1px solid #ccc;
    overflow-y: auto;
    height: calc(100vh - var(--header-height));
    height: calc(100dvh - var(--header-height));
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

ul.subjects-list {
    margin-inline: var(--spacing-normal) 0;
    border-left: 1px solid var(--color-black);
}

ul.subjects-list li {
    background-color: #f0f0f0;
    margin-block: var(--spacing-small) 0;
    padding: 6px 12px;
    border-radius: 4px;
    position: relative;
}

ul.subjects-list li::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -12px;
    transform: translateY(-50%);
    width: 7%;
    height: 2px;
    background-color: var(--color-black);
}
</style>
<template>
    <aside>
        <header>

        </header>
        <ul class="semester-list">
            <li v-for="sem in semesterList" :key="sem.id">
                <RouterLink to='/dashboard' @click="showSubjects(sem.id)">
                    <svg v-if="sem.showSubjects" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        transform="rotate(0)">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                                fill="#0F0F0F"></path>
                        </g>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <ul v-if="sem.showSubjects" class="subjects-list">
                    <li v-for="sub in getSubjects(sem.id)" :key="sub.id">
                        <RouterLink to='/dashboard'>{{ sub.name }}</RouterLink>
                    </li>
                </ul>
            </li>
        </ul>
    </aside>
</template>
