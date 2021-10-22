// 获取loacalStorage中的值
export function get(key: string) {
  // window.localStorage.getItem(key)类型为string | null,后边 || '' 表示value为字符串
  const value = window.localStorage.getItem(key) || ''
  // 通过try...catch捕获异常
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

// 设置loacalStorage中的值
export function set(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

// 移除loacalStorage中的值
export function remove(key: string) {
  window.localStorage.removeItem(key)
}

// 判断内容是否含有表情字符，现有数据库不支持。
export function hasEmoji(str = '') {
  const reg =
    /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g
  return str.match(reg) && str.match(reg)?.length
}

export const uploadImage = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/file'
export const uploadImages = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/files'

// 页面标题
export const pathMap: any = {
  login: '登录',
  introduce: '系统介绍',
  dashboard: '大盘数据',
  add: '添加商品',
  swiper: '轮播图配置',
  hot: '热销商品配置',
  new: '新品上线配置',
  recommend: '为你推荐配置',
  category: '分类管理',
  level2: '分类二级管理',
  level3: '分类三级管理',
  good: '商品管理',
  guest: '会员管理',
  order: '订单管理',
  orderDetails: '订单详情',
  account: '修改账户'
}
