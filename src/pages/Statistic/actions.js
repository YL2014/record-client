import ajax from 'Gb/utils/ajax'
// import Toast from 'Gb/components/Toast'

import {
  INIT_STATISTIC,
  API
} from './constains'

// 获取统计数据
const fetchStatistic = (params = {}) => {
  return async (dispatch) => {
    const data = await ajax.get(API.statistic, params)
    if (data) {
      dispatch({
        type: INIT_STATISTIC,
        data
      })
    }
  }
}


export default {
  fetchStatistic
}