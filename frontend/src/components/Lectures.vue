<script setup>
import { ref } from 'vue'

const lectureList = ref([])
const lectureCount = ref(2)

const getLectures = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/next-lectures?count=' + lectureCount.value, {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        lectureList.value = data;
    } catch (error) {
        console.error('Error fetching lectures:', error);
    }
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    return date.toLocaleString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Berlin'
    });
}

getLectures();

</script>

<style scoped></style>

<template>
    <h2>Upcoming Lectures</h2>
    <p>Get More Lectures</p>
    <section>
        <input type="text" name="Lecture Count" id="lecturesCount" placeholder="How many lectures?"
            v-model="lectureCount" />
        <button @click="getLectures">Get Lectures</button>
    </section>
    <section class="lecture-list">
        <ul v-for="lecture in lectureList" :key="lecture.id">
            <li>
                <h3>Subject: {{ lecture.lecturename }}</h3>
                <p><strong>Speaker:</strong> {{ lecture.professor }}</p>
                <p><strong>Description:</strong> {{ lecture.description }}</p>
                <p><strong>Date:</strong> {{ formatTimestamp(lecture.date) }}</p>
                <p>
                    <strong>Room:</strong> {{ lecture.room }}
                </p>
                <p>
                    <strong>Infos:</strong>
                    {{ lecture.information.length > 0 ? lecture.information : 'No additional information available' }}
                </p>
            </li>
            <hr />
        </ul>
    </section>
</template>
