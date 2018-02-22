import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from 'Gb/components/List'
import { Page, Button, ButtonArea } from 'react-weui'
import userActions from './actions'
import styles from './index.scss'

class CheckDetail extends Component {
  constructor () {
    super()
    this.state = {}
    this.filterList = this.filterList.bind(this)
    this.pass = this.pass.bind(this)
    this.unpass = this.unpass.bind(this)
  }

  filterList () {
    const { state } = this.props.location
    if (!state) return null
    const dataSource = [
      { title: '姓名', desc: state.username },
      { title: '微信号', desc: state.wx },
      { title: '手机号', desc: state.telephone },
      { title: '身份证号', desc: state.idCard },
      { title: '身份证正面照片', desc: <img className={styles.checkdetail_img} src={state.idCardUpUrl} alt='idCard' /> },
      { title: '身份证反面照片', desc: <img className={styles.checkdetail_img} src={state.idCardDownUrl} alt='idCard' /> }
    ]
    return dataSource
  }

  pass () {
    const id = this.props.location.state._id
    this.props.actions.check(id)
  }

  unpass () {
    const id = this.props.location.state._id
    this.props.actions.check(id, 1)
  }

  render () {
    const dataSource = this.filterList()
    return <Page ptr={false} className={styles.checkdetail}>
      <List className={styles.checkdetail_block} dataSource={dataSource} />
      <ButtonArea direction='horizontal'>
        <Button onClick={this.pass}>通过</Button>
        <Button onClick={this.unpass} type='warn'>驳回</Button>
      </ButtonArea>
    </Page>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckDetail)