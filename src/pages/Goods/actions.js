import ajax from 'Gb/utils/ajax'
import { push } from 'react-router-redux'
import Toast from 'Gb/components/Toast'

import {
  INIT_GOODS,
  SET_ADD,
  INIT_CATEGORY,
  UPLOAD_SUCCESS,
  RESET_ADD,
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
  return {
    type: SET_ADD,
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
const uploadImg = (file) => {
  console.log(file)
  const params = new FormData()
  params.append('file', file)
  return async (dispatch) => {
    const data = await ajax.upload(API.upload, params)
    if (data) {
      dispatch({
        type: UPLOAD_SUCCESS,
        data: data.url
      })
    } else {
      Toast.info('上传失败，请重试')
    }
  }
}

const addGoods = () => {
  return async (dispatch, getState) => {
    const { add, categoryList } = getState().goods
    const { name, bprice, zprice, tprice, lprice, category = categoryList[0]._id, image, apply } = add
    if (!(name && bprice && zprice && tprice && lprice && category && image && apply)) {
      Toast('请完善信息后提交')
      return
    }
    const data = await ajax.post(API.add, {
      goods: [{
        name: name, 
        bprice: bprice,
        zprice: zprice,
        tprice: tprice,
        lprice: lprice,
        category: category,
        image: image}]
      })
    if (data) {
      Toast.success('添加商品成功！')
      dispatch({
        type: RESET_ADD
      })
      setTimeout(() => {
        dispatch(push('/goods'))
      }, 1000)
    }
  }
}

export default {
  fetchList,
  handleChange,
  fetchCategory,
  uploadImg,
  addGoods
}
