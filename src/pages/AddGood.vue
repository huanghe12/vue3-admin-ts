<template>
  <el-card>
    <el-form ref="goodRef" :model="state.goodsForm" label-width="100px" :rules="state.rules">
      <el-form-item required label="商品分类" prop="goodCategory">
        <el-cascader
          v-model="goodsForm.goodCategory"
          :placeholder="state.defaultCate"
          :props="state.categroy"
          :style="inpWidth"
          @change="changeCategory"
        />
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
          :action="uploadImage"
          accept="jpg,jpeg,png"
          :headers="{ token: get('token') }"
          :show-file-list="false"
          :before-upload="beforeUploadImage"
          :on-success="uploadImageSuccesseed"
        >
          <img
            v-if="goodsForm.goodsCoverImg"
            style="width: 100px; height: 100px; border: 1px solid #e9e9e9"
            :src="goodsForm.goodsCoverImg"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="详情内容">
        <div ref="editor" />
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
  import E from 'wangeditor'
  import { ref, reactive, onMounted, onBeforeUnmount } from 'vue-demi'
  import { CascaderProps, ElForm, ElMessage } from 'element-plus'
  import type { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
  import { addGoods, getCategories } from '@/api'
  import { Plus } from '@element-plus/icons'
  import { uploadImage, get } from '@/utils/auth'
  // 指定input的宽度，需要修改时统一修改
  const inpWidth = 'width: 300px'

  const state = reactive({
    defaultCate: '请选择商品分类',
    goodsForm: {
      categoryId: '',
      goodCategory: '',
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
      goodCategory: [{ required: 'true', message: '请选择商品分类', trigger: ['change'] }],
      goodsCoverImg: [{ required: 'true', message: '请上传主图', trigger: ['change'] }],
      goodsName: [{ required: 'true', message: '请填写商品名称', trigger: ['change'] }],
      originalPrice: [{ required: 'true', message: '请填写商品价格', trigger: ['change'] }],
      sellingPrice: [{ required: 'true', message: '请填写商品售价', trigger: ['change'] }],
      stockNum: [{ required: 'true', message: '请填写商品库存', trigger: ['change'] }]
    } as FormRulesMap,
    categroy: {
      lazy: true,
      async lazyLoad(node, resolve) {
        const { level = 0, value } = node
        const res: any = await getCategories({
          pageNumber: 1,
          pageSize: 1000,
          categoryLevel: level + 1,
          parentId: value || 0
        })
        const list = res.list
        const nodes = list.map((el: any) => ({
          value: el.categoryId,
          label: el.categoryName,
          leaf: level > 1
        }))
        resolve(nodes)
      }
    } as CascaderProps
  })

  const goodRef = ref<InstanceType<typeof ElForm>>()
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
  // 修改商品分类
  const changeCategory = (val: any) => {
    state.goodsForm.categoryId = val[2] || 0
  }
  const beforeUploadImage = (file: File) => {
    const index = file.name.lastIndexOf('.')
    const str = file.name.slice(index + 1)
    if (!['jpg', 'png', 'jpeg'].includes(str)) {
      ElMessage.error('请上传 jpg/png/jpeg 格式的图片')
      return false
    }
  }
  const uploadImageSuccesseed = () => {}
  // 提交
  const submit = () => {
    goodRef.value?.validate(async (valid) => {
      if (valid) {
        const res = await addGoods('post', state.goodsForm)
        console.log(res)
      }
    })
  }
  const goodsForm = state.goodsForm
</script>
<style lang="less" scoped>
  .el-form {
    .el-form-item {
      // margin-bottom: 22px;
      // display: flex;
      .el-form-item__content {
        .avatar-uploader {
          width: 100px;
          height: 100px;
          color: #ddd;
          :deep(.el-upload--text) {
            width: 100%;
            height: 100%;
            .avatar-uploader-icon {
              font-size: 30px;
              display: block;
              width: 100%;
              height: 100%;
              border: 1px solid #e9e9e9;
              padding: 32px 17px;
            }
          }
        }
      }
    }
  }
</style>
