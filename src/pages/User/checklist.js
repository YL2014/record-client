import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinkList from 'Gb/components/LinkList'
import userActions from './actions'
import styles from './index.scss'

class CheckList extends Component {
  constructor () {
    super()
    this.state = {}
    this.filterList = this.filterList.bind(this)
  }

  filterList () {
    const { checklist } = this.props.user
    const dataSource = checklist && checklist.map(item => {
      return {
        to: {
          pathname: '/userchecks',
          state: item
        },
        title: item.username,
        desc: item.telephone
      }
    })
    return dataSource
  }

  componentDidMount () {
    const { initCheckList } = this.props.actions
    initCheckList && initCheckList()
  }

  render () {
    const dataSource = this.filterList()
    return <div className={styles.checklist}>
      <LinkList  dataSource={dataSource} />
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