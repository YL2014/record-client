import {
  INIT_CHECKLIST
} from './constants'

const INITIAL_STATE = {
  checklist: null
}

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_CHECKLIST:
      return {
        ...state,
        checklist: action.data
      }
    default:
      return state
  }
}

export default user