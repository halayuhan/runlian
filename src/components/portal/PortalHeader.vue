<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:13:58
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-09 13:58:07
 * @Description: file content
 -->
<template>
  <header class="portal-header">
    <div class="header-wrapper">
      <div class="header-wrapper-left">
        <span>header-text</span>
      </div>
      <div class="header-wrapper-right" v-if="isLogin">
        <i class="el-icon-user"></i>
        <p>{{userName}}</p>
        <!-- <router-link to="/login" @click.native="loginOut">登出</router-link> -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PortalHeader',
  data () {
    return {
      // 登录状态
      // 登录用户，返回数据存于vuex中
    }
  },
  computed: {
    userName () {
      return this.$store.state.user
    },
    isLogin () {
      return !!this.$store.state.user
    }
  },
  methods: {
    loginOut () {
      this.$store.commit('GET_USER', '')
      window.sessionStorage.removeItem('user')
    }
  }
}
</script>

<style>
.portal-header .header-wrapper-right {
  padding: 0 30px;
}

.portal-header .header-wrapper-right a {
  display: inline-block;
  margin: 0 0 0 10px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #666;
}
</style>
