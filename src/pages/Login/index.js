import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import loginActions from './actions'
import { Form, FormCell, CellHeader, CellBody, Checkbox, Button } from 'react-weui'
import InputWithLabel from 'Gb/components/InputWithLabel'
import Toast from 'Gb/components/Toast'

import styles from './index.scss'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      remember: true
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.showForget = this.showForget.bind(this)
    this.triggerLogin = this.triggerLogin.bind(this)
  }

  handleOnChange (e) {
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({
      [name]: value
    })
  }

  showForget (e) {
    Toast.warn('请输入密码')
  }

  triggerLogin () {
    const { username, password, remember } = this.state
    const { actions } = this.props
    if (!username) { Toast.warn('请输入用户名'); return }
    if (!password) { Toast.warn('请输入密码'); return }
    actions.fetchLogin({ username, password, remember })
  }

  render() {
    const { username, password, remember } = this.state
    return (
      <div>
        <Form>
          <InputWithLabel name='username' value={username} label='用户名' placeholder='请输入用户名' onChange={this.handleOnChange} />
          <InputWithLabel name='password' value={password} label='密码' placeholder='请输入密码' onChange={this.handleOnChange} />
        </Form>
        <Form className={styles.login_remember} checkbox>
          <FormCell checkbox className={styles.login_remember_checkbox}>
            <CellHeader>
              <Checkbox name="remember" checked={remember} onChange={this.handleOnChange}/>
            </CellHeader>
            <CellBody>记住密码</CellBody>
          </FormCell>
          <div className={styles.login_forget} onClick={this.showForget}><span>忘记密码？</span></div>
        </Form>
        
        <div className={styles.login_btn}>
          <Button type='primary' onClick={this.triggerLogin}>登录</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
