<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:31:05
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-01 18:13:00
 * @Description: file content
 -->
<template>
  <div class="mobile-container">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'MobileContainer'
}
</script>

<style>
.mobile-container {
  /* background-color: #61acab; */
  height: calc(100vh - 60px);
}
</style>
