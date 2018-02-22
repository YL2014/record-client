import {
  INIT_STATISTIC
} from './constains'

const INITIAL_STATE = {
  list: []
}

const statistic = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_STATISTIC:
      return {
        ...state,
        data: action.data
      }
    default :
      return state
  }
}

export default statistic
