<template>
  <el-card>
    <template #header>
      <el-input
        v-model="orderNo"
        size="small"
        style="width: 200px; margin-right: 10px"
        placeholder="请输入订单号"
        clearable
        @change="handleOption"
      />
      <el-select
        v-model="orderStatus"
        size="small"
        style="width: 200px; margin-right: 10px"
        @change="handleOption"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <el-table
      v-loading="loading"
      :data="orderList"
      style="width: 100%"
      @selection-change="handleSelectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="订单号" align="center" prop="orderNo" />
      <el-table-column label="订单总价" align="center" prop="totalPrice" />
      <el-table-column label="订单状态" align="center">
        <template #default="{ row }">
          <span>{{ $filters.orderMap(row.orderStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center">
        <template #default="{ row }">
          <span v-if="row.payType === 1">微信</span>
          <span v-else-if="row.payType === 2">支付宝</span>
          <span v-else>未支付</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-popconfirm v-if="row.orderStatus === '1'" title="确定配货完成吗？">
            <template #reference>
              <el-button type="text">配货完成</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="row.orderStatus === '2'" title="确定出库吗？">
            <template #reference>
              <el-button type="text">出库</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="!(row.orderStatus === '4' || row.orderStatus < 0)"
            title="确定关闭订单吗？"
          >
            <template #reference>
              <el-button type="text">关闭订单</el-button>
            </template>
          </el-popconfirm>
          <router-link to="/orderDetails" style="margin-left: 8px">订单详情</router-link>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
  import { getOrders } from '@/api'
  import { SelectOptionProxy } from 'element-plus'
  import { onMounted, reactive, toRefs } from 'vue-demi'

  const state = reactive({
    loading: true,
    orderList: <any[]>[],
    multipleSelection: <any[]>[],
    pageNumber: 1,
    pageSize: 10,
    orderNo: '',
    orderStatus: '',
    total: 0,
    options: [
      {
        value: '',
        label: '全部'
      },
      {
        value: 0,
        label: '待支付'
      },
      {
        value: 1,
        label: '已支付'
      },
      {
        value: 2,
        label: '配货完成'
      },
      {
        value: 3,
        label: '出库成功'
      },
      {
        value: 4,
        label: '交易成功'
      },
      {
        value: -1,
        label: '手动关闭'
      },
      {
        value: -2,
        label: '超时关闭'
      },
      {
        value: -3,
        label: '商家关闭'
      }
    ] as SelectOptionProxy[]
  })

  onMounted(() => {
    queryOrders()
  })
  const queryOrders = async () => {
    state.loading = true
    const params = {
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      orderNo: state.orderNo,
      orderStatus: state.orderStatus
    }
    const res = await getOrders(params)
    const { data } = res
    state.orderList = data.list
    state.total = data.totalCount
    state.loading = false
  }
  const handleSelectChange = (val: any[]) => {
    state.multipleSelection = val
  }
  const handleOption = () => {
    state.pageNumber = 1
    queryOrders()
  }
  const { loading, orderList, orderStatus, orderNo, options } = toRefs(state)
</script>
<style lang="less" scoped></style>
