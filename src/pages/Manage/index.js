import React, { Component } from 'react'
import LinkList from 'Gb/components/LinkList'
import TabBar from 'Gb/components/TabBar'
import { goods, text } from 'Gb/icons'
import styles from './index.scss'

class Manage extends Component {
  constructor () {
    super()
    this.state = {
      dataSource: [
        {to: '/goods', icon: goods, title: '商品'},
        {to: '/goodsadd', icon: goods, title: '上架商品'},
        {to: '/category', icon: text, title: '商品分类'},
        {to: '/categoryadd', icon: text, title: '添加商品分类'},
        // {to: '/usercheck', icon: text, title: '代理审核'}
      ]
    }
  }

  // componentDidMount () {

  // }

  render () {
    const { dataSource } = this.state
    return <div className={styles.manage}>
      <LinkList className={styles.manage_list} dataSource={dataSource} />
      <TabBar active='/manage' />
    </div>
  }
}

export default Manage