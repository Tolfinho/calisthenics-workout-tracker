<template>
  <div class="page">
    <div class="container">
      <div class="page-header">
        <div class="page-title">
          <h1>Exercicios</h1>
          <h3 class="subtitle">
            Gerencie seus exercícios da calistenia
          </h3>
        </div>

        <button
          class="btn btn-primary"
          @click="showForm = !showForm"
        >
          + Novo exercício
        </button>
      </div>

      <div
        class="form-container"
        v-if="showForm"
      >
        <h3 class="form-title">
          Novo exercício
        </h3>

        <label
          class="label"
          for="nome"
        >
          Nome:
        </label>

        <input
          id="nome"
          v-model="nome"
          class="input mb-1"
          type="text"
          placeholder="Informe o nome do exercício"
        />

        <label class="label">
          Categoria:
        </label>

        <select
          v-model="categoria"
          class="input mb-1"
        >
          <option value="0">
            --Selecione uma categoria--
          </option>

          <option
            v-for="c in categorias"
            :key="c.id"
            :value="c.id"
          >
            {{ c.nome }}
          </option>
        </select>

        <label
          class="label"
          for="descricao"
        >
          Descrição:
        </label>

        <textarea
          id="descricao"
          v-model="descricao"
          class="input mb-1"
          placeholder="Informe a descrição do exercício"
        />

        <div class="form-buttons">
          <button
            class="btn btn-outline-primary"
            @click="showForm = !showForm"
          >
            Cancelar
          </button>

          <button
            class="btn btn-primary"
            @click="salvar"
          >
            Salvar
          </button>
        </div>
      </div>

      <div class="exercicios-list-container">
        <div class="exercicios-list">
          <div
            class="exercicio"
            v-for="e in exercicios"
            :key="e.id"
          >
            <p>
              <b>Nome: </b>{{ e.nome }}
            </p>

            <p>
              <b>Descrição: </b>{{ e.descricao }}
            </p>

            <hr />

            <button
              class="btn btn-danger"
              @click="apagar(e.id)"
            >
              Apagar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const exercicios = ref([])
const categorias = ref([])

const showForm = ref(false)
const nome = ref('')
const categoria = ref('0')
const descricao = ref('')

onMounted(async () => {
  const resExercicios = await fetch('http://localhost:3000/exercicios')
  exercicios.value = await resExercicios.json()

  const resCategorias = await fetch('http://localhost:3000/categorias')
  categorias.value = await resCategorias.json()
})

async function salvar() {
  const novoExercicio = {
    nome: nome.value,
    categoriaId: categoria.value,
    descricao: descricao.value
  }

  const res = await fetch('http://localhost:3000/exercicios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoExercicio)
  })

  if (res.ok) {
    const exercicioCriado = await res.json()
    exercicios.value.push(exercicioCriado)
    showForm.value = false
    limparFormulario()
    alert('Exercício salvo com sucesso!')
  } else {
    alert('Erro ao salvar o exercício.')
  }
}

async function apagar(id) {
  const res = await fetch(`http://localhost:3000/exercicios/${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    exercicios.value = exercicios.value.filter(e => e.id !== id)
    alert('Exercício apagado com sucesso!')
  } else {
    alert('Erro ao apagar o exercício.')
  }
}

function limparFormulario() {
  nome.value = ''
  categoria.value = '0'
  descricao.value = ''
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.subtitle {
  color: var(--secondary2);
  font-weight: 300;
}

.exercicios-list {
  display: flex;
  gap: 2%;
  row-gap: 25px;
  flex-wrap: wrap;
}

.exercicio {
  width: 23.5%;
  font-size: 14px;
  border: 1px solid #f4f4f426;
  border-radius: 12px;
  padding: 12px;
}

.exercicio p {
  margin-bottom: 5px;
}

.exercicio hr {
  margin: 10px 0;
}

.exercicio button {
  font-size: 14px;
  padding: 10px 12px;
}

.form-container {
  margin-bottom: 40px;
}

.form-title {
  font-size: 23px;
  margin-bottom: 10px;
}

.form-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>
