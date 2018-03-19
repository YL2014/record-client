import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from 'Gb/components/List'
import recordActions from './actions'
import { CellsTitle, Button } from 'react-weui'
import Helper from 'Gb/utils/helper'

import styles from './index.scss'

class Confirm extends Component {
  constructor () {
    super()
    this.state = {
      goodsList: [],
      total: 0,
      order: {}
    }
    this.toRecordPage = this.toRecordPage.bind(this)
    this.filterList = this.filterList.bind(this)
    this.submitRecord = this.submitRecord.bind(this)
  }

  toRecordPage () {
    this.props.history.goBack()
  }

  submitRecord () {
    const param = this.state.order
    this.props.actions.submitOrder(param)
  }

  filterList () {
    const { list, customerInfo: cusInfos } = this.props.record
    if (!(list && cusInfos)) return null
    const rank = JSON.parse(window.localStorage.getItem('user'))
    const cusInfo = cusInfos.split('，')
    let [ name, mobile, address ] = cusInfo
    if (!Helper.reg.telephone.test(mobile)) {
      let newAddress = mobile
      mobile = address
      address = newAddress
    }
    const orderInfo = {'user': {'name': name, 'mobile': mobile, 'address': address}}
    const renderUserInfo = [
      {title: '客户姓名', desc: name},
      {title: '客户电话', desc: mobile},
      {title: '客户地址', desc: address}
    ]
    let goods = []
    let total = 0
    let newList = list.filter(item => {
      total += rank.role === 2 ? item.zprice * item.num : item.tprice * item.num
      return item.num > 0
    })
    newList = newList.map((item, index) => {
      goods.push({'id': item.id, 'num': item.num})
      return {
        title: <div>
          <p className={styles.goods_title}>{item.name}</p>
          <div className={styles.showprice} >
            {/* <del className={styles.lprice}>￥{item.lprice}</del> */}
            <span className={styles.realprice}>￥{ rank.role === 3 ? item.tprice : item.zprice}</span>
          </div>
          <p>规格: {item.apply}</p>
        </div>,
        icon: item.image,
        desc: <div className={styles.record_numbox}>x{item.num}</div>
      }
    })
    orderInfo.goods = goods
    this.setState({
      total,
      goodsList: newList,
      order: orderInfo,
      renderUserInfo
    })
  }

  componentDidMount () {
    this.filterList()
  }

  render () {
    const { total, goodsList: list, renderUserInfo } = this.state
    return (
      <div>
        <CellsTitle>客户信息：</CellsTitle>
        <List className={styles.orderconfirm_user} dataSource={renderUserInfo} />
        <CellsTitle>商品信息：</CellsTitle>
        <div className={`${styles.record_goods} ${styles.record_buygoods}`}>
          <List dataSource={list} />
        </div>
        <p className={styles.record_total}>总价：<span>￥{total}</span></p>
        <div className={styles.record_next}>
          <Button type='default' onClick={this.toRecordPage}>上一步</Button>
          <Button onClick={this.submitRecord}>提交</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ record }) => {
  return { record }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(recordActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
