<template>
  <el-card class="order-container">
    <div class="data">
      <el-card class="data-item" shadow="never">
        <template #header>
          <div><span>订单状态</span></div>
        </template>
        <div> {{ orderData.orderStatusString }} </div>
      </el-card>
      <el-card class="data-item" shadow="never">
        <template #header>
          <div><span>创建时间</span></div>
        </template>
        <div> {{ orderData.createTime }} </div>
      </el-card>
      <el-card class="data-item" shadow="never">
        <template #header>
          <div><span>订单号</span></div>
        </template>
        <div> {{ orderData.orderNo }} </div>
      </el-card>
    </div>
    <el-table :data="tableData" :border="true">
      <el-table-column label="商品图片" align="center">
        <template #default="{ row }">
          <img
            :key="row.goodsId"
            :src="$filters.prefix(row.goodsCoverImg)"
            alt="商品主图"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品编号" prop="goodsId" align="center" />
      <el-table-column label="商品名" prop="goodsName" align="center" />
      <el-table-column label="商品数量" prop="goodsCount" align="center" />
      <el-table-column label="价格" prop="sellingPrice" align="center" />
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
  import { orderDetails } from '@/api'
  import { onMounted, reactive, toRefs } from 'vue-demi'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const { id } = route.query
  const state = reactive({
    orderData: <any>{},
    tableData: <any>[]
  })

  onMounted(async () => {
    const res = await orderDetails(id)
    const { data } = res
    state.orderData = data
    state.tableData = data.newBeeMallOrderItemVOS
    console.log(data)
  })

  const { orderData, tableData } = toRefs(state)
</script>
<style lang="less" scoped>
  .el-container {
    .data {
      width: 100%;
      display: flex;
      gap: 20px;
      margin-bottom: 50px;
      .data-item {
        flex: 1;
      }
    }
  }
</style>
