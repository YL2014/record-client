import {
  TESTTYPE,
  INIT_USER
} from './constains'

const INIT_STATES = {
  value: 'test'
}

export const app = (state = INIT_STATES, action) => {
  switch (action.type) {
    case TESTTYPE:
      return {
        ...state,
        value: action.value
      }
    case INIT_USER:
      return {
        ...state,
        user: action.data
      }
    default :
      return state
  }
}
