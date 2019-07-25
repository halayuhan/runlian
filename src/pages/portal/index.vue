<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:14:12
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-25 16:23:15
 * @Description: file content
 -->
<template>
  <div class="portal-item">
    <portal-header></portal-header>
    <portal-container></portal-container>
  </div>
</template>

<script>
import PortalHeader from '@/components/portal/PortalHeader'
import PortalContainer from '@/components/portal/PortalContainer'

export default {
  name: 'PortalItem',
  data: () => ({
    isLogin: false
  }),
  components: {
    'portal-header': PortalHeader,
    'portal-container': PortalContainer
  }
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

/* 内容区域 */
.portal-container {
  height: calc(100vh - 80px);
  /* background-color: #fc0; */
}

.login {
  height: 100%;
}

.login-wrapper {
  height: 100%;
  padding: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
}

.user-entry {
  width: 480px;
  /* height: 300px; */
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 3px;
}

.user-entry-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-entry-header i {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: #ccc;
}

.user-entry-header p {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}

.user-entry-container button {
  width: 140px;
  height: 40px;
  border-radius: 4px;
  margin: 30px 0 0 0;
  color: #fff;
  background-color: #169bd5;
}

.form-item {
  display: flex;
  flex-direction: column;
  height: 70px;
}

.form-item label {
  height: 30px;
  line-height: 30px;
}
.form-item input {
  display: inline-block;
  height: 40px;
  padding: 5px;
  line-height: 30px;
  border: 1px solid #000;
  border-radius: 2px;
}
</style>
