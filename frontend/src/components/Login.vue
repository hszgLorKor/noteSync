<script setup>

    import { ref } from 'vue';

    const username = ref('');
    const password = ref('');

    function login(e) {
        e.preventDefault();

        console.log(username.value, password.value);
    }
</script>

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
            <button>Login</button>
        </form>
    </div>
</template>

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
