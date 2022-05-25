import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import lazyLoad from './lazyLoad'
// import { createHashHistory } from 'history'

// 路由懒加载
const Home = lazyLoad(() => import("./../container/Home/index"))
const Login = lazyLoad(() => import("./../container/login/index"))
const ErrorPage = lazyLoad(() => import("./../container/404/index"))
// const history = createHashHistory()

class RouterConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/index" />} />
          {/* <Redirect path="/" to="/index" exact /> */}
          <Route path="/index" component={Home} onEnter={isRequireAuthFun} />
          <Route path="/Login" component={Login} />
          <Route path="/404" component={ErrorPage} />
          <Redirect to="/404" />
        </Switch>
      </HashRouter>
    )
  }
}

let isRequireAuthFun = (nextState, replace) => {
  console.warn(544545)
}

export default RouterConfig
