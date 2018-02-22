import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InputWithLabel from 'Gb/components/InputWithLabel'
import List from 'Gb/components/List'
import statisticActions from './actions'

import styles from './index.scss'

class StatisticComponent extends Component {
  constructor () {
    super()
    this.state = {
      startTime: '',
      endTime: ''
    }
    this.setTime = this.setTime.bind(this)
    this.getStatistic = this.getStatistic.bind(this)
    this.renderStatistic = this.renderStatistic.bind(this)
  }

  setTime (e) {
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
    return <div>
      <List dataSource={dataSource} />
    </div>
  }

  componentDidMount () {
    this.getStatistic()
  }

  render () {
    const { startTime, endTime } = this.state
    return <div className={styles.statistic}>
      <InputWithLabel label='开始时间' name='startTime' value={startTime} onChange={this.setTime} type='datetime-local' />
      <InputWithLabel label='结束时间' name='endTime' value={endTime} onChange={this.setTime} type='datetime-local' />
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