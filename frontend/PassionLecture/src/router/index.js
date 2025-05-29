import { createRouter, createWebHistory } from 'vue-router'
import LivreView from '@/views/LivreView.vue'

import RechercheView from '@/views/RechercheView.vue'
import HomeView from '@/views/HomeView.vue'
import ConnexionView from '@/views/ConnexionView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CreateLivreView from '@/views/CreateLivreView.vue'
import CompteView from '@/views/CompteView.vue'
import VisiteUserView from '@/views/VisiteUserView.vue'
import NotFound from '@/views/NotFound.vue'
import ErreurServeur from '@/views/ErreurServeur.vue'

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
    {
      path: '/creationLivre',
      name: 'creationLivre',
      component: CreateLivreView,
    },
    {
      path: '/compte',
      name: 'compte',
      component: CompteView,
    },
    {
      path: '/user/:id',
      name: 'userDetail',
      component: VisiteUserView,
    },
    {
      //404
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
    {
      //500
      path: '/erreur-serveur',
      name: 'erreur-serveur',
      component: ErreurServeur,
    },
  ],
})

// Bloque route /erreur-serveur
router.beforeEach((to, from, next) => {
  if (to.name === 'erreur-serveur') {
    const errorFlag = sessionStorage.getItem('serverError')
    if (errorFlag === 'true') {
      sessionStorage.removeItem('serverError')
      next()
    } else {
      next({ name: 'not-found' })
    }
  } else {
    next()
  }
})

export default router
