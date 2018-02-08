import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userActions from './actions'

class CheckList extends Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    const { initCheckList } = this.props.actions
    initCheckList && initCheckList()
  }

  render () {
    return <div>

    </div>
  }
}

const mapStateToProps = ({ user }) => {
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckList)