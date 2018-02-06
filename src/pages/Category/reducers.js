import {
  INIT_LIST,
  SET_NEWNAME
} from './constains'

const INITIAL_STATE = {
  list: null,
  newName: ''
}

const category = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case INIT_LIST:
      return {
        ...state,
        list: action.data
      }
    case SET_NEWNAME:
      return {
        ...state,
        newName: action.data
      }
    default:
      return state
  }
}

export default category
