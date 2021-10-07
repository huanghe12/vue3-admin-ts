import request from '@/utils/axios'
import { Method } from 'axios'
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
// 获取商品列表
export function getGoodList(data: any) {
  return request({
    url: `/goods/list?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}
// 上/下架商品
export function changeStatus(data: any) {
  return request({
    url: `/goods/status/${data.status}`,
    method: 'put',
    data: data.ids
  })
}
