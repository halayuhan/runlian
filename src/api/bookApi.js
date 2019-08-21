// 书籍页面接口统一入口

import { get, post } from './request'
import qs from 'querystring'

export function QueryData (params) {
  return post('/book/query', params)
}
export function UploadImg (params) {
  return post('/file/uploadImg', params)
}
export function UpdateIsbn (params) {
  return get('/book/updateISBN', params)
}
export function UpdateBook (params) {
  return post('/book/update', params)
}
export function GetBook (params) {
  return get('/book/get', params)
}
export function AddOneBook (params) {
  return post('/book/add', params)
}
export function UploadExcel (params) {
  return post('/book/uploadExcel', params, 'multipart/form-data')
}
export function GetErrorExcel (params) {
  return post('/file/getErrorExcel', params)
}
export function AddBookList (params) {
  return post('/book/adds', params)
}
