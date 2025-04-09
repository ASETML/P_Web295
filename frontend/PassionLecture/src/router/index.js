import { createRouter, createWebHistory } from 'vue-router'
import Livre from '@/components/Livre.vue'
import Header from '@/components/Header.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Livre,
    },
    {
      path: '/search',
      name: 'search',
      component: Livre,
    },
    {
      path: '/account',
      name: 'account',
      component: Livre,
    },
  ],
})

export default router
