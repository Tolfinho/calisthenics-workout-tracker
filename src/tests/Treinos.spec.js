import { mount, flushPromises } from '@vue/test-utils'
import Treinos from '../pages/TreinosPage.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

beforeEach(() => {
  vi.clearAllMocks()

  // Mock global fetch
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, nome: "Treino A" }
      ])
    })
  )
})

describe('Treinos.vue', () => {

  it('exibe o título correto na tela', async () => {
    const wrapper = mount(Treinos)

    await flushPromises()

    expect(wrapper.find('h1').text()).toBe('Treinos')
  })

  it('carrega treinos corretamente no onMounted()', async () => {
    await flushPromises()

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/treinos')
  })

  // Teste propositalmente errado
  it('deve falhar porque espera um <h2> que não existe', async () => {
    const wrapper = mount(Treinos)

    await flushPromises()

    expect(wrapper.find('h2').exists()).toBe(true) // propositalmente errado
  })

})
