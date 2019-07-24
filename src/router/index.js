/*
 * @Author: liyan
 * @Date: 2019-07-22 15:30:40
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-23 20:29:44
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'MobileItem',
      redirect: '/attendance',
      component: () => import('@/pages/mobile/index'),
      children: [
        {
          path: '/attendance',
          name: 'Attendance',
          component: () => import('@/pages/mobile/attendance/index')
        },
        {
          path: '/success',
          name: 'Success',
          component: () => import('@/pages/mobile/success/index')
        }
      ]
    }
  ]
})
