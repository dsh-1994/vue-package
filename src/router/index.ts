import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/layout/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue').then(m => m),
        },
        {
          path: '/products',
          name: 'products',
          component: () => import('products').then(m => m.Products),
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import('orders').then(m => m.Orders),
        },
        {
          path: '/ui',
          name: 'ui',
          component: () => import('ui').then(m => m.Ui),
        },
      ],
    },
  ],
})

export default router
