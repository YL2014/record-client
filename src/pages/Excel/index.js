import React, { PureComponent } from 'react'
import { Button, LoadMore } from 'react-weui'
import InputWithLabel from 'Gb/components/InputWithLabel'
import Helper from 'Gb/utils/helper'
import { API } from './constains'
import ajax from 'Gb/utils/ajax'
import Toast from 'Gb/components/Toast'

import styles from './index.scss'

const baseUrl = Helper.getBaseUrl()

export default class Excel extends PureComponent {
  constructor () {
    super()
    this.state = {
      startTime: '',
      endTime: ''
    }
    this.setSearchTime = this.setSearchTime.bind(this)
    this.uploadExcel = this.uploadExcel.bind(this)
  }

  // 设置时间
  setSearchTime (e) {
    let { name, value } = e.target
    this.setState({
      [name]: value
    },)
  }

  // 上传excel
  async uploadExcel () {
    const file = this.fileNode.files[0]
    if (file) {
      const params = new FormData()
      params.append('file', file)
      this.setState({ precent: '开始上传...' })
      const data = await ajax.upload(API.uploadExcel, params, (progressEvent) => {
        let precent = Math.round(progressEvent.loaded * 100 / progressEvent.total)
        if (precent % 5 === 0) {
          this.setState({ precent: `已上传${precent}%` })
        }
      })
      if (data) {
        this.setState({ precent: '' })
        Toast.success('单号导入成功')
      }
    }
  }

  render () {
    let { startTime, endTime, present } = this.state
    return <div className={styles.excel}>
      <div className={styles.excel_condition}>
        <InputWithLabel label='开始时间' name='startTime' value={startTime} onChange={this.setSearchTime} type='date' />
        <InputWithLabel label='结束时间' name='endTime' value={endTime} onChange={this.setSearchTime} type='date' />
      </div>
      <a
        className={styles.excel_btn}
        href={`${baseUrl}${API.downExcel}?startTime=${startTime ? startTime + ' 00:00:00' : ''}&endTime=${endTime ? endTime + ' 23:59:59' : ''}`}>
        <Button>导出订单</Button>
      <Button className={styles.excel_import}>单号导入
        <input ref={(node) => { this.fileNode = node }} type='file' onChange={this.uploadExcel} name='file' />
      </Button>
      {
        present && <div className={styles.excel_loading} onClick={(e) => { e.stopPropagation(); return false }}>
          <LoadMore loading>{present}</LoadMore>
        </div>
      }
      </a>
    </div>
  }
}