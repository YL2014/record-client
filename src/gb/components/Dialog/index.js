import React, { Component } from 'react'
import { Dialog } from 'react-weui'
// import './index.scss'

class CustomeDialog extends Component {
  constructor () {
    super()
    this.state = {}
    this.ok = this.ok.bind(this)
    this.cancel = this.cancel.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
  }

  // 确认
  ok () {
    this.props.okShouldHide && this.hideDialog()
    this.props.ok && this.props.ok()
  }

  // 取消
  cancel () {
    this.props.cancelShouldHide && this.hideDialog()
    this.props.cancel && this.props.cancel()
  }

  hideDialog () {
    this.props.hideDialog && this.props.hideDialog()
  }

  componentDidMount () {
    const { type, okText, cancelText } = this.props
    if (type === 'Confirm') {
      this.setState({
        btns: [
          {
            type: 'default',
            label: cancelText,
            onClick: this.cancel.bind(this)
          },
          {
              type: 'primary',
              label: okText,
              onClick: this.ok.bind(this)
          }
        ]
      })
    } else {
      this.setState({
        btns: [
          {
              type: 'primary',
              label: okText,
              onClick: this.ok.bind(this)
          }
        ]
      })
    }
  }

  render () {
    const { show, title, children, className } = this.props
    const { btns } = this.state

    return <Dialog type='ios' title={title} buttons={btns} show={show} className={className}>
      {children}
    </Dialog>
  }
}

CustomeDialog.defaultProps = {
  title: '',
  ok: () => {},
  cancel: () => {},
  okText: '确认',
  cancelText: '取消',
  show: false,
  hideDialog: () => {},
  type: 'Confirm', // Confirm | Alert
  okShouldHide: true,
  cancelShouldHide: true
}

export default CustomeDialog
