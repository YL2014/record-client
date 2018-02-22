import React, { Component } from 'react'
import List from 'Gb/components/List'
import LinkList from 'Gb/components/LinkList'
import TabBar from 'Gb/components/TabBar'
import { my, text, qr_code, group } from 'Gb/icons'
import styles from './index.scss'

class UserIndex extends Component {
  constructor () {
    super()
    this.state = {}
    this.setRoleList = this.setRoleList.bind(this)
    this.renderRoleList = this.renderRoleList.bind(this)
  }

  setRoleList (role) {
    const curUser = JSON.parse(localStorage.getItem('user'))
    const curUserId = curUser.id
    let dataSource = []
    if (role === 1) {
      dataSource = [
        // {to: '/group', icon: group, title: '团队管理'},
        { to: '/order', icon: text, title: '订单管理' },
        {to: '/usercheck', icon: text, title: '代理审核'},
        {to: {pathname: '/useradd', search: `?id=${curUserId}`, state: { id: curUserId }}, icon: my, title: '新增代理'},
        {to: {pathname: '/qrcode', search: `?id=${curUserId}`}, icon: qr_code, title: '公司授权码'}
      ]
    }
    if (role === 2) {
      dataSource = [
        { to: '/order', title: '我的订单管理', icon: text },
        { to: { pathname: '/order', state: { type: 1 } }, title: '代理订单管理', icon: text },
        // {to: '/group', icon: group, title: '团队管理'},
        {to: '/usercheck', icon: text, title: '代理审核'},
        {to: {pathname: '/useradd', search: `?id=${curUserId}`, state: { id: curUserId }}, icon: my, title: '新增代理'},
        {to: {pathname: '/qrcode', search: `?id=${curUserId}`}, icon: qr_code, title: '我的授权证书'}
      ]
    }
    if (role === 3) {
      dataSource = [
        { to: '/order', title: '订单管理', icon: text }
      ]
    }
    this.setState({ dataSource })
  }

  renderRoleList () {
    const { dataSource } = this.state
    return <LinkList className={styles.user_list} dataSource={dataSource} />
  }

  componentDidMount () {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    this.setState({ userInfo: {
      title: <div>
        <p>{userInfo.username}</p>
        <p className={styles.user_wx}>{userInfo.wx}</p>
      </div>,
      icon: userInfo.avatarUrl || my
    } })
    this.setRoleList(userInfo.role)
  }

  render () {
    const { userInfo } = this.state
    return <div className={styles.user}>
      <List className={styles.user_block} dataSource={userInfo} />
      {this.renderRoleList()}
      <TabBar />
    </div>
  }
}

export default UserIndex