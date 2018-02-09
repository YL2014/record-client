import {
  INIT_ORDER,
  INIT_DETAIL
} from './constains'

const INITIAL_STATE = {
  list: []
}

const order = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_ORDER:
      return {
        ...state,
        list: action.list,
        count: action.count
      }
    case INIT_DETAIL:
      return {
        ...state,
        detail: action.data
      }
    default :
      return state
  }
}

export default order
