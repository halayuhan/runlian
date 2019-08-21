// 签到功能接口统一入口

import { get, post } from './request'

export function GetUser (params) {
  return get('/signIn/getUser', params)
}
export function AttendSign (params) {
  return get('/signIn/submit', params)
}
export function GetSignRecord (params) {
  return get('/signIn/getRecord', params)
}
export function AdminLogin (params) {
  return get('/admin/login', params)
}
