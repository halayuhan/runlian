/*
 * @Author: liyan
 * @Date: 2019-07-22 15:30:40
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-15 20:21:38
 * @Description: file content
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/public.css'
import 'element-ui/lib/index.js'
import axios from '../src/api/request'
import store from './store'
import md5 from 'js-md5'
import router from './router'
import { getDate } from './api/dateFormat'
import infiniteScroll from 'vue-infinite-scroll'
import Vuelazyload from 'vue-lazyload'



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(infiniteScroll)
Vue.prototype.$axios = axios
Vue.prototype.getDate = getDate
Vue.use(Vuelazyload, {
  preLoad: 1.3,
  error: 'static/cover/default.jpg',
  loading: 'static/cover/default.jpg',
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
