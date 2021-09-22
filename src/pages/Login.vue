<template>
  <div class="layout">
    <div class="login-wrap">
      <div class="top">
        <img src="https://s.weituibao.com/1582958061265/mlogo.png" alt="logo" />
        <div class="title-describe">
          <p class="title">新蜂商城</p>
          <p class="describe">Vue3.0后台管理系统</p>
        </div>
      </div>
      <el-form
        ref="loginForm"
        label-position="top"
        :model="formData"
        :rules="state.rules"
        class="form-wrap"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" />
        </el-form-item>
        <el-form-item>
          <p class="explain">登录表示您已同意<span>《服务条款》</span></p>
          <el-button class="btn" @click="submitForm">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ElForm } from 'element-plus'
  import { Md5 } from 'ts-md5'
  import { reactive, ref } from 'vue-demi'
  import { login } from '@/api'
  import { set } from '@/utils/auth'
  import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  // 使用InstanceType<typeof ElForm>作为范型约束
  const loginForm = ref<InstanceType<typeof ElForm>>()
  const state = reactive({
    formData: {
      username: '',
      password: ''
    },
    // 表单验证规则,进行强制类型转换
    rules: {
      username: [{ required: 'true', message: '账号不能为空', trigger: 'blur' }],
      password: [{ required: 'true', message: '密码不能为空', trigger: 'blur' }]
    } as FormRulesMap
  })
  const formData = state.formData
  const submitForm = () => {
    // 使用validate对表单项进行验证
    loginForm.value?.validate((valid) => {
      if (valid) {
        const data = {
          userName: formData.username,
          // 使用Md5进行加密，ts需使用ts-md5
          passwordMd5: Md5.hashStr(formData.password)
        }
        login(data).then((res: any) => {
          set('token', res)
          router.push('/')
          resetForm()
        })
      } else {
        console.error('error submit')
        return false
      }
    })
  }
  // 将表单项重置为初始值
  const resetForm = () => {
    loginForm.value?.resetFields()
  }
</script>

<style lang="less" scoped>
  .layout {
    // min-height: 100vh;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    .login-wrap {
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 20px;
      width: 420px;
      padding-bottom: 80px;
      padding-top: 50px;
      box-shadow: 0 20px 40px rgba(80, 47, 47, 0.2);
      .top {
        display: flex;
        flex-flow: row;
        align-items: center;
        margin-bottom: 30px;
        width: 70%;
        img {
          width: 100px;
          height: 100px;
          margin-right: 50px;
        }
        .title-describe {
          .title {
            font-size: 28px;
            color: #1baeae;
            font-weight: bold;
          }
          .describe {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .form-wrap {
        width: 70%;
        .el-form-item {
          margin-top: 15px;
          /deep/.el-form-item__label {
            padding: 0;
          }
        }
        .explain {
          margin-top: 20px;
          span {
            color: #409eff;
          }
        }
        .btn {
          width: 100%;
          background-color: #1baeae;
          border-color: #1baeae;
          color: #fff;
        }
      }
    }
  }
</style>
