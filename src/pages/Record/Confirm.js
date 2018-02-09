import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from 'Gb/components/List'
import recordActions from './actions'
import { CellsTitle, Button } from 'react-weui'

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
    const { list } = this.props.record
    const rank = JSON.parse(window.localStorage.getItem('user'))
    let orderInfo = {}
    let cusInfos = this.props.record.customerInfo
    let cusInfo = cusInfos ? cusInfos.split(',') : []
    orderInfo = {'user': {'name': cusInfo[0], 'mobile': cusInfo[1], 'address': cusInfo[2]}}
    let goods = []
    if (!list) return null
    let total = 0
    let newList = list.filter(item => {
      total += rank.role === 2 ? item.zprice * item.num : item.tprice * item.num
      return item.num > 0
    })
    newList = newList.map((item, index) => {
      goods.push({'id': item.id, 'num': item.num})
      return {
        num: item.num,
        to: {
          pathname: '/goods/detail',
          state: item
        },
        title: item.name,
        icon: item.image,
        lprice: item.lprice,
        zprice: item.zprice,
        tprice: item.tprice,
        rank: rank.role, // 表示级别
        desc: <div className={styles.record_numbox}>x{item.num}</div>
      }
    })
    orderInfo.goods = goods
    this.setState({
      total,
      goodsList: newList,
      order: orderInfo
    })
  }

  componentDidMount () {
    this.filterList()
  }

  render () {
    let cusInfos = this.props.record.customerInfo
    let cusInfo = cusInfos ? cusInfos.split(',') : []
    const { total, goodsList: list } = this.state
    return (
      <div>
        <CellsTitle>客户信息：</CellsTitle>
        <div className={styles.record_inputbox}>
          <p><label htmlFor='cusname'>客户姓名：</label>
            <span id='cusname'>{cusInfo[0]}</span></p>
          <p><label htmlFor='cusphone'>客户电话：</label>
            <span id='cusphone'>{cusInfo[1]}</span></p>
          <p><label htmlFor='cusaddress'>客户地址：</label>
            <span id='cusaddress'>{cusInfo[2]}</span></p>
        </div>
        <CellsTitle>商品信息：</CellsTitle>
        <div className={`${styles.record_goods} ${styles.record_buygoods}`}>
          <List dataSource={list} />
        </div>
        <p className={styles.record_total}>总价：<span>￥{total}</span></p>
        <div className={styles.record_next}>
          <Button onClick={this.toRecordPage}>上一步</Button>
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
