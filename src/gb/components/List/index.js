import React, { Component } from 'react'
import { Cell, CellHeader, CellBody, CellFooter } from 'react-weui'
import './index.scss'

export default class LinkList extends Component {
  render () {
    let { dataSource, className, ...other } = this.props
    if (!dataSource || dataSource.length === 0) return <p className='gb_list_nodata'>暂无数据</p>
    if (!Array.isArray(dataSource)) dataSource = [ dataSource ]
    return <div className={className} {...other}>
      {
        dataSource && dataSource.map((item,index) => {
          const { title, desc, icon, ...res } = item
          return <Cell {...res} key={index}>
            { icon && <CellHeader>
              <img src={icon} className='gb_list_icon' alt='icon'/>
            </CellHeader> }
            <CellBody>{title}</CellBody>
            { desc && <CellFooter>{desc}</CellFooter> }
          </Cell>
        })
      }
    </div>
  }
}
