import { get } from '@/utils/auth'
import request from '@/utils/axios'
import { AxiosPromise, Method } from 'axios'
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
// 获取用户信息
export function getUsers(data?: any) {
  return request({
    url: '/users',
    method: 'get',
    data
  })
}
// 新增/修改商品
export function addGoods(httpType: Method, data: any) {
  return request({
    url: '/goods',
    method: httpType,
    data
  })
}
// 获取商品分类
export function getCategories(data: any) {
  return request({
    url: `/categories?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&categoryLevel=${data.categoryLevel}&parentId=${data.parentId}`,
    method: 'get'
  })
}
