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

import { get, pathMap } from '@/utils/auth'

// 全局前置守卫
router.beforeEach((to) => {
  if (to.path === '/login') {
    // next()
    // vue4.x中next是一个可选参数,return false取消导航,return true或undefined验证导航通过
    return true
  } else {
    if (!get('token')) {
      // next({ path: '/login' })
      // 返回一个路由地址跳转到一个不同的地址
      return { path: '/login' }
    } else {
      // next()
      return true
    }
  }
})
// 全局后置守卫
router.afterEach((to) => {
  if (to.name) {
    // 改变页面标题
    document.title = pathMap[to.name]
  }
})

export default router
