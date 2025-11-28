import { mount, flushPromises } from '@vue/test-utils'
import Exercicios from '../pages/ExerciciosPage.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'

global.fetch = vi.fn()

describe('Exercicios.vue', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('exibe o título correto na tela', async () => {

    // Mock do onMounted -> exercicios
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    })

    // Mock do onMounted -> categorias
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    })

    const wrapper = mount(Exercicios)
    await flushPromises()

    expect(wrapper.find('h1').text()).toBe('Exercicios')
    expect(wrapper.find('h3.subtitle').text())
      .toBe('Gerencie seus exercícios da calistenia')
  })

  it('apagar() envia DELETE e remove o item da lista', async () => {
    // 1° fetch (exercicios)
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 10, nome: 'Flexão', descricao: 'Peito' }
      ]
    })

    // 2° fetch (categorias)
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    })

    const wrapper = mount(Exercicios)
    await flushPromises()

    // Mock do DELETE
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    })

    // Chamar o método de apagar
    await wrapper.vm.apagar(10)
    await flushPromises()

    // Lista agora deve estar vazia
    expect(wrapper.vm.exercicios.length).toBe(0)

    // Verifica se o DELETE foi feito corretamente
    expect(fetch).toHaveBeenLastCalledWith(
      'http://localhost:3000/exercicios/10',
      { method: 'DELETE' }
    )
  })
})
