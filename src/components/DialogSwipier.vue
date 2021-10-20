<!--  -->
<template>
  <el-dialog v-model="visable" :title="title" width="400px" @close="handleClose">
    <el-form
      ref="formRef"
      :model="swiperData"
      :rules="rules"
      label-position="right"
      label-width="85px"
    >
      <el-form-item label="图片：" prop="carouselUrl">
        <el-upload
          class="avatar-uploader"
          accept="jpg, jpeg, png"
          :show-file-list="false"
          :action="uploadImage"
          :headers="{ token: get('token') }"
          :before-upload="handleBeforeUpload"
          :on-success="handleSuccess"
        >
          <img
            v-if="swiperData.carouselUrl"
            :src="swiperData.carouselUrl"
            alt="图片"
            style="width: 200px; height: 100px; border: 1px solid #e9e9e9"
          />
          <el-icon v-else class="avatar-uploader-icon"> <Plus /> </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接：">
        <el-input v-model="swiperData.redirectUrl" />
      </el-form-item>
      <el-form-item label="排序值：" prop="carouselRank">
        <el-input v-model="swiperData.carouselRank" type="number" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="btn-wrap">
        <el-button @click="visable = false">取消</el-button>
        <el-button class="btn" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { changeSwiper, getSwiperDetails } from '@/api'
  import { get, uploadImage, hasEmoji } from '@/utils/auth'
  import { Plus } from '@element-plus/icons'
  import { ElForm, ElMessage } from 'element-plus'
  import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
  import {
    FileHandler,
    FileResultHandler
  } from 'element-plus/lib/components/upload/src/upload.type'
  import { reactive, ref, toRefs } from 'vue-demi'

  const props = defineProps({ getSwipers: Function })
  const formRef = ref<InstanceType<typeof ElForm>>()
  const state = reactive({
    swiperData: {
      carouselId: '',
      carouselUrl: '',
      redirectUrl: '',
      carouselRank: ''
    },
    rules: {
      carouselUrl: [{ required: true, message: '图片不能为空', trigger: 'change' }],
      carouselRank: [{ required: true, message: '排序不能为空', trigger: 'blur' }]
    } as FormRulesMap,
    title: '添加轮播图',
    visable: false
  })

  const open = (id?: string) => {
    state.visable = true
    if (id) {
      state.title = '修改轮播图'
      state.swiperData.carouselId = id
      getDetails(id)
    } else {
      state.title = '添加轮播图'
      state.swiperData = {
        carouselId: '',
        carouselUrl: '',
        redirectUrl: '',
        carouselRank: ''
      }
    }
  }

  const getDetails = async (id: string) => {
    const res = await getSwiperDetails(id)
    const { data } = res
    state.swiperData = {
      carouselId: data.carouselId,
      carouselUrl: data.carouselUrl,
      redirectUrl: data.redirectUrl,
      carouselRank: data.carouselRank
    }
  }
  const handleBeforeUpload: FileHandler = (file) => {
    const index = file.name.lastIndexOf('.')
    const str = file.name.slice(index + 1)
    if (!['jpg', 'png', 'jpeg'].includes(str)) {
      ElMessage.error('请上传 jpg/png/jpeg 格式的图片')
      return false
    }
  }
  const handleSuccess: FileResultHandler = (response) => {
    state.swiperData.carouselUrl = response.data
    ElMessage.success('上传成功')
  }
  const submit = () => {
    formRef.value?.validate(async (valid) => {
      if (valid) {
        if (hasEmoji(state.swiperData.redirectUrl)) {
          ElMessage.error('不要输入表情包，再输入就打死你个龟孙儿~')
          return
        }
        await changeSwiper(state.swiperData.carouselId ? 'put' : 'post', state.swiperData)
        ElMessage.success(state.swiperData.carouselId ? '修改成功' : '添加成功')
        state.visable = false
        if (props.getSwipers) props.getSwipers()
      }
    })
  }
  const handleClose = () => {
    formRef.value?.resetFields()
  }
  defineExpose({
    open
  })
  const { title, visable, swiperData, rules } = toRefs(state)
</script>
<style lang="less" scoped>
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
  .btn {
    background-color: #1baeae;
    border-color: #1baeae;
    color: #fff;
  }
</style>
