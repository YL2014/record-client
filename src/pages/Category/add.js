import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Form, Button } from 'react-weui'
import InputWithLabel from 'Gb/components/InputWithLabel'
import Toast from 'Gb/components/Toast'
import ajax from 'Gb/utils/ajax'
import { API } from './constains'
import { close } from 'Gb/icons'

import styles from './index.scss'

class Category extends Component {
  constructor () {
    super()
    this.state = {
      categoryList: ['']
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.addOneLine = this.addOneLine.bind(this)
    this.deleteOneLine = this.deleteOneLine.bind(this)
    this.triggerAdd = this.triggerAdd.bind(this)
  }

  handleOnChange (e) {
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    const category = this.state.categoryList
    category[Number(name)] = value
    this.setState({
      categoryList: category
    })
  }
  addOneLine () {
    const category = this.state.categoryList
    category.push('')
    this.setState({
      categoryList: category
    })
  }
  deleteOneLine (e) {
    const category = this.state.categoryList
    const deleteIndex = e.target.dataset.index
    category.splice(deleteIndex, 1)
    this.setState({
      categoryList: category
    })
  }
  triggerAdd () {
    const category = this.state.categoryList
    const categoryValue = []
    category.forEach((ele) => ele.trim() !== '' ? categoryValue.push(ele) : '')
    if (categoryValue.length > 0) {
      this.addAjax(categoryValue)
    } else {
      Toast.error('请至少输入一个分类')
    }
  }
  async addAjax (arr) {
    const data = await ajax.post(API.add, {
      name: arr
    })
    if (data) {
      Toast.success('添加分类成功')
      setTimeout(() => {
        this.props.history.replace('/category')
      }, 1000)
    }
  }

  render () {
    const { categoryList } = this.state
    return (
      <div>
        <Form>
          {categoryList.map((val, num) =>
            <div className={styles.inputBox} key={`category${num}`} index={num}>
              <InputWithLabel name={num} value={categoryList[num]} label='分类名称' placeholder='请输入分类名称' onChange={this.handleOnChange} />
              <img src={close} className={styles.inputDelete} onClick={this.deleteOneLine} data-index={num} alt='close'/>
            </div>
          )}
        </Form>
        <div className={styles.confirm_add} onClick={this.addOneLine}><button>添加一组</button></div>
        <div className={styles.confirm_btn}>
          <Button type='primary' onClick={this.triggerAdd}>确认添加</Button>
        </div>

      </div>
    )
  }
}

export default Category
