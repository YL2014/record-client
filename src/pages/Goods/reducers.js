import {
  INIT_GOODS,
  SET_ADD,
  INIT_CATEGORY,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  RESET_ADD,
  INIT_UPDATE,
  SET_UPDATE,
  SET_UPLOAD_PROGRESS
} from './constains'

const INITIAL_STATE = {
  list: null,
  add: {},
  update: {}
}

const goods = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    // 设置订单列表
    case INIT_GOODS:
      return {
        ...state,
        list: action.data
      }
    // 设置添加页面数据
    case SET_ADD:
      return {
        ...state,
        add: {
          ...state.add,
          [action.name]: action.value
        }
      }
    // 重置添加数据
    case RESET_ADD:
      return {
        ...state,
        add: []
      }
    // 设置分类列表
    case INIT_CATEGORY:
      return {
        ...state,
        categoryList: action.data
      }
    // 上传图片成功
    case UPLOAD_SUCCESS:
      if (action.status === 'update') {
        return {
          ...state,
          update: {
            ...state.update,
            image: action.data
          },
          uploadStatus: true
        }
      } else {
        return {
          ...state,
          add: {
            ...state.add,
            image: action.data
          },
          uploadStatus: true
        }
      }
    // 上传图片失败
    case UPLOAD_FAIL:
      return { ...state, uploadStatus: false }
    case SET_UPLOAD_PROGRESS:
      return { ...state, uploadProgress: action.data}
    // 初始化更新页面数据
    case INIT_UPDATE:
      return {
        ...state,
        update: action.data
      }
    // 设置更新页面数据
    case SET_UPDATE:
      return {
        ...state,
        update: {
          ...state.update,
          [action.name]: action.value
        }
      }
    default:
      return state
  }
}

export default goods
