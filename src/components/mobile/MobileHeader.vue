<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:19:27
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-01 18:51:10
 * @Description: file content
 -->
<template>
  <header class="mobile-header">
    <h1>Linksoul读书会签到表</h1>
  </header>
</template>

<script>
export default {
  name: 'MobileHeader'
}
</script>

<style>
.mobile-header {
  height: 60px;
  padding: 0 10px;
  /* background: url("../../assets/header-text.png") no-repeat; */
  background-size: 80vw 60px;
  /* background-color: #5caaab; */
  border: 1px solid #eee;
}
h1 {
  /* width: 390px; */
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.8);
  -webkit-text-stroke: 0.5px #03716e;
  /* -webkit-text-stroke: 0.5px #000; */
  /* color: rgba(255, 255, 255, 0.8); */
}
</style>
