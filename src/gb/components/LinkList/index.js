import React, { Component } from 'react'
import { CellBody, CellFooter } from 'react-weui'
import { Link } from 'react-router-dom'

export default class LinkList extends Component {
  render () {
    let { dataSource } = this.props
    if (!dataSource || dataSource.length === 0) return <p>暂无数据</p>
    if (!Array.isArray(dataSource)) dataSource = [ dataSource ]
    return dataSource && dataSource.map((item,index) => {
      const { to, title, ...res } = item
      return <Link className='weui-cell weui-cell_access' to={to} {...res} key={index}>
        <CellBody>{title}</CellBody>
        <CellFooter />
      </Link>
    })
  }
}
