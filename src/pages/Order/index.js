import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinkList from 'Gb/components/LinkList'
import SelectWithLable from 'Gb/components/SelectWithLabel'
import { CellsTitle, SearchBar } from 'react-weui'
import orderActions from './actions'
// import { ORDER_STATUS } from './constains'
import styles from './index.scss'

class OrderList extends Component {
  constructor () {
    super()
    this.state = { page: 1, status: 2, options: [] }
    this.filterList = this.filterList.bind(this)
    this.fetchList = this.fetchList.bind(this)
    this.fetchMore = this.fetchMore.bind(this)
    this.setSearchText = this.setSearchText.bind(this)
    this.search = this.search.bind(this)
    this.initStatus = this.initStatus.bind(this)
    this.chooseStatus = this.chooseStatus.bind(this)
    this.setQueryParams = this.setQueryParams.bind(this)
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

  // 加载更多
  fetchMore () {
    let params = this.setQueryParams()
    params.page += 1
    this.fetchList(params)
    this.setState({ page: ++params.page })
  }

  fetchList (params) {
    const { fetchList } = this.props.actions
    fetchList && fetchList(params)
  }

  // 设置搜索关键字或手机号
  setSearchText (value) {
    this.setState({ searchText: value, page: 1 })
  }

  // 搜索
  search () {
    const params = this.setQueryParams()
    this.fetchList(params)
  }

  // 角色状态初始化
  initStatus () {
    const curUser = JSON.parse(localStorage.getItem('user'))
    const { role } = curUser
    const { state } = this.props.location
    if (role === 1) {
      this.setState({
        options: [
          { label: '已审核', value: 2 },
          { label: '待审核', value: 1 },
          { label: '已发货', value: 3 }
        ]
      })
    }
    if (role === 2) {
      if (state && state.type === 1) {
        this.setState({
          options: [
            { label: '公司已审核', value: 2 },
            { label: '我已审核', value: 2 },
            { label: '待审核', value: 0 },
            { label: '已发货', value: 3 }
          ]
        })
      } else {
        this.setState({
          options: [
            { label: '已审核', value: 2 },
            { label: '待审核', value: 1 },
            { label: '已发货', value: 3 }
          ]
        })
      }
    }
    if (role === 3) {
      this.setState({
        options: [
          { label: '已审核', value: 2 },
          { label: '待公司审核', value: 1 },
          { label: '待总代审核', value: 0 }
        ]
      })
    }

  }

  // 选择状态
  chooseStatus (e) {
    const { value } = e.target
    this.setState({ status: value })
    let params = this.setQueryParams()
    params.status = value
    this.fetchList(params)
  }

  // 设置搜索参数
  setQueryParams () {
    const { searchText: key, status, page } = this.state
    const { state } = this.props.location
    let params = { key, status, page }
    if (!key) delete params.key
    if (state && state.type === 1) {
      params.type = 1
    }
    return params
  }

  componentDidMount () {
    const params = this.setQueryParams()
    this.fetchList(params)
    this.initStatus()
  }

  render() {
    const dataSource = this.filterList()
    const { list = [], count = 0 } = this.props.order
    const { options } = this.state
    return <div className={styles.order}>
      <div>
        <SearchBar placeholder='搜索手机号或姓名' onChange={this.setSearchText} onSubmit={this.search} />
      </div>
      <SelectWithLable label='订单状态' options={options} onChange={this.chooseStatus} />
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
