<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const lectureList = ref([])
const lectureCount = ref(2)

const loading = ref(true);

const getLectures = async () => {
    loading.value = true;
    try {
        const response = await fetch('https://lobes.it/api/next-lectures?count=' + lectureCount.value, {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        lectureList.value = data;
        loading.value = false;
    } catch (error) {
        router.push('/login')
        console.error('Error fetching lectures:', error);
        loading.value = false;
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

function editLecture(lecture) {

    console.log('Edit lecture:', lecture);

    // Implement the edit functionality here

}

getLectures();

</script>

<style scoped>
.cancelled {
    color: #FF0B55;
    font-weight: bold;
    font-size: 1.2rem;
}

lectures-list {
    padding-inline-start: 2rem;
}

.loading-message {
    font-size: 1.2rem;
    padding-inline-start: 2rem;
}

.spinner_qM83 {
    animation: spinner_8HQG 1.05s infinite
}

.spinner_oXPr {
    animation-delay: .1s
}

.spinner_ZTLf {
    animation-delay: .2s
}

@keyframes spinner_8HQG {

    0%,
    57.14% {
        animation-timing-function: cubic-bezier(0.33, .66, .66, 1);
        transform: translate(0)
    }

    28.57% {
        animation-timing-function: cubic-bezier(0.33, 0, .66, .33);
        transform: translateY(-6px)
    }

    100% {
        transform: translate(0)
    }
}
</style>

<template>
    <h2>Upcoming Lectures</h2>
    <p>Get More Lectures</p>
    <section>
        <input type="text" name="Lecture Count" id="lecturesCount" placeholder="How many lectures?"
            v-model="lectureCount" />
        <button @click="getLectures">Get Lectures</button>
    </section>
    <section class="lecture-list">
        <ul v-if="!loading" v-for="(lecture, index) in lectureList" :key="lecture.id" class="lectures-list">
            <li>
                <h3>Subject: {{ lecture.lecturename }}</h3>
                <p><strong>Speaker:</strong> {{ lecture.professor }}</p>
                <p><strong>Description:</strong> {{ lecture.description }}</p>
                <p><strong>Date:</strong> {{ formatTimestamp(lecture.date) }}</p>
                <p v-if="!lecture.start"><strong>Lecture-Info:</strong> <span class="cancelled"> Lecture is canceled!!!</span></p>
                <p v-if="lecture.online"><strong>Online:</strong> <span class="cancelled"> Lecture is online!!!</span> </p>
                <p><strong>Room:</strong> {{ lecture.room }}</p>
                <p>
                    <strong>Infos:</strong>
                    {{ lecture.information.length > 0 ? lecture.information : 'No additional information available' }}
                </p>
                <button @click="editLecture(lectureList[index])">Edit</button>
            </li>
            <hr />
        </ul>
        <!-- <p v-if="loading" class="loading-message">Loading lectures... -->
        <!--     <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> -->
        <!--         <circle class="spinner_qM83" cx="4" cy="12" r="3" /> -->
        <!--         <circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3" /> -->
        <!--         <circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3" /> -->
        <!--     </svg> -->
        <!-- </p> -->
    </section>

</template>
