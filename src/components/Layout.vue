<template>
  <!-- <el-container>
    <Aside />
    <el-container direction="vertical">
      <Header />
      <div class="main">
        <router-view />
      </div>
      <Footer />
    </el-container>
  </el-container> -->
</template>
<script lang="ts" setup>
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  import Aside from './Aside.vue'
</script>

<style lang="less" scoped>
  .main {
    height: calc(100vh - 100px);
    overflow: auto;
    padding: 10px;
  }
</style>
