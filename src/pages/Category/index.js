import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CellsTitle } from 'react-weui'
import List from 'Gb/components/List'
import categoryActions from './actions'

import styles from './index.scss'

class CategoryList extends Component {
  constructor () {
    super()
    this.state = {
      categoryList: [{to:'/ChangeCategory',title:'aa'}]
    }
    this.filterList = this.filterList.bind(this)
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
        title: item.name
      } 
    })
  }

  componentDidMount () {
    const { fetchList } = this.props.actions
    fetchList && fetchList()
  }

  render () {
    let list = this.filterList()
    return (
      <div>
        <CellsTitle>商品分类列表</CellsTitle>
        <ul className={styles.confirm_List}>         
          <List dataSource={list}/>
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
