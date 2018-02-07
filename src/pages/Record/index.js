import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from 'Gb/components/List'
import recordActions from './actions'
import { CellsTitle } from 'react-weui'

import styles from './index.scss'

class Record extends Component {
  constructor () {
    super()
    this.state = {
      goodsList: []
    }
    this.filterList = this.filterList.bind(this)
    this.writeInfo = this.writeInfo.bind(this)
    this.showNum = this.showNum.bind(this)
    this.subNum = this.subNum.bind(this)
    this.addNum = this.addNum.bind(this)
  }
  filterList () {
    const { list } = this.props.record
    if (!list) return null
    return list.map(item => {
      return {
        to: {
          path: '/goods/detail',
          state: item
        },
        title: item.name,
        icon: item.image,
        desc: <div className={styles.record_numbox} >
          <span className={styles.record_sub} onClick={this.subNum}>-</span>
          <input type='num' className={styles.record_inputnum} value='0' onChange={this.showNum} />
          <span className={styles.record_add} onClick={this.addNum}>+</span>
        </div>
      }
    })
  }
  writeInfo (e) {
    const { value } = e.target
    this.setState({cusinfo: value})
  }
  showNum () {

  }
  subNum () {

  }
  addNum () {

  }
  componentDidMount () {
    const { fetchList } = this.props.actions
    fetchList && fetchList()
  }
  render () {
    let list = this.filterList()
    const { cusinfo = '' } = this.state
    return (
      <div>
        <CellsTitle>客户信息：</CellsTitle>
        <div className={styles.record_inputbox}>
          <textarea className={styles.record_info} placeholder='填写或粘贴用户姓名，电话，收货地址，并用中文逗号隔开' rows='3' maxLength='200' value={cusinfo} onChange={this.writeInfo} />
        </div>
        <CellsTitle>选择商品：</CellsTitle>
        <div className={styles.record_goods}>
          <List dataSource={list} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Record)
