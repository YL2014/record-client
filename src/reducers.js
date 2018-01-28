import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { app } from 'Pages/App/reducers'
import login from 'Pages/Login/reducers'

const rootReducer = combineReducers({
    app,
    login,
    router
})

export default rootReducer