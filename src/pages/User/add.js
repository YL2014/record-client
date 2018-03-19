import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InputWithLabel from 'Gb/components/InputWithLabel'
import { Cell, CellHeader, CellBody, CellFooter, Button, LoadMore } from 'react-weui'
import Toast from 'Gb/components/Toast'
import Helper from 'Gb/utils/helper'
import ajax from 'Gb/utils/ajax'
import { API } from './constants'
import ImageCompressor from 'image-compressor.js'
import userActions from './actions'
import styles from './index.scss'

// 压缩图片
const CompressorInstance = new ImageCompressor()

class UserAdd extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      telephone: '',
      boss: null,
      idCard: '',
      idCardUpUrl: '',
      idCardDownUrl: '',
      wx: '',
      present: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setBoss = this.setBoss.bind(this)
    this.uploadImg = this.uploadImg.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  // 表单处理
  handleChange (e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  // 提交申请
  async handleClick () {
    const { username, telephone, idCard, idCardUpUrl, wx, boss } = this.state
    if (!(username && telephone && idCard && wx && idCardUpUrl)) {
      Toast('完善信息后再提交')
      return
    }
    if (!Helper.reg.telephone.test(telephone)) {
      Toast('手机号格式不正确')
      return
    }
    const data = await ajax.post(API.add, {
      username, telephone, idCard, wx, boss, idCardUpUrl
    })
    if (data) {
      Toast.success('提交成功')
      this.resetForm()
    }
  }

  resetForm () {
    this.setState({
      username: '',
      telephone: '',
      idCard: '',
      idCardUpUrl: '',
      idCardDownUrl: '',
      wx: ''
    })
  }

  // 上传图片
  async uploadImg () {
    let file = this.upFileNode.files[0]
    let curFile = 'idCardUpUrl'
    if (file) {
      this.setState({ present: '开始压缩图片' })
      const compressFile = await CompressorInstance.compress(file, { quality: .6 })
      if (!compressFile) {
        Toast('图片压缩失败')
        this.setState({ present: '' })
        return
      }
      this.setState({ present: '压缩成功，开始上传...' })
      const params = new FormData()
      params.append('file', compressFile, compressFile.name)
      const data = await ajax.upload(API.upload, params, (progressEvent) => {
        const uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total), 10)
        this.setState({ present: `上传${uploadPercentage}%` })
      })
      if (data) {
        Toast.success('上传成功')
        this.setState({ [curFile]: data.url })
      } else {
        // this.setState({ present: 0 })
      }
      this.setState({ present: '' })
    }
  }

  // 设置boss
  setBoss () {
    const boss = Helper.getQueryParam('id')
    const code = Helper.getQueryParam('code')
    if (!boss) {
      Toast('申请链接无效')
      return
    }
    this.setState({ boss })
    // 授权
    const { auth } = this.props.actions
    auth && auth(code)
  }

  componentDidMount () {
    this.setBoss()
  }

  render () {
    const { username, telephone, idCard, idCardUpUrl, idCardDownUrl, wx, boss, present } = this.state
    const { state } = this.props.location
    if (!boss) return null
    return <div className={styles.useradd}>
      <div className={styles.useradd_block}>
        <InputWithLabel name='username' label='姓名' placeholder='请输入姓名' value={username} onChange={this.handleChange} maxLength='10' />
        <InputWithLabel name='telephone' label='手机号' placeholder='请输入手机号' value={telephone} onChange={this.handleChange} type='number' />
        <InputWithLabel name='wx' label='微信号' placeholder='请输入微信号' value={wx} onChange={this.handleChange} />
        <InputWithLabel name='idCard' label='身份证号' placeholder='请输入身份证号' value={idCard} onChange={this.handleChange} />
        <Cell>
          <CellHeader>身份证正面照</CellHeader>
          <CellBody className={styles.useradd_upload}>
            <div className='weui-uploader__input-box'>
              <input ref={(node) => {this.upFileNode = node}} className='weui-uploader__input' type="file" onChange={this.uploadImg.bind(this, 'up')} accept='image/*'/>
            </div>
          </CellBody>
          <CellFooter>
            { idCardUpUrl && <img className={styles.useradd_upload_img} src={idCardUpUrl} alt='upload' /> }
          </CellFooter>
        </Cell>
      </div>
      <div className={styles.useradd_btn}>
        <Button onClick={this.handleClick}>{state ? '确认' : '提交申请'}</Button>
      </div>
      {
        present && <div className={styles.useradd_loading} onClick={(e) => { e.stopPropagation(); return false }}>
          <LoadMore loading>{present}</LoadMore>
        </div>
      }
    </div>
  }
}

// const mapStateToProps = ({ user }) => {
//   return { user }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(UserAdd)