import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { app } from 'Pages/App/reducers'
import login from 'Pages/Login/reducers'
import category from 'Pages/Category/reducers'
import goods from 'Pages/Goods/reducers'
import record from 'Pages/Record/reducers'
import user from 'Pages/User/reducers'
import order from 'Pages/Order/reducers'

const rootReducer = combineReducers({
  app,
  login,
  category,
  goods,
  record,
  user,
  order,
  router
})

export default rootReducer
