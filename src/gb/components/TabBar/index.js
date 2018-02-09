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
        pathname: '/user',
        title: '个人中心',
        icon: my,
        iconFill: my_fill
      }
    ]
    if (role === 1) {
      list.push({pathname: '/manage', title: '管理审核', icon: present, iconFill: present_fill})
    } else if (role === 2) {
      list.push({pathname: '/manage', title: '管理审核', icon: present, iconFill: present_fill})
      list.push({pathname: '/record', title: '订单录入', icon: home, iconFill: home_fill})
    } else {
      list.push({pathname: '/record', title: '订单录入', icon: home, iconFill: home_fill})
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
        list && list.map((item, index) => {
          return <Link key={item.pathname} to={item.pathname} className={item.pathname === active ? 'weui-tabbar__item weui-bar__item_on' : 'weui-tabbar__item'}>
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