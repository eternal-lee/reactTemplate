# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

```javascript
nodejs 版本16.10.0
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### [2021 年 React 常见的面试题以及答案](https://blog.csdn.net/qq_44182284/article/details/116979015)

## React 项目配置 npm run build 命令分环境打包

### react-app-rewired

- react-app-rewired 的作用是在不 eject 的情况下修改 webpack 配置

- 目标：修改 build 的 output 目录

- 安装 react-app-rewired

> 1: npm install react-app-rewired --save-dev
> 2: 根目录下新建文件：config-overrides.js
> 3：添加以下配置
> module.exports = function override(config, env) {
> // 修改 path 目录
> const path = require('path');
> const paths = require('react-scripts/config/paths');
> paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
> config.output.path = path.join(path.dirname(config.output.path), 'dist');
> console.log(custom output path - ${config.output.path});
> return config;
> };
> 4：npm run build
> 会注意到 build 后的输出路劲变味了 dist，而不是默认的 build

- 修改 package.json

\*\* 将 scripts 替换成 react-app-rewired，react-app-rewired 才会去加载 config-overrides.js 文件

```javascript
 "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  }
```

### dotenv

> 自带 webpack 配置中默认配置使用 dotenv 来处理

- 安装工具 dotenv-cli

> npm install -D dotenv-cli

- 在根目录下新建文件

> 根目录下添加文件.env.development、.env.test、.env.production
> 文件内容根据 webpack 配置以 REACT*APP*作为前缀读取,eg:REACT_APP_BASEURL = '';
> 使用 process.env 对象来获取对应信息

- 修改 package.json 中的 scripts 指定环境

```javascript
"build:dev": "dotenv -e .env.development react-app-rewired build",
"build:sit": "dotenv -e .env.test react-app-rewired build",
"build:pro": "dotenv -e .env.production react-app-rewired build",
```

## 父子组件通信

- 父传子直接通过 props 传递

- 子传父

> 子组件 Son.js 文件代码示例：

```javascript
 //按钮点击事件
handleClick(){
  //通过props属性获取父组件的getdata方法，并将this.state值传递过去
  this.props.getdata(this.state.inputValue);
}
 //按钮点击事件
handleClick(){
  //通过props属性获取父组件的getdata方法，并将this.state值传递过去
  this.props.getdata(this.state.inputValue);
}
```

> 父组件 Parent.js 文件代码示例：

```javascript
//用于接收子组件的传值方法，参数为子组件传递过来的值
getDatas(msg){
  //把子组件传递过来的值赋给this.state中的属性
  this.setState({
      mess: msg
  });
}
render(){
  return (
    <React.Fragment>
      {/* 渲染子组件，设置子组件访问的方法，
      getdata属性名为子组件中调用的父组件方法名 */}
      <Son getdata={this.getDatas.bind(this)}></Son>
      <div>展示数据：{this.state.mess}</div>
    </React.Fragment>
  );
}
```

## 兄弟组件传值

- 兄弟组件之间传值参照父子组件传值，即：组件 A – 传值 --> 父组件 – 传值 --> 组件 B

## 父组件调用子组件方法

- 1.子组件 child.js

```javascript
sonFunc =(dat)=>{ //定义方法
  console.log('父组件调用子组件方法'，dat)
}
```

- 2.父组件 parent.js

- 16.3.0 之前的设置方法为

```javascript
getChildFunc(){
  if(this.refs.childRef){
    this.refs.childRef.sonFunc('哈哈') //调用子组件的sonFunc方法
  }
}
render(){
  return(
    <div className="ParentBig">
      <div onClick={ this.getChildFunc }>点击</div>
      // 把子组件的this指针挂载成父组件的一个变量
      <ChildPage ref="childRef"></ChildPage>
    </div>
  )
}
```

- 16.3.0 之后(包括 16.3.0 version)的设置方法为 onRef

```javascript
getChildFunc(){
  if(this.childRef){
    this.childRef.sonFunc('哈哈') //调用子组件的sonFunc方法
  }
}
render(){
  return(
    <div className="ParentBig">
      <div onClick={ this.getChildFunc }>点击</div>
      // 把子组件的this指针挂载成父组件的一个变量
      <ChildPage onRef={c=>this.childRef=c}></ChildPage>
    </div>
  )
}
```

## React 自带 sass 则直接使用 sass 文件 \*.scss

- 1. 安装 node-sass

> npm install node-sass --save

- 2. 创建一个 .scss 文件, 引入即可

> import './index.scss'

- [Install from mirror in China](https://www.npmjs.com/package/node-sass)

> npm install -g mirror-config-china --registry=http://registry.npm.taobao.org
> npm install node-sass

## pubsub-js 实现兄弟组件直接通信

- publish:发布
- subscribe:订阅

- 1. 下载，要依赖于 pubsub-js 模块

> npm install pubsub-js --save

- 2. import pubSub from "pubsub-js"

> 使用：发布

- pubSub.publish("消息名称"，“消息的内容”);

> 订阅者：订阅

- pubSub.subscribe("消息名称"，function(name,context){})
