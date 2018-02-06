import ajax from 'Gb/utils/ajax'
import { push } from 'react-router-redux'
import Toast from 'Gb/components/Toast'

import {
  INIT_LIST,
  SET_NEWNAME,
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

const setNewName = (newName) => {
  return {
    type: SET_NEWNAME,
    data: newName
  }
}

const updateCategory = (params) => {
  return async (dispatch) => {
    const data = await ajax.post(API.update, params)
    if (data) {
      Toast.success('修改分类成功')
      dispatch(setNewName(''))
      setTimeout(() => {
        dispatch(fetchList())
      }, 1000)
    }
  }
}

const removeCategory = (id) => {
  return async (dispatch) => {
    const data = await ajax.get(`${API.remove}/${id}`)
    if (data) {
      Toast.success('删除分类成功')
      dispatch(fetchList())
    }
  }
}

export default {
  fetchList,
  addCategory,
  updateCategory,
  removeCategory,
  setNewName
}
