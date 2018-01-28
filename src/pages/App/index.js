import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import 'weui'
import 'react-weui/build/packages/react-weui.css'
import styles from './index.scss'

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles['App-header']}>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className={styles['App-title']}>Welcome to React</h1>
        </header>
        <p className={styles['App-intro']}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = () => {
  return {}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
