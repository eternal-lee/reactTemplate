import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000
})

instance.interceptors.request.use(
  config => {
    // 1.发送网络请求时候,在界面的中间位置显示loading组件

    // 2.某一些请求用户必须携带TOKEN,如果没有携带，那么直接跳转到登陆页面

    // 3.params/data序列化的操作,qs.stringfly
    console.warn('请求被拦截', config)
    return config
  },
  err => {}
)

instance.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log('请求错误')
          break
        case 401:
          console.log('未授权访问')
          break
        default:
          console.log('其他错误信息')
      }
    }
    return err
  }
)

const interfaceObj = {
  get(url, params) {
    let pathUrl = url || '/interaction/json'
    return new Promise((resolve, reject) => {
      instance({
        url: pathUrl,
        params,
        method: 'get'
      })
        .then(res => {
          try {
            resolve(res)
          } catch (e) {
            console.log('回调异常: ' + e)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, data) {
    let pathUrl = url || '/interaction/json'
    return new Promise((resolve, reject) => {
      instance({
        url: pathUrl,
        data: qs.stringify(data),
        method: 'post'
      })
        .then(response => {
          let res = response.data
          try {
            resolve(res)
          } catch (e) {
            console.log('回调异常: ' + e)
          }
        })
        .catch(error => {
          return reject(error)
        })
    })
  }
}

export default interfaceObj
