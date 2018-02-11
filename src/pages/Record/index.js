import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from 'Gb/components/List'
import recordActions from './actions'
import { CellsTitle, Button } from 'react-weui'
import Toast from 'Gb/components/Toast'
import Helper from 'Gb/utils/helper'

import styles from './index.scss'

class Record extends Component {
  constructor () {
    super()
    this.state = {
      goodsList: []
    }
    this.filterList = this.filterList.bind(this)
    this.writeInfo = this.writeInfo.bind(this)
    // this.showNum = this.showNum.bind(this)
    // this.subNum = this.subNum.bind(this)
    // this.addNum = this.addNum.bind(this)
    this.toConfirmPage = this.toConfirmPage.bind(this)
  }

  filterList () {
    const { list } = this.props.record
    const rank = JSON.parse(window.localStorage.getItem('user'))
    if (!list) return null
    return list.map((item, index) => {
      return {
        title: <div>
          <p className={styles.goods_title}>{item.name}</p>
          <div className={styles.showprice} >
            <span className={styles.lprice}>￥{item.lprice}</span>
            <span className={styles.realprice}>￥{ rank.role === 3 ? item.tprice : item.zprice}</span>
          </div>
        </div>,
        icon: item.image,
        desc: <div className={styles.record_numbox} >
          <span className={styles.record_sub} onClick={this.subNum.bind(this, index)}>-</span>
          <input type='number' max='99' className={styles.record_inputnum} disabled value={item.num} onChange={this.showNum.bind(this, index)} />
          <span className={styles.record_add} onClick={this.addNum.bind(this, index)}>+</span>
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

  subNum (index) {
    const { list } = this.props.record
    let num = list[index].num
    if (num === 0) return
    this.props.actions.setItemNum(index, --num)
  }

  addNum (index) {
    const { list } = this.props.record
    let num = list[index].num
    this.props.actions.setItemNum(index, ++num)
  }

  toConfirmPage () {
    let cusInfo = this.props.record.customerInfo
    if (!cusInfo) {
      Toast('请先填写客户信息')
      return
    }
    if (cusInfo.split('，').length !== 3) {
      Toast('客户信息格式不正确')
      return
    }
    const [ name, phone, address ] = cusInfo.split('，')
    if (!Helper.reg.telephone.test(phone) && !Helper.reg.telephone.test(address)) {
      Toast('手机号码格式不正确')
    } else {
      const list = this.props.record.list
      let hasGoods = false
      list.forEach((item) => {
        if (item.num > 0) {
          hasGoods = true
        }
      })
      if (hasGoods) {
        this.props.history.push('/recordcf')
      } else {
        Toast('至少添加一件商品')
      }
    }
  }

  componentDidMount () {
    const { fetchList } = this.props.actions
    const { list } = this.props.record
    if (!list) {
      fetchList && fetchList()
    }
  }

  render () {
    let list = this.filterList()
    const { customerInfo = '' } = this.props.record
    return (
      <div className={styles.record}>
        <CellsTitle>客户信息：</CellsTitle>
        <div className={styles.record_inputbox}>
          <textarea className={styles.record_info} placeholder='填写或粘贴用户姓名，电话，收货地址，并用英文逗号隔开' rows='3' maxLength='200' value={customerInfo} onChange={this.writeInfo} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Record)
