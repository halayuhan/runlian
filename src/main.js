/*
 * @Author: todo
 * @Date: 2019-07-22 15:30:40
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-22 20:08:33
 * @Description: file content
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store'
import md5 from 'js-md5'
import { addCookie, getCookie, removeCookie } from './api/cookie'
axios.defaults.baseURL = 'http://10.54.26.79:8080'
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.addCookie = addCookie
Vue.prototype.getCookie = getCookie
Vue.prototype.removeCookie = removeCookie

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
