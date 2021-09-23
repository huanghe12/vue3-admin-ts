import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { get } from './auth'

// const baseURL = config[import.meta.env.MODE].baseURL
const service = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
})

// 添加请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // 判断有无token
    if (get('token')) {
      config.headers['token'] = get('token')
    } else {
      config.headers['token'] = ''
    }
    return config
  },
  (error: any) => Promise.reject(error)
)

// 添加响应拦截器
service.interceptors.response.use((response: any) => {
  if (typeof response.data !== 'object') {
    if (ElMessage.error) {
      ElMessage.error('服务端异常！')
      return Promise.reject(response)
    }
  }
  if (response.data.resultCode != 200) {
    if (response.data.message) {
      if (ElMessage.error) {
        ElMessage.error(response.data.message)
      }
    }

    if (response.data.resultCode == 419) {
      router.push({ path: '/login' })
    }
    return Promise.reject(response.data)
  }
  return response.data.data
})

export default service
