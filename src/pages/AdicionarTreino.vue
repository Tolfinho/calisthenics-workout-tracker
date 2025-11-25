<template>
  <div class="page">
    <div class="container">

      <div class="page-header">
        <div class="page-title">
          <h1>Novo treino</h1>
          <h3 class="subtitle">Registre seu treino de calistenia</h3>
        </div>
      </div>

      <div class="form-container">
        <h3 class="mb-1">Informações do treino</h3>

        <label for="nome" class="label">Nome do treino: </label>
        <input type="text" class="input mb-1" id="nome" v-model="nome" placeholder="Informe o nome do treino">

        <label for="data-hora" class="label">Data e hora: </label>
        <input type="datetime" class="input mb-1" id="data-hora" v-model="data_hora">

        <label for="duracao" class="label">Data e hora: </label>
        <input type="number" class="input mb-1" id="duracao" v-model="duracao">

        <label for="observacao" class="label">Observação: </label>
        <textarea class="input mb-1" id="observacao" v-model="observacao" placeholder="Informe uma observação para o treino (opcional)"></textarea>

        <h3>Exercícios</h3>
        <button class="btn btn-primary" @click="adicionarExercicio">Adicionar Exercício</button>

        <div v-if="exerciciosTreino.length > 0" v-for="(ex, index) in exerciciosTreino" :key="index" class="card">
          <label class="label">Exercício:</label>
          <select v-model="ex.exercicioId" class="input mb-1">
            <option disabled value="0">--Selecione um exercício--</option>
            <option v-for="e in exerciciosList" :key="e.id" :value="e.id">
              {{ e.nome }}
            </option>
          </select>

          <div class="wrap">
            <div>
              <label class="label">Tempo de descanso (segundos):</label>
              <input type="number" v-model="ex.descanso" class="input">
            </div>
  
            <div>
              <label class="label">Número de séries:</label>
              <input type="number" v-model="ex.series" class="input">
            </div>
  
            <div>
              <label class="label">Repetições por série:</label>
              <input type="number" v-model="ex.repeticoes" class="input">
            </div>
  
            <button class="btn btn-danger" @click="removerExercicio(index)">
              Remover
            </button>
          </div>
        </div>

        <button class="btn btn-primary salvarBtn">Salvar Treino</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const exerciciosList = ref([]); // Referentes ao select de exercícios
const exerciciosTreino = ref([]); // Referentes a lista de exercícios a serem cadastrados no treino

onMounted(async () => {
  const resExercicios = await fetch('http://localhost:3000/exercicios')
  exerciciosList.value = await resExercicios.json()
})

function adicionarExercicio() {
  exerciciosTreino.value.push({
    exercicioId: 0,
    descanso: 0,
    series: 0,
    repeticoes: 0  
  })
}

function removerExercicio(index) {
  exerciciosTreino.value = exerciciosTreino.value.splice(index, 1);
}

function salvar() {
  
}
</script>

<style scoped>
.page-header {
  margin-bottom: 40px;
}

.subtitle {
  color: var(--secondary2);
  font-weight: 300;
}

.card {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 10px 15px;
  border-radius: 10px;
  background: #121928;
}

.salvarBtn {
  width: 100%;
  margin-top: 30px;
}

.wrap {
  display: flex;
  width: 100%;
  gap: 2%;
  align-items: end;
}

.wrap div:nth-child(1),
.wrap div:nth-child(2),
.wrap div:nth-child(3) {
  width: 30%;
}

.wrap div:nth-child(4) {
  width: 4%;
}

.wrap button {
  padding: 0 14px;
  height: 50px;
}
</style>
