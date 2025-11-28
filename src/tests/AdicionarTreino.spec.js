/* eslint-env vitest, node */

import { mount, flushPromises } from '@vue/test-utils'
import AdicionarTreino from '../pages/AdicionarTreinoPage.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'

global.fetch = vi.fn()

describe('AdicionarTreino.vue', () => {
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('exibe o título correto', async () => {

    // Mock do fetch do onMounted() → lista de exercícios
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    })

    const wrapper = mount(AdicionarTreino)
    await flushPromises()

    expect(wrapper.find('h1').text()).toBe('Novo treino')
    expect(wrapper.find('h3.subtitle').text())
      .toBe('Registre seu treino de calistenia')
  })

  it('salvar() envia o POST corretamente', async () => {

    // 1° fetch do onMounted() (lista de exercícios)
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    })

    const wrapper = mount(AdicionarTreino)
    await flushPromises()

    // Preencher dados do treino
    wrapper.vm.nome = 'Treino A'
    wrapper.vm.data_hora = '2025-05-10 18:00'
    wrapper.vm.duracao = 45
    wrapper.vm.observacao = 'Treino forte'
    wrapper.vm.exerciciosTreino = [
      {
        exercicioId: 1,
        descanso: 60,
        series: 4,
        repeticoes: 12
      }
    ]

    // Mock do POST
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    })

    // Chamar salvar()
    await wrapper.vm.salvar()
    await flushPromises()

    // Verificar se o fetch foi chamado corretamente
    expect(fetch).toHaveBeenLastCalledWith(
      'http://localhost:3000/treinos',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: 'Treino A',
          dataHora: '2025-05-10 18:00',
          duracaoMinutos: 45,
          observacao: 'Treino forte',
          exercicios: [
            {
              exercicioId: 1,
              descanso: 60,
              series: 4,
              repeticoes: 12
            }
          ]
        })
      }
    )
  })

})
