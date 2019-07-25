/*
 * @Author: liyan
 * @Date: 2019-07-22 15:30:40
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-25 16:29:43
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
          component: () => import('@/pages/mobile/attendance/index'),
          // 路由守卫
          beforeEnter: (to, from, next) => {
            let hashArr = to.hash.split('')
            hashArr.shift()
            let hash = hashArr.join('') // 获取链接哈希值，即二维码创建时间戳
            let timestamp = Date.parse(new Date()).toString() // 获取当前时间戳
            let gap = timestamp - hash // 时间戳比较，一小时内可跳转
            // to.hash === '' 为方便测试
            if ((gap < 3600000 && gap > 0) || to.hash === '') {
              next()
            }
          }
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
