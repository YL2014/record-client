import React, { Component } from 'react'
import { Button } from 'react-weui'
import LinkList from 'Gb/components/LinkList'
// import Toast from 'Gb/components/Toast'
// import ajax from 'Gb/utils/ajax'
// import { API } from './constains'

import styles from './index.scss'

class CategoryList extends Component {
  constructor () {
    super()
    this.state = {
      categoryList: [{to:'/ChangeCategory',title:'aa'}]
    }
  }

  render () {
    const { categoryList } = this.state
    return (
      <div>
        <ul className={styles.confirm_List}>         
          <LinkList dataSource={categoryList}/>
        </ul>
        <div className={styles.confirm_btn}>
          <Button type='primary' onClick={this.triggerAdd}>确认</Button>
        </div>
      </div>
    )
  }
}

export default CategoryList
