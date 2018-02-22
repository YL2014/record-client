import React from 'react'
import { Provider } from 'react-redux'
import {
  // BrowserRouter,
  // Route,
  Redirect
} from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'

import Base from 'Gb/components/Base'
import App from 'Pages/App'
import Login from 'Pages/Login'

import Category from 'Pages/Category'
import CategoryAdd from 'Pages/Category/add.js'
import CategoryUpdate from 'Pages/Category/update.js'

import User from 'Pages/User'
import UserAdd from 'Pages/User/add'
import UserCheck from 'Pages/User/checklist'
import UserCheckDetail from 'Pages/User/checkdetail'

import Manage from 'Pages/Manage'

import Goods from 'Pages/Goods'
import GoodsAdd from 'Pages/Goods/add'
import GoodsDetail from 'Pages/Goods/detail'
import GoodsUpdate from 'Pages/Goods/update'

import Record from 'Pages/Record'
import Confirm from 'Pages/Record/confirm.js'

import Order from 'Pages/Order'
import OrderDetail from 'Pages/Order/detail'

import QrCode from 'Pages/Qrcode'

import Statistic from 'Pages/Statistic'

const adminPath = ['/manage', '/goods', '/goodsadd', '/goodsdetail', '/goodsupdate',
  '/goodsremove', '/category', '/categoryadd', '/categoryupdate', '/ordercheck', '/ordercheck', '/usercheck', '/userchecks']
const zongPath = ['/manage', '/ordercheck', '/usercheck', '/userchecks']

// 权限认证
const PrivateRoute = ({ component: Component, ...rest }) => {
  let isAuth = true
  let user = window.localStorage.getItem('user')
  if (!user) {
    isAuth = false
  }
  user = user && JSON.parse(user)
  return <Route {...rest} render={props => {
    // if (isAuth && props.location.pathname == '/login') {
    //   return <Redirect to={{
    //     pathname: '/'
    //   }} />
    // }
    const pathname = props.location.pathname
    if (adminPath.indexOf(pathname) > -1 && user.role !== 2 && user.role !== 1) isAuth = false
    if (zongPath.indexOf(pathname) > -1 && user.role !== 2 && user.role !== 1) isAuth = false
    return (!isAuth && pathname !== '/login') ? (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    ) : (
      <Component {...props} />
    )
  }} />
}

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Base>
        <PrivateRoute exact path='/' component={App} />
        <PrivateRoute path='/login' component={Login} />
        <PrivateRoute path='/category' component={Category} />
        <PrivateRoute path='/categoryadd' component={CategoryAdd} />
        <PrivateRoute path='/categoryupdate' component={CategoryUpdate} />
        <PrivateRoute path='/user' component={User} />
        <PrivateRoute path='/manage' component={Manage} />
        <PrivateRoute path='/goods' component={Goods} />
        <PrivateRoute path='/goodsadd' component={GoodsAdd} />
        <PrivateRoute path='/goodsdetail' component={GoodsDetail} />
        <PrivateRoute path='/goodsupdate' component={GoodsUpdate} />
        <PrivateRoute path='/record' component={Record} />
        <PrivateRoute path='/recordcf' component={Confirm} />
        <Route path='/useradd' component={UserAdd} />
        <PrivateRoute path='/usercheck' component={UserCheck} />
        <PrivateRoute path='/userchecks' component={UserCheckDetail} />
        <PrivateRoute path='/order' component={Order} />
        <PrivateRoute path='/orderdetail' component={OrderDetail} />
        <PrivateRoute path='/qrcode' component={QrCode} />
        <PrivateRoute path='/statistic' component={Statistic} />
      </Base>
    </ConnectedRouter>
  </Provider>
)

export default Root
