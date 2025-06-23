<script setup>

import { ref } from 'vue';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// route params
const $route = useRoute();
const router = useRouter();
const subjectName = ref($route.query.subjectName || '');
const subject = ref($route.params.subject || "");

const highlight = ref(false);

// route change watcher
watch(() => $route.query.subjectName, (newSubject) => {
    subject.value = newSubject;
    getFiles(); // Fetch files when the subject changes
});

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

    fetch('https://lobes.it/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
        })
        .catch((error) => {
            router.push('/login')
            console.error('Error:', error)
        })
}

function deleteFile(fileName) {
    fetch(`https://lobes.it/api/delete/${fileName}`, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log('File deleted:', data);
            getFiles(); // Refresh the file list after deletion
        })
        .catch((error) => {
            console.error('Error deleting file:', error);
        });
}

// Function to fetch files for the current lecture
const getFiles = async () => {
    try {
        const response = await fetch('https://lobes.it/api/files?lectureName=' + subject.value, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        files.value = data.files || []; // Assuming the response contains a 'files' array;
    }
    catch (error) {
        console.error('Error fetching files:', error);
        files.value = []; // Reset files in case of error
    }
}

function downloadFile(fileName) {
    const url = `https://lobes.it/api/download/${fileName}`;
    window.open(url, '_blank');
}

getFiles();

</script>

<style scoped>
.files-list {
    max-width: 98vw;
    overflow-x: auto;
}

table.files {
    border-collapse: collapse;
    margin-top: 20px;
}

table.files th,
table.files td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
}

table.files tr:nth-child(even) {
    background-color: #f2f2f2;
}

table.files tr:hover {
    background-color: #ddd;
}

.download-button, .delete-button {
    background: none;
    border: none;
    cursor: pointer;
}

.download-button svg, .delete-button svg {
    width: 32px;
    height: 32px;
}

.file-upload-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;
}

.file-upload-form p {
    border: 1px dashed #ccc;
    border-radius: 4px;
    min-height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block-end: 6px;
}

.file-upload-form p svg {
    width: 32px;
    height: 32px;
}

input[type="file"]::file-selector-button {
    border-radius: 4px;
    padding: 0 16px;
    height: 40px;
    cursor: pointer;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
    margin-right: 16px;
    transition: background-color 200ms;
}

.file-input.highlight {
    border-color: #1C274C !important;
}

input[type="file"]::file-selector-button:hover {
    background-color: #f3f4f6;
}

input[type="file"]::file-selector-button:active {
    background-color: #e5e7eb;
}
</style>

<template>
    <section class="files">
        <h1>Files for {{ subject }}</h1>
        <form class="file-upload-form" @submit.prevent="uploadFile()">
            <p class="file-input" :class="{ 'highlight': highlight }">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                            stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                        <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" stroke="#1C274C" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                </svg>
                <input type="file" id="myFile" name="filename" ref="fileInput" class="inputfile"
                    @dragenter="highlight = true" @drop="highlight = false" />
            </p>
            <button type="submit" class="default upload-btn">Upload</button>
        </form>
        <hr />
        <button @click="getFiles">Refresh Files</button>
        <div class="file-list">
            <table class="files">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Size (bytes)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="file in files" :key="file.id">
                        <td>{{ file.originalname }}</td>
                        <td>{{ file.size }}</td>
                        <td>
                            <button class="download-button" @click="downloadFile(file.name)">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </g>
                                </svg>
                            </button>
                            <button class="delete-button" @click="deleteFile(file.name)">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                        <path
                                            d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </g>
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p v-if="files.length === 0">No files available.</p>
    </section>

</template>
