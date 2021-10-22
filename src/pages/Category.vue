<template>
  <el-card>
    <template #header>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="openDialog()"
        >增加</el-button
      >
      <el-popconfirm title="确定删除吗？" @confirm="handleDelete()">
        <template #reference>
          <el-button icon="el-icon-delete" type="danger" size="small">批量删除</el-button>
        </template>
      </el-popconfirm>
    </template>
    <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectChange">
      <el-table-column type="selection" />
      <el-table-column label="分类名称" align="center" prop="categoryName" />
      <el-table-column label="排序值" align="center" prop="categoryRank" />
      <el-table-column label="添加时间" align="center" prop="createTime" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="openDialog(row.categoryId)">修改</el-button>
          <el-button type="text" @click="handleNext(row)">下级分类</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(row.categoryId)">
            <template #reference>
              <el-button type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNumber"
      v-model:page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="queryCategories"
    />
  </el-card>
  <DialogCategory ref="categoryRef" :query-categories="queryCategories" />
</template>

<script lang="ts" setup>
  import { delCategory, getCategories } from '@/api'
  import DialogCategory from '@/components/DialogCategory.vue'
  import { ElMessage } from 'element-plus'
  import { onMounted, reactive, ref, toRefs } from 'vue-demi'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  const categoryRef = ref<typeof DialogCategory>()
  const state = reactive({
    loading: false,
    pageNumber: 1,
    pageSize: 10,
    total: 0,
    tableData: <any[]>[],
    multipleSelection: <any[]>[]
  })
  const queryCategories = async () => {
    state.loading = true
    const { level = 1, parent_id = 0 } = route.query
    const { data } = await getCategories({
      params: {
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        categoryLevel: level,
        parentId: parent_id
      }
    })
    state.tableData = data.list
    state.total = data.totalCount
    state.loading = false
  }
  const handleSelectChange = (val: any[]) => {
    state.multipleSelection = val.map((el) => el.categoryId)
  }
  // 删除
  const handleDelete = async (id?: string) => {
    if (!id) {
      if (!state.multipleSelection.length) return ElMessage.error('请选择项')
    }
    const data = {
      ids: id ? [id] : state.multipleSelection
    }
    await delCategory(data)
    ElMessage.success('删除成功')
    queryCategories()
  }
  const handleNext = (item: any) => {
    const levelNum = item.categoryLevel + 1
    if (levelNum === 4) return ElMessage.error('没有下一级')
    router.push({
      path: `/category/level${levelNum}`,
      query: {
        level: levelNum,
        parent_id: item.categoryId
      }
    })
  }
  // 路由变化时重新查询
  router.afterEach((to) => {
    if (['category', 'level2', 'level3'].includes(to.name as string)) {
      queryCategories()
    }
  })

  const openDialog = (id?: string) => {
    categoryRef.value!.open(id)
  }
  onMounted(() => {
    queryCategories()
  })
  const { loading, tableData, pageNumber, pageSize, total } = toRefs(state)
</script>
<style lang="less" scoped>
  :deep(.el-pagination) {
    margin-top: 15px;
    text-align: center;
  }
</style>
