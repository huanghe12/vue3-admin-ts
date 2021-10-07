<template>
  <el-card class="good-card">
    <template #header>
      <el-button icon="el-icon-plus" class="btn" @click="addGood"> 添加商品 </el-button>
    </template>
    <el-table v-loading="state.loading" :data="goodList" :lazy="true" style="width: 100%">
      <el-table-column label="商品编号" align="center">
        <template #default="{ row }">
          <span>{{ row.goodsId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名" align="center">
        <template #default="{ row }">
          <span>{{ row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品简介" align="center">
        <template #default="{ row }">
          <span>{{ row.goodsIntro }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" align="center" width="150px">
        <template #default="{ row }">
          <img style="height: 100px; width: 100px" :src="row.goodsCoverImg" alt="商品主图" />
        </template>
      </el-table-column>
      <el-table-column label="商品库存" align="center">
        <template #default="{ row }">
          <span>{{ row.stockNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品售价" align="center">
        <template #default="{ row }">
          <span>{{ row.sellingPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上架状态" align="center">
        <template #default="{ row }">
          <span v-if="row.goodsSellStatus === 0" style="color: green">销售中</span>
          <span v-else style="color: red">已下架</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="changeGood(row.goodsId)">修改</el-button>
          <el-button
            v-if="row.goodsSellStatus === 0"
            type="text"
            @click="handleClick(row.goodsId, 1)"
            >下架</el-button
          >
          <el-button v-else type="text" @click="handleClick(row.goodsId, 0)">上架</el-button>
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
      @current-change="getList"
    />
  </el-card>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { changeStatus, getGoodList } from '@/api'
  import { onMounted, reactive, ref } from 'vue-demi'

  const router = useRouter()
  const goodList = ref<any[]>([])
  const state = reactive({
    loading: false,
    total: 0,
    pageNumber: 1,
    pageSize: 10
  })

  onMounted(() => {
    getList()
  })

  const getList = async () => {
    state.loading = true
    const data = {
      pageNumber: state.pageNumber,
      pageSize: state.pageSize
    }
    const res = await getGoodList(data)
    goodList.value = res.data.list
    // vue3.x不建议使用过滤器，因此使用方法修改图片url
    goodList.value.forEach((el) => {
      if (el.goodsCoverImg && el.goodsCoverImg.startsWith('http')) {
        el.goodsCoverImg = el.goodsCoverImg
      } else {
        el.goodsCoverImg = `http://backend-api-02.newbee.ltd${el.goodsCoverImg}`
      }
    })
    state.total = res.data.totalCount
    state.pageNumber = res.data.currPage
    state.loading = false
  }

  const addGood = () => {
    router.push({ path: '/add' })
  }

  const changeGood = (id: string) => {
    router.push({
      path: '/add',
      query: {
        id: id
      }
    })
  }

  const handleClick = async (id: string, status: 0 | 1) => {
    const data = {
      ids: { ids: [id] },
      status: status
    }
    const res = await changeStatus(data)
    if (res.resultCode === 200) {
      getList()
    }
  }
</script>
<style lang="less" scoped>
  .good-card {
    min-height: 100%;
    .btn {
      background-color: #1baeae;
      color: #fff;
      border-color: #1baeae;
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
