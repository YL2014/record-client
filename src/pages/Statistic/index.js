import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InputWithLabel from 'Gb/components/InputWithLabel'
import List from 'Gb/components/List'
import { CellsTitle } from 'react-weui'
import statisticActions from './actions'

import styles from './index.scss'

class StatisticComponent extends Component {
  constructor () {
    super()
    this.state = {
      startTime: '',
      endTime: ''
    }
    this.setSearchTime = this.setSearchTime.bind(this)
    this.getStatistic = this.getStatistic.bind(this)
    this.renderStatistic = this.renderStatistic.bind(this)
  }

  setSearchTime (e) {
    console.log(e)
    const { name, value } = e.target
    this.setState({
      [name]: value
    }, this.getStatistic)
  }

  // 获取统计数据
  getStatistic () {
    const { startTime, endTime } = this.state
    const { fetchStatistic } = this.props.actions
    fetchStatistic && fetchStatistic({
      startTime, endTime
    })
  }

  renderStatistic () {
    const { data } = this.props.statistic
    if (!data) return null
    const dataSource = [
      { title: '订单数量', desc: data.orderCount },
      { title: '商品总数', desc: data.goodsCount },
      { title: '订单金额', desc: data.total },
      { title: '商品详情', desc: data.goodsArr.map((item, index) => {
        return <span className={styles.statistic_goodsitem} key={index}>{item.name}({item.num})</span>
      }) }
    ]
    return <div className={styles.statistic_myorder}>
      <CellsTitle>我的订单</CellsTitle>
      <List dataSource={dataSource} />
    </div>
  }

  componentDidMount () {
    this.getStatistic()
  }

  render () {
    const { startTime, endTime } = this.state
    return <div className={styles.statistic}>
    <div className={styles.statistic_condition}>
      <InputWithLabel label='开始时间' name='startTime' value={startTime} onChange={this.setSearchTime} type='datetime-local' />
      <InputWithLabel label='结束时间' name='endTime' value={endTime} onChange={this.setSearchTime} type='datetime-local' />
    </div>
    {this.renderStatistic()}
    </div>
  }
}

const mapStateToProps = ({ statistic }) => {
  return { statistic }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(statisticActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticComponent)