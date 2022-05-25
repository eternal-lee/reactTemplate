import http from './../api/http.js'

export function loginIn(params) {
  let url = '/interaction/login'
  let data = {
    funcNo: '2091176',
    pluginVer: '1.7',
    ...params
  }
  return http.post(url, data)
}
