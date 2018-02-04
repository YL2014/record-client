import ajax from 'Gb/utils/ajax'
import { push } from 'react-router-redux'

import { INIT_GOODS, API } from './constains'

const fetchList = (params) => {
  return async (dispatch) => {
    const data = await ajax.get(API.list, params)
    if (data) {
      dispatch({
        type: INIT_GOODS,
        data
      })
    }
  }
}

const addGoods = (params) => {
  return async (dispatch) => {
    const data = await ajax.post(API.add, params)
    if (data) {
      dispatch(push('/goods'))
    }
  }
}

export default {
  fetchList,
  addGoods
}
