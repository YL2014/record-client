import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Toast } from 'react-weui'
import './index.scss'

class CustomeToast extends Component {
  constructor () {
    super()
    this.state = {
      show: false
    }
    this.toastTimer = null
    this.duration = 2000
    this.onClose = this.onClose.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.setToastType = this.setToastType.bind(this)
  }

  onClose () {
    this.setState({
      show: false
    }, () => {
      this.stopTimer()
    })
  }

  startTimer () {
    this.setState({ show: true })
    this.toastTimer = setTimeout(() => {
      this.onClose()
    }, this.duration)
  }

  stopTimer () {
    const { unmountnode } = this.props
    clearTimeout(this.toastTimer)
    unmountnode && ReactDom.unmountComponentAtNode(unmountnode)
  }

  setToastType () {
    const { type } = this.props
    switch (type) {
      case 'success':
        this.setState({ icon: 'success-no-circle' })
        break
      case 'warn':
        this.setState({ icon: 'warn' })
        break
      default:
        this.setState({ icon: 'info-circle' })
        break
    }
  }

  componentDidMount () {
    this.startTimer()
    this.setToastType()
  }

  componentWillUnmount () {
    this.stopTimer()
  }
  
  render () {
    const { show, icon } = this.state
    const { message, ...res } = this.props
    if (icon) res.icon = icon
    return <Toast show={show} iconSize='large' {...res}>{message}</Toast>
  }
}

CustomeToast.defaultProps = {
  type: 'info'
}

const Message = (props = {}, type) => {
  let div = document.getElementById('toastWrap')
  if (!div) {
    div = document.createElement('div')
    div.id = 'toastWrap'
    document.body.appendChild(div)
  }
  if (typeof props === 'string') {
    props = {
      message: props
    }
  }
  if (type) {
    props.type = type
  }

  props.unmountnode = div
  const component = React.createElement(CustomeToast, props)
  ReactDom.render(component, div)
}

['success', 'warn', 'info', 'error'].forEach(type => {
  Message[type] = (options = {}) => {
    return Message(options, type)
  }
})

export default Message