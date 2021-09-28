<template>
  <el-card>
    <el-form ref="goodForm" :model="state.goodsForm" label-width="100px" :rules="state.rules">
      <el-form-item required label="商品分类">
        <el-input :style="inpWidth" />
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsName">
        <el-input
          v-model="goodsForm.goodsName"
          type="text"
          :style="inpWidth"
          placeholder="请输入商品名称"
        />
      </el-form-item>
      <el-form-item label="商品简介">
        <el-input
          v-model="goodsForm.goodsIntro"
          type="textarea"
          :style="inpWidth"
          placeholder="请输入商品简介"
          maxlength="100"
          :show-word-limit="true"
        />
      </el-form-item>
      <el-form-item label="商品价格" prop="originalPrice">
        <el-input
          v-model="goodsForm.originalPrice"
          type="number"
          :style="inpWidth"
          placeholder="请输入商品价格"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="商品售价" prop="sellingPrice">
        <el-input
          v-model="goodsForm.sellingPrice"
          type="number"
          :style="inpWidth"
          placeholder="请输入商品售价"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="商品库存" prop="stockNum">
        <el-input
          v-model="goodsForm.stockNum"
          type="number"
          :style="inpWidth"
          placeholder="请输入商品库存"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="商品标签">
        <el-input
          v-model="goodsForm.tag"
          type="text"
          :style="inpWidth"
          placeholder="请输入商品标签"
        />
      </el-form-item>
      <el-form-item label="上架状态">
        <el-radio-group v-model="goodsForm.goodsSellStatus">
          <el-radio label="0">上架</el-radio>
          <el-radio label="1">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品主图" prop="goodsCoverImg">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
        >
          <i class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="详情内容">
        <div ref="editor" />
      </el-form-item>
      <el-form-item>
        <el-button>立即添加</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
  import E from 'wangeditor'
  import { ref, reactive, onMounted, onBeforeUnmount } from 'vue-demi'
  import { ElForm } from 'element-plus'
  import type { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
  // 指定input的宽度，需要修改时统一修改
  const inpWidth = 'width: 300px'

  const state = reactive({
    goodsForm: {
      goodsName: '',
      goodsIntro: '',
      originalPrice: '',
      sellingPrice: '',
      stockNum: '',
      goodsSellStatus: '0',
      goodsCoverImg: '',
      tag: ''
    },
    rules: {
      goodsCoverImg: [{ required: 'true', message: '请上传主图', trigger: ['change'] }],
      goodsName: [{ required: 'true', message: '请填写商品名称', trigger: ['change'] }],
      originalPrice: [{ required: 'true', message: '请填写商品价格', trigger: ['change'] }],
      sellingPrice: [{ required: 'true', message: '请填写商品售价', trigger: ['change'] }],
      stockNum: [{ required: 'true', message: '请填写商品库存', trigger: ['change'] }]
    } as FormRulesMap
  })

  const goodForm = ref<InstanceType<typeof ElForm>>()
  // 获取绑定 ref=editor的元素
  const editor = ref<null | HTMLElement>(null)

  let instance: E | null

  onMounted(() => {
    instance = new E(editor.value)
    instance.create()
  })

  onBeforeUnmount(() => {
    instance?.destroy()
    instance = null
  })
  const goodsForm = state.goodsForm
</script>
