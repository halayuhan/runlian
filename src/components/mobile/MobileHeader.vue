<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:19:27
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-24 10:23:10
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

<style scoped>
.mobile-header {
  padding: 0 10px;
  background: url("../../assets/mobile-header.png");
  background-size: 100vw 60px;
  /* background-color: #74bb92; */
}
h1 {
  /* width: 390px; */
  height: 60px;
  /* margin: 0 auto; */
  line-height: 60px;
  font-size: 20px;
}
</style>
