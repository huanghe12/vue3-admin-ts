<template>
  <el-card class="swiper-container">
    <template #header>
      <el-button icon="el-icon-plus" size="small" class="add-btn" @click="changeSwiper()"
        >新增</el-button
      >
      <el-popconfirm title="确定删除吗？" @confirm="delSwiper">
        <template #reference>
          <el-button icon="el-icon-delete" size="small" class="del-btn">批量删除</el-button>
        </template>
      </el-popconfirm>
    </template>
    <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
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
          <el-button type="text" @click="changeSwiper(row.carouselId)">修改</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="delSwiper(row.carouselId)">
            <template #reference>
              <el-button type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="state.total > 10"
      v-model:current-page="state.pageNumber"
      v-model:page-size="state.pageSize"
      background
      layout="prev, pager, next"
      :total="state.total"
      @current-change="getSwipers"
    />
  </el-card>
  <DialogSwipier ref="dialogRef" :get-swipers="getSwipers" />
</template>

<script lang="ts" setup>
  import DialogSwipier from '@/components/DialogSwipier.vue'
  import { deleteSwiper, getCarousels } from '@/api'
  import { ElMessage } from 'element-plus'
  import { onMounted, reactive, ref, toRefs } from 'vue-demi'

  const dialogRef = ref<typeof DialogSwipier>()
  const state = reactive({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
    loading: false,
    list: <any[]>[],
    multipleSelection: <any[]>[]
  })
  const getSwipers = async () => {
    state.loading = true
    const params = {
      pageNumber: state.pageNumber,
      pageSize: state.pageSize
    }
    const { data } = await getCarousels(params)
    state.list = data.list
    state.total = data.totalCount
    state.loading = false
  }
  onMounted(() => {
    getSwipers()
  })

  const handleSelectionChange = (val: any[]) => {
    state.multipleSelection = val
  }
  const changeSwiper = (id?: string) => {
    dialogRef.value!.open(id)
  }
  const delSwiper = async (id?: string) => {
    let data
    if (id) {
      data = { ids: [id] }
    } else {
      if (!state.multipleSelection.length) {
        ElMessage.error('请选择要删除的选项')
        return
      }
      data = {
        ids: state.multipleSelection.map((el: any) => el.carouselId)
      }
    }
    try {
      await deleteSwiper(data)
      ElMessage.success('删除成功')
      getSwipers()
    } catch (error) {}
  }
  const { list, loading } = toRefs(state)
</script>
<style lang="less" scoped>
  .swiper-container {
    .add-btn {
      color: #fff;
      background-color: #1baeae;
      border-color: #1baeae;
    }
    .del-btn {
      color: #fff;
      background-color: #f78989;
      border-color: #f78989;
    }
    img {
      width: 150px;
      height: 150px;
    }
    :deep(.el-pagination) {
      margin-top: 15px;
      text-align: center;
      .el-pager {
        li:not(.disabled).active {
          background-color: #1baeae;
        }
      }
    }
  }
</style>
