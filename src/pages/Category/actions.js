import ajax from 'Gb/utils/ajax'
import { push } from 'react-router-redux'
import Toast from 'Gb/components/Toast'

import {
  INIT_LIST,
  API
} from './constains'

const fetchList = (params) => {
  return async (dispatch) => {
    const data = await ajax.get(API.list)
    if (data) {
      dispatch({
        type: INIT_LIST,
        data
      })
    }
  }
}

const addCategory = (params) => {
  return async (dispatch) => {
    const data = await ajax.post(API.add, params)
    if (data) {
      dispatch(push('/category'))
    }
  }
}

const updateCategory = (params) => {
  return async (dispatch) => {
    const data = await ajax.post(API.update, params)
    if (data) {
      Toast.success('修改分类成功')
      setTimeout(() => {
        dispatch(fetchList())
      }, 1000)
    }
  }
}

export default {
  fetchList,
  addCategory,
  updateCategory
}
