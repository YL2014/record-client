import React, { Component } from 'react'
import { CellHeader, CellBody, CellFooter } from 'react-weui'
import { Link } from 'react-router-dom'
import './index.scss'

export default class LinkList extends Component {
  render () {
    let { dataSource, className, ...other } = this.props
    if (!dataSource || dataSource.length === 0) return <p className='gb_list_nodata'>暂无数据</p>
    if (!Array.isArray(dataSource)) dataSource = [ dataSource ]
    return <div className={className} {...other}>
      {
        dataSource && dataSource.map((item,index) => {
          const { to, label, title, desc, icon, ...res } = item
          return to &&  <Link className='weui-cell weui-cell_access' to={to} {...res} key={index}>
            {icon && <CellHeader>
              <img src={icon} className='gb_linklist_icon'alt='icon' />
            </CellHeader>}
            {(label && !icon) && <CellHeader>{label}</CellHeader>}
            <CellBody>{title}</CellBody>
            { desc ? <CellFooter>{desc}</CellFooter> : <CellFooter /> }
          </Link>
        })
      }
    </div>
  }
}
