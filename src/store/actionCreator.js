// actionCreator 本质是一个对象. 这个对象里面有很多的方法
// 哪里需要调用这里面的方法, 就在哪个组件中引入actionCreator
import store from './store'

let actions = {
  changeName(name) {
    // 修改name的方法
    let action = {
      // action对象
      type: 'CHANGE_NAME', // type 标识: 必须的属性, 固定属性只能是type
      payload: name // 这是传递数据的参数
    }
    /* store.dispatch 是 View 发出 Action 的唯一方法。
     * 接受一个 Action 对象作为参数，将它发送出去。
     */
    store.dispatch(action)
  },
  changeAge(age) {
    let action = {
      type: 'CHANGE_AGE',
      payload: age // 可以使用参数
    }
    store.dispatch(action)
  }
}

export default actions
