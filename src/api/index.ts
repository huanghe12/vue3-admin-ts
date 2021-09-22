import request from '@/utils/axios'
import { AxiosPromise } from 'axios'
// 登录
export function login(data: { userName: string; passwordMd5: string }) {
  return request({
    url: '/adminUser/login',
    method: 'post',
    data
  })
}
// 退出登录
export function logout() {
  return request({
    url: '/logout',
    method: 'delete'
  })
}
// 获取个人信息
export function getUserInfo() {
  return request({
    url: '/adminUser/profile',
    method: 'get'
  })
}
export function getUsers(data?: any): AxiosPromise<any> {
  return request({
    url: '/users',
    method: 'get',
    data
  })
}
// 上传单张图片
export function uploadImage(data?: any): AxiosPromise<any> {
  return request({
    url: 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/file',
    method: 'get',
    data
  })
}
// 上传多张图片
export function uploadImages(data?: any): AxiosPromise<any> {
  return request({
    url: 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/files',
    method: 'get',
    data
  })
}
