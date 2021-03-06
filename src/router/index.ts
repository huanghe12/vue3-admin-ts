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
    component: () => import('@/pages/IndexConfig.vue')
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('@/pages/IndexConfig.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/pages/IndexConfig.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/pages/Category.vue'),
    children: [
      {
        path: '/category/level2',
        name: 'level2',
        component: () => import('@/pages/Category.vue')
      },
      {
        path: '/category/level3',
        name: 'level3',
        component: () => import('@/pages/Category.vue')
      }
    ]
  },
  {
    path: '/guest',
    name: 'guest',
    component: () => import('@/pages/Guest.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/pages/Order.vue')
  },
  {
    path: '/orderDetails',
    name: 'orderDetails',
    component: () => import('@/pages/OrderDetails.vue')
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
