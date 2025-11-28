<template>
  <div class="page">
    <div class="container">

      <div class="page-header">
        <h1>Treinos</h1>
        <h3 class="subtitle">
          Histórico dos seus treinos de calistenia
        </h3>
      </div>

      <div class="treinos-list">
        <div class="treino-card">
          <p class="treino-title">
            titulo
          </p>

          <p class="treino-info">
            <b>Data e Hora:</b> 25 de nov. de 2025, 05:50
          </p>

          <p class="treino-info">
            <b>Duração:</b> 60min
          </p>

          <p class="treino-info mb-1">
            <b>Descrição:</b> minha desc
          </p>

          <div class="exercicios-list">
            <div class="treino-title">
              Exercícios:
            </div>

            <div class="exercicio">
              <div>exercicio teste</div>

              <div class="treino-info">
                Séries: <b>3</b>
              </div>

              <div class="treino-info">
                Descanso: <b>60</b>
              </div>

              <div class="treino-info">
                Repetições: <b>10</b>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const treinos = ref([]);

onMounted(async () => {
  const resTreinos = await fetch('http://localhost:3000/treinos');
  treinos.value = await resTreinos.json();

  for (let i = 0; i < 3; i++) {
    console.warn(i);
  }
});
</script>

<style scoped>
.page-header {
  margin-bottom: 40px;
}

.subtitle {
  color: var(--secondary2);
  font-weight: 300;
}

.treinos-list {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
}

.treinos-list .treino-card {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #f4f4f426;
}

.treinos-list .treino-card .treino-title {
  font-size: 20px;
  font-weight: 700;
}

.exercicio {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: #090d16;
  margin-top: 5px;
}
</style>
