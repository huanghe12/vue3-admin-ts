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
    'Content-Type': 'application/json',
    token: get('token') || ''
  }
})

service.interceptors.request.use(
  (config: any) => config,
  (error: any) => Promise.reject(error)
)

service.interceptors.response.use((response: any) => {
  if (typeof response.data !== 'object') {
    ElMessage.error('服务端异常！')
    return Promise.reject(response)
  }
  if (response.data.resultCode != 200) {
    if (response.data.message) ElMessage.error(response.data.message)

    if (response.data.resultCode == 419) {
      router.push({ path: '/login' })
    }
    return Promise.reject(response.data)
  }
  return response.data.data
})

export default service
