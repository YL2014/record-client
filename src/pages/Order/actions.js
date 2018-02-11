import ajax from 'Gb/utils/ajax'

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

export default {
  fetchList,
  fetchDetail
}