/*
 * @Author: liyan
 * @Date: 2019-07-29 16:34:42
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-05 19:30:41
 * @Description: file content
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//  用sessionStorage.getItem('token')
const state = {
  user: window.sessionStorage.getItem('user'),
  token: window.sessionStorage.getItem('token'),
  loading: false
}
const mutations = {
  // 将token保存到sessionStorage里，token表示登陆状态
  SET_TOKEN: (state, data) => {
    state.token = data
    window.sessionStorage.setItem('token', data)
  },
  // 获取用户名
  GET_USER: (state, data) => {
    // 把用户名存起来
    state.user = data
    window.sessionStorage.setItem('user', data)
  },
  // 登出
  LOGOUT: state => {
    // 登出的时候要清除token
    state.token = null
    state.user = null
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('user')
  },
  LOADING: (state, data) => {
    state.loading = data
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
