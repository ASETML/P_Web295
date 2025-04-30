import { createRouter, createWebHistory } from 'vue-router'
import LivreComponent from '@/components/LivreComponent.vue'

import RechercheView from '@/views/RechercheView.vue'
import HomeView from '@/views/HomeView.vue'
import ConnexionView from '@/views/ConnexionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: RechercheView,
    },
    {
      path: '/account',
      name: 'account',
      component: RechercheView,
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: ConnexionView,
    },
  ],
})

export default router
