import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QrCode from '@/views/QrCode.vue'
import StatsView from '@/views/StatsView.vue'
import ShortenerView from '@/views/ShortenerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // Conversation with Copilot
      
    },
    {
      path: '/shortener',
      name: 'shortener',
      component: ShortenerView,
    },
    {
      path: '/qrCode',
      name: 'qrCode',
      component: QrCode,
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView
    }
  ],
})

export default router