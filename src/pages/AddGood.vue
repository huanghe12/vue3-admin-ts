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
        <el-button @click="submit">{{ id ? '立即修改' : '立即添加' }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
  import E from 'wangeditor'
  import { ref, reactive, onMounted, onBeforeUnmount } from 'vue-demi'
  import { CascaderProps, ElForm, ElMessage } from 'element-plus'
  import type { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
  import { addGoods, getCategories, getGoodsInfo } from '@/api'
  import { Plus } from '@element-plus/icons'
  import { uploadImage, get, hasEmoji, uploadImages } from '@/utils/auth'
  import type {
    FileHandler,
    FileResultHandler
  } from 'element-plus/lib/components/upload/src/upload.type'
  import { useRoute } from 'vue-router'
  // 指定input的宽度，需要修改时统一修改
  const inpWidth = 'width: 300px'

  const route = useRoute()

  const id = <string>route.query.id
  const state = reactive({
    defaultCate: '请选择商品分类',
    goodsForm: {
      goodsCategoryId: '',
      goodCategory: [] as any,
      goodsName: '',
      goodsIntro: '',
      originalPrice: '',
      sellingPrice: '',
      stockNum: '',
      goodsSellStatus: '0',
      goodsCoverImg: '',
      tag: '',
      goodsDetailContent: ''
    } as any,
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
        const list = res.data.list
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
  onMounted(async () => {
    instance = new E(editor.value)
    // 隐藏插入网络图片的功能，只保留上传本地图片
    instance.config.showLinkImg = false
    // 限制上传图片的大小
    instance.config.uploadImgMaxSize = 2 * 1024 * 1024 // 2M
    // 自定义filename
    instance.config.uploadFileName = 'file'
    // 上传图片时添加 http 请求的 header
    instance.config.uploadImgHeaders = {
      token: get('token') || ''
    }
    // 上传图片的接口
    instance.config.uploadImgServer = uploadImages
    // 图片返回格式不同，需要自定义返回格式
    instance.config.uploadImgHooks = {
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: function (insertImgFn, result) {
        // result 即服务端返回的接口
        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        if (result.data && result.data.length) {
          result.data.map((item) => {
            // 使用call修改this指向
            insertImgFn.call(instance!, item as string)
          })
        }
      }
    }
    instance.create()
    if (id) {
      const res = await getGoodsInfo({ id })
      const { goods, firstCategory, secondCategory, thirdCategory } = res.data
      if (res.resultCode === 200) {
        state.goodsForm.goodsName = goods.goodsName
        state.goodsForm.goodsIntro = goods.goodsIntro
        state.goodsForm.originalPrice = goods.originalPrice
        state.goodsForm.sellingPrice = goods.sellingPrice
        state.goodsForm.stockNum = goods.stockNum
        state.goodsForm.goodsSellStatus = String(goods.goodsSellStatus)
        state.goodsForm.tag = goods.tag
        state.goodsForm.goodsCoverImg = handleImageUrl(goods.goodsCoverImg)
        state.goodsForm.goodsCategoryId = goods.goodsCategoryId
        state.goodsForm.goodCategory.push(
          firstCategory.categoryId,
          secondCategory.categoryId,
          thirdCategory.categoryId
        )
        state.defaultCate = `${firstCategory.categoryName}/${secondCategory.categoryName}/${thirdCategory.categoryName}`
        instance.txt.html(goods.goodsDetailContent)
      }
    }
  })
  onBeforeUnmount(() => {
    instance?.destroy()
    instance = null
  })
  // 处理图片url
  const handleImageUrl = (url: string) => {
    if (url && url.startsWith('http')) {
      return url
    } else {
      return `http://backend-api-02.newbee.ltd${url}`
    }
  }
  // 修改商品分类
  const changeCategory = (val: any) => {
    state.goodsForm.goodsCategoryId = val[2] || 0
  }
  // 上传图片之前
  const beforeUploadImage: FileHandler = (file) => {
    const index = file.name.lastIndexOf('.')
    const str = file.name.slice(index + 1)
    if (!['jpg', 'png', 'jpeg'].includes(str)) {
      ElMessage.error('请上传 jpg/png/jpeg 格式的图片')
      return false
    }
  }
  // 上传图片成功
  const uploadImageSuccesseed: FileResultHandler = (response) => {
    state.goodsForm.goodsCoverImg = response.data
    ElMessage.success('上传成功')
  }
  // 提交
  const submit = () => {
    state.goodsForm.goodsDetailContent = instance?.txt.html() as string
    goodRef.value?.validate(async (valid) => {
      if (valid) {
        if (
          hasEmoji(state.goodsForm.goodsIntro) ||
          hasEmoji(state.goodsForm.goodsName) ||
          hasEmoji(state.goodsForm.tag) ||
          hasEmoji(state.goodsForm.goodsDetailContent)
        ) {
          ElMessage.error('不要输入表情包，再输入就打死你个龟孙儿~')
          return
        }
        if (state.goodsForm.goodsName.length > 128) {
          ElMessage.error('商品名称不能超过128个字符')
          return
        }
        if (state.goodsForm.goodsIntro.length > 200) {
          ElMessage.error('商品简介不能超过200个字符')
          return
        }
        if (state.goodsForm.tag.length > 16) {
          ElMessage.error('商品标签不能超过16个字符')
          return
        }
        if (id) {
          state.goodsForm.goodsId = id
        }
        const res = await addGoods(id ? 'put' : 'post', state.goodsForm)
        if (res.resultCode === 200) {
          ElMessage.success(id ? '修改成功' : '添加成功')
        }
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
  :deep(.el-radio-group) {
    .is-checked {
      color: #1baeae;
      .is-checked {
        .el-radio__inner {
          border-color: #1baeae;
          background-color: #1baeae;
        }
      }
      .el-radio__label {
        color: #1baeae;
      }
    }
  }
  .el-button {
    background-color: #1baeae;
    color: #fff;
    border-color: #1baeae;
  }
</style>
