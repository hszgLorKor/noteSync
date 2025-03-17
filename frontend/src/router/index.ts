import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Home.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/components/Dashboard.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
})

export default router
