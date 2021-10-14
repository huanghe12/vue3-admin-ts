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
// 获取商品信息
export function getGoodsInfo({ id }: { id: string }) {
  return request({
    url: `/goods/${id}`,
    method: 'get'
  })
}
// 获取轮播图列表
export function getCarousels(data: any) {
  return request({
    url: `/carousels?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}
// 删除轮播图
export function deleteSwiper(data: any) {
  return request({
    url: '/carousels',
    method: 'delete',
    data
  })
}
// 获取轮播图详情
export function getSwiperDetails(data: string) {
  return request({
    url: `/carousels/${data}`,
    method: 'get'
  })
}
// 添加/修改轮播图
export function changeSwiper(type: Method, data: any) {
  return request({
    url: `/carousels`,
    method: type,
    data
  })
}
// 查询订单
export function getOrders(data: any) {
  return request({
    url: `/orders?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&orderNo=${data.orderNo}&orderStatus=${data.orderStatus}`,
    method: 'get'
  })
}
// 修改name
export function changeName(data: { loginUserName: string; nickName: string }) {
  return request({
    url: `/adminUser/name`,
    method: 'put',
    data
  })
}
// 修改密码
export function changepassword(data: { originalPassword: string; newPassword: string }) {
  return request({
    url: `/adminUser/password`,
    method: 'put',
    data
  })
}
