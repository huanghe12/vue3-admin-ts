<template>
  <aside class="aside">
    <header class="header">
      <img src="https://s.weituibao.com/1582958061265/mlogo.png" alt="logo" />
      <span>vue3 admin ts</span>
    </header>
    <div class="line" />
    <el-menu
      background-color="#222832"
      text-color="#fff"
      active-text-color="#1BAEAE"
      :default-openeds="['1', '2', '3', '4']"
      :router="true"
      :default-active="props.currentPath"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>Dashboard</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/introduce">
            <el-icon> <data-line /> </el-icon>
            <span>系统介绍</span>
          </el-menu-item>
          <el-menu-item index="/dashboard">
            <el-icon> <odometer /> </el-icon>
            <span>Dashboard</span>
          </el-menu-item>
          <el-menu-item index="/add">
            <el-icon> <plus /> </el-icon>
            <span>添加商品</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <div class="line" />
      <el-sub-menu index="2">
        <template #title>
          <span>首页配置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/swiper">
            <el-icon> <picture-filled /> </el-icon>
            <span>轮播图配置</span>
          </el-menu-item>
          <el-menu-item index="/hot">
            <el-icon> <goods /> </el-icon>
            <span>热销商品配置</span>
          </el-menu-item>
          <el-menu-item>
            <el-icon> <sell /> </el-icon>
            <span>新品上线配置</span>
          </el-menu-item>
          <el-menu-item>
            <el-icon> <star-filled /> </el-icon>
            <span>为你推荐配置</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <div class="line" />
      <el-sub-menu index="3">
        <template #title>
          <span>模块管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item>
            <el-icon> <menua /> </el-icon>
            <span>分类管理</span>
          </el-menu-item>
          <el-menu-item index="/good">
            <el-icon> <shopping-bag /> </el-icon>
            <span>商品管理</span>
          </el-menu-item>
          <el-menu-item>
            <el-icon> <user-filled /> </el-icon>
            <span>会员管理</span>
          </el-menu-item>
          <el-menu-item index="/order">
            <el-icon> <list /> </el-icon>
            <span>订单管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <div class="line" />
      <el-sub-menu index="4">
        <template #title>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/account">
            <el-icon> <lock /> </el-icon>
            <span>修改密码</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </aside>
</template>
<script setup lang="ts">
  import {
    DataLine,
    Odometer,
    Plus,
    PictureFilled,
    Goods,
    Sell,
    StarFilled,
    Menu as Menua, // menu和原生menu冲突了,所以这里进行重命名
    List,
    UserFilled,
    ShoppingBag,
    Lock
  } from '@element-plus/icons'

  // 接收App.vue传过来的参数，可以直接在模版中使用
  const props = defineProps({ currentPath: String })
</script>
<style lang="less" scoped>
  .aside {
    height: 100vh;
    width: 200px !important;
    flex: 0 0 auto;
    background: #222832;
    color: #fff;
    overflow: hidden;
    overflow-y: auto;
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      span {
        font-size: 18px;
      }
    }
    .line {
      border-top: 1px solid hsla(0, 0%, 100%, 0.05);
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .el-menu {
      width: 100%;
      border: none;
      background: #222832;
      :deep(.is-opened) {
        .el-menu--inline {
          background-color: #222832;
          .el-menu-item-group {
            .el-menu-item {
              color: #fff;
              &:focus {
                background-color: transparent;
              }
              &:hover {
                background-color: transparent;
              }
            }
            .is-active {
              color: #1baeae;
            }
          }
        }
      }
      .el-icon {
        font-size: 18px;
        margin-right: 8px;
        margin-bottom: 5px;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
