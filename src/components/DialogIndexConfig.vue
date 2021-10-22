<template>
  <el-dialog v-model="visible" :title="title" width="400px" @close="handleClose">
    <el-form
      ref="formRef"
      :model="formData"
      label-position="right"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item label="商品名称：" prop="configName">
        <el-input v-model="formData.configName" />
      </el-form-item>
      <el-form-item label="跳转链接：" prop="redirectUrl">
        <el-input v-model="formData.redirectUrl" />
      </el-form-item>
      <el-form-item label="商品编号：" prop="goodsId">
        <el-input v-model="formData.goodsId" type="number" />
      </el-form-item>
      <el-form-item label="排序值：" prop="configRank">
        <el-input v-model="formData.configRank" type="number" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { changeIndexConfig, getIndexConfigDetail } from '@/api'
  import { hasEmoji } from '@/utils/auth'
  import { ElForm, ElMessage } from 'element-plus'
  import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
  import { reactive, ref, toRefs } from 'vue-demi'

  const props = defineProps({ queryIndexConfig: Function, configType: Number })
  const formRef = ref<InstanceType<typeof ElForm>>()
  const state = reactive({
    title: '',
    visible: false,
    formData: {
      configId: '',
      configType: props.configType,
      configName: '',
      redirectUrl: '',
      goodsId: '',
      configRank: ''
    },
    rules: {
      configName: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
      goodsId: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
      configRank: [{ required: true, message: '排序值不能为空', trigger: 'blur' }]
    } as FormRulesMap
  })

  const getDetails = async (id: string) => {
    const { data } = await getIndexConfigDetail(id)
    state.formData = {
      configId: data.configId,
      configType: data.configType,
      configName: data.configName,
      redirectUrl: data.redirectUrl,
      goodsId: data.goodsId,
      configRank: data.configRank
    }
  }
  const open = async (id?: string) => {
    state.visible = true
    state.title = id ? '修改商品' : '添加商品'
    if (id) return getDetails(id)
    state.formData = {
      configId: '',
      configType: props.configType,
      configName: '',
      redirectUrl: '',
      goodsId: '',
      configRank: ''
    }
  }
  const submit = () => {
    formRef.value?.validate(async (valid) => {
      if (valid) {
        if (hasEmoji(state.formData.configName) || hasEmoji(state.formData.redirectUrl))
          return ElMessage.error('不要输入表情包，再输入就打死你个龟孙儿~')
        if (state.formData.configName.length > 128)
          return ElMessage.error('商品名称不能超过128个字符')
        if (Number(state.formData.configRank) < 0 || Number(state.formData.configRank) > 200)
          return ElMessage.error('排序值不能小于 0 或大于 200')
        await changeIndexConfig(state.formData, state.formData.configId ? 'put' : 'post')
        ElMessage.success(state.formData.configId ? '修改成功' : '添加成功')
        state.visible = false
        props.queryIndexConfig!()
      }
    })
  }
  const handleClose = () => {
    formRef.value?.resetFields()
  }
  defineExpose({ open })
  const { title, visible, formData, rules } = toRefs(state)
</script>
<style lang="less" scoped></style>
