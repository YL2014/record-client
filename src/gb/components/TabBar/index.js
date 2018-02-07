import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { my, my_fill, present, present_fill, home, home_fill } from 'Gb/icons'
import './index.scss'

export default class TabBar extends Component {
  constructor () {
    super()
    this.state = {}
  }

  setTabList () {
    const user = JSON.parse(localStorage.getItem('user'))
    const role = user.role
    let list = [
      {
        path: '/user',
        title: '个人中心',
        icon: my,
        iconFill: my_fill
      }
    ]
    if (role === 1) {
      list.push({path: '/manage', title: '管理审核', icon: present, iconFill: present_fill})
    } else {
      list.push({path: '/record', title: '订单录入', icon: home, iconFill: home_fill})
    }
    this.setState({ list: list })
  }

  componentDidMount () {
    this.setTabList()
  }

  render () {
    const { list } = this.state
    const { active = '/user' } =this.props
    return <div className='weui-tabbar'>
      {
        list && list.map(item => {
          return <Link key={item.path} to={item.path} className={item.path === active ? 'weui-tabbar__item weui-bar__item_on' : 'weui-tabbar__item'}>
            <div className='weui-tabbar__icon'>
              <img src={item.path === active ? item.iconFill : item.icon} alt='导航'/>
            </div>
            <p className='weui-tabbar__label'>{item.title}</p>
          </Link>
        })
      }
    </div>
  }
}