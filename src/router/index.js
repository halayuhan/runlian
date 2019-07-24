/*
 * @Author: liyan
 * @Date: 2019-07-22 15:30:40
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-24 17:08:33
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MobileItem',
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
    },
    {
      path: '/portal',
      name: 'PortalItem',
      component: () => import('@/pages/portal/index'),
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/pages/portal/login/index')
        },
        {
          path: '/search',
          name: 'Search',
          component: () => import('@/pages/portal/search/index')
        }
      ]
    }
  ]
})
