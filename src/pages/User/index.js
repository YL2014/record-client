import React, { Component } from 'react'
import List from 'Gb/components/List'
import LinkList from 'Gb/components/LinkList'
import TabBar from 'Gb/components/TabBar'
import { goods, my, text } from 'Gb/icons'
import styles from './index.scss'

class UserIndex extends Component {
  constructor () {
    super()
    this.state = {}
    this.setRoleList = this.setRoleList.bind(this)
    this.renderRoleList = this.renderRoleList.bind(this)
  }

  setRoleList (role) {
    let dataSource = [
      { to: '/order', title: '订单管理', icon: text }
    ]
    if (role === 1 || role === 2) {
      const curUser = JSON.parse(localStorage.getItem('user'))
      // const curRole = curUser.role
      const curUserId = curUser.id
      dataSource = dataSource.concat([
        {to: '/group', icon: goods, title: '团队管理'},
        {to: {pathname: '/useradd', search: `?id=${curUserId}`, state: { id: curUserId }}, icon: my, title: '新增代理'}
      ])
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