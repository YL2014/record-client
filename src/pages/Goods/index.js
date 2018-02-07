import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import SelectWithLabel from 'Gb/components/SelectWithLabel'
import goodsActions from './actions'

import styles from './index.scss'

class GoodsList extends Component {
  constructor () {
    super()
    this.state = {
      options: [
        { value: 0, label: '正常' },
        { value: 1, label: '已下架' },
        { value: 3, label: '全部' }
      ],
      status: ''
    }
    this.onChange = this.onChange.bind(this)
    this.renderGoodsList = this.renderGoodsList.bind(this)
  }

  onChange (e) {
    const { value } = e.target
    this.props.actions.fetchList({
      status: value
    })
  }

  renderGoodsList () {
    const { list = [] } = this.props.goods
    if (!list || list.length === 0) {
      return <p className={styles.goods_nodata}>暂无数据！</p>
    }
    return list && list.map((item, index) => {
      const to = {
        pathname: '/goodsdetail',
        state: item
      }
      return <div key={index} className={styles.goods_item}>
        <Link to={to}>
          <div className={styles.goods_item_img}>
            <img src={item.image} alt={item.name}/>
          </div>
          <p className={styles.goods_item_name}>{item.name}</p>
          <p className={styles.goods_item_price}>&yen;{item.lprice}</p>
        </Link>
      </div>
    })
  }

  componentDidMount () {
    this.setState({ status: 0 })
    this.props.actions.fetchList({
      status: 0
    })
  }

  render () {
    const { options } = this.state
    return <div className={styles.goods}>
      <SelectWithLabel label='商品状态' options={options} onChange={this.onChange} />
      <div className={styles.goods_list}>
        {this.renderGoodsList()}
      </div>
    </div>
  }
}

const mapStateToProps = ({ goods }) => {
  return { goods }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(goodsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList)