import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import loginActions from './actions'
import { Form, Button } from 'react-weui'
import InputWithLabel from 'Gb/components/InputWithLabel'
import Toast from 'Gb/components/Toast'

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
  deleteOneLine(){
    const category = this.state.categoryList
    // category.splice()
    // console.log(this)
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
              <button className={styles.inputDelete} onClick={this.deleteOneLine}  index={num}>删除</button>
            </div>
          )}
        </Form>
        <div className={styles.confirm_add} onClick={this.addOneLine}><button>添加一组</button></div>
        <div className={styles.confirm_btn}>
          <Button type='primary' onClick={this.triggerLogin}>确定</Button>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ login }) => {
  return { login }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}

// export default Login

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category))
