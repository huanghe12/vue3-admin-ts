<template>
  <el-dialog v-model="visible" :title="title" width="400px" @close="handleClose">
    <el-form ref="fromRef" :rules="rules" label-position="right" label-width="100px">
      <el-form-item label="分类名称:" prop="categoryName">
        <el-input v-model="formData.categoryName" style="width: 200px" />
      </el-form-item>
      <el-form-item label="排序值:" prop="categoryRank">
        <el-input v-model="formData.categoryRank" type="number" :max="200" style="width: 200px" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { changeCategory } from '@/api'
  import { hasEmoji } from '@/utils/auth'
  import { ElForm, ElMessage } from 'element-plus'
  import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
  import { reactive, ref, toRefs } from 'vue-demi'

  const props = defineProps({ queryCategories: Function })
  const formRef = ref<InstanceType<typeof ElForm>>()
  const state = reactive({
    visible: false,
    title: '添加分类',
    formData: {
      categoryId: '',
      categoryLevel: '',
      categoryName: '',
      categoryRank: '',
      parentId: ''
    },
    rules: {
      categoryName: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
      categoryRank: [{ required: true, message: '排序值不能为空', trigger: 'blur' }]
    } as FormRulesMap
  })
  const open = (id?: string) => {
    state.visible = true
    state.title = id ? '修改分类' : '添加分类'
    if (id) {
      state.formData.categoryId = id
    }
  }
  const handleClose = () => {
    formRef.value?.resetFields()
  }
  const submitForm = () => {
    formRef.value?.validate(async (valid) => {
      if (valid) {
        if (hasEmoji(state.formData.categoryName))
          return ElMessage.error('不要输入表情包，再输入就打死你个龟孙儿~')
        await changeCategory(state.formData, state.formData.categoryId ? 'put' : 'post')
        ElMessage.success(state.formData.categoryId ? '修改成功' : '添加成功')
        state.visible = false
        props.queryCategories!()
      }
    })
  }
  const { visible, title, rules, formData } = toRefs(state)
  defineExpose({
    open
  })
</script>
<style lang="less" scoped></style>
