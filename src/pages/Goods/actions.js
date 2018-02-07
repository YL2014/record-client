import ajax from 'Gb/utils/ajax'
import { push, replace } from 'react-router-redux'
import Toast from 'Gb/components/Toast'

import {
  INIT_GOODS,
  SET_ADD,
  INIT_CATEGORY,
  UPLOAD_SUCCESS,
  RESET_ADD,
  INIT_UPDATE,
  SET_UPDATE,
  // UPLOAD_FAIL,
  API } from './constains'

// 拉取商品列表
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

// add 表单
const handleChange = (param) => {
  console.log(param)
  const { type } = param
  return {
    type: type === 'update' ? SET_UPDATE : SET_ADD,
    value: param.value,
    name: param.name
  }
}

// 拉取分类列表
const fetchCategory = (params) => {
  return async (dispatch) => {
    const data = await ajax.get(API.category)
    if (data) {
      dispatch({
        type: INIT_CATEGORY,
        data
      })
    }
  }
}

// upload img
const uploadImg = (file, status) => {
  const params = new FormData()
  params.append('file', file)
  return async (dispatch) => {
    const data = await ajax.upload(API.upload, params)
    if (data) {
      dispatch({
        type: UPLOAD_SUCCESS,
        data: data.url,
        status
      })
    } else {
      Toast.info('上传失败，请重试')
    }
  }
}

// 添加商品
const addGoods = (type) => {
  return async (dispatch, getState) => {
    const { add, categoryList, update } = getState().goods
    const curData = type === 'update' ? update : add
    let { id, name, bprice, zprice, tprice, lprice, category = categoryList[0]._id, image, apply } = curData
    if (type === 'update') {
      category = curData.categoryId
    }
    if (!(name && bprice && zprice && tprice && lprice && category && image && apply)) {
      Toast('请完善信息后提交')
      return
    }
    const api = type === 'update' ? API.update : API.add
    const data = await ajax.post(api, {
      goods: [{
        name,
        bprice: Number(bprice),
        zprice: Number(zprice),
        tprice: Number(tprice),
        lprice: Number(lprice),
        category,
        apply,
        image,
        id
      }]
      })
    if (data) {
      let msg = type === 'update' ? '更新商品成功!' : '添加商品成功！'
      Toast.success(msg)
      dispatch({
        type: RESET_ADD
      })
      setTimeout(() => {
        dispatch(push('/goods'))
      }, 1000)
    }
  }
}

// 上架下架商品
const setStatus = (id, type) => {
  return async (dispatch) => {
    const data = await ajax.post(API.status, { id, type })
    if (data) {
      const msg = type === 0 ? '上架成功' : '下架成功'
      Toast.success(msg)
      setTimeout(() => {
        dispatch(replace('/goods'))
      })
    }
  }
}

// 删除商品
const removeGoods = (id) => {
  return async (dispatch) => {
    const data = await ajax.get(API.remove, { id })
    if (data) {
      Toast.success('删除成功')
      setTimeout(() => {
        dispatch(replace('/goods'))
      })
    }
  }
}

// 设置更新初始化
const initUpdateDetail = (data) => {
  return {
    type: INIT_UPDATE,
    data
  }
}

export default {
  fetchList,
  handleChange,
  fetchCategory,
  uploadImg,
  addGoods,
  setStatus,
  removeGoods,
  initUpdateDetail
}
