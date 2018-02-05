import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CellsTitle } from 'react-weui'
import List from 'Gb/components/List'
import { close, write } from 'Gb/icons'
import categoryActions from './actions'

import styles from './index.scss'

class CategoryList extends Component {
  constructor () {
    super()
    this.state = {
      categoryList: []
    }
    this.filterList = this.filterList.bind(this)
  }

  update (id) {
    this.setState({ updateID: id })
    
  }

  remove (id) {
    this.setState({ removeId: id })
    
  }

  filterList () {
    const { list } = this.props.category
    if (!list) return null
    return list.map(item => {
      return {
        to: {
          path: '/category/detail',
          state: item
        },
        title: item.name,
        desc: <div>
          <img onClick={this.remove.bind(this, item.id)} className={styles.change_icon} src={close} alt='icon' />
          <img onClick={this.update.bind(this, item.id)} className={styles.change_icon} src={write} alt='icon' />
        </div>
      }
    })
  }

  componentDidMount () {
    const { fetchList } = this.props.actions
    fetchList && fetchList()
  }

  render () {
    let list = this.filterList()
    console.log(list)
    return (
      <div>
        <CellsTitle>商品分类列表</CellsTitle>
        <ul className={styles.confirm_List}>
          <List dataSource={list} />
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ category }) => {
  return { category }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
