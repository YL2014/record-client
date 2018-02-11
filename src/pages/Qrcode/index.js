import React, { Component } from 'react'
import QRCode from 'qrcode'
import Helper from 'Gb/utils/helper'
import Toast from 'Gb/components/Toast'

import styles from './index.scss'

class QrCodeAuth extends Component {
  constructor () {
    super()
    this.state = {}
    this.createQrcode = this.createQrcode.bind(this)
  }

  async createQrcode () {
    const id = Helper.getQueryParam('id')
    if (!id) {
      Toast('证书页面地址错误')
      return
    }
    const url = `http://${window.location.host}/useradd?id=${id}`
    await QRCode.toCanvas(this.canvasNode, url)
  }

  componentDidMount () {
    this.createQrcode()
  }

  render () {
    return <div className={styles.qrcode}>
      <p className={styles.qrcode_title}>我的授权码</p>
      <canvas className={styles.qrcode_canvas} ref={node => { this.canvasNode = node }}></canvas>
    </div>
  }
}

export default QrCodeAuth