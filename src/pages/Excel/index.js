import React, { PureComponent } from 'react'
import { Button } from 'react-weui'
import Helper from 'Gb/utils/helper'
import { API } from './constains'

import styles from './index.scss'

const baseUrl = Helper.getBaseUrl()

export default class Excel extends PureComponent {
  constructor () {
    super()
    this.state = {}
  }

  getQueryParams () {
    const { startTime, endTime } = this.state

  }

  render () {
    return <div className={styles.excel}>
      <a href={`${baseUrl}${API.downExcel}`}>
        <Button>导出订单</Button>
      </a>
    </div>
  }
}