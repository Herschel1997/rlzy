import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

// 数据
const state = {
  token: getToken(), // 设置token初始状态   token持久化 => 放到缓存中
  userInfo: {}
}
// 修改
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 设置token
    setToken(token) // 持久化
  },
  // 删除缓存
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo }
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}
// 异步修改
const actions = {
  // 登录操作
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp()
  },
  // 获取用户资料action
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值
    const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 将整个的个人信息设置到用户的vuex数据中
    return result // 这里为什么要返回 为后面埋下伏笔
  },
  // 退出
  logout(context) {
    context.commit('removeToken')
    context.commit('reomveUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
