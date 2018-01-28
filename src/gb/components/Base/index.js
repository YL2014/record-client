import { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import 'weui'
import 'react-weui/build/packages/react-weui.css'
import './index.scss'

class BaseComponent extends PureComponent {
  render () {
    return this.props.children
  }
}

export default withRouter(BaseComponent)
