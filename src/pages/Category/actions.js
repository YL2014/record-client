import ajax from 'Gb/utils/ajax'
import { push } from 'react-router-redux'


import {
  // LOGIN_FETCH,
  LOGIN_SUCCESS,
  // LOGIN_FAIL,
  API
} from './constains'

const fetchLogin = (params) => {
  return async (dispatch) => {
    const data = await ajax.post(API.login, {
      username: params.username,
      password: params.password,
      remember: params.remember
    })
    if (data) {
      dispatch({
        type: LOGIN_SUCCESS,
        data
      })
      dispatch(push('/'))
    }
  }
}

export default {
  fetchLogin
}
