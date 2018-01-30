import React, { Component } from 'react'
import { Form, Button } from 'react-weui'
import InputWithLabel from 'Gb/components/InputWithLabel'
// import Toast from 'Gb/components/Toast'
// import ajax from 'Gb/utils/ajax'
// import { API } from './constains'

import styles from './index.scss'

class CategoryList extends Component {
  constructor () {
    super()
    this.state = {
      categoryList: ['']
    }
    this.handleOnChange = this.handleOnChange.bind(this)
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

  render () {
    const { categoryList } = this.state
    console.log(categoryList)
    return (
      <div>
        <Form>
          {categoryList.map((val, num) =>
            <div className={styles.inputBox} key={`category${num}`} index={num}>
              <InputWithLabel name={num} value={categoryList[num]} label='分类名称' placeholder='请输入分类名称' onChange={this.handleOnChange} />
              <button className={styles.inputDelete} onClick={this.deleteOneLine} data-index={num}>删除</button>
            </div>
          )}
        </Form>
        <ul className={styles.confirm_List}>
          <li></li>
        </ul>
        <div className={styles.confirm_btn}>
          <Button type='primary' onClick={this.triggerAdd}>确认添加</Button>
        </div>

      </div>
    )
  }
}

export default CategoryList
