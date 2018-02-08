import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from 'Gb/components/List'
import recordActions from './actions'
import { CellsTitle, Button } from 'react-weui'

import styles from './index.scss'

class Confirm extends Component{
  constructor () {
    super()
    this.state = {
      goodsList: []
    }
    this.filterList = this.filterList.bind(this)
    this.writeInfo = this.writeInfo.bind(this)
    this.toConfirmPage = this.toConfirmPage.bind(this)
  }

  filterList () {
    const { list } = this.props.record
    const rank = JSON.parse(window.localStorage.getItem('user'))
    if (!list) return null
    return list.map((item, index) => {
      return {
        num: item.num,
        to: {
          path: '/goods/detail',
          state: item
        },
        title: item.name,
        icon: item.image,
        lprice: item.lprice,
        zprice: item.zprice,
        tprice: item.tprice,
        rank: rank.role, // 表示级别
        desc: <div className={styles.record_numbox} >
          
        </div>
      }
    })
  }

  writeInfo (e) {
    const { value } = e.target
    this.props.actions.setCustomerInfo(value)
  }

  showNum (index, e) {
    const { value } = e.target
    this.props.actions.setItemNum(index, value)
  }

  componentDidMount () {
    const { fetchList } = this.props.actions
    const { list } = this.props.record
    if (!list) {
      fetchList && fetchList()
    }
  }

  toConfirmPage () {
    this.props.history.replace('/category')
  }

  render () {
    let list = this.filterList()
    const { customerInfo = '' } = this.props.record
    return (
      <div>
        <CellsTitle>客户信息：</CellsTitle>
        <div className={styles.record_inputbox}>
          <textarea className={styles.record_info} placeholder='填写或粘贴用户姓名，电话，收货地址，并用中文逗号隔开' rows='3' maxLength='200' value={customerInfo} onChange={this.writeInfo} />
        </div>
        <CellsTitle>选择商品：</CellsTitle>
        <div className={styles.record_goods}>
          <List dataSource={list} />
        </div>
        <div className={styles.record_next}><Button onClick={this.toConfirmPage}>下一步</Button></div>
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