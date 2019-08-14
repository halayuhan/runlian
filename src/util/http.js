/*
 * @Author: liyan
 * @Date: 2019-08-05 18:11:29
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-13 10:18:23
 * @Description: file content
 */
import axios from 'axios'
import store from '../store'

axios.interceptors.request.use(config => {
  store.commit('LOADING', true)
  return config
}, error => {
  store.commit('LOADING', false)
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  store.commit('LOADING', false)
  return response
}, error => {
  store.commit('LOADING', false)
  return Promise.reject(error)
})

export default axios
