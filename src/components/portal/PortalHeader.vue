<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:13:58
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-06 14:02:25
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
  }
}
</script>

<style>
</style>
