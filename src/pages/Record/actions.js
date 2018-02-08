import ajax from 'Gb/utils/ajax'
// import { push } from 'react-router-redux'
// import Toast from 'Gb/components/Toast'

import {
  INIT_LIST,
  SET_ITEM_NUM,
  SET_CUSTOMER_INFO,
  API
} from './constains'

const fetchList = (params) => {
  return async (dispatch) => {
    let data = await ajax.get(API.list)
    if (data) {
      data = data.map(item => {
        item.num = 0
        return item
      })
      dispatch({
        type: INIT_LIST,
        data
      })
    }
  }
}

const setItemNum = (index, num) => {
  return {
    type: SET_ITEM_NUM,
    index,
    num
  }
}

const setCustomerInfo = (customerInfo) => {
  return {
    type: SET_CUSTOMER_INFO,
    data: customerInfo
  }
}

export default {
  fetchList,
  setItemNum,
  setCustomerInfo
}
