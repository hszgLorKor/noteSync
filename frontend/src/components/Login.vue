<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();
const showError = ref(false);
const errorMessage = ref('');

function login(e) {
    e.preventDefault();

    fetch('https://lobes.it/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        credentials: 'include'
    }).then(res => {
        if (res.status === 401) {
            showError.value = true;
            errorMessage.value = 'Invalid credentials';
        } else {
            return res.json();
        }
    }).
        then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                localStorage.setItem('token', data.token);
                router.push('/dashboard/lectures');
            }
        });

}
</script>

<style scoped>
.login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    height: 100dvh;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

form p {
    display: flex;
    flex-direction: column;
    margin: 0;
    gap: 4px;
}

form label {
    font-size: 0.9em;
}

</style>

<template>
    <div class="login-wrapper">
        <h1>Login</h1>
        <form @submit="login">
            <p>
                <label for="username">Benutzer Name:</label>
                <input type="text" required v-model="username" placeholder="Username" id="username" />
            </p>
            <p>
                <label for="password">Passwort:</label>
                <input type="password" required v-model="password" placeholder="Password" id="password" />
            </p>
            <p v-if="showError" style="color: red;">{{ errorMessage }}</p>
            <button class="default">Login</button>
        </form>
    </div>
</template>
