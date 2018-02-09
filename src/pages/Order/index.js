import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinkList from 'Gb/components/LinkList'
import { CellsTitle } from 'react-weui'
import orderActions from './actions'
import styles from './index.scss'

class OrderList extends Component {
  constructor () {
    super()
    this.state = { page: 1 }
    this.filterList = this.filterList.bind(this)
    this.fetchList = this.fetchList.bind(this)
    this.fetchMore = this.fetchMore.bind(this)
  }

  filterList () {
    const { list } = this.props.order
    if (list) {
      return list.map(item => {
        return {
          to: {
            pathname: '/orderdetail',
            state: item,
            search: `?id=${item._id}`
          },
          title: item.user.name,
          desc: item.user.mobile
        }
      })
    }
  }

  fetchMore () {
    let { page } = this.state
    this.fetchList({ page: ++page })
    this.setState({ page: ++page })
  }

  fetchList (params) {
    const { fetchList } = this.props.actions
    fetchList && fetchList(params)
  }

  componentDidMount () {
    this.fetchList()
  }

  render() {
    const dataSource = this.filterList()
    const { list = [], count = 0 } = this.props.order
    return <div className={styles.order}>
      <LinkList dataSource={dataSource} />
      { list.length < count && <CellsTitle style={{textAlign: 'center'}} onClick={this.fetchMore}>加载更多</CellsTitle> }
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
