/*
 * @Author: liyan
 * @Date: 2019-07-22 15:30:40
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-29 16:13:08
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
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
          component: () => import('@/pages/portal/search/index'),
          meta: {
            // requireAuth: true //  添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (token) {
      // 通过vuex state获取当前的token是否存在
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/login'
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
