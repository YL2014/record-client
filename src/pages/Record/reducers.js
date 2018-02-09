import {
  INIT_LIST,
  SET_ITEM_NUM,
  SET_CUSTOMER_INFO,
  RESET_RECORD
} from './constains'

const INITIAL_STATE = {
  list: null
}

const record = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_LIST:
      return {
        ...state,
        list: action.data
      }
    case SET_ITEM_NUM:
      let cloneList = state.list
      const { index, num } = action
      cloneList[index].num = num
      return {
        ...state,
        list: cloneList
      }
    case SET_CUSTOMER_INFO:
      return {
        ...state,
        customerInfo: action.data
      }
    case RESET_RECORD:
      return {
        ...state,
        customerInfo: '',
        list: null
      }
    default:
      return state
  }
}

export default record
