<template>
  <el-card>
    <div class="info">
      <el-card class="info-card">
        <template #header>
          <span>今日订单数</span>
        </template>
        <p>1888</p>
      </el-card>
      <el-card class="info-card">
        <template #header>
          <span>今日活跃</span>
        </template>
        <p>36271</p>
      </el-card>
      <el-card class="info-card">
        <template #header>
          <span>转化率</span>
        </template>
        <p>20%</p>
      </el-card>
    </div>
    <!-- 准备一个dom,用来初始化echarts -->
    <div id="container" />
  </el-card>
</template>
<script setup lang="ts">
  import * as echarts from 'echarts'
  import { onMounted, onUnmounted } from 'vue-demi'

  type EChartsOption = echarts.EChartsOption
  type EChartsType = echarts.EChartsType

  let myChart: EChartsType
  onMounted(() => {
    // 基于准备好的dom,初始化echarts实例
    myChart = echarts.init(document.getElementById('container') as HTMLDivElement)
    // 配置图表
    const option: EChartsOption = {
      // 图表标题
      title: { text: '系统折线图' },
      // 提示框组件
      tooltip: {
        // 触发类型 axis表示坐标轴触发
        trigger: 'axis',
        // 坐标轴指示器,指示坐标轴当前刻度
        axisPointer: {
          // 指示器类型
          type: 'cross',
          // 坐标轴指示器的文本标签
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      // 工具栏
      toolbox: {
        // 各工具配置项
        feature: {
          // 保存为图片
          saveAsImage: {}
        },
        right: '4%'
      },
      // 直角座标系内绘制网格
      grid: {
        // grid距容器的距离
        left: '3%',
        right: '4%',
        bottom: '3%',
        // grid区域是否包含坐标轴的刻度标签
        containLabel: true
      },
      // 图标示例,对应series中的name
      legend: { data: ['新增注册', '付费用户', '活跃用户', '订单数', '当日总收入'] },
      // x轴
      xAxis: [
        {
          // x轴类型 category为类目轴
          type: 'category',
          // 是否有边距
          boundaryGap: false,
          // 类目数据,在类目轴有效
          data: [
            '2021-03-11',
            '2021-03-12',
            '2021-03-13',
            '2021-03-14',
            '2021-03-15',
            '2021-03-16',
            '2021-03-17'
          ]
        }
      ],
      // y轴
      yAxis: [
        // 坐标轴类型,value表示数值轴,适用于连续数据
        { type: 'value' }
      ],
      // 数据组
      series: [
        {
          // 系列名称,用于tooltip的显示,legend的图例筛选
          name: '新增注册',
          type: 'line',
          // 数据堆叠，同个类目轴上系列配置相同的stack值后,后一个系列的值会在前一个系列的值上相加
          stack: '总量',
          // 区域填充样式,设置后显示成区域面积图
          areaStyle: {},
          // 折线的高亮状态
          emphasis: {
            // 在高亮图形时,是否淡出其他数据的图形 series:聚焦当前高亮的数据所在的系列的所有图形
            focus: 'series'
          },
          // 数据内容数组,数组项通常为具体的数据项
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '付费用户',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '活跃用户',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '订单数',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '当日总收入',
          type: 'line',
          stack: '总量',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
    // 使用配置项绘制图表
    option && myChart.setOption(option)
  })
  onUnmounted(() => {
    myChart.dispose()
  })
</script>

<style lang="less" scoped>
  .info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 100px;
    .info-card {
      width: 31%;
    }
  }

  #container {
    min-height: 300px;
  }
</style>
