<template>
  <aside class="aside">
    <header class="header">
      <img src="https://s.weituibao.com/1582958061265/mlogo.png" alt="logo" />
      <span>vue3 admin ts</span>
    </header>
    <div class="line" />
    <el-menu background-color="#222832">
      <el-sub-menu>
        <template #title>
          <span>Dashboard</span>
        </template>
        <el-menu-item-group> <el-menu-item> 系统介绍 </el-menu-item> </el-menu-item-group>m
        <el-menu-item-group> <el-menu-item> Dashboard </el-menu-item> </el-menu-item-group>m
        <el-menu-item-group> <el-menu-item> 添加商品 </el-menu-item> </el-menu-item-group>m
      </el-sub-menu>
    </el-menu>
  </aside>
</template>
<style lang="less" scoped>
  .aside {
    width: 200px !important;
    flex: 1 0 auto;
    background: #222832;
    color: #fff;
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
  }
</style>
