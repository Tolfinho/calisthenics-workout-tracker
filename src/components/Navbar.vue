<template>
    <div class="main-container">
        <div class="container">
            <div class="logo-container">
                <h2>CalisTracker</h2>
            </div>
            <nav class="navbar">
                <router-link to="/">Home</router-link>
                <router-link to="/treinos">Treinos</router-link>
                <router-link to="/adicionar-treino">Novo treino</router-link>
                <router-link to="/exercicios">Exercícios</router-link>
                <router-link to="/perfil">Perfil</router-link>
            </nav>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.main-container {
    height: 60px;
    background-color: var(--primary1);
    color: var(--secondary1);
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.navbar {
    display: flex;
    gap: 30px;
}

.navbar a {
    color: var(--secondary1);
    text-decoration: none;
}

.navbar a:hover {
    color: var(--secondary2);
}
</style>
