import logo from './../../logo.svg'
import './index.scss'
import { Button } from 'antd-mobile'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PubSub from 'pubsub-js'

import Alert from './../../component/alert/index'

class Home extends Component {
  constructor() {
    super()
    this.apperBtn = this.apperBtn.bind(this)
  }
  componentDidMount() {
    console.warn(process.env)
    PubSub.unsubscribe('confirm')
    PubSub.subscribe('confirm', (_, data) => {
      console.warn('data', data + '54545')
    })
  }

  apperBtn() {
    Alert.open()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <Button color="default" onClick={this.apperBtn}>
              弹窗
            </Button>
          </div>
          <Link to="/Login">
            <Button color="primary">登录</Button>
          </Link>
        </header>
      </div>
    )
  }
}

export default Home
