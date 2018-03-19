import ajax from 'Gb/utils/ajax'
import Toast from 'Gb/components/Toast'
import { replace } from 'react-router-redux'

import {
  INIT_ORDER,
  INIT_DETAIL,
  API
} from './constains'

// 获取列表
const fetchList = (params = {}) => {
  return async (dispatch, getState) => {
    const { list = [] } = getState().order
    const data = await ajax.get(API.list, params)
    if (data) {
      let { orders, count } = data
      // 多页时concat
      if (params.page && params.page > 1) {
        orders = list.concat(orders)
      }
      dispatch({
        type: INIT_ORDER,
        list: orders,
        count
      })
    }
  }
}

// 获取详情
const fetchDetail = (id) => {
  return async (dispatch) => {
    const data = await ajax.get(`${API.list}/${id}`)
    if (data) {
      dispatch({
        type: INIT_DETAIL,
        data
      })
    }
  }
}

// 订单审核与驳回, 发货
const check = (params) => {
  return async (dispatch) => {
    const data = await ajax.get(`${API.check}`, params)
    if (data) {
      Toast.success('操作成功')
      if (params.type === 6) {
        dispatch(replace('/order'))
      } else {
        dispatch(fetchDetail(params.id))
      }
    }
  }
}

// 录入快递单号
const setDriverNo = (id, driverNo) => {
  return async (dispatch) => {
    const data = await ajax.post(API.driver, {
      id, driverNo
    })
    if (data) {
      Toast.success('单号录入成功')
    }
  }
}

export default {
  fetchList,
  fetchDetail,
  check,
  setDriverNo
}