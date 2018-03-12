import React, { Component } from 'react'
import { FormCell, CellHeader, CellBody, CellFooter, Label, Input } from 'react-weui'
// import 'weui'
// import 'react-weui/build/packages/react-weui.css'

export default class InputWithLabel extends Component {
  render () {
    const { label, name, className, desc, placeholder = '', value = '', type = 'text', onChange, ...res } = this.props
    return <FormCell className={className}>
      <CellHeader>
        <Label>{label}</Label>
      </CellHeader>
      <CellBody>
        <Input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} {...res} />
      </CellBody>
      {desc && <CellFooter>{desc}</CellFooter>}
    </FormCell>
  }
}
