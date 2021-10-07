<template>
  <div class="header">
    <div class="left"> {{ state.name }} </div>
    <div class="right">
      <el-popover placement="bottom" :width="320" trigger="click" popper-class="popper-user-box">
        <template #reference>
          <div class="author">
            <el-icon :size="18" style="margin-right: 6px">
              <Avatar />
            </el-icon>
            <span>{{ state.userInfo.nickName }}</span>
            <el-icon>
              <CaretBottom />
            </el-icon>
          </div>
        </template>
        <div class="nickname">
          <p>登录名：{{ state.userInfo.loginUserName }}</p>
          <p>昵称：{{ state.userInfo.nickName }}</p>
          <el-tag size="small" color="#1baeae" effect="dark" class="logout" @click="logOut"
            >退出登录</el-tag
          >
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Avatar, CaretBottom } from '@element-plus/icons'
  import { remove, pathMap, get } from '@/utils/auth'
  import { logout, getUserInfo } from '@/api'
  import { onMounted, reactive } from 'vue-demi'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const state = reactive({
    name: '系统介绍',
    userInfo: {} as any
  })
  // 获取个人信息
  onMounted(async () => {
    const res = await getUserInfo()
    state.userInfo = res
  })
  // 登出
  const logOut = () => {
    logout().then(() => {
      remove('token')
      // 刷新页面
      window.location.reload()
    })
  }
  router.afterEach((to) => {
    const { id } = to.query
    if (to.name) {
      state.name = pathMap[to.name]
      if (id && to.name == 'add') {
        state.name = '编辑商品'
      }
    }
  })
</script>
<style lang="less" scoped>
  .header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e9e9e9;
    padding: 0 20px;
    .left {
      font-size: 18px;
    }
    .right {
      .author {
        display: flex;
        align-items: center;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
</style>
<style lang="less">
  .popper-user-box {
    background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50%
      no-repeat !important;
    background-size: cover !important;
    border-radius: 0 !important;
    .nickname {
      position: relative;
      color: #ffffff;
      p {
        margin: 14px 0;
      }
      .logout {
        padding: 0 3px;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }
    }
    .el-popper__arrow {
      &::before {
        height: 0;
        width: 0;
      }
    }
  }
</style>
