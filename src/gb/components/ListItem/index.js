import React, { Component } from 'react'
import { Cell, CellHeader, CellBody, CellFooter } from 'react-weui'
import './index.scss'

export default class List extends Component {
  render () {
    const { label, title, desc, icon, ...res } = this.props
    return <Cell {...res}>
      { icon && <CellHeader>
        <img src={icon} className='gb_list_icon' alt='icon' />
      </CellHeader> }
      { (label && !icon) && <CellHeader>{label}</CellHeader> }
      <CellBody>
        {title}
      </CellBody>
      { desc && <CellFooter>{desc}</CellFooter> }
    </Cell>
  }
}
