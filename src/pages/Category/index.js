import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CellsTitle } from 'react-weui'
import List from 'Gb/components/List'
import Dialog from 'Gb/components/Dialog'
import { close, write } from 'Gb/icons'
import categoryActions from './actions'
import Toast from 'Gb/components/Toast'

import styles from './index.scss'

class CategoryList extends Component {
  constructor () {
    super()
    this.state = {
      categoryList: []
    }
    this.filterList = this.filterList.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
    this.removeCategory = this.removeCategory.bind(this)
  }

  // 展示修改弹窗
  update (id) {
    this.setState({ updateId: id, showUpdate: true })
  }

  // 展示删除弹框
  remove (id) {
    this.setState({ removeId: id, showRemove: true })
  }

  // 修改弹框input的onChange
  updateName (e) {
    const { value } = e.target
    this.props.actions.setNewName(value)
  }

  // 修改确认回调
  async updateCategory () {
    const { updateId } = this.state
    const { newName } = this.props.category
    if (!newName) {
      Toast('请输入新的分类名称')
      return
    }
    this.props.actions.updateCategory({
      name: newName,
      id: updateId
    })
  }

  // 删除确认回调
  removeCategory () {
    const { removeId } = this.state
    this.props.actions.removeCategory(removeId)
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
          {/* <img onClick={this.remove.bind(this, item._id)} className={styles.change_icon} src={close} alt='icon' /> */}
          <img onClick={this.update.bind(this, item._id)} className={styles.change_icon} src={write} alt='icon' />
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
    const { showUpdate, showRemove } = this.state
    const { newName = '' } = this.props.category
    return (
      <div>
        <CellsTitle>商品分类列表</CellsTitle>
        <ul className={styles.confirm_List}>
          <List dataSource={list} />
        </ul>
        <Dialog
          title='修改分类'
          show={showUpdate}
          hideDialog={() => { this.setState({ showUpdate: false }) }}
          ok={this.updateCategory} >
          <input placeholder='请输入新的分类名称' onChange={this.updateName} value={newName} />
        </Dialog>
        <Dialog
          show={showRemove}
          hideDialog={() => { this.setState({ showRemove: false }) }}
          ok={this.removeCategory} >
          确认删除该分类？
        </Dialog>
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
