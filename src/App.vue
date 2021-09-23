<template>
  <router-view />
</template>
<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { get, pathMap, remove } from '@/utils/auth'
  import { onMounted } from 'vue-demi'
  // 添加路由守卫
  const router = useRouter()
  router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next()
    } else {
      if (!get('token')) {
        next({ path: '/login' })
      } else {
        next()
      }
    }
    if (to.name) {
      document.title = pathMap[to.name]
    }
  })
</script>

<style></style>
