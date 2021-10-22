<template>
  <el-card>
    <template #header>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="handleSolve"
        >解除禁用</el-button
      >
      <el-button size="small" type="danger" icon="el-icon-delete" @click="handleForbid"
        >禁用账户</el-button
      >
    </template>
    <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectChange">
      <el-table-column type="selection" align="center" />
      <el-table-column label="昵称" prop="nickName" align="center" />
      <el-table-column label="登录名" prop="loginName" align="center" />
      <el-table-column label="身份状态" align="center">
        <template #default="{ row }">
          <span :style="row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
            {{ row.lockedFlag == 0 ? '正常' : '禁用' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="是否注销" prop="" align="center">
        <template #default="{ row }">
          <span :style="row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
            {{ row.isDeleted == 0 ? '正常' : '注销' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" prop="createTime" align="center" />
    </el-table>
    <el-pagination
      v-model:current-page="pageNumber"
      v-model:page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="queryGuests"
    />
  </el-card>
</template>

<script lang="ts" setup>
  import { disableGuests, disablementGuests, getGuests } from '@/api'
  import { ElMessage } from 'element-plus'
  import { onMounted, reactive, toRefs } from 'vue-demi'

  const state = reactive({
    loading: false,
    multipleSelection: <any[]>[],
    pageNumber: 1,
    pageSize: 10,
    total: 0,
    tableData: <any[]>[]
  })
  onMounted(() => {
    queryGuests()
  })
  const queryGuests = async () => {
    state.loading = true
    const qeuryData = {
      params: {
        pageNumber: state.pageNumber,
        pageSize: state.pageSize
      }
    }
    const { data } = await getGuests(qeuryData)
    state.tableData = data.list
    state.total = data.totalCount
    state.loading = false
  }
  const handleSelectChange = (val: any[]) => {
    state.multipleSelection = val.map((el) => el.userId)
  }
  const handleSolve = async () => {
    if (!state.multipleSelection.length) {
      ElMessage.error('请选择项')
      return
    }
    const data = {
      ids: state.multipleSelection
    }
    await disableGuests(data)
    ElMessage.success('解除成功')
    queryGuests()
  }
  const handleForbid = async () => {
    if (!state.multipleSelection.length) {
      ElMessage.error('请选择项')
      return
    }
    const data = {
      ids: state.multipleSelection
    }
    await disablementGuests(data)
    ElMessage.success('禁用成功')
    queryGuests()
  }
  const { loading, tableData, total, pageSize, pageNumber } = toRefs(state)
</script>
<style lang="less" scoped>
  :deep(.el-pagination) {
    margin-top: 15px;
    text-align: center;
  }
</style>
