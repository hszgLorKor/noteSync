<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.go-home {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.not-found-img {
    width: 80%;
    max-width: 400px;
    height: auto;
    margin-top: 20px;
    border-radius: 10px;
}
</style>
<template>
    <div class="not-found">
        <h2>Oopsies! Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <img src="../assets/imgs/not-found.jpg" alt="Not Found" class="not-found-img" />
        <router-link to="/" class="go-home">
            Go back to Home
        </router-link>
    </div>
</template>
