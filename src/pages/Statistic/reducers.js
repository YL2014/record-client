import {
  INIT_STATISTIC,
  INIT_TEAM_STATISTIC
} from './constains'

const INITIAL_STATE = {
  list: []
}

const statistic = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_STATISTIC:
      return {
        ...state,
        data: action.data
      }
    case INIT_TEAM_STATISTIC:
      return {
        ...state,
        team: action.data
      }
    default :
      return state
  }
}

export default statistic
