import {
  // LOGIN_FETCH,
  LOGIN_SUCCESS,
  // LOGIN_FAIL
} from './constains'

const INITIAL_STATE = {
  userInfo: null
}

const login = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.data
      }
    default:
      return state
  }
}

export default login
