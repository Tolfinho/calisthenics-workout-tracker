import { createRouter, createWebHistory } from 'vue-router'

import Home from "./pages/Home.vue"
import Treinos from "./pages/Treinos.vue"
import AdicionarTreino from "./pages/AdicionarTreino.vue"
import Exercicios from "./pages/Exercicios.vue"
import Perfil from "./pages/Perfil.vue"
import Auth from "./pages/Auth.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/treinos', component: Treinos },
  { path: '/adicionar-treino', component: AdicionarTreino },
  { path: '/exercicios', component: Exercicios },
  { path: '/perfil', component: Perfil },
  { path: '/auth', component: Auth },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;