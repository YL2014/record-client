export const INIT_ORDER = 'INIT_ORDER'
export const INIT_DETAIL = 'INIT_DETAIL'
export const UPDATE_ORDER = 'UPDATE_ORDER'

export const API = {
  list: '/order',
  add: '/order/add',
  update: '/order/update',
  move: '/order/move',
  check: '/order/check',
  driver: '/order/driver'
}

// 订单状态
export const ORDER_STATUS = {
  0: '待总代审核',
  1: '待公司审核',
  2: '已审核',
  3: '已发货'
}