<!--  -->
<template>
  <el-card class="swiper-container">
    <el-table :data="list">
      <el-table-column type="selection" width="55" />
      <el-table-column label="轮播图" width="200" align="center">
        <template #default="{ row }">
          <img :src="row.carouselUrl" alt="轮播图" />
        </template>
      </el-table-column>
      <el-table-column label="跳转链接" align="center">
        <template #default="{ row }">
          <a target="_blank" :href="row.redirectUrl">{{ row.redirectUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column label="排序值" align="center" width="120" prop="carouselRank" />
      <el-table-column label="添加时间" align="center" width="200" prop="createTime" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="changeSwiper()">修改</el-button>
          <el-button type="text" @click="delSwiper(row.carouselId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
  import { deleteSwiper, getCarousels } from '@/api'
  import { ElMessage } from 'element-plus'
  import { onMounted, reactive, toRefs } from 'vue-demi'

  const state = reactive({
    list: <any>[]
  })
  const getSwipers = async () => {
    const data = {
      pageNumber: 1,
      pageSize: 10
    }
    const res = await getCarousels(data)
    state.list = res.data.list
  }
  onMounted(() => {
    getSwipers()
  })

  const changeSwiper = () => {}
  const delSwiper = async (id?: string) => {
    const data = {
      ids: id ? [id] : ''
    }
    await deleteSwiper(data)
    ElMessage.success('删除成功')
    getSwipers()
  }
  const { list } = toRefs(state)
</script>
<style lang="less" scoped>
  .swiper-container {
    img {
      width: 150px;
      height: 150px;
    }
  }
</style>
