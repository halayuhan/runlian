// 封装axios处理请求

import axios from 'axios'
import store from '../store'

axios.interceptors.request.use(
  config => {
    store.commit('LOADING', true)
    return config
  },
  error => {
    store.commit('LOADING', false)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    store.commit('LOADING', false)
    return response
  },
  error => {
    store.commit('LOADING', false)
    return Promise.reject(error)
  }
)

function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && response.data.code === '000') {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回给checkcode处理
  return {
    code: -404,
    msg: response.data.msg
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.code === -404) {
    // alert(res.msg)
  }
  return res
}

/**
 * @param {String} url [请求的url地址]
 * @param {String} headers [请求头]
 * @param {Object} data/params [请求时携带的参数]
 */

export async function post (url, data, headers) {
  if (headers) {
    headers = { 'Content-Type': headers }
  }
  try {
    const response = await axios({
      method: 'post',
      baseURL: process.env.API_HOST,
      url,
      headers,
      data: data,
      timeout: 10000
    })

    const res = checkStatus(response)
    return checkCode(res)
  } catch (err) {
    console.log(err.data)
  }
}
export async function get (url, params) {
  try {
    const response = await axios({
      method: 'get',
      baseURL: process.env.API_HOST,
      url,
      params,
      timeout: 10000
    })
    const res = checkStatus(response)
    return checkCode(res)
  } catch (err) {
    console.log(err.data)
  }
}
export default axios
