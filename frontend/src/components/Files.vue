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

getFiles();

</script>

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
                {{ file.name }} - {{ file.size }} bytes
            </li>
        </ul>
        <p v-if="files.length === 0">No files available.</p>
    </section>

</template>
