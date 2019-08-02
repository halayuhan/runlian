<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:13:58
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-01 19:14:00
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
.portal-header {
  width: 100%;
  height: 80px;
  background-color: #5caaab;
}

.header-wrapper {
  height: 80px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-wrapper-left {
  display: flex;
  align-items: center;
}

.header-wrapper-left h1 {
  font-size: 30px;
}

.header-wrapper-left span {
  display: inline-block;
  width: 360px;
  height: 60px;
  background: url("../../assets/header-text.png") no-repeat;
  background-size: 360px 60px;
  color: transparent;
}

.header-wrapper-right {
  display: flex;
  text-align: center;
}

.header-wrapper-right i {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0 5px 0 0;
  color: transparent;
  /* background: url("../../assets/avatar.png") no-repeat;
  background-size: 50px 50px; */
}

.header-wrapper-right .el-icon-user {
  display: inline-block;
  width: 50px;
  height: 50px;
  font-size: 40px;
  color: #eee;
}

.header-wrapper-right p {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #eee;
}
</style>
