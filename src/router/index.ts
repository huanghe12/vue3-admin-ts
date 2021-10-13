import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/introduce'
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: () => import('@/pages/Introduce.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/Dashboard.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('@/pages/AddGood.vue')
  },
  {
    path: '/good',
    name: 'good',
    component: () => import('@/pages/Good.vue')
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: () => import('@/pages/Swiper.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/hot',
    name: 'hot',
    component: () => import('@/pages/HotSell.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/Account.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
