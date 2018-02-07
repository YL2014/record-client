import ajax from 'Gb/utils/ajax'
// import { push } from 'react-router-redux'
// import Toast from 'Gb/components/Toast'

import {
  INIT_LIST,
  API
} from './constains'

const fetchList = (params) => {
  return async (dispatch) => {
    const data = await ajax.get(API.list)
    if (data) {
      dispatch({
        type: INIT_LIST,
        data
      })
    }
  }
}

export default {
  fetchList
}
