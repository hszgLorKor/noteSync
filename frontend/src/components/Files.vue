<script setup>

import { ref } from 'vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

// route params
const $route = useRoute();
const subject = ref($route.params.subject || '');

// route change watcher
watch(() => $route.params.subject, (newSubject) => {
    subject.value = newSubject;
    getFiles(); // Fetch files when the subject changes
});

const fileInput = ref(null);

const files = ref([]);
const lectureNumber = ref(1);

// Function to handle file upload
function uploadFile() {
    const file = fileInput.value.files[0]

    const formData = new FormData();
    formData.append('file', file);
    formData.append('lectureName', subject.value);
    formData.append('lectureNumber', lectureNumber.value);

    fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data)
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}

// Function to fetch files for the current lecture
const getFiles = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/files?lectureName=' + subject.value, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Files fetched:', data);
        files.value = data.files || []; // Assuming the response contains a 'files' array;
    }
    catch (error) {
        console.error('Error fetching files:', error);
        files.value = []; // Reset files in case of error
    }
}

function downloadFile(fileName) {
    const url = `http://localhost:3000/api/download/${fileName}`;
    window.open(url, '_blank');
}

getFiles();

</script>

<style scoped>
.file-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.download-button {
    background: none;
    border: none;
    cursor: pointer;
}
.download-button svg {
    width: 32px;
    height: 32px;
}
</style>

<template>
    <section class="files">
        <h1>Files for {{ subject }}</h1>
        <form @submit.prevent="uploadFile()">
            <input type="file" id="myFile" name="filename" ref="fileInput" />
            <button type="submit">Upload</button>
        </form>
        <hr />
        <button @click="getFiles">Refresh Files</button>
        <ul class="file-list">
            <!-- Assuming files is an array of file objects -->
            <li v-for="file in files" :key="file.id">
                {{ file.originalname }} - {{ file.size }} bytes
                <button class="download-button" @click="downloadFile(file.name)">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                    </svg>
                </button>
            </li>
        </ul>
        <p v-if="files.length === 0">No files available.</p>
    </section>

</template>
