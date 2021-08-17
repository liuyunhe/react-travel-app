import store from '../store'

// Redux中间件公式
const middleware = (store) => (next) => (action) => {}

const applyMiddleware = function (middleware) {
  let next = store.dispatch
  // 这里传入store,因为中间件可能用到getState获取数据
  store.dispatch = middleware(store)(next)
}

applyMiddleware(middleware)
