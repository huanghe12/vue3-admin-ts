<template>
  <el-container>
    <Aside v-if="state.flag" :current-path="state.currentPath" />
    <el-container direction="vertical">
      <Header v-if="state.flag" />
      <div :class="{ main: state.flag }">
        <router-view />
      </div>
      <Footer v-if="state.flag" />
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import Aside from '@/components/Aside.vue'
  import { useRouter } from 'vue-router'
  import { get, pathMap } from '@/utils/auth'
  import { reactive } from 'vue-demi'

  const router = useRouter()

  const state = reactive({
    // 定义一个状态，是否显示侧边栏等组件
    flag: false,
    currentPath: '/introduce'
  })
  // 全局前置守卫
  router.beforeEach((to) => {
    state.currentPath = to.path
    if (to.path === '/login') {
      state.flag = false
      // vue4.x中next是一个可选参数,return false取消导航,return true或undefined验证导航通过
      return true
    } else {
      if (!get('token')) {
        state.flag = false
        // 返回一个路由地址跳转到一个不同的地址
        return { path: '/login' }
      } else {
        state.flag = true
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
</script>

<style lang="less" scoped>
  .main {
    height: calc(100vh - 100px);
    overflow: auto;
    padding: 10px;
  }
</style>
