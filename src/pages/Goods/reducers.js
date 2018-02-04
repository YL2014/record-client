import {
  INIT_GOODS
} from './constains'

const INITIAL_STATE = {
  list: null
}

const goods = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case INIT_GOODS:
      return {
        ...state,
        list: action.data
      }
    default:
      return state
  }
}

export default goods
