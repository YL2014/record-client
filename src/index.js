import React from 'react'
import { render } from 'react-dom'
import Root from './routers'
import stores from './stores'
import registerServiceWorker from './registerServiceWorker'

const { configureStore, history } = stores

const store = configureStore()

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
registerServiceWorker()
