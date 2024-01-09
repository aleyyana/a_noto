import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'FAQ',
    component: () => import('../views/AboutView.vue'),
    // meta: {
    //   requiresAuth: true
    // }  
  },
  {
    path: '/login',
    name: 'Connexion',
    component: () => import('../views/LoginView.vue'), 
  },
  {
    path: '/canvas',
    name: 'Tableau de Bord',
    component: () => import('../views/CanvasView.vue'),
    meta: {
      requiresAuth: true
    }  

  },
  {
    path: '/feat',
    name: 'Fonctions',
    component: () => import('../views/FeatView.vue'), 
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/canvas')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser){
    next('/login')
    return;
  }

  next();
})

export default router
