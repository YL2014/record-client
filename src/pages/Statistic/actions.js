import ajax from 'Gb/utils/ajax'
// import Toast from 'Gb/components/Toast'

import {
  INIT_STATISTIC,
  INIT_TEAM_STATISTIC,
  API
} from './constains'

// 获取统计数据
const fetchStatistic = (params = {}) => {
  return async (dispatch) => {
    const data = await ajax.get(API.statistic, params)
    if (data) {
      // 公司
      if (data.length) {
        dispatch({
          type: INIT_TEAM_STATISTIC,
          data
        })
      } else {
        dispatch({
          type: INIT_STATISTIC,
          data
        })
      }
    }
  }
}

// 获取团队统计
const fetchTeamStatistic = (params = {}) => {
  return async (dispatch) => {
    const data = await ajax.get(API.team, params)
    if (data) {
      dispatch({
        type: INIT_TEAM_STATISTIC,
        data
      })
    }
  }
}


export default {
  fetchStatistic,
  fetchTeamStatistic
}