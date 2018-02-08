import ajax from 'Gb/utils/ajax'
import {
  INIT_CHECKLIST,
  API
} from './constants'

const initCheckList = () => {
  return async (dispatch) => {
    const data = await ajax.get(API.checklist)
    if (data) {
      dispatch({
        type: INIT_CHECKLIST,
        data
      })
    }
  }
}

export default {
  initCheckList
}