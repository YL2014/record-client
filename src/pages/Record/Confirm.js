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
      goodsList: []
    }
    this.toConfirmPage = this.toConfirmPage.bind(this)
    this.filterList = this.filterList.bind(this)
  }

  componentDidMount () {

  }

  toConfirmPage () {
    // this.props.history.replace('/category')
  }

  filterList () {
    const { list } = this.props.record
    const rank = JSON.parse(window.localStorage.getItem('user'))
    if (!list) return null
    const newList = list.filter(item => { return item.num > 0 })
    return newList.map((item, index) => {
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
          desc: <div className={styles.record_numbox} />
        }
      }
    )
  }

  render () {
    console.log(this.props)
    let cusInfos = this.props.record.customerInfo
    let cusInfo = cusInfos ? cusInfos.split(',') : []
    const list = this.filterList()
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
