import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/introduce'
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/components/Layout.vue'),
    children: [
      {
        path: '/introduce',
        name: 'introduce',
        component: () => import('@/pages/Introduce.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue')
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
