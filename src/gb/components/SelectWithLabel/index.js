import React, { Component } from 'react'
import { FormCell, CellHeader, CellBody, Label, Select } from 'react-weui'

class SelectWithLabel extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    const { label, options, onChange } = this.props
    return <FormCell select selectPos="after">
      {label && <CellHeader>
        <Label>{label}</Label>
      </CellHeader>}
      <CellBody>
        <Select data={options} onChange={onChange} />
      </CellBody>
    </FormCell>
  }
}

export default SelectWithLabel
