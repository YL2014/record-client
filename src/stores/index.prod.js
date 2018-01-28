// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from '../reducers'

// const configureStore = preloadedState => createStore(
//     rootReducer,
//     preloadedState,
//     applyMiddleware(thunk)
// )

// export default configureStore


import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import rootReducer from '../reducers'

const history = createHistory()


const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
        thunk,
        routerMiddleware(history)
    )
)

export default {
    configureStore,
    history
}