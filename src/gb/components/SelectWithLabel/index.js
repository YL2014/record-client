import React, { Component } from 'react'
import { FormCell, CellHeader, CellBody, Label, Select } from 'react-weui'

class SelectWithLabel extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    const { label, name, value, options, onChange } = this.props
    return <FormCell select selectPos="after">
      {label && <CellHeader>
        <Label>{label}</Label>
      </CellHeader>}
      <CellBody>
        <Select name={name} value={value} data={options} onChange={onChange} />
      </CellBody>
    </FormCell>
  }
}

export default SelectWithLabel
