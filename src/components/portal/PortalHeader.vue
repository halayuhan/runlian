<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:13:58
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-24 17:26:34
 * @Description: file content
 -->
<template>
  <header class="portal-header">
    <div class="header-wrapper">
      <div class="header-wrapper-left">
        <h1>Linksoul 读书会</h1>
        <ul v-show="isLogin">
          <li>
            <span></span>
          </li>
          <li>
            <a href>签到管理页面</a>
          </li>
          <li>
            <a href>书单管理页面</a>
          </li>
        </ul>
      </div>
      <div class="header-wrapper-right" v-show="isLogin">
        <i>avatar</i>
        <p>Linksoul</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PortalHeader',
  data: () => ({
    isLogin: true
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

.header-wrapper-left span {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: 1px 0 0 0;
  color: transparent;
  background: url("../../assets/point.png") no-repeat;
  background-size: 40px 40px;
  /* background-color: #eee; */
}

.header-wrapper-left ul {
  display: flex;
}

.header-wrapper-left li {
  height: 40px;
  line-height: 40px;
  margin: 0 20px 0 10px;
}

.header-wrapper-left a {
  font-size: 20px;
}
.header-wrapper-left a:hover {
  font-weight: bold;
  color: initial;
  border-bottom: 4px solid #797979;
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
  background-color: #eee;
}

.header-wrapper-right p {
  height: 50px;
  line-height: 50px;
  font-size: 22px;
}
</style>
