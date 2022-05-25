import React, { Component } from 'react'
import { Form, Button, Input, Toast } from 'antd-mobile'
import './index.scss'
// 在需要使用到数据的组件中引入Store
import store from '../../store/store'
import actionCreator from '../../store/actionCreator'

import { loginIn } from './../../service/login'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      rediectToReferrer: false // 是否重定向之前的界面
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSumit = this.handleSumit.bind(this)
  }

  componentDidMount() {
    // 使用subscribe监听reducer的改动.只要reducer中数据改变就会触发
    store.subscribe(() => {
      // 使用setState中只放一个空对象会更新所有的数据
      // 目的就是触发render的执行, 来重新渲染页面, 让页面的数据发生改变
      this.setState({})
    })
  }
  // 处理用户名、密码的变化
  handleChange(type, value) {
    if (type === 'username') {
      this.setState({
        username: value
      })
      actionCreator.changeName(value)
    } else if (type === 'password') {
      this.setState({
        password: value
      })
    }
  }
  // 提交登录表单
  async handleSumit(e) {
    let params = {
      account: '14400001012', // this.state.username,
      password: '123456' // this.state.password
    }
    loginIn(params).then(res => {
      console.warn(res)
    })
    console.warn('user', this.state.username)
    e.preventDefault()
    const username = this.state.username
    const password = this.state.password
    if (username.length === 0 || password.length === 0) {
      Toast.show({ content: '用户名或密码不能为空！' })
      return
    }
    // 保存信息到sessionStorage
    sessionStorage.setItem('username', username)
    // 登录成功后，设置redirectToReferrer为true;
    this.setState({
      rediectToReferrer: true
    })
    let RedirectUrl = this.props.location.state
      ? this.props.location.state.from.pathname
      : '/'
    // 登陆成功之后的跳转
    this.props.history.push(RedirectUrl)
  }
  render() {
    // store下面有一个方法: getState() 获取到reducer下return的数据
    /* store组件中使用了reducer, 并返回了新的reducer
      reducer中返回的是state中的数据, 
    */
    let storeState = store.getState()
    return (
      <Form
        className="login"
        footer={
          <Button
            block
            type="submit"
            onClick={this.handleSumit}
            color="primary"
          >
            登录
          </Button>
        }
      >
        <div>
          <Form.Item name="姓名" label="姓名">
            <Input
              name=""
              value={this.state.username}
              onChange={e => this.handleChange('username', e)}
              placeholder={'请输入姓名-' + storeState.name}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="密码" label="密码：">
            <Input
              type="password"
              value={this.state.password}
              onChange={e => this.handleChange('password', e)}
              placeholder="请输入密码"
            />
          </Form.Item>
        </div>
        <div className="skeleton"></div>
        <pre>
          <code>
            {'{'}<br />
            &nbsp;用户名: {storeState.name}, <br />&nbsp;年龄: {storeState.age}<br />
            {'}'}
          </code>
        </pre>
      </Form>
    )
  }
}
export default Login
