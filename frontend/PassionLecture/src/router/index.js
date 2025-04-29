import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LivreComponent from '@/components/LivreComponent.vue'

import RechercheView from '@/views/RechercheView.vue'

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
  ],
})

export default router
