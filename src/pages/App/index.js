import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import appActions from './actions'
import styles from './index.scss'

class App extends Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    const { getUserInfo } = this.props.actions
    getUserInfo && getUserInfo()
  }

  render() {
    return (
      <div className={styles.App}>
        <p style={{textAlign: 'center', marginTop: '40%'}}>系统加载中...</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(appActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
