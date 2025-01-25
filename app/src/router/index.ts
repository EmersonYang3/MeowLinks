import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QrCode from '@/views/QrCode.vue'
import AllView from '@/views/AllView.vue'
import StatsView from '@/views/StatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/qrCode',
      name: 'qrCode',
      component: QrCode,
    }
    ,
    { 
      path: '/all', 
      name: 'all', 
      component: AllView 
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView
    }
  ],
})

export default router
