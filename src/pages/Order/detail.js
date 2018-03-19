import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CellsTitle, Cell, CellBody, CellFooter, Button, ButtonArea, Select } from 'react-weui'
import List from 'Gb/components/List'
// import ListItem from 'Gb/components/ListItem'
import InputWithLabel from 'Gb/components/InputWithLabel'
import orderActions from './actions'
import Helper from 'Gb/utils/helper'
import Toast from 'Gb/components/Toast'
import moment from 'moment'

import styles from './index.scss'

class OrderDetail extends Component {
  constructor () {
    super()
    this.state = {
      express: {},
      rmsg: ''
    }
    this.fetchDetail = this.fetchDetail.bind(this)
    this.filterDetail = this.filterDetail.bind(this)
    this.check = this.check.bind(this)
    this.renderDriver = this.renderDriver.bind(this)
  }

  check (type, driver) {
    const id = Helper.getQueryParam('id')
    const { rmsg } = this.state
    const { check } = this.props.actions
    const params = { id, type }
    if (driver === 1) {
      params.driver = driver
    }
    if (type === 1) {
      if (!rmsg) {
        Toast('驳回请填写驳回原因')
        return
      } else {
        params.rmsg = rmsg
      }
    }
    check && check(params)
  }

  fetchDetail () {
    const id = Helper.getQueryParam('id')
    if (!id) return
    const { fetchDetail } = this.props.actions
    fetchDetail && fetchDetail(id)
  }

  filterDetail () {
    const { detail } = this.props.order
    const { role } = JSON.parse(localStorage.getItem('user'))
    if (detail) {
      let { user, goods, owner } = detail
      user = [
        { title: '客户姓名', desc: user.name },
        { title: '客户电话', desc: user.mobile },
        { title: '客户地址', desc: user.address },
        { title: '提交人', desc: role === 1 ? detail.ownerBoss.username : detail.owner.username },
        { title: '提交时间', desc: moment(detail.createdAt).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }
      ]
      goods = goods.map(item => {
        return {
          icon: item.image,
          title: <div>
            <p className={styles.orderdetail_gname}>{item.name}</p>
            <p className={styles.orderdetail_price}>&yen;{item.price}</p>
          </div>,
          desc: <div className={styles.detail_numbox}>
            <p>x{item.num}</p>
          </div>
        }
      })
      return { user, goods, owner }
    }
  }

  // 有单号渲染
  // renderHasDriver () {
  //   const { detail } = this.props.order
  // }

  renderDriver (type = true) {
    const { detail } = this.props.order
    const { express } = this.state
    if (detail) {
      const { goods } = detail
      return goods.map((item, index) => {
        return <InputWithLabel
          key={item._id}
          className={!type ? `${styles.orderdetail_driver} ${styles.orderdetail_drivertrue}` : styles.orderdetail_driver}
          label={type ? '单号录入' : `${item.name}单号`}
          disabled={!type}
          value={express[item._id]}
          placeholder={type ? `录入商品${item.name}的单号` : ''}
          onChange={this.setDriver.bind(this, item._id)}
          desc={type ? <Button type='vcode' onClick={this.submitDriver.bind(this, item._id)}>确认</Button> : null}
        />
      })
    }
  }

  setDriver (id, e) {
    const { value } = e.target
    this.setState({
      express: {
        ...this.state.express,
        [id]: value
      }
    })
  }

  submitDriver (id) {
    if (!this.state.express[id]) {
      Toast.warn('非空不能提交')
      return
    }
    const driverNo = this.state.express[id]
    this.props.actions.setDriverNo(id, driverNo)
  }

  componentWillReceiveProps (nextProps) {
    const { detail } = nextProps.order
    if (detail) {
      const goods = detail.goods
      let params = {}
      goods.map(item => {
        if (item.driverNo) {
          params[item._id] = item.driverNo
        }
      })
      this.setState({
        express: params
      })
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
    const { role, id, _id } = JSON.parse(localStorage.getItem('user'))
    const { status, orderType, owner, ownerBoss, total, totalNum, rmsg: prmsg } = this.props.order.detail
    const { rmsg } = this.state
    return <div className={styles.orderdetail}>
      <CellsTitle>客户信息：</CellsTitle>
      <List className={styles.orderdetail_block} dataSource={user} />
      {
        role === 1 && <div>
          <Cell className={styles.orderdetail_owner}>
              <CellBody>所属总代</CellBody>
              <CellFooter>{orderType === 1 ? owner.username : ownerBoss.username}</CellFooter>
          </Cell>
        </div>
      }
      {
        (role === 2 && orderType === 2) && <div>
          <Cell className={styles.orderdetail_owner}>
              <CellBody>所属特代</CellBody>
              <CellFooter>{owner.username}</CellFooter>
          </Cell>
        </div>
      }
      <CellsTitle>商品信息：</CellsTitle>
      <List className={styles.orderdetail_block} dataSource={goods} />
      <div className={styles.orderdetail_statistic}>
        <Cell>
          <CellBody>订单金额</CellBody>
          <CellFooter className={styles.orderdetail_total}>&yen;{total}</CellFooter>
        </Cell>
        <Cell>
          <CellBody>商品数量</CellBody>
          <CellFooter className={styles.orderdetail_totalnum}>{totalNum}</CellFooter>
        </Cell>
        {prmsg && <Cell>
          <CellBody>驳回原因</CellBody>
          <CellFooter className={styles.orderdetail_totalnum}>{prmsg}</CellFooter>
        </Cell>}
        {status === 3 && this.renderDriver(false)}
        
      </div>
      {
        ((role === 2 && status === 0) || (role === 1 && status === 1)) &&
        <div>
          <InputWithLabel
            className={styles.orderdetail_rmsg}
            label='驳回原因'
            value={rmsg}
            placeholder={`驳回请填写驳回原因`}
            onChange={(e) => { this.setState({ rmsg: e.target.value }) }}
          />
          <ButtonArea direction='horizontal'>
            <Button onClick={this.check.bind(this, 1)} type='warn'>驳回</Button>
            <Button onClick={this.check.bind(this, 0)}>审核</Button>
          </ButtonArea>
        </div>
      }
      {
        (role === 1 && status === 2) &&
        <div>
          {this.renderDriver()}
          <ButtonArea direction='horizontal'>
            <Button onClick={this.check.bind(this, 3, 1)}>发货</Button>
          </ButtonArea>
        </div>
      }
      {
        ((role === 3 && status === 0) || (role === 2 && status === 1 && (detail.owner._id === id || detail.owner._id === _id))) &&
        <ButtonArea>
          <Button  type='warn' onClick={this.check.bind(this, 6)}>取消订单</Button>
        </ButtonArea>
      }
    </div>
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