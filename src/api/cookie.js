export function addCookie (name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie =
    name +
    '=' +
    escape(value) +
    (expiredays == null ? '' : ';expires=' + exdate.toGMTString())
}
// 获取cookie
export function getCookie (name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) return arr[2]
  else return null
}
// 删除cookie
export function removeCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
}
