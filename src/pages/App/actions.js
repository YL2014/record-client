import { push } from 'react-router-redux'
import ajax from 'Gb/utils/ajax'
import Helper from 'Gb/utils/helper'
import {
  INIT_USER,
  TESTTYPE,
  API
} from './constains'

const testAction = (value) => ({
  type: TESTTYPE,
  value
})

const getUserInfo = () => {
  return async (dispatch, getState) => {
    const code = Helper.getQueryParam('code')
    if (!code && !localStorage.getItem('user')) return
    const { user } = getState().app
    console.log(user)
    if (user) dispatch(push('/user'))
    else {
      const data = await ajax.get(API.userinfo, { code })
      console.log(data)
      if (data) {
        dispatch({
          type: INIT_USER,
          data
        })
        localStorage.setItem('user', JSON.stringify(data))
        dispatch(push('/user'))
      }
    }
    
  }
}

export default {
  testAction,
  getUserInfo
}