import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import List from 'Gb/components/List'
import Dialog from 'Gb/components/Dialog'
import { Page, Flex, Button } from 'react-weui'
import goodsActions from './actions'

import styles from './index.scss'

class GoodsDetail extends Component {
  constructor () {
    super()
    this.state = {
      dataSource: []
    }
    this.setDetailList = this.setDetailList.bind(this)
    this.showSetStatus = this.showSetStatus.bind(this)
    this.showRemove = this.showRemove.bind(this)
    this.setGoodsStatus = this.setGoodsStatus.bind(this)
    this.updateGoods = this.updateGoods.bind(this)
    this.removeGoods = this.removeGoods.bind(this)
  }

  setDetailList () {
    const { state } = this.props.location
    if (!state) return
    const { name, bprice, zprice, tprice, lprice, apply, category, image } = state
    this.setState({
      dataSource: [
        { title: '商品名称', desc: name },
        { title: '进价', desc: bprice },
        { title: '总代价', desc: zprice },
        { title: '特代价', desc: tprice },
        { title: '零售价', desc: lprice },
        { title: '供应商', desc: apply },
        { title: '分类', desc: category },
        { title: '商品图', desc: <img className={styles.goods_img} src={image} alt='商品图' /> }
      ]
    })
  }

  // 显示状态修改弹窗
  showSetStatus () {
    this.setState({ showStatus: true })
  }

  // 显示删除弹窗
  showRemove () {
    this.setState({ showRemove: true })
  }

  // 下架，上架
  setGoodsStatus () {
    const { id, status: type } = this.props.location.state
    this.props.actions.setStatus(id, type)
  }

  // 更新
  updateGoods () {
    this.props.history.push({ path: '/goodsupdate', state: this.props.location.state})
  }

  // 删除
  removeGoods () {
    const { id } = this.props.location.state
    this.props.actions.removeGoods(id)
  }

  componentDidMount () {
    this.setDetailList()
  }

  render () {
    const { dataSource, showStatus, showRemove } = this.state
    const { state ={} } = this.props.location
    const status = state.status || 0
    return <Page ptr={false}>
      <div className={styles.goodsdetail}>
        <List dataSource={dataSource} />
        <Flex>
          { status === 0 &&
          <div className='weui-flex__item'>
            <Link to={{ pathname: '/goodsupdate', state: state }} style={{color: '#fff'}}>
            <Button type='primary' size='middle'>更新</Button>
            </Link>
          </div> }
          <div className='weui-flex__item'><Button type='default' size='middle' onClick={this.showSetStatus}>{status === 0 ? '下架' : '上架'}</Button></div>
          <div className='weui-flex__item'><Button type='warn' size='middle' onClick={this.showRemove}>删除</Button></div>
        </Flex>
        <Dialog
          show={showStatus}
          hideDialog={() => this.setState({ showStatus: false })}
          ok={this.setGoodsStatus}
        >
          确定{status === 0 ? '下架' : '上架'}该商品？
        </Dialog>
        <Dialog
          show={showRemove}
          hideDialog={() => this.setState({ showRemove: false })}
          ok={this.removeGoods}
        >
          确定删除该商品?
        </Dialog>
      </div>
    </Page>
  }
}

const mapStateToProps = ({ goods }) => {
  return { goods }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(goodsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetail)
