import { createRouter, createWebHistory } from 'vue-router'

import Home from "./pages/HomePage.vue"
import Treinos from "./pages/TreinosPage.vue"
import AdicionarTreino from "./pages/AdicionarTreinoPage.vue"
import Exercicios from "./pages/ExerciciosPage.vue"
import Perfil from "./pages/PerfilPage.vue"
import Auth from "./pages/AuthPage.vue"

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