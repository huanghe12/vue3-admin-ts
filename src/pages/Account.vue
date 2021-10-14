<template>
  <el-card class="name-container">
    <el-form
      ref="nameRef"
      :model="nameForm"
      label-position="right"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="登录名：" prop="loginName">
        <el-input v-model="nameForm.loginName" type="text" style="width: 200px" />
      </el-form-item>
      <el-form-item label="昵称：" prop="nickName">
        <el-input v-model="nameForm.nickName" type="text" style="width: 200px" />
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="submitName">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="psd-container">
    <el-form ref="psdRef" :model="psdForm" label-position="right" label-width="80px" :rules="rules">
      <el-form-item label="旧密码：" prop="oldPsd">
        <el-input v-model="psdForm.oldPsd" type="password" style="width: 200px" />
      </el-form-item>
      <el-form-item label="新密码：" prop="newPsd">
        <el-input v-model="psdForm.newPsd" type="password" style="width: 200px" />
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="submitPsd">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
  import { ElForm, ElMessage } from 'element-plus'
  import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
  import { onMounted, reactive, ref, toRefs } from 'vue-demi'
  import { Md5 } from 'ts-md5'
  import { changeName, changepassword, getUserInfo } from '@/api'

  const nameRef = ref<InstanceType<typeof ElForm>>()
  const psdRef = ref<InstanceType<typeof ElForm>>()
  const state = reactive({
    nameForm: {
      loginName: '',
      nickName: ''
    },
    psdForm: {
      oldPsd: '',
      newPsd: ''
    },
    rules: {
      loginName: [{ required: true, message: '登录名不能为空', trigger: 'blur' }],
      nickName: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
      oldPsd: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
      newPsd: [{ required: true, message: '新密码不能为空', trigger: 'blur' }]
    } as FormRulesMap
  })

  onMounted(async () => {
    const res = await getUserInfo()
    const { data } = res
    state.nameForm.loginName = data.loginUserName
    state.nameForm.nickName = data.nickName
  })
  const submitName = () => {
    nameRef.value?.validate(async (valid) => {
      if (valid) {
        const data = {
          loginUserName: state.nameForm.loginName,
          nickName: state.nameForm.nickName
        }
        try {
          const res = await changeName(data)
          if (res.resultCode === 200) {
            ElMessage.success('修改成功')
            window.location.reload()
          }
        } catch (error) {}
      }
    })
  }
  const submitPsd = () => {
    psdRef.value?.validate(async (valid) => {
      if (valid) {
        const data = {
          originalPassword: Md5.hashStr(state.psdForm.oldPsd),
          newPassword: Md5.hashStr(state.psdForm.newPsd)
        }
        try {
          const res = await changepassword(data)
          if (res.resultCode === 200) {
            ElMessage.success('修改成功')
            window.location.reload()
          }
        } catch (error) {}
      }
    })
  }
  const { nameForm, psdForm, rules } = toRefs(state)
</script>
<style lang="less" scoped>
  .name-container {
    margin-bottom: 20px;
  }
</style>
