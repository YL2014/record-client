import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Dialog } from 'react-weui'
import './index.scss'

class CustomeDialog extends Component {
  constructor () {
    super()
    this.state = {
      show: false,
      ok: true,
      cancel: false,
      okText: '确认',
      cancelText: '取消'
    }
  }
  hideDialog () {
    this.setState({show: false})
  }
  render () {
    const { show, cancel, okText, cancelText } = this.state
    const {message, ...res} = this.props
    const button1 = [{
      types: 'primary',
      label: okText,
      onClick: this.hideDialog.bind(this)
    }]
    const button2 = [{
      types: 'default',
      label: cancelText,
      onClick: this.hideDialog.bind(this)
    },
    {
      types: 'primary',
      label: okText,
      onClick: this.hideDialog.bind(this)
    }]
    const buttons = cancel ? button2:button1
    return <Dialog type='ios' title={message} buttons={buttons} show={this.state.show}>
      {/* 是否显示输入框 */}
    </Dialog>
  }
}

export default CustomeDialog
