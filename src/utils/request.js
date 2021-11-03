// 导入axios
import axios from 'axios'
// 导入Message
import { Message } from 'element-ui'
import store from '@/store' // 导入store
import router from '@/router'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // 定义超时时间

// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

// 创建axios实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000
})

// 请求拦截器 [注入token]
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      // 如果它为true表示 过期了
      // token没用了 因为超时了
      store.dispatch('user/logout') // 登出操作
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    // 如果token存在 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器 [集中的错误处理，数据处理]
service.interceptors.response.use(
  response => {
    // 后端返回的数据 response.data
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      // 业务错误
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求错误信息
  error => {
    // error 信息 里面 response的对象
    if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
      store.dispatch('user/logout') // 登出action 删除token
      router.push('/login')
      Message.error('token过期，请重新登录')
    } else {
      Message.error(error.message) // 提示错误信息
    }
    return Promise.reject(error)
  }
)

// 暴露
export default service
