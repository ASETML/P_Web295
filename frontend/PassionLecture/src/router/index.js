import { createRouter, createWebHistory } from 'vue-router'
import LivreView from '@/views/LivreView.vue'

import RechercheView from '@/views/RechercheView.vue'
import HomeView from '@/views/HomeView.vue'
import ConnexionView from '@/views/ConnexionView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search/:cat?',
      name: 'search',
      component: RechercheView,
    },
    {
      path: '/account',
      name: 'account',
      component: RechercheView,
    },
    {
      path: '/book/:id',
      name: 'book',
      props: true,
      component: LivreView,
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: ConnexionView,
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: RegisterView,
    },
  ],
})

export default router
