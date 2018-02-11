import ajax from 'Gb/utils/ajax'
import { replace } from 'react-router-redux'
import Toast from 'Gb/components/Toast'

import {
  INIT_LIST,
  SET_ITEM_NUM,
  SET_CUSTOMER_INFO,
  RESET_RECORD,
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

const submitOrder = (params) => {
  return async (dispatch) => {
    let data = await ajax.post(API.submit, params)
    if (data) {
      Toast.success('提交成功')
      dispatch(resetRecord())
      setTimeout(() => {
        dispatch(replace('/user'))
      }, 1000)
    }
  }
}

const resetRecord = () => {
  return {
    type: RESET_RECORD
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
  setCustomerInfo,
  submitOrder,
  resetRecord
}
