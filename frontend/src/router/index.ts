import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard/lectures'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/components/Dashboard.vue'),
      children: [
        { path: 'lectures', component: () => import('@/components/Lectures.vue') },
        { path: 'files/:subject', component: () => import('@/components/Files.vue') },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/components/NotFound.vue')
    }
  ],
})

export default router
