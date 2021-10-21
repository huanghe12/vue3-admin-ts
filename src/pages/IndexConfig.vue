<template>
  <el-card class="hot-container">
    <template #header>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="openDialog()"
        >增加</el-button
      >
      <el-popconfirm title="确定删除吗？" @confirm="delConfig()">
        <template #reference>
          <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
        </template>
      </el-popconfirm>
    </template>
    <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectChange">
      <el-table-column type="selection" />
      <el-table-column label="商品名称" prop="configName" align="center" />
      <el-table-column label="跳转链接" align="center">
        <template #default="{ row }">
          <a :href="row.redirectUrl" target="_blank">{{ row.redirectUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column label="排序值" prop="configRank" align="center" />
      <el-table-column label="商品编号" prop="goodsId" align="center" />
      <el-table-column label="添加时间" prop="createTime" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="openDialog(row.configId)">修改</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="delConfig(row.configId)">
            <template #reference>
              <el-button type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:page-size="pageSize"
      v-model:current-page="pageNumber"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="queryIndexConfig"
    />
  </el-card>
  <DialogIndexConfig
    ref="dialogRef"
    :query-index-config="queryIndexConfig"
    :config-type="state.configType"
  />
</template>

<script lang="ts" setup>
  interface ConfigTypeMap {
    [propName: string]: number
  }

  import DialogIndexConfig from '@/components/DialogIndexConfig.vue'
  import { delIndexConfig, getIndexConfig } from '@/api'
  import { ElMessage } from 'element-plus'
  import { onMounted, reactive, ref, toRefs } from 'vue-demi'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const { name } = useRoute()
  const configTypeMap: ConfigTypeMap = {
    hot: 3,
    new: 4,
    recommend: 5
  }
  const dialogRef = ref<typeof DialogIndexConfig>()
  const state = reactive({
    loading: false,
    tableData: <any[]>[],
    pageNumber: 1,
    pageSize: 10,
    configType: configTypeMap[name as string],
    total: 0,
    multipleSelection: <any[]>[]
  })
  // 路由守卫，路由变化时重新查询
  router.beforeEach((to) => {
    state.configType = configTypeMap[to.name as string]
    state.pageNumber = 1
    queryIndexConfig()
  })
  onMounted(() => {
    queryIndexConfig()
  })
  const queryIndexConfig = async () => {
    state.loading = true
    const { data } = await getIndexConfig({
      params: {
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        configType: state.configType
      }
    })
    state.tableData = data.list
    state.total = data.totalCount
    state.loading = false
  }
  const handleSelectChange = (val: any[]) => {
    state.multipleSelection = val.map((el) => el.configId)
  }
  // 删除
  const delConfig = async (id?: string) => {
    if (!id) {
      if (!state.multipleSelection.length) return ElMessage.error('请选择项')
    }
    const data = {
      ids: id ? [id] : state.multipleSelection
    }
    try {
      await delIndexConfig(data)
      ElMessage.success('删除成功')
      queryIndexConfig()
    } catch (error: any) {
      console.error(error.message)
    }
  }
  const openDialog = (id?: string) => {
    dialogRef.value?.open(id)
  }

  const { loading, tableData, total, pageSize, pageNumber } = toRefs(state)
</script>
<style lang="less" scoped>
  :deep(.el-pagination) {
    margin-top: 15px;
    text-align: center;
  }
</style>
