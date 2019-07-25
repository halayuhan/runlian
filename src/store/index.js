import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//  用localstorage.getItem('token')
const state = {
  user: window.localStorage.getItem('user'),
  token: window.localStorage.getItem('token')
}
const mutations = {
  // 将token保存到localStorage里，token表示登陆状态
  SET_TOKEN: (state, data) => {
    state.token = data
    window.localStorage.setItem('token', data)
  },
  // 获取用户名
  GET_USER: (state, data) => {
    // 把用户名存起来
    state.user = data
    window.localStorage.setItem('user', data)
  },
  // 登出
  LOGOUT: state => {
    // 登出的时候要清除token
    state.token = null
    state.user = null
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
