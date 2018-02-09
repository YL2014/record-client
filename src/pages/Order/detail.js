import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Page } from 'react-weui'
import orderActions from './actions'
import Helper from 'Gb/utils/helper'

import styles from './index.scss'

class OrderDetail extends Component {
  constructor () {
    super()
    this.state = {}
    this.fetchDetail = this.fetchDetail.bind(this)
    this.filterDetail = this.filterDetail.bind(this)
  }

  fetchDetail () {
    const id = Helper.getQueryParam('id')
    if (!id) return
    const { fetchDetail } = this.props.actions
    fetchDetail && fetchDetail(id)
  }

  filterDetail () {
    const { detail } = this.props.order
    if (detail) {
      
    }
  }

  componentDidMount () {
    this.fetchDetail()
  }

  render () {
    return <Page ptr={false}>
      <div className={styles.orderdetail}>
        detail
      </div>
    </Page>
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