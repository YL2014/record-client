import {
  INIT_GOODS,
  SET_ADD,
  INIT_CATEGORY,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  RESET_ADD
} from './constains'

const INITIAL_STATE = {
  list: null,
  add: {}
}

const goods = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case INIT_GOODS:
      return {
        ...state,
        list: action.data
      }
    case SET_ADD:
      return {
        ...state,
        add: {
          ...state.add,
          [action.name]: action.value
        }
      }
    case RESET_ADD:
      return {
        ...state,
        add: []
      }
    case INIT_CATEGORY:
      return {
        ...state,
        categoryList: action.data
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        add: {
          ...state.add,
          image: action.data
        },
        uploadStatus: true
      }
    case UPLOAD_FAIL:
      return { ...state, uploadStatus: false }
    default:
      return state
  }
}

export default goods
