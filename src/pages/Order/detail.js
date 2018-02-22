import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Page, CellsTitle, Button, ButtonArea } from 'react-weui'
import List from 'Gb/components/List'
import orderActions from './actions'
import Helper from 'Gb/utils/helper'

import styles from './index.scss'

class OrderDetail extends Component {
  constructor () {
    super()
    this.state = {}
    this.fetchDetail = this.fetchDetail.bind(this)
    this.filterDetail = this.filterDetail.bind(this)
    this.check = this.check.bind(this)
  }

  check (type) {
    const id = Helper.getQueryParam('id')
    const { check } = this.props.actions
    check && check(id, type)
  }

  fetchDetail () {
    const id = Helper.getQueryParam('id')
    if (!id) return
    const { fetchDetail } = this.props.actions
    fetchDetail && fetchDetail(id)
  }

  filterDetail () {
    const { detail } = this.props.order
    if (detail) {
      let { user, goods } = detail
      user = [
        { title: '客户姓名', desc: user.name },
        { title: '客户电话', desc: user.mobile },
        { title: '客户地址', desc: user.address },
      ]
      goods = goods.map(item => {
        return {
          icon: item.image,
          title: <div>
            <p className={styles.orderdetail_gname}>{item.name}</p>
            <p className={styles.orderdetail_price}>&yen;{item.price}</p>
          </div>,
          desc: <div className={styles.detail_numbox}>x{item.num}</div>
        }
      })
      return { user, goods }
    }
  }

  componentDidMount () {
    this.fetchDetail()
  }

  render () {
    const detail = this.filterDetail()
    if (!detail) return null
    const { user, goods } = this.filterDetail()
    if (!user || !goods) return null
    const { role } = JSON.parse(localStorage.getItem('user'))
    const { status } = this.props.order.detail
    console.log(role, detail.status)
    return <Page ptr={false}>
      <div className={styles.orderdetail}>
        <CellsTitle>客户信息：</CellsTitle>
        <List className={styles.orderdetail_block} dataSource={user} />
        <CellsTitle>客户信息：</CellsTitle>
        <List className={styles.orderdetail_block} dataSource={goods} />
        {
          ((role === 2 && status === 0) || (role === 1 && status === 1)) &&
          <ButtonArea direction='horizontal'>
            <Button onClick={this.check.bind(this, 1)} type='warn'>驳回</Button>
            <Button onClick={this.check.bind(this, 0)}>审核</Button>
          </ButtonArea>
        }
      </div>
    </Page>
  }
}

const mapStateToProps = ({ order }) => {
  return { order }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(orderActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)