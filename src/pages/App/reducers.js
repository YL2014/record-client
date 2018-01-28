import { TESTTYPE } from './types'

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
    default :
      return state
  }
}
