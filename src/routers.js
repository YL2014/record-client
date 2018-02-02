import React from 'react'
import { Provider } from 'react-redux'
// import {
//   BrowserRouter,
//   Route
// } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'

import Base from 'Gb/components/Base'
import App from 'Pages/App'
import Login from 'Pages/Login'
import Category from 'Pages/Category'
import CategoryList from 'Pages/Category/CategoryList.js'
import ChangeCategory from 'Pages/Category/ChangeCategory.js'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Base>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/category' component={Category} />
        <Route path='/categoryList' component={CategoryList} />
        <Route path='/changeCategory' component={ChangeCategory} />
      </Base>
    </ConnectedRouter>
  </Provider>
)

export default Root
