import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { app } from 'Pages/App/reducers'
import login from 'Pages/Login/reducers'
import category from 'Pages/Category/reducers'
import goods from 'Pages/Goods/reducers'
import record from 'Pages/Record/reducers'
import user from 'Pages/User/reducers'

const rootReducer = combineReducers({
  app,
  login,
  category,
  goods,
  record,
  user,
  router
})

export default rootReducer
