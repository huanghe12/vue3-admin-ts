const orderStatus: any = {
  0: '待支付',
  1: '已支付',
  2: '配货完成',
  3: '出库成功',
  4: '交易成功',
  '-1': '手动关闭',
  '-2': '超时关闭',
  '-3': '商家关闭'
}

function orderMap(status: string): string {
  return orderStatus[status] || '未知状态'
}

function prefix(url: string) {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `http://backend-api-02.newbee.ltd${url}`
    return url
  }
}

export default {
  orderMap,
  prefix
}
