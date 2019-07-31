<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:13:58
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-29 16:41:09
 * @Description: file content
 -->
<template>
  <header class="portal-header">
    <div class="header-wrapper">
      <div class="header-wrapper-left">
        <h1>Linksoul 读书会管理平台</h1>
      </div>
      <div class="header-wrapper-right" v-if="isLogin">
        <i>avatar</i>
        <p>{{userName}}</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PortalHeader',
  data: () => ({
    isLogin: true, // 登录状态
    userName: 'userName' // 登录用户，返回数据存于vuex中
  })
}
</script>

<style scoped>
.portal-header {
  width: 100%;
  height: 80px;
  background-color: #fff;
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

.header-wrapper-right {
  display: flex;
  text-align: center;
}

.header-wrapper-right i {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0 10px 0 0;
  color: transparent;
  background: url("../../assets/avatar.png") no-repeat;
  background-size: 50px 50px;
}

.header-wrapper-right p {
  height: 50px;
  line-height: 50px;
  font-size: 22px;
}
</style>
